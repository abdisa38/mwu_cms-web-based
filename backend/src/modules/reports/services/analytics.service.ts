import mongoose from 'mongoose';
import Clearance, { ClearanceStatus } from '../../clearance/models/clearance.model';

export class AnalyticsService {
  /**
   * Returns high level KPIs
   */
  public async getKPIs() {
    const stats = await Clearance.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          completed: {
            $sum: { $cond: [{ $eq: ['$status', ClearanceStatus.COMPLETED] }, 1, 0] }
          },
          rejected: {
            $sum: { $cond: [{ $eq: ['$status', ClearanceStatus.REJECTED] }, 1, 0] }
          },
          processingTimes: {
            $push: {
              $cond: [
                { $and: [{ $eq: ['$status', ClearanceStatus.COMPLETED] }, { $ne: ['$completedAt', null] }] },
                { $subtract: ['$completedAt', '$startedAt'] },
                null
              ]
            }
          }
        }
      }
    ]);

    if (!stats || stats.length === 0) return null;

    const data = stats[0];
    
    // Filter out nulls from processing times
    const validTimes = data.processingTimes.filter((t: any) => t !== null);
    const avgTimeMs = validTimes.length > 0 
      ? validTimes.reduce((a: number, b: number) => a + b, 0) / validTimes.length 
      : 0;
    
    // Convert Ms to Days
    const avgTimeDays = avgTimeMs / (1000 * 60 * 60 * 24);

    return {
      totalClearances: data.total,
      completionRate: data.total > 0 ? (data.completed / data.total) * 100 : 0,
      rejectionRate: data.total > 0 ? (data.rejected / data.total) * 100 : 0,
      averageProcessingTimeDays: Math.round(avgTimeDays * 10) / 10
    };
  }
}
