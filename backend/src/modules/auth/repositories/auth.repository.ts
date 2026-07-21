import User, { IUser } from '../models/user.model';
import Role, { IRole } from '../models/role.model';
import Session, { ISession, SessionStatus } from '../models/session.model';
import RefreshToken, { IRefreshToken } from '../models/refresh-token.model';

export class AuthRepository {
  public async findUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).populate('roleId');
  }

  public async findUserById(id: string): Promise<IUser | null> {
    return User.findById(id).populate('roleId');
  }

  public async findRoleBySlug(slug: string): Promise<IRole | null> {
    return Role.findOne({ slug });
  }

  public async createUser(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return user.save();
  }

  public async createSession(sessionData: Partial<ISession>): Promise<ISession> {
    const session = new Session(sessionData);
    return session.save();
  }

  public async getSessionById(sessionId: string): Promise<ISession | null> {
    return Session.findById(sessionId);
  }

  public async revokeSession(sessionId: string): Promise<void> {
    await Session.findByIdAndUpdate(sessionId, { status: SessionStatus.REVOKED });
  }

  public async revokeUserSessions(userId: string): Promise<void> {
    await Session.updateMany({ userId, status: SessionStatus.ACTIVE }, { status: SessionStatus.REVOKED });
  }

  public async createRefreshToken(tokenData: Partial<IRefreshToken>): Promise<IRefreshToken> {
    const token = new RefreshToken(tokenData);
    return token.save();
  }

  public async findRefreshToken(tokenHash: string): Promise<IRefreshToken | null> {
    return RefreshToken.findOne({ tokenHash });
  }

  public async revokeRefreshTokenFamily(familyId: string): Promise<void> {
    await RefreshToken.updateMany({ familyId }, { isRevoked: true });
  }
}
