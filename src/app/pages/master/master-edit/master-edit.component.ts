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
import { FormControl, Validators } from '@angular/forms';
import * as momenttz from 'moment-timezone';
import * as moment from 'moment';
import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-master-edit',
  templateUrl: './master-edit.component.html',
  styleUrls: ['./master-edit.component.scss'],
})
export class MasterEditComponent implements OnInit {
  toolTipData: Object;
  getTool: any=[];
  constructor(
    private router: Router,
    private dataService: DataService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { }
  @ViewChild('widgetEditorModal') public widgetEditorModal: TemplateRef<any>;
  private widgetEditorDialogRef: MatDialogRef<TemplateRef<any>>;
  isModalOpen = false;
  imageVal: any;
  MasterName: any;
  tempName: any;
  plant: any;
  zone: any;
  shift: any;
  machine: any;
  plantName: any;
  shiftName: any;
  machineName: any;
  customBool: boolean = false;
  finalArr: any;
  selectTempname: any;
  role: any;
  approvalList: any = [];
  masterArr: any = {};
  localmasterName: any;
  tempArray: any = [];
  imageUrl;
  fileToUpload: any;
  rows: any = [];
  editRowId: any;
  addData;
  subrows: any = [];
  colsubrows: any = [];
  sudAdd: any;
  subCol;
  metadata: any = [];
  metadatarow: any = [];
  metadataAdd;
  colsubsecRows: any = [];
  subsecCol;
  masterimageArr: any = [];
  mainHeader;
  subHeader;
  subSecHeader;
  mainData: any;
  masterNameCopy;
  mData;
  department: any;
  dName: any;
  footerCheck: any;
  footerMasterMarked: boolean = false;
  footer: any = [];
  footerData: any = [];
  footerTitle: any;
  footerCol;
  addData1: any = [];
  subHbool1: boolean = false;
  subHeaderMain: any = [];
  subHeaderLen: any;
  subHbool: boolean = false;
  PartId: any;
  part: any;
  display: FormControl = new FormControl('', Validators.required);
  file_store: FileList;
  file_list: Array<string> = [];
  uploadData: any;
  urlData: any = [];
  data: any;
  section: any;
  mapDatapush: any = [];
  mapValue: any;
  imageDisplay: any;
  localPermission;
  imageBool: boolean = false;
  pdfBool: boolean = false;
  pdf: any;
  currentMonth: any;
  currentYear: any;
  today: any;
  thresholdType = ['Upperlimit/Lowerlimit', 'In Between', 'Text Area'];
  units = ['kg/cm²', 'degrees', '%', 'mm', 'mm A']
  thresType: any;
  limitFlag: boolean[] = [false];
  betweenFlag: boolean[] = [false];
  textFlag: boolean[] = [false];
  // thresholdSubFlag:boolean = false
  thresholdSubFlag: boolean[] = [false];
  thresSelectFlag: boolean[] = [false]
  selectedUnit: any = []
  actualValue: any = [];
  thresholdValue: any = [];
  actualValue1: any = [];
  thresholdValue1: any = [];
  Specification: any = [];
  thresValue: any = [];
  thres: any = [];
  periodicSchedule: any;
  masterHeader: any = [];
  masterBody: any = [];
  masterFooter: any = [];
  masterInstruction: any = [];
  lastMasterArray: any = [];
  probFootArr: any = [];
  revisionDateData: any;
  revisionNOData: any;
  formatData: any;
  problemFooter: any;
  shiftNote: any;
  shiftData: any;
  currentDate: any;
  footerInstruction: any;

  ngOnInit(): void {
    this.localmasterName = sessionStorage.getItem('masterName');
    this.localPermission = sessionStorage.getItem('role');
    this.currentMonth = momenttz().format('MMMM');
    this.currentYear = momenttz().format('YYYY');
    this.today = momenttz().format('DD/MM/YYYY');
    this.getData();
    this.roleData();
    this.getTooltip();

  }
  CopyMaster() { }

  getData() {
    this.dataService
      .get('checklist/template?type=dropdown')
      .subscribe((res) => {
        this.finalArr = res['result'];
        this.masterArr = [];
        this.getShift();
        this.getPlant();
        this.getMasterData();
        this.getImage();
        this.getPart();
        this.mappingData();
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
      this.getZone();
      this.getMachine();
      this.getDepartment();
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

  getMasterData() {
    this.masterArr = [];
    this.mainData = [];
    this.rows = [];
    this.footerData = [];
    this.mData = [];
    this.dataService
      .get('masterData/master/' + this.localmasterName)
      .subscribe((res) => {
        this.mData = [];
        this.mData = JSON.parse(JSON.stringify(res['result']));
        this.MasterName = this.mData[0].masterName;
        this.tempName = this.mData[0].Tempname;
        this.imageUrl = this.mData[0].image;
        this.PartId = this.mData[0].PartId;
        this.approvalList = this.mData[0].approval;
        this.fieldSelect(this.tempName);
        this.plantName = this.mData[0].plantName;
        this.shiftName = this.mData[0].shiftName;
        // this.dName = this.mData[0].dName;
        this.machineName = this.mData[0].machineName;
        this.metadatarow = this.mData[0].metadata;
        this.rows = this.mData[0].column;
        this.subrows = this.mData[0].subMetdata;
        this.colsubrows = this.mData[0].subColumns;
        this.colsubsecRows = this.mData[0].subColsec;
        this.mainHeader = this.mData[0].mainHeader;
        this.subHeader = this.mData[0].subHeader;
        this.subSecHeader = this.mData[0].subSecHeader;
        this.mainData = this.mData[0].mainData;
        this.footerTitle = this.mData[0].footerTitle;
        this.footerData = this.mData[0].footer;
        this.imageDisplay = this.mData[0].imageDisplay;
        this.footerInstruction = this.mData[0].footerInstruction;
        this.probFootArr = this.mData[0].problemFooter;
        this.formatData = this.mData[0]['formatData'];
        this.revisionNOData = this.mData[0]['revisionNOData'];
        this.revisionDateData = this.mData[0]['revisionDateData'];
        this.currentDate = this.mData[0]['currentDate'];
        this.shiftData = this.mData[0]['shiftData'];
        this.shiftNote = this.mData[0]['shiftNote'];

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
      });
  }
  toolTipHeader:any=[];
  toolTipBody:any = [];
  toolTipFooter:any = [];
  toolTipInstruction:any=[];
  getTooltip(){
    this.dataService.get('config/tooltip?masterName=' + this.localmasterName).subscribe((res) => {
        this.getTool = res['result'][0];

        this.toolTipHeader=this.getTool['header']
        this.toolTipBody=this.getTool['body'];
        this.toolTipFooter=this.getTool['footer']
        this.toolTipInstruction=this.getTool['Instruction'];
      });
  }
  getval(val: any) {
    let arr = [];
    if (val == 'Plant') {
      this.plant?.forEach((e) => {
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
      this.part?.forEach((e) => {
        arr.push(e.partName);
      });
    } else if (val == 'partId') {
      this.part?.forEach((e) => {
        arr.push(e.partId);
      });
    } else if (val == 'ShiftName') {
      this.shift?.forEach((e) => {
        arr.push(e.name);
      });
    }
    // this.toolTip(type,i,headerName)
    return arr;
  }
  fieldSelect(e) {
    this.selectTempname = e;
    this.tempArray = [];
    this.addData = [];
    this.footerCol = [];
    this.dataService.get('checklist/template/' + e).subscribe((res) => {
      this.tempArray = res['result'];
      this.addData = this.tempArray[0]['columns'];
      this.sudAdd = this.tempArray[0]['subMetdata'];
      this.subCol = this.tempArray[0]['subColumns'];
      this.metadataAdd = this.tempArray[0]['metadata'];
      this.subsecCol = this.tempArray[0]['subColsec'];
      this.mainHeader = this.tempArray[0]['mainHeader'];
      this.subHeader = this.tempArray[0]['subHeader'];
      this.subSecHeader = this.tempArray[0]['subSecHeader'];
      // this.mainData = this.tempArray[0]['mainData'];
      this.footerTitle = this.tempArray[0]['footerTitle'];
      this.periodicSchedule = this.tempArray[0]['periodicSchedule'];
      this.footerCol = this.tempArray[0]['footer'];
      this.problemFooter = this.tempArray[0]['problemFooter'];

      // const daysInCurrentMonth = momenttz.tz().daysInMonth();
      // if (this.periodicSchedule == 'Daily' && this.footerCol.length >= daysInCurrentMonth) {
      //   // this.footerData = new Array(30);
      //   for (let i = 1; i <= daysInCurrentMonth; i++) {
      //     this.footerData.push({});
      //   }
      // }
      this.pdf = this.tempArray[0]['pdf'];
      if (this.pdf?.length) {
        this.pdfBool = true;
      } else {
        this.pdfBool = false;
      }
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

          // e['value'] = '';
        }
        // this.subHeaderMain.push(e.subheader);
      });

      // } else {
      //   this.subHbool = false;
      // }
    });
    this.customBool = true;
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
    if (this.subHbool == true) {
      this.addData.map((val, j) => {
        if (val.threshold == 'true') {
          for (let i = 0; i < this.rows.length; i++) {
            if (this.rows[i][`csName!@#%!$${j}`] == '' || this.rows[i][`csName!@#%!$${j}`] == undefined) {
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
              if (this.rows[i][`csName!@#%!$${j}`].includes('±') && this.selectedJIndex == i) {
                this.limitFlag[i] = true;
                this.thresSelectFlag[i] = true
                this.thresval = this.thresholdType[0];
                this.unit  = this.rows[i][`csName!@#%!$${j}`].trim().split(/\d+/g).filter(n=>n).pop().trim(),
                this.value = this.rows[i][`csName!@#%!$${j}`].trim().split(this.unit).filter(n=>n)[0].trim()
                let splitData = this.value.split("±");
                this.actualValue[i] = splitData[0].trim();
                this.thresholdValue[i] = splitData[1].trim();
              } else if (this.rows[i][`csName!@#%!$${j}`].includes('-') && this.selectedJIndex == i) {
                this.betweenFlag[i] = true;
                this.thresSelectFlag[i] = true
                this.thresval = this.thresholdType[1];
                this.unit  = this.rows[i][`csName!@#%!$${j}`].trim().split(/\d+/g).filter(n=>n).pop().trim(),
                this.value = this.rows[i][`csName!@#%!$${j}`].trim().split(this.unit).filter(n=>n)[0].trim()
                let splitData = this.value.split("-");
                this.actualValue1[i] = splitData[0].trim();
                this.thresholdValue1[i] = splitData[1].trim();
              } else if (this.selectedJIndex == i) {
                this.textFlag[i] = true;
                this.thresSelectFlag[i] = false
                this.thresval = this.thresholdType[2];
                this.unit = '';
                this.Specification[i] = this.rows[i][`csName!@#%!$${j}`]
              }
            }
          }
        }
      })
    } else {
      this.addData1.map((val) => {
        if (val.threshold == 'true') {
          for (let i = 0; i < this.rows.length; i++) {
            if (this.rows[i][val.cName] == undefined || this.rows[i][val.cName] == '') {
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
              if (this.rows[i][val.cName].includes('±') && this.selectedJIndex == i) {
                this.limitFlag[i] = true;
                this.thresSelectFlag[i] = true
                this.thresval = this.thresholdType[0];
                this.unit  = this.rows[i][val.cName].trim().split(/\d+/g).filter(n=>n).pop().trim(),
                this.value = this.rows[i][val.cName].trim().split(this.unit).filter(n=>n)[0].trim()
                let splitData = this.value.split("±");
                this.actualValue[i] = splitData[0].trim();
                this.thresholdValue[i] = splitData[1].trim();
              } else if (this.rows[i][val.cName].includes('-') && this.selectedJIndex == i) {
                this.betweenFlag[i] = true;
                this.thresSelectFlag[i] = true
                this.thresval = this.thresholdType[1];
                this.unit  = this.rows[i][val.cName].trim().split(/\d+/g).filter(n=>n).pop().trim(),
                this.value = this.rows[i][val.cName].trim().split(this.unit).filter(n=>n)[0].trim()
                let splitData = this.value.split("-");
                this.actualValue1[i] = splitData[0].trim();
                this.thresholdValue1[i] = splitData[1].trim();
              } else if (this.selectedJIndex == i) {
                this.textFlag[i] = true;
                this.thresSelectFlag[i] = false;
                this.thresval = this.thresholdType[2];
                this.unit = '';
                this.Specification[i] = this.rows[i][val.cName]
              }
            }
          }
        }
      });
    }
    this.thresValue = [];
    const dialogConfig = new MatDialogConfig();
    dialogConfig.role = 'dialog';
    dialogConfig.width = '550px';
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

  roleData() {
    this.dataService.get('config/role').subscribe((res) => {
      this.role = res['result'];
      this.mappingData();
    });
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
  addProbFoot() {
    this.probFootArr.push({});
  }
  getPart() {
    this.dataService.get(`config/cycletime`).subscribe((res) => {
      if (res) {
        this.part = res['result'];
      }
    });
  }
  getZone() {
    this.dataService.get('config/zone').subscribe((res) => {
      this.zone = res['result'];
    });
  }
  addApprovalList() {
    this.approvalList.push({
      approvalPersonName: '',
    });
  }
  approvalDelete(index) {
    this.approvalList.splice(index, 1);
  }
  fieldSelectApproval(e) { }

  addRow() {
    let indexForId = this.rows.length + 1;
    this.rows.push({});
  }

  subAddRow() {
    let indexForIdA = this.subrows.length + 1;
    this.subrows.push({});
  }
  subColRow() {
    let indexForIdC = this.colsubrows.length + 1;
    this.colsubrows.push({});
  }
  metaRow() {
    let indexForIdmeta = this.metadatarow.length + 1;
    this.metadatarow.push({});
  }

  footerRow() {
    let indexForId1 = this.footerData.length;
    this.footerData.push({});
    // this.toastr.info('Must configure the first row and column');
  }
  toggle(val) {
    this.editRowId = val;
  }
  returnToMaster() {
    this.router.navigate(['mainpage/master/list']);
  }
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
      this.masterFooter.map((val)=>{
        this.toolTipFooter.push(val)
      })
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
      this.masterBody.map((val)=>{
        this.toolTipBody.push(val)
      })
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
      this.masterHeader.map((val)=>{
        this.toolTipHeader.push(val)
      })
    }
    else{
      if (!this.masterInstruction.length) {
        this.masterInstruction.push({
          index: index,
          instructionHeader: headerName[0],
          filledBy: sessionStorage.getItem('user'),
          filledAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
        });
      } else {
        let findIndex = this.masterInstruction.findIndex(
          (val) => val. instructionHeader == headerName && val.index == index
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

    this.masterInstruction.map((val)=>{
      this.toolTipInstruction.push(val)
    })
  }
  submit() {
    if (this.periodicSchedule == 'Daily') {
      for (let i = 0; i < this.footerData.length; i++) {
        const data = this.footerData[i];
        for (const item of this.footer) {
          if (!data[item.fName]) {
            data[item.fName] = '';
          }
        }
      }
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
    this.masterimageArr = [];
    this.masterArr = [];
    this.masterArr = {
      masterName: this.MasterName,
      Tempname: this.tempName,
      plantName: this.plantName,
      shiftName: this.shiftName,
      machineName: this.machineName,
      // dName: this.dName,
      approval: this.approvalList,
      column: this.rows,
      subMetdata: this.subrows,
      metadata: this.metadatarow,
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
    };
    this.masterimageArr = {
      masterName: this.MasterName,
      image: this.imageUrl,
    };
    this.lastMasterArray = [
      {
        masterName: this.MasterName,
        Tempname: this.tempName,
        headers: this.toolTipHeader,
        body: this.toolTipBody,
        footer: this.toolTipFooter,
        Instruction:this.toolTipInstruction
      },
    ]

    this.dataService
      .put('masterData/master/' + this.localmasterName, this.masterArr)
      .subscribe((res: any) => {
        if (res['result']) {
          this.toastr.success(`${this.localmasterName} Master Updated`);
          this.returnToMaster();
        }
      });
    this.dataService
      .put(`imageData/image/` + this.localmasterName, this.masterimageArr)
      .subscribe((res: any) => {
        // this.getImage();
        this.returnToMaster();
      });


      this.dataService
      .put('config/tooltip', this.lastMasterArray)
      .subscribe((res) => {
        this.toolTipData = res;

      });
    this.modalService.dismissAll();
  }
  getImage() {
    this.dataService.get('imageData/image').subscribe((res) => {
      this.imageVal = res['result'];
      this.imageVal.forEach((val) => {
        if (val.masterName == this.localmasterName) {
          this.imageUrl = val.image;
        }
      });
    });
  }
  selectThresholdType(e, i) {
    this.thresType = e.value;
    this.thresSelectFlag[i] = true
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
          this.actualValue[index] + ' ± ' + this.thresholdValue[index] + ' ' + this.selectedUnit[index];
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
          this.actualValue1[index] + ' - ' + this.thresholdValue1[index] + ' ' + this.selectedUnit[index];
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
        this.thresValue[index] = this.actualValue[index] + ' ± ' + this.thresholdValue[index] + ' ' + this.selectedUnit[index];
        this.addData1.map((val) => {
          if (val.threshold == 'true') {
            for (let i = 0; i < this.rows.length; i++) {
              if (index == i) {
                if (
                  this.rows[i][val.cName] == '' ||
                  this.rows[i][val.cName] == undefined
                ) {
                  this.rows[i][val.cName] = this.thresValue[index];
                }
                else {
                  this.rows[i][val.cName] = this.thresValue[index];
                }
              }
            }
          }
        });
      } else if (this.betweenFlag[index] == true) {
        this.thresValue[index] =
          this.actualValue1[index] + ' - ' + this.thresholdValue1[index] + ' ' + this.selectedUnit[index];
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
    this.selectedUnit[i] = e.value
  }
  subsecColRow() {
    let indexForId2 = this.colsubsecRows.length + 1;
    this.colsubsecRows.push({});
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
    if (this.fileToUpload) {
      this.imageBool = true;
    }
  }
  fileUpload;
  img;
  handleFile(event) {
    this.fileUpload = event.target.files[0];
    let readers = new FileReader();
    readers.onload = (event: any) => {
      this.img = event.target.result;
    };

    readers.readAsDataURL(this.fileUpload);
  }
  format;
  url;
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
        return 'text'; // Default to text input for other types
    }
  }
  onSelectFile1(event) {
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
}
