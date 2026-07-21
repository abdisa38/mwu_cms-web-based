import nodemailer from 'nodemailer';
import EmailQueue, { EmailStatus } from '../models/email.model';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || 'placeholder',
        pass: process.env.SMTP_PASS || 'placeholder'
      }
    });
  }

  /**
   * Pushes an email into the DB Queue.
   */
  public async queueEmail(to: string, subject: string, htmlBody: string, scheduledFor: Date = new Date()) {
    const job = new EmailQueue({
      to,
      subject,
      htmlBody,
      scheduledFor
    });
    return job.save();
  }

  /**
   * Instantly sends an email without queueing (Use sparingly)
   */
  public async sendDirectEmail(to: string, subject: string, htmlBody: string) {
    return this.transporter.sendMail({
      from: process.env.SMTP_FROM || '"MWU e-Clearance" <no-reply@mwu.edu.et>',
      to,
      subject,
      html: htmlBody
    });
  }

  /**
   * The worker process that polls the DB for pending emails and sends them.
   */
  public async processQueue(batchSize = 10) {
    const pendingEmails = await EmailQueue.find({
      status: EmailStatus.PENDING,
      scheduledFor: { $lte: new Date() },
      retryCount: { $lt: 3 }
    }).limit(batchSize);

    for (const email of pendingEmails) {
      email.status = EmailStatus.PROCESSING;
      await email.save();

      try {
        await this.sendDirectEmail(email.to, email.subject, email.htmlBody);
        email.status = EmailStatus.SENT;
        email.sentAt = new Date();
        await email.save();
      } catch (error: any) {
        email.retryCount += 1;
        email.lastError = error.message;
        email.status = email.retryCount >= email.maxRetries ? EmailStatus.FAILED : EmailStatus.PENDING;
        
        // Exponential backoff for retries (wait 5 mins per retry)
        if (email.status === EmailStatus.PENDING) {
          email.scheduledFor = new Date(Date.now() + (5 * 60000 * email.retryCount));
        }
        await email.save();
      }
    }
  }
}
