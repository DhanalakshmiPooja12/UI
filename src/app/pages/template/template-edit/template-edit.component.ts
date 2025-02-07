import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../../shared/data.service';

import { finalize } from 'rxjs/operators';
import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import * as momenttz from 'moment-timezone';

@Component({
  selector: 'app-template-edit',
  templateUrl: './template-edit.component.html',
  styleUrls: ['./template-edit.component.scss'],
})
export class TemplateEditComponent implements OnInit {
  @ViewChild('widgetEditorModal') public widgetEditorModal: TemplateRef<any>;
  private widgetEditorDialogRef: MatDialogRef<TemplateRef<any>>;
  isModalOpen = false;
  localtempName: any;
  addRows: any = [];
  addColumns: any = [];
  tempName: any;
  finalArr: any;
  periodicSchedule: any;
  columns: any = [];
  customBool: boolean[] = [false];
  togglesubheaderMarked: boolean[] = [false];
  periodicSubHeader: boolean[] = [false];
  action: any;
  type: any;
  permission: any;
  cName: any;
  ctype: any = [];
  approvalList: any = [];
  role: any;
  subAddrows: any = [];
  addsubColfirst: any = [];
  addsubColsec: any = [];
  subSecHeader: any;
  subHeader: any;
  mainHeader: any;
  mainData: any = [];
  containers = [];
  multiHeader = [];
  addSubHeaderArr: any[] = [];
  fileData;
  file1;
  fileBool: boolean = false;
  uploadData: any;
  periodicButton = [
    {
      name: 'Daily',
      checked: false,
    },
    {
      name: 'Shift',
      checked: false,
    },
  ];
  shiftwise = ['Start of the Shift', 'End of the Shift', 'Hourly'];
  periodicHeader = [
    {
      name: 'Header',
      checked: false,
    },
    {
      name: 'Sub Header',
      checked: false,
    },
  ];
  ShiftSelection: boolean = false;
  selectDaily: boolean = false;
  showSubheader: boolean = false;
  changeinPeriod: boolean = false;
  selectedperiod: any;
  numberofDays: any;
  instances: any;
  noOfInstances: any;
  periodic_Check: boolean = false;
  footerTitle;
  addFooterData: any = [];
  footerMarked: boolean = false;
  shift: any;
  hour: any[];
  startofshift: boolean = false;
  selectInstant: boolean = false;
  mainHeaderCheck: any;
  selectedHeader: any;
  checkDaily: boolean = false;
  checkShift: boolean = false;
  getThresFlag: boolean = false
  selectedShift: any;
  subCheck: boolean[] = [false];

