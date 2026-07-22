import { AuthRepository } from '../repositories/auth.repository';
import { RegisterInput, LoginInput } from '../dtos/auth.dto';
import { BadRequestError, UnauthorizedError } from '../../../core/errors';
import { generateAccessToken } from '../../../utils/jwt.util';
import { generateRandomToken, hashToken } from '../../../utils/crypto.util';
import mongoose from 'mongoose';

export class AuthService {
  private repository: AuthRepository;

  constructor() {
    this.repository = new AuthRepository();
  }

  public async register(data: RegisterInput, idDocumentUrl?: string) {
    const existingUser = await this.repository.findUserByEmail(data.email);
    if (existingUser) throw new BadRequestError('Email already in use');

    const roleSlug = data.roleSlug || 'student';
    const role = await this.repository.findRoleBySlug(roleSlug);
    if (!role) throw new BadRequestError('Role not found');

    const mongoose = require('mongoose');
    const Department = mongoose.model('Department');
    const Student = mongoose.model('Student');

    let dept = null;
    if (roleSlug === 'student' && data.department) {
      dept = await Department.findOne({ name: { $regex: new RegExp(`^${data.department}$`, 'i') } });
      if (!dept) {
         dept = await Department.create({ 
           name: data.department, 
           code: data.department.substring(0, 3).toUpperCase(), 
           faculty: data.college || 'Unknown'
         });
      }
    }

    const user = await this.repository.createUser({
      userId: data.studentId || data.email,
      email: data.email,
      passwordHash: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      departmentId: dept ? dept._id : undefined,
      roleId: role._id as mongoose.Types.ObjectId,
      status: 'PENDING_VERIFICATION' as any
    });

    if (roleSlug === 'student' && dept) {
      await Student.create({
        user: user._id,
        studentId: data.studentId,
        firstName: data.firstName,
        lastName: data.lastName,
        department: dept._id,
        enrollmentYear: new Date().getFullYear(),
        academicStatus: 'ACTIVE',
        idDocumentUrl
      });
    }

    return { message: 'Registration successful. Pending verification.' };
  }

  public async login(data: LoginInput, ipAddress?: string, userAgent?: string) {
    const user = await this.repository.findUserByEmail(data.email);
    if (!user) throw new UnauthorizedError('Invalid credentials');

    if (user.status !== 'ACTIVE') throw new UnauthorizedError(`Account is ${user.status}`);

    const isMatch = await user.comparePassword(data.password);
    if (!isMatch) {
      user.failedLoginAttempts += 1;
      await user.save();
      throw new UnauthorizedError('Invalid credentials');
    }

    user.failedLoginAttempts = 0;
    user.lastLoginAt = new Date();
    await user.save();

    const session = await this.repository.createSession({
      userId: user._id as mongoose.Types.ObjectId,
      ipAddress,
      userAgent,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    const payload = { userId: user._id.toString(), roleId: user.roleId.toString() };
    const accessToken = generateAccessToken(payload);
    const refreshTokenPlain = generateRandomToken(40);
    const familyId = generateRandomToken(16);

    await this.repository.createRefreshToken({
      tokenHash: hashToken(refreshTokenPlain),
      userId: user._id as mongoose.Types.ObjectId,
      sessionId: session._id as mongoose.Types.ObjectId,
      familyId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    return { user, accessToken, refreshToken: refreshTokenPlain };
  }

  public async refreshTokens(refreshToken: string) {
    const tokenHash = hashToken(refreshToken);
    const tokenDoc = await this.repository.findRefreshToken(tokenHash);

    if (!tokenDoc) throw new UnauthorizedError('Invalid refresh token');

    if (tokenDoc.isRevoked) {
      await this.repository.revokeRefreshTokenFamily(tokenDoc.familyId);
      throw new UnauthorizedError('Security breach detected. Tokens revoked.');
    }

    if (tokenDoc.expiresAt < new Date()) {
      throw new UnauthorizedError('Refresh token expired');
    }

    tokenDoc.isRevoked = true;
    const newRefreshTokenPlain = generateRandomToken(40);
    tokenDoc.replacedByTokenHash = hashToken(newRefreshTokenPlain);
    await tokenDoc.save();

    const user = await this.repository.findUserById(tokenDoc.userId.toString());
    if (!user || user.status !== 'ACTIVE') throw new UnauthorizedError('User inactive');

    const payload = { userId: user._id.toString(), roleId: user.roleId.toString() };
    const accessToken = generateAccessToken(payload);

    await this.repository.createRefreshToken({
      tokenHash: hashToken(newRefreshTokenPlain),
      userId: user._id as mongoose.Types.ObjectId,
      sessionId: tokenDoc.sessionId,
      familyId: tokenDoc.familyId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    return { accessToken, refreshToken: newRefreshTokenPlain };
  }

  public async logout(userId: string, sessionId: string) {
    await this.repository.revokeSession(sessionId);
  }

  public async logoutAll(userId: string) {
    await this.repository.revokeUserSessions(userId);
  }
}
