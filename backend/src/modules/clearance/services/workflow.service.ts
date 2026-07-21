import { WorkflowRepository } from '../repositories/workflow.repository';
import { ClearanceRepository } from '../repositories/clearance.repository';
import { TimelineService } from './timeline.service';
import { WorkflowStageStatus } from '../models/workflow.model';
import { ClearanceStatus } from '../models/clearance.model';
import { TimelineEventType } from '../models/timeline.model';
import { BadRequestError, NotFoundError, ForbiddenError } from '../../../core/errors';

export class WorkflowService {
  private repository: WorkflowRepository;
  private clearanceRepo: ClearanceRepository;
  private timelineService: TimelineService;

  constructor() {
    this.repository = new WorkflowRepository();
    this.clearanceRepo = new ClearanceRepository();
    this.timelineService = new TimelineService();
  }

  public async getWorkflowById(id: string) {
    const workflow = await this.repository.findById(id);
    if (!workflow) throw new NotFoundError('Workflow not found');
    return workflow;
  }

  public async processDepartmentApproval(
    workflowId: string, 
    departmentId: string, 
    staffUserId: string, 
    action: 'APPROVE' | 'REJECT' | 'RETURN', 
    remarks?: string
  ) {
    const workflow = await this.getWorkflowById(workflowId);
    if (workflow.isComplete) throw new BadRequestError('Workflow is already complete');

    // Find the current stage
    const currentStage = workflow.stages.find(s => s.order === workflow.currentStageOrder);
    if (!currentStage) throw new BadRequestError('No active stage found');

    if (currentStage.departmentId._id.toString() !== departmentId) {
      throw new ForbiddenError('You are not authorized to approve the current active stage in this workflow sequence.');
    }

    let nextStatus: WorkflowStageStatus;
    let eventType: TimelineEventType;

    switch (action) {
      case 'APPROVE':
        nextStatus = WorkflowStageStatus.APPROVED;
        eventType = TimelineEventType.DEPARTMENT_APPROVED;
        break;
      case 'REJECT':
        nextStatus = WorkflowStageStatus.REJECTED;
        eventType = TimelineEventType.DEPARTMENT_REJECTED;
        break;
      case 'RETURN':
        nextStatus = WorkflowStageStatus.RETURNED;
        eventType = TimelineEventType.RETURNED;
        break;
      default:
        throw new BadRequestError('Invalid action');
    }

    // Update the specific stage
    await this.repository.updateStageStatus(workflowId, currentStage._id.toString(), nextStatus, staffUserId, remarks);

    // If approved, move to next stage or complete workflow
    if (action === 'APPROVE') {
      const nextOrder = workflow.currentStageOrder + 1;
      const totalStages = workflow.stages.length;

      if (nextOrder > totalStages) {
        // All departments approved. Pending Registrar Final Approval
        await this.repository.update(workflowId, { isComplete: true });
        // Clearance progress is 100% of departments
        await this.clearanceRepo.update(workflow.clearanceId.toString(), { progress: 100 });
      } else {
        // Move to next department
        await this.repository.update(workflowId, { currentStageOrder: nextOrder });
        const progress = Math.round((workflow.currentStageOrder / totalStages) * 100);
        await this.clearanceRepo.update(workflow.clearanceId.toString(), { progress });
      }
    } else if (action === 'REJECT') {
      // Fast fail the entire clearance
      await this.repository.update(workflowId, { isComplete: true, registrarFinalStatus: WorkflowStageStatus.REJECTED });
      await this.clearanceRepo.update(workflow.clearanceId.toString(), { status: ClearanceStatus.REJECTED });
    }

    // Record Timeline
    await this.timelineService.recordEvent(
      workflow.clearanceId.toString(),
      eventType,
      staffUserId,
      departmentId,
      remarks
    );

    return this.getWorkflowById(workflowId);
  }

  public async processRegistrarFinal(
    workflowId: string, 
    registrarUserId: string, 
    action: 'APPROVE' | 'REJECT', 
    remarks?: string
  ) {
    const workflow = await this.getWorkflowById(workflowId);
    
    // Check if all departments actually approved it
    const allApproved = workflow.stages.every(s => s.status === WorkflowStageStatus.APPROVED);
    if (!allApproved && action === 'APPROVE') {
      throw new BadRequestError('Cannot finalize approval: Not all departments have approved.');
    }

    const finalStatus = action === 'APPROVE' ? WorkflowStageStatus.APPROVED : WorkflowStageStatus.REJECTED;
    const clearanceStatus = action === 'APPROVE' ? ClearanceStatus.COMPLETED : ClearanceStatus.REJECTED;
    const eventType = action === 'APPROVE' ? TimelineEventType.REGISTRAR_APPROVED : TimelineEventType.REGISTRAR_REJECTED;

    await this.repository.update(workflowId, { 
      isComplete: true, 
      registrarFinalStatus: finalStatus 
    });

    await this.clearanceRepo.update(workflow.clearanceId.toString(), { 
      status: clearanceStatus,
      progress: 100
    });

    await this.timelineService.recordEvent(
      workflow.clearanceId.toString(),
      eventType,
      registrarUserId,
      undefined,
      remarks
    );

    // TODO: Emit Event to trigger Certificate Generation if action === APPROVE

    return this.getWorkflowById(workflowId);
  }
}
