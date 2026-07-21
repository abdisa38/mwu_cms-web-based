import cron from 'node-cron';
import { EmailService } from '../../modules/communication/emails/services/email.service';

const emailService = new EmailService();

export class JobScheduler {
  
  public start() {
    console.log('Background Job Scheduler started...');

    // Run every 1 minute
    cron.schedule('* * * * *', async () => {
      try {
        await emailService.processQueue();
      } catch (error) {
        console.error('Error processing email queue in background job:', error);
      }
    });

    // Run every night at midnight to clear temporary files or handle daily metrics (example hook)
    cron.schedule('0 0 * * *', async () => {
      console.log('Running daily midnight cleanup/metrics jobs...');
      // Logic for cleanup or snapshotting analytics can go here in the future
    });
  }
}
