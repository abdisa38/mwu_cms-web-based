import Workflow, { IWorkflow, WorkflowStageStatus } from '../models/workflow.model';

export class WorkflowRepository {
  public async create(data: Partial<IWorkflow>): Promise<IWorkflow> {
    const workflow = new Workflow(data);
    return workflow.save();
  }

  public async findById(id: string): Promise<IWorkflow | null> {
    return Workflow.findById(id).populate('stages.departmentId', 'name code');
  }

  public async update(id: string, data: Partial<IWorkflow>): Promise<IWorkflow | null> {
    return Workflow.findByIdAndUpdate(id, data, { new: true });
  }

  public async updateStageStatus(
    workflowId: string, 
    stageId: string, 
    status: WorkflowStageStatus, 
    approverId: string, 
    remarks?: string
  ): Promise<IWorkflow | null> {
    return Workflow.findOneAndUpdate(
      { _id: workflowId, 'stages._id': stageId },
      {
        $set: {
          'stages.$.status': status,
          'stages.$.approverId': approverId,
          'stages.$.remarks': remarks,
          'stages.$.approvedAt': new Date()
        }
      },
      { new: true }
    );
  }
}
