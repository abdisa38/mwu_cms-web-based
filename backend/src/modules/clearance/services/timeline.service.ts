import { TimelineRepository } from '../repositories/timeline.repository';
import { TimelineEventType } from '../models/timeline.model';
import mongoose from 'mongoose';

export class TimelineService {
  private repository: TimelineRepository;

  constructor() {
    this.repository = new TimelineRepository();
  }

  public async recordEvent(
    clearanceId: string, 
    eventType: TimelineEventType, 
    actorId: string, 
    departmentId?: string, 
    comment?: string
  ) {
    const data: any = {
      clearanceId: new mongoose.Types.ObjectId(clearanceId),
      eventType,
      actorId: new mongoose.Types.ObjectId(actorId),
      comment
    };

    if (departmentId) {
      data.departmentId = new mongoose.Types.ObjectId(departmentId);
    }

    return this.repository.create(data);
  }

  public async getClearanceTimeline(clearanceId: string) {
    return this.repository.findByClearanceId(clearanceId);
  }
}
