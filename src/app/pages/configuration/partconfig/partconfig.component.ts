import {
  Component,
  OnInit,
  TemplateRef,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { DataService } from 'src/app/shared/data.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ToastrService } from 'ngx-toastr';
import { PdfServiceService } from 'src/app/shared/pdf-service.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-partconfig',
  templateUrl: './partconfig.component.html',
  styleUrls: ['./partconfig.component.scss'],
})
export class PartconfigComponent implements OnInit {
  @ViewChild('inputFile', { static: false }) inputFile: ElementRef;

  @ViewChild('widgetEditorModal') public widgetEditorModal: TemplateRef<any>;
  private widgetEditorDialogRef: MatDialogRef<TemplateRef<any>>;
  name = 'Angular';
  isModalOpen = false;
  action: any;
  filterTerm: string;
  updatePartId: any;
  partId: any;
  partName: any;
  programName: any;
  programNumber: any;
  stageNo: any;
  runningTime: any;
  handlingTime: any;
  totalcycleTime: number;
  mainData: any;
  getArr: any = [];
  cycleTimes: any = [];
  downloadReportFlag = 1;
  currentPage = 1;
  itemsPerPage = 6;
  maxSize: number;
  paginateData: any = [];
  key = 'PartConfig';
  permission: any;
  partconfigPermission: any;
  constructor(
    private modalService: NgbModal,
    public dialog: MatDialog,
    private dataService: DataService,
    private PdfServiceService: PdfServiceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.permission = JSON.parse(sessionStorage.getItem('permissions'));
    this.partconfigPermission = this.permission[this.key];
    this.getPart();
  }
  loadPage() {
    this.paginateData = this.mainData.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage
    );
  }
  getPart() {
    this.dataService.get(`config/cycletime`).subscribe((res) => {
      if (res && res['result']) {
        let indexVal = 0;
        res['result'].map((val) => {
          indexVal++;
          val['index'] = indexVal;
        });
      }
      this.mainData = res['result'];
      this.loadPage();
      this.maxSize = this.mainData.length;
    });
  }
  openWidgetEditorDialog(templateAdd: any, data: any, act: any) {
    if (this.widgetEditorDialogRef) {
      return;
    }
    this.action = act;
    this.updatePartId = data.partId;

    if (data) {
      this.partId = data.partId;
      this.partName = data.partName;
      this.programName = data.programName;
      this.programNumber = data.programNumber;
      this.stageNo = data.stageNo;
      this.runningTime = data.runningTime;
      this.handlingTime = data.handlingTime;
      this.totalcycleTime = data.totalcycleTime;
    } else {
      this.partId = '';
      this.partName = '';
      this.programName = '';
      this.programNumber = '';
      this.stageNo = '';
      this.runningTime = '';
      this.handlingTime = '';
      this.totalcycleTime = 0;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.role = 'dialog';
    dialogConfig.width = '600px';
    dialogConfig.minHeight = '100px';
    dialogConfig.maxHeight = '86vh';
    dialogConfig.position = { top: '7vh' };
    dialogConfig.autoFocus = false;

    this.widgetEditorDialogRef = this.dialog.open(templateAdd, dialogConfig);
    this.widgetEditorDialogRef.afterOpened().subscribe((result) => {
      this.isModalOpen = true;
    });

    this.widgetEditorDialogRef
      .afterClosed()
      .pipe(finalize(() => (this.widgetEditorDialogRef = undefined)))
      .subscribe((result) => {
        this.isModalOpen = false;
      });
  }
  addTotalTime(field, value) {
    this.totalcycleTime = this.runningTime * 1 + this.handlingTime * 1;
  }
  save() {
    this.getArr = {
      partId: this.partId,
      partName: this.partName,
      programName: this.programName,
      programNumber: this.programNumber,
      stageNo: this.stageNo,
      runningTime: this.runningTime,
      handlingTime: this.handlingTime,
      totalcycleTime: this.totalcycleTime,
    };


    if (this.action == 'Add') {
      this.dataService.post('config/cycletime', this.getArr).subscribe(
        (res) => {
          this.toastr.success(' Successfully Added');
          this.getPart();
        },
        (error) => {
          this.toastr.error(error.error['message']);
        }
      );
    }
     else {
      this.dataService
        .put('config/cycletime/' + this.updatePartId, this.getArr)
        .subscribe((res) => {
          this.toastr.success('Successfully Updated');
          this.getPart();
        });
        (error) => {
          this.toastr.error('Data Already Exist');
        } 
    }
    this.modalService.dismissAll();
  }
  deletePart() {
    this.dataService
      .delete('config/cycletime/' + this.updatePartId)
      .subscribe((res) => {
        this.toastr.success('Successfully Deleted');
        this.getPart();
      });
  }
  partIdSelect(e) {
    this.partId = e;
  }
  partNameSelect(e) {
    this.partName = e;
  }
  programNameSelect(e) {
    this.programName = e;
  }
  programNumberSelect(e) {
    this.programNumber = e;
  }
  stageNoSelect(e) {
    this.stageNo = e;
  }
  runningTimeSelect(e) {
    this.runningTime = e;
  }
  handlingTimeSelect(e) {
    this.handlingTime = e;
  }
  cancel() {
    this.partId = '';
    this.partName = '';
    this.programName = '';
    this.programNumber = '';
    this.stageNo = '';
    this.runningTime = '';
    this.handlingTime = '';
    this.totalcycleTime = 0;
    this.modalService.dismissAll();
  }
  selectedPdfOptions(value) {
    this.downloadReportFlag = value;
  }

  export() {
    // if (this.downloadReportFlag == 1) {
    this.downloadExcel();
    // }
  }
  isExcelFile: boolean = true;
  showSave: boolean = false;

  excelData;
  onChange(evt) {
    const target: DataTransfer = <DataTransfer>evt.target;
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = '';
    }
    if (this.isExcelFile) {
      let workBook = null;
      let jsonData = null;
      this.excelData = [];
      const reader = new FileReader();
      const file = target.files[0];
      reader.onload = (event) => {
        workBook = XLSX.read(reader.result, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        this.excelData.push(jsonData);
        if (this.excelData.length) {
          this.showSave = true;
        } else {
          this.showSave = false;
        }
      };

      reader.readAsBinaryString(file);
    }
  }
  
  saveExcel() {
    this.dataService.post(`config/excelUploads/`, this.excelData).subscribe(
      (data) => {
        this.getPart();
        this.inputFile.nativeElement.value = '';
        this.showSave = false;
        this.toastr.success('Added Successfully', 'Cycletime');
      },
      (error) => {
        this.toastr.error('Add Failed!', 'Cycletime');
      }
    );
  }
  downloadExcel() {
    var data;
    let downloadData = [];
    if (this.mainData.length) {
      data = this.mainData;
      this.mainData.map((e) => {
        downloadData.push({
          'Part ID': e.partId,
          'Part Name': e.partName,
          'Program Name': e.programName,
          'Program Number': e.programNumber,
          'Stage No': e.stageNo,
          'Running Time': e.runningTime,
          'Handling Time': e.handlingTime,
          'Total CycleTime': e.totalcycleTime,
        });
      
      });
     
      this.PdfServiceService.downloadExcel(downloadData, 'CycleTime');
    } else {
      this.toastr.error('There is No data to Download');
    }
  }
}
