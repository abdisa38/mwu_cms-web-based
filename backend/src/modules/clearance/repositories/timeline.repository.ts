import Timeline, { ITimeline } from '../models/timeline.model';

export class TimelineRepository {
  public async create(data: Partial<ITimeline>): Promise<ITimeline> {
    const timeline = new Timeline(data);
    return timeline.save();
  }

  public async findByClearanceId(clearanceId: string): Promise<ITimeline[]> {
    return Timeline.find({ clearanceId })
      .populate('actorId', 'firstName lastName email')
      .populate('departmentId', 'name code')
      .sort({ createdAt: 1 }); // Chronological order
  }
}
