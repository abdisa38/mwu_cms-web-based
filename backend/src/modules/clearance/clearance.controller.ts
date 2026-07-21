import { Request, Response, NextFunction } from 'express';
import Clearance, { ClearanceStatus } from './clearance.model';
import Department from '../departments/department.model';
import Student from '../students/student.model';
import AuditLog from '../audit/audit.model';
import { AppError } from '../../utils/AppError';

// Student: Initiate Clearance
export const initiateClearance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Find the student profile using the logged-in user's ID
    const student = await Student.findOne({ user: req.user._id });
    if (!student) {
      return next(new AppError('No student profile found for this user', 404));
    }

    // 2. Check if a clearance already exists
    const existingClearance = await Clearance.findOne({ student: student._id });
    if (existingClearance) {
      return next(new AppError('You have already initiated a clearance process', 400));
    }

    // 3. Get all active departments to build the approval list
    const departments = await Department.find({ isActive: true });
    
    const departmentApprovals = departments.map(dept => ({
      department: dept._id,
      status: ClearanceStatus.PENDING
    }));

    // 4. Create the clearance document
    const newClearance = await Clearance.create({
      student: student._id,
      status: ClearanceStatus.PENDING,
      currentStep: 1,
      departmentApprovals
    });

    // 5. Log the action
    await AuditLog.create({
      action: 'Clearance Initiated',
      user: req.user._id,
      targetId: newClearance._id,
      targetModel: 'Clearance',
      ipAddress: req.ip
    });

    res.status(201).json({
      status: 'success',
      data: { clearance: newClearance }
    });
  } catch (err) {
    next(err);
  }
};

// Everyone: Get a specific clearance or my clearance
export const getMyClearance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) return next(new AppError('Student profile not found', 404));

    const clearance = await Clearance.findOne({ student: student._id })
      .populate('departmentApprovals.department', 'name code')
      .populate('departmentApprovals.approvedBy', 'firstName lastName title');

    if (!clearance) {
      return res.status(200).json({ status: 'success', data: { clearance: null } });
    }

    res.status(200).json({ status: 'success', data: { clearance } });
  } catch (err) {
    next(err);
  }
};

// Officer: Get pending clearances for their department
export const getPendingClearances = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ status: 'success', message: 'Not implemented yet' });
};

// Officer: Approve a department clearance
export const approveDepartmentClearance = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ status: 'success', message: 'Not implemented yet' });
};

// Registrar: Final Approval
export const grantFinalApproval = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ status: 'success', message: 'Not implemented yet' });
};
