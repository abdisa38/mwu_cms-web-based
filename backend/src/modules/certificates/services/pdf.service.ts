import PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';

export interface CertificateData {
  certificateNumber: string;
  studentName: string;
  studentId: string;
  clearanceType: string;
  issueDate: string;
  qrCodeDataUri: string;
}

export class PDFService {
  /**
   * Generates a PDF Certificate and returns it as a Buffer
   */
  public async generateCertificatePDF(data: CertificateData): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          size: 'A4',
          layout: 'landscape',
          margin: 50
        });

        const buffers: Buffer[] = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
          const pdfBuffer = Buffer.concat(buffers);
          resolve(pdfBuffer);
        });
        doc.on('error', (err) => reject(err));

        // Background / Border
        doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke('#1c3b69');

        // Header
        doc.font('Helvetica-Bold')
           .fontSize(30)
           .fillColor('#1c3b69')
           .text('MADDA WALABU UNIVERSITY', { align: 'center' });
        
        doc.moveDown(0.5);
        doc.fontSize(20).fillColor('#333333').text('Official Clearance Certificate', { align: 'center' });
        
        doc.moveDown(2);

        // Body
        doc.font('Helvetica')
           .fontSize(16)
           .text('This is to certify that', { align: 'center' });
        
        doc.moveDown(0.5);
        doc.font('Helvetica-Bold')
           .fontSize(24)
           .fillColor('#000000')
           .text(data.studentName, { align: 'center' });
        
        doc.moveDown(0.5);
        doc.font('Helvetica')
           .fontSize(14)
           .text(`Student ID: ${data.studentId}`, { align: 'center' });
        
        doc.moveDown(1.5);
        doc.fontSize(16).text(`has successfully completed all requirements for their ${data.clearanceType} clearance.`, { align: 'center' });

        doc.moveDown(3);

        // Footer details
        doc.fontSize(12).text(`Certificate Number: ${data.certificateNumber}`, 50, doc.page.height - 120);
        doc.text(`Issue Date: ${data.issueDate}`, 50, doc.page.height - 100);

        // Signatures
        doc.text('_______________________', doc.page.width - 250, doc.page.height - 120);
        doc.text('Registrar Signature', doc.page.width - 220, doc.page.height - 100);

        // Add QR Code
        // Extract base64 payload from data URI (data:image/png;base64,...)
        const qrBase64 = data.qrCodeDataUri.split(',')[1];
        if (qrBase64) {
          const imgBuffer = Buffer.from(qrBase64, 'base64');
          doc.image(imgBuffer, 50, doc.page.height - 250, { fit: [100, 100] });
        }

        doc.end();
      } catch (err) {
        reject(err);
      }
    });
  }
}
