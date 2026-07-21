import { Parser } from 'json2csv';
import ExcelJS from 'exceljs';

export class ExportService {
  
  /**
   * Generates a raw CSV string from an array of objects
   */
  public generateCSV(data: any[], fields: string[]): string {
    if (!data || data.length === 0) return '';
    const json2csvParser = new Parser({ fields });
    return json2csvParser.parse(data);
  }

  /**
   * Generates a styled Excel Workbook Buffer
   */
  public async generateExcel(data: any[], columns: { header: string, key: string, width?: number }[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'MWU e-Clearance System';
    workbook.created = new Date();

    const sheet = workbook.addWorksheet('Report');

    sheet.columns = columns.map(col => ({
      header: col.header,
      key: col.key,
      width: col.width || 20
    }));

    // Add rows
    sheet.addRows(data);

    // Style the header row
    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1C3B69' } // MWU Blue
    };

    // Return as buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer as Buffer;
  }
}
