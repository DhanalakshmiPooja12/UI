import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake-support-th/build/pdfmake';
import pdfFonts from 'pdfmake-support-th/build/vfs_fonts';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class PdfServiceService {
  selectlan;
  constructor() {}
  getBase64Image(img) {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL('image/png');
    return dataURL;
  }

  downloadCSV(downloadConfigration) {
    var data = downloadConfigration.resu;
    let csvContent =
      'data:text/csv;charset=utf-8,' + data.map((e) => e.join(',')).join('\n');
    /**Download Option */
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    var downloadDate = moment(new Date()).format('DD-MM-YYYY HH_mm_ss');
    link.setAttribute(
      'download',
      `${downloadConfigration.fileName}` + downloadDate + '.csv'
    );
    document.body.appendChild(link);
    link.click();
  }

  downloadExcel(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Sheet-1': worksheet },
      SheetNames: ['Sheet-1'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
}