  pdf: any;
  showAutoFillDropDown: boolean[] = [false];
  showDateAutoFill: boolean[] = [false];
  showContentDateAutoFill: boolean[] = [false];
  autoFillDropDown = ['Configuration', 'DAQ'];
  autoFillOptions = [
    {
      value: 'Plant',
      children: [],
    },
    {
      value: 'Zone',
      children: [],
    },
    {
      value: 'Machine',
      children: [],
    },
    {
      value: 'ShiftName',
      children: [],
    },
    {
      value: 'PartConfig',
      children: [
        { value: 'partName', children: [] },
        { value: 'partId', children: [] },
      ],
    },
  ];
  showDropDownValues: boolean[] = [false];
  showContentAutoFillDropDown: boolean[] = [false];
  showContentDropDownValues: boolean[] = [false];
  footerInstruction: any;
  revisionDateData: any;
  formatData: any;
  revisionNOData: any;
  shiftNote: any;
  Currentdate: any;
  shiftData: any;
  footerProbArr: any = [];
  periodicValue: any;
  fillFromShift: any;
  autoFillValueShift: any;
  showShiftDrop: boolean = false;
  showShiftDropValue: boolean = false;
  showDateDrop: boolean = false;
  dateAutoFill: any;
  constructor(
    private dataService: DataService,
    private modalService: NgbModal,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.formatNo = 'FORMAT NO';
    // this.revisionDate = 'Revision Date';
    // this.revisionNO = 'Revision NO';
    // this.shiftNo = 'Shift';
    // this.Currentdate = 'Date';
    this.localtempName = sessionStorage.getItem('tempName');
    this.roleData();
    this.getDataByTempname();
  }
  selectedmat;
  dataAPI;
  periodicAPI;
  addSubHeaderArrData;
  getDataByTempname() {
    this.dataService
      .get('checklist/template/' + this.localtempName)
      .subscribe((res) => {
        this.tempName = res['result'][0].Tempname;
        this.periodicSchedule = res['result'][0].periodicSchedule;
        this.periodic_Check = res['result'][0].checkPeriodic;
        this.periodicAPI = this.periodicSchedule;
        this.selectedHeader = res['result'][0].periodicPosition;
        this.selectedperiod = res['result'][0].periodicSchedule;
        this.selectedShift = res['result'][0].shiftName;
        this.file1 = res['result'][0]['pdf'];
        if (this.shiftwise.includes(this.periodicSchedule)) {
          (this.selectedmat = this.periodicSchedule),
            (this.periodicSchedule = 'Shift');
          this.ShiftSelection = true;
          this.instances = false;
        } else if (this.periodicSchedule == 'Number of instances') {
          this.noOfInstances = res['result'][0].noOfInstances;
          this.instances = true;
          this.ShiftSelection = false;
        } else {
          this.instances = false;
          this.ShiftSelection = false;
        }
        if (this.selectedHeader) {
          this.showSubheader = true;
        } else {
          this.selectedHeader = false;
        }
        //  this.periodicButton.forEach((val) => {
        //   if (val.name == this.periodicSchedule) {
        //     val.checked = true
        //   }
        // })
        // if(this.periodicSchedule == "Daily"){
        //   this.checkDaily = true
        //   this.checkShift = false
        // }else{
        //   this.checkShift = true
        //   this.checkDaily = false
        // }
        // this.periodicHeader.forEach((val) => {
        //   if (val.name == this.selectedHeader) {
        //     val.checked = true
        //   }
        // })
        // if (this.periodicSchedule == "Daily") {
        //   this.selectDaily = true
        //   this.startofshift = false
        //   this.ShiftSelection = false
        //   this.instances = false
        //   this.selectInstant = false
        //   let current_date = Array.from(Array(momenttz().daysInMonth()), (_, i) => i + 1)
        //   this.numberofDays = current_date.length
        // } else if (res['result'][0].periodicSchedule == "Number of instances") {
        //   this.selectInstant = true
        //   this.ShiftSelection = true
        //   this.selectDaily = false
        //   this.startofshift = false
        //   this.instances = true
        //   this.noOfInstances = res['result'][0].noOfInstances
        // } else {
        //   this.selectInstant = false
        //   this.selectDaily = false
        //   this.startofshift = true
        //   this.ShiftSelection = true
        //   this.instances = false
        //   this.numberofDays = res['result'][0].columns.length
        // }
        this.addRows = res['result'][0].metadata;
        this.subAddrows = res['result'][0].subMetdata;
        this.addRows.forEach((e, i) => {
          if (e.field === 'Custom') {
            this.customBool[i] = true;
          }
        });
        this.addColumns = res['result'][0].columns;
        this.dataAPI = this.addColumns;
        // this.addColumns.forEach((e) => {
        //   if (e.subheader && e.subheader.length > 0) {
        //     e['checked'] = true;
        //     this.addSubHeaderArr.push([...e.subheader]);
        //   } else {
        //     e['checked'] = false;
        //     this.addSubHeaderArr[e] = [{ csName: '', cstype: '' }];
        //   }
        // });
        this.addsubColfirst = res['result'][0].subColumns;
        this.multiHeader = res['result'][0].subColsec;
        this.multiHeader.forEach((m) => {
          this.addsubColsec = m;
          this.addMe();
        });
        this.periodicValue = res['result'][0].periodicSchedule;
        this.shiftData = res['result'][0].shiftData;
        this.Currentdate = res['result'][0].currentDate;
        this.shiftNote = res['result'][0].shiftNote;
        this.formatData = res['result'][0].formatData;
        this.revisionNOData = res['result'][0].revisionNOData;
        this.revisionDateData = res['result'][0].revisionDateData;
        this.footerInstruction = res['result'][0].footerInstruction;
        this.footerProbArr = res['result'][0].problemFooter;

        this.approvalList = res['result'][0].approval;
        this.mainHeader = res['result'][0].mainHeader;
        this.subHeader = res['result'][0].subHeader;
        this.subSecHeader = res['result'][0].subSecHeader;
        this.mainData = res['result'][0].mainData;
        this.footerTitle = res['result'][0].footerTitle;
        this.addFooterData = res['result'][0].footer;
        this.addSubHeaderArrData = res['result'][0].subColumns;

        let data = [];
        this.addColumns.forEach((e, i) => {
          // if (this.addColumns[i]?.length > 0) {
          if (e.subheader) {
            e.subheader.map((e) => {
              if (e.noSubHeader && e.noSubHeader == true) {
                this.subCheck[i] = false;
              } else {
                this.subCheck[i] = true;
                this.togglesubheaderMarked[i] = true;
              }
            });
          }
          this.addSubHeaderArr.push(e.subheader);
          // }
          // else if (this.addSubHeaderArr[i]?.length == 0) {
          //   this.addSubHeaderArr[i] = [{ csName: '', cstype: '' }];
          //   data.push({ subheader: this.addSubHeaderArr[i], ...e });
          // } else {
          //   data.push({ subheader: this.addSubHeaderArr[i], ...e });
          // }
        });
      }),
      (error) => {
        //nothing
      };
  }
  MasterHead() {
    this.mainData.push({
      mName: '',
      mValue: '',
    });
  }
  deleteMainRow(index) {
    this.mainData.splice(index, 1);
  }

