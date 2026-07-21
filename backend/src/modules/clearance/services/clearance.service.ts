import { ClearanceRepository } from '../repositories/clearance.repository';
import { WorkflowRepository } from '../repositories/workflow.repository';
import { TimelineService } from './timeline.service';
import { CreateClearanceInput } from '../dtos/clearance.dto';
import { ClearanceType, ClearanceStatus } from '../models/clearance.model';
import { WorkflowStageStatus } from '../models/workflow.model';
import { TimelineEventType } from '../models/timeline.model';
import { BadRequestError, NotFoundError } from '../../../core/errors';
import mongoose from 'mongoose';

export class ClearanceService {
  private repository: ClearanceRepository;
  private workflowRepo: WorkflowRepository;
  private timelineService: TimelineService;

  constructor() {
    this.repository = new ClearanceRepository();
    this.workflowRepo = new WorkflowRepository();
    this.timelineService = new TimelineService();
  }

  public async initiateClearance(studentUserId: string, studentDocId: string, data: CreateClearanceInput) {
    // 1. Check if an active clearance already exists
    const hasActive = await this.repository.checkActiveClearance(studentDocId);
    if (hasActive) throw new BadRequestError('Student already has an active clearance request');

    // 2. Create the clearance shell
    const clearance = await this.repository.create({
      studentId: new mongoose.Types.ObjectId(studentDocId),
      type: data.type,
      status: ClearanceStatus.IN_PROGRESS,
      reason: data.reason,
      progress: 0
    });

    // 3. Resolve template stages based on Type (Mocked for now, assumes DB has these Dept IDs or we fetch them)
    // In production, we'd query the Department repo for "Library", "Cafe", "Faculty" IDs based on the student's program
    // For safety, I'll generate a shell workflow that expects the Registrar to assign departments, or we can use fake ObjectIds for structural testing.
    
    // Instead of hardcoding real OIDs that don't exist, we will create an empty workflow shell. 
    // Usually, a `TemplateLoaderService` would map Department codes (LIB, CAF, DOR) to ObjectIds here.
    const stages: any[] = []; 

    const workflow = await this.workflowRepo.create({
      clearanceId: clearance._id as mongoose.Types.ObjectId,
      stages: stages,
      currentStageOrder: 1,
      isComplete: stages.length === 0, // If no stages, it goes straight to Registrar
      registrarFinalStatus: WorkflowStageStatus.PENDING
    });

    // 4. Link workflow to clearance
    await this.repository.update(clearance._id.toString(), { workflowId: workflow._id as mongoose.Types.ObjectId });

    // 5. Audit Log
    await this.timelineService.recordEvent(
      clearance._id.toString(),
      TimelineEventType.CREATED,
      studentUserId,
      undefined,
      'Clearance initiated by student'
    );

    return this.getClearanceDetails(clearance._id.toString());
  }

  public async getClearanceDetails(id: string) {
    const clearance = await this.repository.findById(id);
    if (!clearance) throw new NotFoundError('Clearance not found');
    return clearance;
  }

  public async getMyClearances(studentDocId: string) {
    return this.repository.findAll({ studentId: studentDocId }, { sort: { createdAt: -1 } });
  }

  public async searchClearances(page: number = 1, limit: number = 10, filters: any = {}) {
    const skip = (page - 1) * limit;
    const [clearances, total] = await Promise.all([
      this.repository.findAll(filters, { skip, limit, sort: { createdAt: -1 } }),
      this.repository.count(filters)
    ]);
    return { clearances, meta: { page, limit, total } };
  }

  public async cancelClearance(clearanceId: string, studentUserId: string) {
    const clearance = await this.getClearanceDetails(clearanceId);
    if (clearance.status === ClearanceStatus.COMPLETED) {
      throw new BadRequestError('Cannot cancel a completed clearance');
    }

    await this.repository.update(clearanceId, { status: ClearanceStatus.CANCELLED });
    if (clearance.workflowId) {
      await this.workflowRepo.update(clearance.workflowId._id.toString(), { isComplete: true });
    }

    await this.timelineService.recordEvent(
      clearanceId,
      TimelineEventType.CANCELLED,
      studentUserId,
      undefined,
      'Clearance cancelled by user'
    );
  }
}
