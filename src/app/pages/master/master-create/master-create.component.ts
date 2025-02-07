import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import * as momenttz from 'moment-timezone';

interface TableHeader {
  header: string;
  subheaders: string[];
}

@Component({
  selector: 'app-master-create',
  templateUrl: './master-create.component.html',
  styleUrls: ['./master-create.component.scss'],
})
export class MasterCreateComponent implements OnInit {
  @ViewChild('widgetEditorModal') public widgetEditorModal: TemplateRef<any>;
  private widgetEditorDialogRef: MatDialogRef<TemplateRef<any>>;
  isModalOpen = false;
  nosubheader = [];
  actionPage = 'create';
  MasterName: any;
  tempName: any = '';
  plant: any;
  zone: any;
  shift: any;
  machine: any;
  plantName: any = '';
  shiftName: any = '';
  machineName: any;
  dName: any = '';
  customBool: boolean = false;
  finalArr: any;
  selectTempname: any;
  role: any;
  approvalList: any = [];
  masterArr: any = {};
  tempArray: any = [];
  fileToUpload: any;
  imageUrl: any;
  rows: any = [];
  subrows: any = [];
  showEditable: boolean = false;
  editRowId: any;
  addData: any;
  master: any = [];
  imageUrlInput;
  period = [];
  periodcheck;
  sudAdd;
  metadataAdd;
  colsubrows: any = [];
  footerData: any = [];
  footerDaily: any = [];
  colsubsecRows: any = [];
  subCol;
  subsecCol: any = [];
  metadata: any = [];
  metadatarow: any = [];
  masterimageArr: any = [];
  masterHeader: any = [];
  masterBody: any = [];
  masterFooter: any = [];
  masterInstruction: any = [];
  lastMasterArray: any = [];
  mainHeader;
  subHeader;
  subSecHeader;
  mainData;
  subsecColpush = [];
  url: any;
  format: any;
  masterNameCopy;
  mData;
  metaMasterCheck;
  submetaMasterCheck;
  headMasterCheck;
  subheadMasterCheck;
  footerCheck;
  approvalheadMasterCheck;
  metaMasterMarked: boolean = false;
  submetaMasterMarked: boolean = false;
  headMasterMarked: boolean = false;
  subheadMasterMarked: boolean = false;
  footerMasterMarked: boolean = false;
  approvalMasterMarked: boolean = false;
  department: any;
  action;
  subHeaderMain: any = [];
  subHeaderLen: any;
  subHbool: boolean = false;
  pdf: any;
  footer: any = [];
  footerTitle: any;
  part: any;
  PartId: any;
  subArray: string[] = [];
  pdfBool: boolean = false;
  addData1: any = [];
  subHbool1: boolean = false;
  display: FormControl = new FormControl('', Validators.required);
  file_store: FileList;
  file_list: Array<string> = [];
  uploadData: any;
  urlData: any = [];
  data: any;
  imageName: any;
  mapValue: any;
  fieldApproval: any;
  mapDatapush: any = [];
  imageDisplay: any;
  mainDataCopy: any;
  mainCopybool: boolean = false;
  approvalBool: boolean = false;
  approvalListCopy: any;
  section: any;
  createdBy: any = '';
  masterName: String = '';
  toolTipData: any;
  getToolTip: any;
  periodicSchedule: any;
  localPermission;
  imageBool: boolean = false;
  dar: any = new Map();
  currentMonth: any;
  currentYear: any;
  today: any;
  date: any;
  options: any;
  dateFormat: any;
  thresholdType = ['Upperlimit/Lowerlimit', 'In Between', 'Text Area'];
  units = ['kg/cm²', 'degrees', '%', 'mm', 'mm A'];
  thresType: any;
  limitFlag: boolean[] = [false];
  betweenFlag: boolean[] = [false];
  textFlag: boolean[] = [false];
  thresSelectFlag: boolean[] = [false];
  // thresholdSubFlag:boolean = false
  footerInstruction: any;
  thresholdSubFlag: boolean[] = [false];
  actualValue: any = [];
  thresholdValue: any = [];
  actualValue1: any = [];
  thresholdValue1: any = [];
  Specification: any = [];
  thresValue: any = [];
  thres: any = [];
  selectedUnit: any = [];
  copyBool: boolean = false;
  probFootArr: any = [];
  revisionDateData: any;
  revisionNOData: any;
  formatData: any;
  problemFooter: any;
  shiftNote: any;
  shiftData: any;
  currentDate: any;
  configOperation: any;
  partPush: any = [];
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private dataService: DataService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createdBy = sessionStorage.getItem('user');
    this.localPermission = sessionStorage.getItem('role');
    this.getData();
    this.roleData();
    this.getMasterData();
    this.currentMonth = momenttz().format('MMMM');
    this.currentYear = momenttz().format('YYYY');
    this.today = momenttz().format('DD/MM/YYYY');
  }

  openWidgetEditorDialog(template: any, data: any, act: any) {
    if (this.widgetEditorDialogRef) {
      return;
    }
    this.action = act;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.role = 'dialog';
    dialogConfig.width = '400px';
    dialogConfig.minHeight = '100px';
    dialogConfig.maxHeight = '86vh';
    dialogConfig.position = { top: '7vh' };
    dialogConfig.autoFocus = false;

    this.widgetEditorDialogRef = this.dialog.open(template, dialogConfig);

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
  selectedJIndex;
  thresval;
  unit;
  value;
  openThresholdDialog(template: any, i: any, j: any) {
    this.selectedJIndex = j;
    if (this.widgetEditorDialogRef) {
      return;
    }
    // this.jVal = i
    if (this.subHbool == true) {
      this.addData.map((val, j) => {
        if (val.threshold == 'true') {
          for (let i = 0; i < this.rows.length; i++) {
            if (
              this.rows[i][`csName!@#%!$${j}`] == '' ||
              this.rows[i][`csName!@#%!$${j}`] == undefined
            ) {
              this.limitFlag[i] = false;
              this.betweenFlag[i] = false;
              this.textFlag[i] = false;
              this.thresSelectFlag[i] = false;
              this.actualValue = [];
              this.thresholdValue = [];
              this.actualValue1 = [];
              this.thresholdValue1 = [];
              this.Specification = [];
              this.thresval = '';
              this.unit = '';
            } else {
              if (
                this.rows[i][`csName!@#%!$${j}`].includes('±') &&
                this.selectedJIndex == i
              ) {
                this.limitFlag[i] = true;
                this.thresSelectFlag[i] = true;
                this.thresval = this.thresholdType[0];
                (this.unit = this.rows[i][`csName!@#%!$${j}`]
                  .trim()
                  .split(/\d+/g)
                  .filter((n) => n)
                  .pop()
                  .trim()),
                  (this.value = this.rows[i][`csName!@#%!$${j}`]
                    .trim()
                    .split(this.unit)
                    .filter((n) => n)[0]
                    .trim());
                let splitData = this.value.split('±');
                this.actualValue[i] = splitData[0].trim();
                this.thresholdValue[i] = splitData[1].trim();
              } else if (
                this.rows[i][`csName!@#%!$${j}`].includes('-') &&
                this.selectedJIndex == i
              ) {
                this.betweenFlag[i] = true;
                this.thresSelectFlag[i] = true;
                this.thresval = this.thresholdType[1];
                (this.unit = this.rows[i][`csName!@#%!$${j}`]
                  .trim()
                  .split(/\d+/g)
                  .filter((n) => n)
                  .pop()
                  .trim()),
                  (this.value = this.rows[i][`csName!@#%!$${j}`]
                    .trim()
                    .split(this.unit)
                    .filter((n) => n)[0]
                    .trim());
                let splitData = this.value.split('-');
                this.actualValue1[i] = splitData[0].trim();
                this.thresholdValue1[i] = splitData[1].trim();
              } else if (this.selectedJIndex == i) {
                this.textFlag[i] = true;
                this.thresSelectFlag[i] = false;
                this.thresval = this.thresholdType[2];
                this.unit = '';
                this.Specification[i] = this.rows[i][`csName!@#%!$${j}`];
              }
            }
          }
        }
      });
    } else {
      this.addData1.map((val) => {
        if (val.threshold == 'true') {
          for (let i = 0; i < this.rows.length; i++) {
            if (
              this.rows[i][val.cName] == undefined ||
              this.rows[i][val.cName] == ''
            ) {
              this.limitFlag[i] = false;
              this.betweenFlag[i] = false;
              this.textFlag[i] = false;
              this.thresSelectFlag[i] = false;
              this.actualValue = [];
              this.thresholdValue = [];
              this.actualValue1 = [];
              this.thresholdValue1 = [];
              this.Specification = [];
              this.thresval = '';
              this.unit = '';
            } else {
              if (
                this.rows[i][val.cName].includes('±') &&
                this.selectedJIndex == i
              ) {
                this.limitFlag[i] = true;
                this.thresSelectFlag[i] = true;
                this.thresval = this.thresholdType[0];
                (this.unit = this.rows[i][val.cName]
                  .trim()
                  .split(/\d+/g)
                  .filter((n) => n)
                  .pop()
                  .trim()),
                  (this.value = this.rows[i][val.cName]
                    .trim()
                    .split(this.unit)
                    .filter((n) => n)[0]
                    .trim());
                let splitData = this.value.split('±');
                this.actualValue[i] = splitData[0].trim();
                this.thresholdValue[i] = splitData[1].trim();
              } else if (
                this.rows[i][val.cName].includes('-') &&
                this.selectedJIndex == i
              ) {
                this.betweenFlag[i] = true;
                this.thresSelectFlag[i] = true;
                this.thresval = this.thresholdType[1];
                (this.unit = this.rows[i][val.cName]
                  .trim()
                  .split(/\d+/g)
                  .filter((n) => n)
                  .pop()
                  .trim()),
                  (this.value = this.rows[i][val.cName]
                    .trim()
                    .split(this.unit)
                    .filter((n) => n)[0]
                    .trim());
                let splitData = this.value.split('-');
                this.actualValue1[i] = splitData[0].trim();
                this.thresholdValue1[i] = splitData[1].trim();
              } else if (this.selectedJIndex == i) {
                this.textFlag[i] = true;
                this.thresSelectFlag[i] = false;
                this.thresval = this.thresholdType[2];
                this.unit = '';
                this.Specification[i] = this.rows[i][val.cName];
              }
            }
          }
        }
      });
    }
    this.thresValue = [];
    const dialogConfig = new MatDialogConfig();
    dialogConfig.role = 'dialog';
    dialogConfig.width = '650px';
    dialogConfig.minHeight = '100px';
    dialogConfig.maxHeight = '86vh';
    dialogConfig.position = { top: '7vh' };
    dialogConfig.autoFocus = false;

    this.widgetEditorDialogRef = this.dialog.open(template, dialogConfig);

    this.widgetEditorDialogRef.afterOpened().subscribe((result) => {
      this.isModalOpen = true;
    });

    this.widgetEditorDialogRef
      .afterClosed()
      .pipe(finalize(() => (this.widgetEditorDialogRef = undefined)))
      .subscribe((result) => {
        this.isModalOpen = false;
      });
    // this.saveThreshold(i,j)
  }
  togglemetaMasterCheck(e) {
    this.metaMasterMarked = e.target.checked;
  }
  togglesubmetaMasterCheck(e) {
    this.submetaMasterMarked = e.target.checked;
  }
  toggleheadMasterCheck(e) {
    this.headMasterMarked = e.target.checked;
  }
  togglesubheadMasterCheck(e) {
    this.subheadMasterMarked = e.target.checked;
  }
  toggleapprovalMasterCheck(e) {
    this.approvalMasterMarked = e.target.checked;
  }
  togglefooterMaster(e) {
    this.footerMasterMarked = e.target.checked;
  }

  getMasterData() {
    this.dataService.get('masterData/master').subscribe((res) => {
      this.master = res['result'];
    });
    // this.dataService.get('config/tooltip').subscribe((res) => {
    //   this.getToolTip = res['result'];
    // });
  }
  // dataCh(data,i,j,name) {

  //   this.dar.set(name,data.target.value)
  //    this.rows[j]=this.dar;
  //   }

  CopyMaster(e) {
    this.dataService.get('masterData/master/' + e).subscribe((res) => {
      this.mData = res['result'];
      this.tempName = this.mData[0].Tempname;
      this.copyBool = true;
      if (this.mData[0].approval) {
        this.approvalBool = true;
        this.approvalListCopy = this.mData[0].approval;
      }
      this.PartId = this.mData[0].PartId;
      if (this.mData[0].mainData) {
        this.mainCopybool = true;
        this.mainDataCopy = this.mData[0].mainData;
      }
      this.footerData = this.mData[0].footer;
      this.formatData = this.mData[0]['formatData'];
      this.revisionNOData = this.mData[0]['revisionNOData'];
      this.revisionDateData = this.mData[0]['revisionDateData'];
      this.currentDate = this.mData[0]['currentDate'];
      this.shiftData = this.mData[0]['shiftData'];
      this.shiftNote = this.mData[0]['shiftNote'];
      this.fieldSelect(this.tempName);
      this.probFootArr = this.mData[0].problemFooter;
      this.plantName = this.mData[0].plantName;
      // this.dName = this.mData[0].dName;
      this.shiftName = this.mData[0].shiftName;
      this.machineName = this.mData[0].machineName;
      this.rows = this.mData[0].column;
      this.metadatarow = this.mData[0].metadata;
      this.subrows = this.mData[0].subMetdata;
      this.colsubrows = this.mData[0].subColumns;
      this.colsubsecRows = this.mData[0].subColsec;
      this.mainHeader = this.mData[0].mainHeader;
      this.subHeader = this.mData[0].subHeader;
      this.subSecHeader = this.mData[0].subSecHeader;
      this.footerTitle = this.mData[0].footerTitle;
      this.footerData = this.mData[0].footer;
      this.footerInstruction = this.mData[0].footerInstruction;

      // if (this.mData[0].pdf.length) {
      //   this.pdfBool = true;
      this.pdf = this.mData[0].pdf;
      if (this.pdf?.length) {
        this.pdfBool = true;
      } else {
        this.pdfBool = false;
      }
      this.imageDisplay = this.mData[0].imageDisplay;
      // }

      this.modalService.dismissAll();
    });
  }

  openModal(template: any, data: any, act: any) {
    this.modalService.open(template, {
      size: 'md',
      backdrop: false,
      centered: true,
    });
  }

  cancel() {
    this.modalService.dismissAll();
  }

  getData() {
    this.dataService
      .get('checklist/template?type=dropdown')
      .subscribe((res) => {
        this.finalArr = res['result'];
        this.getShift();
        this.getPlant();
        this.getDepartment();
        this.getPart();
        this.getOperation();
      });
  }

  getShift() {
    this.dataService.get('config/shift').subscribe((res) => {
      this.shift = res['result'];
    });
  }

  getPlant() {
    this.dataService.get('config/plant').subscribe((res) => {
      this.plant = res['result'];
      this.getMachine();
      this.getZone();
    });
  }

  getMachine() {
    this.dataService.get('config/machine').subscribe((res) => {
      this.machine = res['result'];
    });
  }

  getDepartment() {
    this.dataService.get('config/department').subscribe((res) => {
      this.department = res['result'];
    });
  }
  getZone() {
    this.dataService.get('config/zone').subscribe((res) => {
      this.zone = res['result'];
    });
  }
  getPart() {
    this.dataService.get(`config/cycletime`).subscribe((res) => {
      if (res) {
        this.part = res['result'];
      }
    });
  }
  getOperation() {
    this.dataService.get('config/operationProcess').subscribe((res) => {
      this.configOperation = res['result'];
      this.configOperation.forEach((val) => {
        this.part.forEach((e) => {
          if (val.partName == e.partName) {
            this.uniquePart.push({ partName: e.partName, partId: e.partId });
            console.log(this.uniquePart, 'partNameee');
          }
        });

        console.log(this.partPush, 'Operation');
      });
    });
  }
  uniqueItems: any = [];
  partValue: any = [];
  uniqueOP: any = [];
  uniquePart: any = [];
  uniqueId: any = [];
  response: boolean = false;
  getDataValue(e) {
    console.log(e, 'sdcfvcx');
  }
  getval(val: any, type, i, headerName) {
    let arr = [];
    let arrPart = [];
    if (val == 'Plant') {
      this.plant?.forEach((e, i) => {
        arr.push(e.plantName);
      });
    } else if (val == 'Zone') {
      this.zone?.forEach((e) => {
        arr.push(e.zoneName);
      });
    } else if (val == 'Machine') {
      this.machine?.forEach((e) => {
        arr.push(e.machineName);
      });
    } else if (val == 'partName') {
      arr = [];
      this.uniquePart?.forEach((e) => {
        this.uniqueItems.push(e.partName);
        arr = Array.from(new Set(this.uniqueItems));
      });
    } else if (val == 'partId') {
      if (this.response == true) {
        arr = [];
        this.uniqueId = [];
        this.partValue.forEach((val) => {
          this.uniquePart?.forEach((e) => {
            if (e.partName == val.partName) {
              this.uniqueId.push(e.partId);
              arr = Array.from(new Set(this.uniqueId));
            }
          });
        });
      } else {
        arr = ['No Part Id Configured'];
      }
    } else if (val == 'ShiftName') {
      this.shift?.forEach((e) => {
        arr.push(e.name);
      });
    } else if (val == 'Operation') {
      if (this.response == true) {
        arr = [];
        this.uniqueOP = [];
        this.partValue.forEach((e) => {
          this.uniqueOP.push(e.operationName);
          arr = Array.from(new Set(this.uniqueOP));
        });
      } else {
        arr = ['No Operation Configured'];
      }
    }
    this.toolTip(type, i, headerName);
    return arr;
  }
  dropDown(val, e, name) {
    if (val == 'partName') {
      this.partValue = [];
    }
    this.configOperation.forEach((val) => {
      if (e == val.partName) {
        this.response = true;
        this.partValue.push({
          partId: val.partId,
          partName: e,
          operationName: val.operationName,
        });
      }
    });
    console.log(this.partValue, 'partValuepartValuepartValue');
  }
  headerData;
  shiftvalue;
  fieldSelect(e) {
    this.rows = [];
    // this.subrows = [];
    this.tempArray = [];
    this.addData = [];
    this.subHeaderMain = [];
    this.selectTempname = e;
    this.dataService.get('checklist/template/' + e).subscribe((res) => {
      this.tempArray = res['result'];
      // this.partId = this.tempArray[0]['PartId'];
      this.addData = this.tempArray[0]['columns'].map((val) => {
        val['cName'] = [val.cName];
        return val;
      });
      this.periodicSchedule = this.tempArray[0]['periodicSchedule'];
      this.sudAdd = this.tempArray[0]['subMetdata'];
      this.subCol = this.tempArray[0]['subColumns'];
      this.subsecCol = this.tempArray[0]['subColsec'];
      this.metadataAdd = this.tempArray[0]['metadata'];
      this.mainHeader = this.tempArray[0]['mainHeader'];
      this.subHeader = this.tempArray[0]['subHeader'];
      this.subSecHeader = this.tempArray[0]['subSecHeader'];
      this.mainData = this.tempArray[0]['mainData'];
      this.footerTitle = this.tempArray[0]['footerTitle'];
      this.footer = this.tempArray[0]['footer'];
      if (!this.copyBool) {
        this.formatData = this.tempArray[0]['formatData'];
        this.revisionNOData = this.tempArray[0]['revisionNOData'];
        this.revisionDateData = this.tempArray[0]['revisionDateData'];
        this.currentDate = this.tempArray[0]['currentDate'];
        this.shiftData = this.tempArray[0]['shiftData'];
      }
      this.shiftNote = this.tempArray[0]['shiftNote'];
      this.problemFooter = this.tempArray[0]['problemFooter'];
      this.shiftNote = this.tempArray[0]['shiftNote'];
      if (
        this.tempArray[0]['shiftName'] &&
        this.tempArray[0]['shiftName'] != ''
      ) {
        this.shiftData[0]['shiftValue'] = this.tempArray[0]['shiftName'];
        this.shiftvalue = this.tempArray[0]['shiftName'];
      }

      if (this.periodicSchedule == 'Daily' && !this.copyBool) {
        const daysInCurrentMonth = momenttz.tz().daysInMonth();
        for (let i = 1; i <= daysInCurrentMonth; i++) {
          this.footerData.push({ day: 'Day-' + i });
        }
      }
      this.pdf = this.tempArray[0]['pdf'];
      if (this.pdf?.length) {
        this.pdfBool = true;
      } else {
        this.pdfBool = false;
      }
      this.approvalList = this.tempArray[0]['approval'];
      this.createdBy = this.createdBy;
      this.addData.forEach((e, index) => {
        if (e.subheader) {
          this.subHbool = true;
          if (e.threshold == 'true') {
            this.thresholdSubFlag[index] = true;
          } else {
            this.thresholdSubFlag[index] = false;
          }
          this.subHeaderLen = e.subheader.length;
          e.subheader.forEach((a) => {
            this.subHeaderMain.push(a);
          });
        } else {
          this.subHbool1 = true;
          this.addData1.push(e);
        }
      });

      this.mainData.map((val) => {
        if (val['pageFill'] == 'master' && val['dateFormat']) {
          if (val['dateFormat'] == 'month') {
            val['mvalue'] = this.currentMonth;
          } else if (val['dateFormat'] == 'year') {
            val['mvalue'] = this.currentYear;
          } else if (val['dateFormat'] == 'all') {
            val['mvalue'] = this.today;
          }
        }
      });
      this.currentDate.map((val) => {
        if (val['pageFillDate'] == 'master' && val['dateAutoFill']) {
          if (val['dateAutoFill'] == 'month') {
            val['dateValue'] = this.currentMonth;
          } else if (val['dateAutoFill'] == 'year') {
            val['dateValue'] = this.currentYear;
          } else if (val['dateAutoFill'] == 'all') {
            val['dateValue'] = this.today;
          }
        }
      });
    });
    this.customBool = true;
    this.roleData();
  }
  selectThresholdType(e, i) {
    this.thresSelectFlag[i] = true;
    this.thresType = e.value;
    if (this.thresType == this.thresholdType[0]) {
      this.limitFlag[i] = true;
      this.betweenFlag[i] = false;
      this.textFlag[i] = false;
    } else if (this.thresType == this.thresholdType[1]) {
      this.betweenFlag[i] = true;
      this.limitFlag[i] = false;
      this.textFlag[i] = false;
    } else if (this.thresType == this.thresholdType[2]) {
      this.textFlag[i] = true;
      this.limitFlag[i] = false;
      this.betweenFlag[i] = false;
      this.thresSelectFlag[i] = false;
    }
  }
  saveThreshold(index) {
    this.thresValue = [];
    if (this.subHbool == true) {
      if (this.limitFlag[index] == true) {
        this.thresValue[index] =
          this.actualValue[index] +
          ' ± ' +
          this.thresholdValue[index] +
          ' ' +
          this.selectedUnit[index];
        this.addData.map((val, j) => {
          // this.thresValue[j] = thres
          if (val.threshold == 'true') {
            for (let i = 0; i < this.rows.length; i++) {
              // if (this.rows[i][`csName!@#%!$${j}`] == undefined) this.rows[i][`csName!@#%!$${j}`] = ""
              if (index == i) {
                if (
                  this.rows[i][`csName!@#%!$${j}`] == '' ||
                  this.rows[i][`csName!@#%!$${j}`] == undefined
                ) {
                  this.rows[i][`csName!@#%!$${j}`] = this.thresValue[index];
                } else {
                  this.rows[i][`csName!@#%!$${j}`] = this.thresValue[index];
                }
              }
            }
          }
        });
      } else if (this.betweenFlag[index] == true) {
        this.thresValue[index] =
          this.actualValue1[index] +
          ' - ' +
          this.thresholdValue1[index] +
          ' ' +
          this.selectedUnit[index];
        this.addData.map((val, j) => {
          // this.thresValue[j] = this.thres[i]
          if (val.threshold == 'true') {
            for (let i = 0; i < this.rows.length; i++) {
              // if (this.rows[i][`csName!@#%!$${j}`] == undefined) this.rows[i][`csName!@#%!$${j}`] = ""
              if (index == i) {
                if (
                  this.rows[i][`csName!@#%!$${j}`] == '' ||
                  this.rows[i][`csName!@#%!$${j}`] == undefined
                ) {
                  this.rows[i][`csName!@#%!$${j}`] = this.thresValue[index];
                } else {
                  this.rows[i][`csName!@#%!$${j}`] = this.thresValue[index];
                }
              }
            }
          }
        });
      } else if (this.textFlag[index] == true) {
        this.addData.map((val, j) => {
          // this.thresValue[i] = this.Specification[i];
          // this.thresValue[j] = this.thres[i]
          if (val.threshold == 'true') {
            for (let i = 0; i < this.rows.length; i++) {
              // if (this.rows[i][`csName!@#%!$${j}`] == undefined) this.rows[i][`csName!@#%!$${j}`] = ""
              if (index == i) {
                if (
                  this.rows[i][`csName!@#%!$${j}`] == '' ||
                  this.rows[i][`csName!@#%!$${j}`] == undefined
                ) {
                  this.rows[i][`csName!@#%!$${j}`] = this.Specification[index];
                } else {
                  this.rows[i][`csName!@#%!$${j}`] = this.Specification[index];
                }
              }
            }
          }
        });
      }
    } else {
      if (this.limitFlag[index] == true) {
        this.thresValue[index] =
          this.actualValue[index] +
          ' ± ' +
          this.thresholdValue[index] +
          ' ' +
          this.selectedUnit[index];
        this.addData1.map((val) => {
          if (val.threshold == 'true') {
            for (let i = 0; i < this.rows.length; i++) {
              if (index == i) {
                if (
                  this.rows[i][val.cName] == '' ||
                  this.rows[i][val.cName] == undefined
                ) {
                  this.rows[i][val.cName] = this.thresValue[index];
                } else {
                  this.rows[i][val.cName] = this.thresValue[index];
                }
              }
            }
          }
        });
      } else if (this.betweenFlag[index] == true) {
        this.thresValue[index] =
          this.actualValue1[index] +
          ' - ' +
          this.thresholdValue1[index] +
          ' ' +
          this.selectedUnit[index];
        this.addData1.map((val) => {
          if (val.threshold == 'true') {
            for (let i = 0; i < this.rows.length; i++) {
              if (index == i) {
                if (
                  this.rows[i][val.cName] == '' ||
                  this.rows[i][val.cName] == undefined
                ) {
                  this.rows[i][val.cName] = this.thresValue[index];
                } else {
                  this.rows[i][val.cName] = this.thresValue[index];
                }
              }
            }
          }
        });
      } else if (this.textFlag[index] == true) {
        this.addData1.map((val, j) => {
          if (val.threshold == 'true') {
            for (let i = 0; i < this.rows.length; i++) {
              if (index == i) {
                if (
                  this.rows[i][val.cName] == '' ||
                  this.rows[i][val.cName] == undefined
                ) {
                  this.rows[i][val.cName] = this.Specification[index];
                } else {
                  this.rows[i][val.cName] = this.Specification[index];
                }
              }
            }
          }
        });
      }
    }
    // this.toolTip(type,i,headerName);
  }

  selectUnit(e, i) {
    this.selectedUnit[i] = e.value;
  }

  roleData() {
    this.dataService.get('config/role').subscribe((res) => {
      this.role = res['result'];
    });
    this.mappingData();
  }
  mappingData() {
    this.dataService.get('config/user').subscribe(
      (res: any) => {
        this.mapValue = res['result'];
        this.mapValue.forEach((m) => {
          this.approvalList.forEach((e) => {
            if (m.role == e.approvalPersonName) {
              this.mapDatapush.push({
                role: m.role,
                user: m.userName,
              });
            }
          });
        });
      },
      (error) => {
        this.toastr.error(error.error['message']);
      }
    );
  }

  // addApprovalList() {
  //   this.approvalList.push({
  //     approvalPersonName: '',
  //   });
  // }
  periodic() {
    this.period.push({
      periodcheck: '',
      mins: '',
      sec: '',
    });
  }

  approvalDelete(index) {
    this.approvalList.splice(index, 1);
  }

  fieldSelectApproval(e) {
    this.fieldApproval = e;
    this.mapDatapush = [];
    this.mappingData();
  }

  addRow() {
    let indexForId = this.rows.length + 1;
    this.rows.push({});
    this.addData1.map((val) => {
      this.rows[this.rows.length - 1][val.cName] = '';
    });
  }
  subAddRow() {
    let indexForId = this.subrows.length + 1;
    this.subrows.push({});
    this.toastr.info('Must configure the first row and column');
  }
  subColRow() {
    let indexForId1 = this.colsubrows.length;
    this.colsubrows.push({});
    this.toastr.info('Must configure the first row and column');
  }
  footerRow() {
    let indexForId1 = this.footerData.length;
    this.footerData.push({});
    // this.toastr.info('Must configure the first row and column');
  }
  addProbFoot() {
    this.probFootArr.push({});
  }

  subsecColRow(i) {
    let indexForId2 = this.colsubsecRows.length + 1;
    this.colsubsecRows.push(this.subsecCol);
    this.toastr.info('Must configure the first row and column');
  }

  metaRow() {
    let indexForIdmeta = this.metadatarow.length + 1;
    this.metadatarow.push({});
    this.toastr.info('Must configure the first row and column');
  }
  toggle(val) {
    this.editRowId = val;
  }

  returnToMaster() {
    this.router.navigate(['mainpage/master/list']);
  }

  autoFill(e) {}
  toolTip(type, index, headerName) {
    if (type == 'footer') {
      if (!this.masterFooter.length) {
        this.masterFooter.push({
          index: index,
          footerHeader: headerName,
          filledBy: sessionStorage.getItem('user'),
          filledAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
        });
      } else {
        let findIndexForFooter = this.masterFooter.findIndex(
          (val) => val.footerHeader == headerName && val.index == index
        );
        if (Math.sign(findIndexForFooter) == -1) {
          this.masterFooter.push({
            index: index,
            footerHeader: headerName,
            filledBy: sessionStorage.getItem('user'),
            filledAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
          });
        } else {
          (this.masterFooter[findIndexForFooter]['filledBy'] =
            sessionStorage.getItem('user')),
            (this.masterFooter[findIndexForFooter]['filledAt'] =
              moment().format('YYYY-MM-DDTHH:mm:ss'));
        }
      }
    } else if (type == 'body') {
      if (!this.masterBody.length) {
        this.masterBody.push({
          index: index,
          bodyHeader: headerName[0],
          filledBy: sessionStorage.getItem('user'),
          filledAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
        });
      } else {
        let findIndex = this.masterBody.findIndex(
          (val) => val.bodyHeader == headerName && val.index == index
        );
        if (Math.sign(findIndex) == -1) {
          this.masterBody.push({
            index,
            bodyHeader: headerName[0],
            filledBy: sessionStorage.getItem('user'),
            filledAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
          });
        } else {
          (this.masterBody[findIndex]['filledBy'] =
            sessionStorage.getItem('user')),
            (this.masterBody[findIndex]['filledAt'] = moment().format(
              'YYYY-MM-DDTHH:mm:ss'
            ));
        }
      }
    } else if (type == 'header') {
      if (!this.masterHeader.length) {
        this.masterHeader.push({
          index: index,
          HeaderName: headerName,
          filledBy: sessionStorage.getItem('user'),
          filledAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
        });
      } else {
        let findIndexOfHeader = this.masterHeader.findIndex(
          (val) => val.HeaderName == headerName && val.index == index
        );
        if (Math.sign(findIndexOfHeader) == -1) {
          this.masterHeader.push({
            index,
            HeaderName: headerName,
            filledBy: sessionStorage.getItem('user'),
            filledAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
          });
        } else {
          (this.masterHeader[findIndexOfHeader]['filledBy'] =
            sessionStorage.getItem('user')),
            (this.masterHeader[findIndexOfHeader]['filledAt'] = moment().format(
              'YYYY-MM-DDTHH:mm:ss'
            ));
        }
      }
    } else {
      if (!this.masterInstruction.length) {
        this.masterInstruction.push({
          index: index,
          instructionHeader: headerName[0],
          filledBy: sessionStorage.getItem('user'),
          filledAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
        });
      } else {
        let findIndex = this.masterInstruction.findIndex(
          (val) => val.instructionHeader == headerName && val.index == index
        );
        if (Math.sign(findIndex) == -1) {
          this.masterInstruction.push({
            index,
            instructionHeader: headerName[0],
            filledBy: sessionStorage.getItem('user'),
            filledAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
          });
        } else {
          (this.masterInstruction[findIndex]['filledBy'] =
            sessionStorage.getItem('user')),
            (this.masterInstruction[findIndex]['filledAt'] = moment().format(
              'YYYY-MM-DDTHH:mm:ss'
            ));
        }
      }
    }
  }

  submit() {
    if (this.periodicSchedule == 'Daily') {
      for (let i = 0; i < this.footerData.length; i++) {
        const data = this.footerData[i];
        for (const item of this.footer) {
          if (!data[item.fName]) {
            data[item.fName] = ''; // Add the missing key with an empty string value
          }
        }
      }
    }
    if (this.mainCopybool == true) {
      this.mainData = this.mainDataCopy;
    } else {
      this.mainData = this.mainData;
    }
    this.mainData.forEach((e) => {
      if (e.autoFillValue == 'Machine') {
        this.machineName = e.mvalue;
      } else if (
        e.autoFillValue == '' &&
        (e.mName.toUpperCase() == 'MACHINE' ||
          e.mName.toUpperCase() == 'MACHINENAME')
      ) {
        this.machineName = e.mvalue;
      }
    });
    if (this.shiftData && this.shiftData.length) {
      this.shiftName = this.shiftData[0]['shiftValue'];
    }
    if (this.approvalBool == true) {
      this.approvalList = this.approvalListCopy;
    } else {
      this.approvalList = this.approvalList;
    }
    this.masterArr = {
      masterName: this.MasterName,
      PartId: this.PartId,
      Tempname: this.tempName,
      plantName: this.plantName,
      shiftName: this.shiftName,
      machineName: this.machineName,
      // dName: this.dName,
      approval: this.approvalList,
      column: this.rows,
      metadata: this.metadatarow,
      subMetdata: this.subrows,
      subColumns: this.colsubrows,
      subColsec: this.colsubsecRows,
      mainHeader: this.mainHeader,
      subHeader: this.subHeader,
      subSecHeader: this.subSecHeader,
      mainData: this.mainData,
      footer: this.footerData,
      footerTitle: this.footerTitle,
      footerInstruction: this.footerInstruction,
      formatData: this.formatData,
      revisionNOData: this.revisionNOData,
      revisionDateData: this.revisionDateData,
      problemFooter: this.probFootArr,
      currentDate: this.currentDate,
      shiftData: this.shiftData,
      shiftNote: this.shiftNote,
      pdf: this.pdf,
      createdBy: this.createdBy,
      imageDisplay: this.imageDisplay,
    };

    this.masterimageArr = {
      masterName: this.MasterName,
      image: this.imageUrl,
    };

    this.lastMasterArray = [
      {
        masterName: this.MasterName,
        Tempname: this.tempName,
        headers: this.masterHeader,
        body: this.masterBody,
        footer: this.masterFooter,
        Instruction: this.masterInstruction,
      },
    ];

    this.dataService.post('masterData/master', this.masterArr).subscribe(
      (res: any) => {
        if (res['result']) {
          this.toastr.success('Master created');
          this.returnToMaster();
        } else {
        }
      },
      (error) => {
        this.toastr.error(error.error['message']);
      }
    );
    this.dataService
      .post('config/tooltip', this.lastMasterArray)
      .subscribe((res) => {
        this.toolTipData = res;
      });

    this.dataService
      .post('imageData/image', this.masterimageArr)
      .subscribe((res: any) => {});
  }
  getImage() {
    this.dataService.get('imageData').subscribe(
      (res: any) => {},
      (error) => {
        this.toastr.error(error.error['message']);
      }
    );
  }

  handleFileInput(event) {
    this.fileToUpload = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    if (this.fileToUpload) {
      this.imageBool = true;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  onSelectFile(event) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if (file.type.indexOf('image') > -1) {
        this.format = 'image';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      };
    }
  }
  getPDF() {
    var file = new Blob([this.pdf], { type: 'application/pdf' });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
    var a = document.createElement('a');
    a.href = fileURL;
    document.body.appendChild(a);
  }

  showImage(img) {
    if (img) {
      let parts = img.split('/');
      let fileNameWithExtension = parts.pop()?.split('/').pop();
      return fileNameWithExtension
        ? fileNameWithExtension.replace(/[_\d]/g, '')
        : '';
    } else {
      return '';
    }
  }

  keyFunc(e, name, i) {
    let data = e.target.value;
    //  sole.log(name, data, i, this.addData1, this.rows);
  }
  changeValue(key, value) {
    this.nosubheader[key] = value;
  }

  handleFileInputChange(l: FileList, column, subRow, name, type): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : '';

      var formData: any = new FormData();

      formData.append('file', f);
      this.dataService
        .post('checklist/uploadPdf', formData)
        .subscribe((res: any) => {
          this.uploadData = res;
          const urlObject = { url: this.uploadData };
          this.urlData.push(urlObject);
          if (this.urlData.length > 0) {
            this.data = this.urlData[0];
            if (type == 'footer') {
              if (this.footerData[column])
                this.footerData[column][
                  this.tempArray[0]['footer'][subRow]['fName']
                ] = res;
            } else if (type == 'body') {
              if (!this.rows[column]) this.rows[column] = {};

              this.rows[column][this.addData[subRow]['cName']] = res;
              this.addData[subRow][this.addData[subRow]['cName']] = res;
            } else if (type == 'header') {
              this.mainData[subRow]['mvalue'] = res;
            } else {
              if (!this.rows[column]) this.rows[column] = {};

              this.rows[column][name] = res;
            }
          }
        });
      this.display.patchValue(`${f.name}${count}`);
    } else {
      this.display.patchValue('');
    }
  }

  getInputType(type: string): string {
    switch (type) {
      case 'text':
      case 'number':
      case 'date':
        return type;
      default:
        return 'text';
    }
  }
  key(event, e, row, i) {
    // this.footerData.push({ e });
  }
}