  addrow() {
    this.addRows.push({
      field: '',
      name: '',
      type: '',
      permission: '',
    });
  }

  addColumn() {
    if (this.addColumns.length != 0) {
      let checked = this.addColumns.filter((obj) => {
        if (obj.threshold == 'true') {
          return obj;
        }
      });
      if (checked.length && checked[0].threshold) {
        this.addColumns.push({
          cName: '',
          ctype: '',
          periodic: false,
          checked: 'false',
          threshold: 'false',
        });
      } else {
        this.addColumns.push({
          cName: '',
          ctype: '',
          periodic: false,
          checked: '',
          threshold: '',
        });
      }
    } else {
      this.addColumns.push({
        cName: '',
        ctype: '',
        periodic: false,
        checked: '',
        threshold: '',
      });
    }
  }

  subAdd() {
    this.subAddrows.push({
      sName: '',
      type: '',
      value: '',
    });
  }
  addsubColumn1() {
    this.addsubColfirst.push({
      fcName: '',
      fctype: '',
    });
  }
  addsubColumnsec() {
    this.addsubColsec.push({
      secName: '',
      sectype: '',
    });
  }
  addFooter() {
    this.addFooterData.push({
      fName: '',
      fType: '',
    });
  }
  footerProb() {
    this.footerProbArr.push({});
  }
  addApprovalList() {
    this.approvalList.push({
      approvalPersonName: '',
    });
  }
  subcolSubmit() {
    this.modalService.dismissAll();
  }
  subCancel() {
    this.modalService.dismissAll();
  }

  showPeriodic(e) {
    if (e.target.checked == false) {
      this.ShiftSelection = false;
      this.selectInstant = false;
      this.instances = false;
      this.addColumns = [];
      this.addColumn();
    } else {
      // Do Nothing
    }
    this.periodic_Check = e.target.checked;
  }

