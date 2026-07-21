import { Request, Response, NextFunction } from 'express';
import { WorkflowService } from './services/workflow.service';
import { ProcessWorkflowDto } from './dtos/workflow.dto';

const workflowService = new WorkflowService();

export class WorkflowController {
  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const workflow = await workflowService.getWorkflowById(req.params.id);
      res.status(200).json({ success: true, data: workflow });
    } catch (error) {
      next(error);
    }
  }

  public async processDepartmentApproval(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const validated = ProcessWorkflowDto.parse(req.body);
      
      if (!validated.departmentId) {
        return res.status(400).json({ success: false, message: 'Department ID is required for department approval' });
      }

      const workflow = await workflowService.processDepartmentApproval(
        req.params.id,
        validated.departmentId,
        userId,
        validated.action,
        validated.remarks
      );
      
      res.status(200).json({ success: true, data: workflow });
    } catch (error) {
      next(error);
    }
  }

  public async processRegistrarFinal(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const validated = ProcessWorkflowDto.parse(req.body);

      const workflow = await workflowService.processRegistrarFinal(
        req.params.id,
        userId,
        validated.action as 'APPROVE' | 'REJECT',
        validated.remarks
      );
      
      res.status(200).json({ success: true, data: workflow });
    } catch (error) {
      next(error);
    }
  }
}
