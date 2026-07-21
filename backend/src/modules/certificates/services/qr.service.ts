import QRCode from 'qrcode';

export class QRService {
  /**
   * Generates a QR Code as a base64 data URI
   * @param data The data to encode (e.g., verification URL)
   */
  public async generateQRCode(data: string): Promise<string> {
    try {
      const qrDataUrl = await QRCode.toDataURL(data, {
        errorCorrectionLevel: 'H',
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      return qrDataUrl;
    } catch (error) {
      throw new Error('Failed to generate QR Code');
    }
  }
}