  periodChange(period) {
    if (period == 'Shift') {
      this.showSubheader = false;
      this.ShiftSelection = true;
      this.instances = false;
      this.selectDaily = false;
      // this.getCurrentShiftHour()
    } else {
      this.selectedperiod = period;
      if (this.addColumns.length > 0) {
        this.addColumns = [];
      }
      this.ShiftSelection = false;
      // this.selectInstant = false;
      this.showSubheader = false;
      this.instances = false;
      this.selectDaily = true;
    }
  }

  getShiftSelection(e) {
    this.selectedperiod = e;
    this.ShiftSelection = true;
    this.ShiftSelection = true;
    // this.addColumns = []
    // this.selectHeader(this.selectedHeader)
    if (e == 'Number of instances') {
      this.instances = true;
      // this.selectInstant = true
    } else {
      this.instances = false;
      // this.selectInstant = false
    }
  }
  getInstances(number) {
    this.addColumns = [];
    this.noOfInstances = number;
    this.selectInstant = true;
  }

  getThresholdFlag(e, i) {
    this.getThresFlag = e.value
    if (e.value) {
      this.addColumns.forEach((val, index) => {
        if (i == index) {
          val.threshold = e.value;
        }else{
          val.threshold = 'false'
        }
      });
    } else {
      this.addColumns.forEach((val, index) => {
        val.threshold = false;
      });
    }
    let findthres = this.addColumns.filter((obj) => {
      if (obj.threshold == 'true') {
        return obj;
      }
    });
    if (!findthres.length) {
      this.addColumns.forEach((val, index) => {
        val.threshold = '';
      });
    }
  }

  getCurrentShiftHour() {
    this.addColumns = [];
    if (this.dataAPI.length && this.selectedperiod == this.periodicAPI) {
      this.addColumns = this.dataAPI;
    } else {
      // this.addColumns = []
      this.dataService.get(`config/shift?type=shift`).subscribe((res) => {
        this.shift = res['result'];
        this.hour = [];
        this.hour = this.shift[0].hour;
        if (this.addColumns.length <= 0) {
          this.hour.forEach((e) => {
            this.addColumns.push({
              cName: e,
              ctype: '',
            });
          });
        }
        this.numberofDays = this.addColumns.length;
      });
    }
  }
  deleteDaily(index) {
    this.addColumns.splice(index, 1);
  }
  dailyAdd() {
    this.addColumns.push({
      cName: '',
      type: '',
    });
  }
  submit() {
    let data = [];
    this.addColumns = this.addColumns.forEach((e, i) => {
      data.push({ subheader: this.addSubHeaderArr[i], ...e });
    });
    this.finalArr = {
      Tempname: this.tempName,
      metadata: this.addRows,
      periodicSchedule: this.selectedperiod,
      checkPeriodic: this.periodic_Check,
      subMetdata: this.subAddrows,
      columns: data,
      approval: this.approvalList,
      subColumns: this.addsubColfirst,
      subColsec: this.containers,
      mainHeader: this.mainHeader,
      subHeader: this.subHeader,
      subSecHeader: this.subSecHeader,
      mainData: this.mainData,
      subheaders: this.addSubHeaderArr,
      footerTitle: this.footerTitle,
      footer: this.addFooterData,
      pdf: this.uploadData,
      shiftData: this.shiftData,
      currentDate: this.Currentdate,
      shiftNote: this.shiftNote,
      formatData: this.formatData,
      revisionNOData: this.revisionNOData,
      revisionDateData: this.revisionDateData,
      footerInstruction: this.footerInstruction,
      problemFooter: this.footerProbArr,
    };
    this.dataService
      .put('checklist/template/' + this.localtempName, this.finalArr)
      .subscribe((res: any) => {
        if (res['result']) {
          this.toastr.success(`${this.localtempName} Template Updated`);
          this.returnToTemplate();
        }
      });
  }
  deleteColumnRoWHeaders(index: any, j) {
    this.addSubHeaderArr[index].splice(j, 1);
  }
  deleteRow(index) {
    this.addRows.splice(index, 1);
  }

