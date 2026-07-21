import AuditLog, { AuditAction } from '../models/audit.model';
import mongoose from 'mongoose';

export class AuditService {
  /**
   * Global method to log an action. Can be imported by any module.
   */
  public async logAction(
    action: AuditAction | string,
    userId?: string,
    entity?: string,
    entityId?: string,
    metadata?: any,
    ipAddress?: string,
    userAgent?: string
  ) {
    try {
      const log = new AuditLog({
        action,
        userId: userId ? new mongoose.Types.ObjectId(userId) : undefined,
        entity,
        entityId: entityId ? new mongoose.Types.ObjectId(entityId) : undefined,
        metadata,
        ipAddress,
        userAgent
      });
      await log.save();
      return log;
    } catch (error) {
      console.error('Failed to write audit log:', error);
      // We explicitly do not throw here to prevent crashing the main business flow
    }
  }

  public async getLogs(filters: any = {}, skip = 0, limit = 50) {
    const query: any = {};
    if (filters.action) query.action = filters.action;
    if (filters.userId) query.userId = filters.userId;
    if (filters.startDate || filters.endDate) {
      query.createdAt = {};
      if (filters.startDate) query.createdAt.$gte = new Date(filters.startDate);
      if (filters.endDate) query.createdAt.$lte = new Date(filters.endDate);
    }

    const [logs, total] = await Promise.all([
      AuditLog.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('userId', 'firstName lastName email role'),
      AuditLog.countDocuments(query)
    ]);

    return { logs, total };
  }
}

export const auditService = new AuditService(); // Export as singleton for easy importing