  subDeleteRow(index) {
    this.subAddrows.splice(index, 1);
  }
  fieldSelect(e, i) {
    if (e === 'Custom') {
      this.customBool[i] = true;
    } else {
      this.customBool[i] = false;
    }
  }
  headerTypeChange(e, i) {
    e.fillType = '';
    e.fillFrom = '';
    e.autoFillValue = '';
    e.dateFormat = '';
    this.showAutoFillDropDown[i] = false;
    this.showDropDownValues[i] = false;
    this.showDateAutoFill[i] = false;
  }
  contentTypeChange(e, i) {
    e.fillType = '';
    e.fillFrom = '';
    e.autoFillValue = '';
    e.dateFormat = '';
    this.showContentAutoFillDropDown[i] = false;
    this.showContentDropDownValues[i] = false;
    this.showContentDateAutoFill[i] = false;
  }
  fillTypeSelect(e, i) {
    e.fillFrom = '';
    e.autoFillValue = '';
    e.dateFormat = '';
    if (e.mtype == 'date' && e.fillType == 'auto') {
      // this.showAutoFillDropDown[i] = false;
      this.showDateAutoFill[i] = true;
    } else {
      this.showDateAutoFill[i] = false;
      if (e.fillType == 'auto') {
        this.showAutoFillDropDown[i] = true;
      } else {
        this.showAutoFillDropDown[i] = false;
        this.showDropDownValues[i] = false;
      }
    }
  }
  selectAutoFill(e, i) {
    if (e.fillFrom == 'Configuration') {
      this.showDropDownValues[i] = true;
    } else {
      this.showDropDownValues[i] = false;
    }
  }
  selectAutoFillValue(e) {}
  contentFillTypeSelect(e, i) {
    e.fillFrom = '';
    e.autoFillValue = '';
    e.dateFormat = '';
  }
  fillTypeForDate(dateField, fillTypeDate) {
    if (fillTypeDate == 'auto') {
      this.showDateDrop = true;
    } else {
      this.showDateDrop = false;
      this.dateAutoFill = '';
    }
  }
  selectionDateType(type, filltype) {
    if (type == 'date' && filltype == 'auto') {
      this.showDateDrop = true;
    }
    if (filltype == 'manual') {
      this.Currentdate[0]['dateAutoFill'] = '';
    }
  }
  dateTypeChange() {
    this.showDateDrop = false;
    this.Currentdate[0]['dateAutoFill'] = '';
    this.Currentdate[0]['fillTypeDate'] = '';
  }
  selectionDate(val) {}
  TypeChangeShift() {
    this.shiftData[0]['fillTypeShift'] = '';
    this.shiftData[0]['fillFromShift'] = '';
    this.shiftData[0]['autoFillValueShift'] = '';
    this.showShiftDrop = false;
    this.showShiftDropValue = false;
  }
  fillTypeForShift(fillTypeShift) {
    if (fillTypeShift == 'auto') {
      this.showShiftDrop = true;
    } else {
      this.showShiftDrop = false;
      this.showShiftDropValue = false;
      this.shiftData[0]['fillFromShift'] = '';
      this.shiftData[0]['autoFillValueShift'] = '';
    }
  }
  selectAutoFillShift(autoFill) {
    if (autoFill == 'Configuration') {
      this.showShiftDropValue = true;
    }
  }
  selectAutoFillValueShift(e) {}
  togglesubHeader(e, i, data) {
    this.togglesubheaderMarked[i] = e.target.checked;
    if (e.target.checked) {
      (data.autoFillValue = ''),
        (data.fillFrom = ''),
        (data.fillType = ''),
        (data.dateFormat = '');
    }
    if (this.togglesubheaderMarked[i] !== true) {
      data.fillType = '';
      data.subheader = [];
    }
    if (!data.subheader) {
      this.addSubHeaderArr[i] = [];
      this.addSubHeaderArr[i].push({
        csName: '',
        cstype: '',
      });
    }
    // if (e.target.checked === true) {
    //   this.addsubHeadColumn(i);
    // }
    // else {
    //   this.addSubHeaderArr[i] = [{ csName: '', cstype: '' }];
    // }
  }
  addsubHeadColumn(index) {
    if (this.addSubHeaderArr.length <= index) {
      this.addSubHeaderArr.push([]);
    }
    this.addSubHeaderArr[index].push({
      csName: '',
      cstype: '',
    });
  }
  openModal(template: any, data: any, act: any) {
    this.action = act;
    if (this.addColumns.length == 0) {
      this.addColumn();
    } else if (this.addsubColfirst.length == 0) {
      this.addsubColumn1();
    } else if (this.multiHeader.length == 0) {
      this.addsubColumnsec();
    }
    this.modalService.open(template, {
      size: 'lg',
      backdrop: false,
      centered: true,
    });
  }
  openWidgetEditorDialog(template: any, data: any, act: any) {
    if (this.widgetEditorDialogRef) {
      return;
    }
    this.action = act;
    if (this.addColumns.length == 0) {
      this.addColumn();
    } else if (this.addsubColfirst.length == 0) {
      this.addsubColumn1();
    } else if (this.multiHeader.length == 0) {
      this.addsubColumnsec();
    } else if (this.addFooterData.length == 0) {
      this.addFooter();
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.role = 'dialog';
    dialogConfig.width = '1500px';
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
  openDialogForPeriodic(template: any, data: any, act: any) {
    if (this.widgetEditorDialogRef) {
      return;
    }
    this.action = act;
    // this.tempname = data.Tempname;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.role = 'dialog';
    dialogConfig.width = '500px';
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

  returnToTemplate() {
    this.addRows = [];
    this.addColumns = [];
    this.approvalList = [];
    this.addsubColfirst = [];
    this.addsubColsec = [];
    this.addFooterData = [];
    this.router.navigate(['mainpage/template/list']);
  }

  cancel() {
    // this.addColumns = [];
    // this.addSubHeaderArr = [];
    // this.togglesubheaderMarked = [false];
    // this.showSubheader = false;
    // this.periodic_Check = false;
    this.modalService.dismissAll();
  }
  footerCancel() {
    // this.addFooterData = [];
    this.modalService.dismissAll();
  }

  colSubmit() {
    this.modalService.dismissAll();
  }

  subColSecSubmit() {
    this.modalService.dismissAll();
  }
  subSecCancel() {
    this.modalService.dismissAll();
  }

  deleteColumnRow(index: any) {
    this.addColumns.splice(index, 1);
  }
  footerDelete(index) {
    this.addFooterData.splice(index, 1);
  }

  deleteColumnOne(index: any) {
    this.addsubColfirst.splice(index, 1);
  }
  deleteFooterProb(index: any) {
    this.footerProbArr.splice(index, 1);
  }
  deleteColumnSec(index: any) {
    this.addsubColsec.splice(index, 1);
  }
  roleData() {
    this.dataService.get('config/role').subscribe((res) => {
      this.role = res['result'];
    });
  }
  addMe() {
    this.containers.push(this.addsubColsec);
  }
  approvalDelete(index) {
    this.approvalList.splice(index, 1);
  }
  onFileSelected(event: any): void {
    this.file1 = event.target.files[0];
    if (this.file1) {
      this.fileBool = true;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fileData = e.target.result;
      };
      reader.readAsArrayBuffer(this.file1);
    }
    var formData: any = new FormData();
    formData.append('file', this.file1);
    this.dataService
      .post('checklist/uploadPdf', formData)
      .subscribe((res: any) => {
        this.uploadData = res;
      });
  }
  getPDF() {
    var file = new Blob([this.file1], { type: 'application/pdf' });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
    var a = document.createElement('a');
    a.href = fileURL;
    document.body.appendChild(a);
  }
}
