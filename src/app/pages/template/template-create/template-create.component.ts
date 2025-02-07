import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  Renderer2,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../../shared/data.service';
import * as momenttz from 'moment-timezone';

import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

declare var $: any;
@Component({
  selector: 'app-template-create',
  templateUrl: './template-create.component.html',
  styleUrls: ['./template-create.component.scss'],
})
export class TemplateCreateComponent implements OnInit {
  @ViewChild('widgetEditorModal') public widgetEditorModal: TemplateRef<any>;
  private widgetEditorDialogRef: MatDialogRef<TemplateRef<any>>;
  isModalOpen = false;
  subAddrows: any = [];
  addColumns: any = [];
  tempName: any;
  finalArr: any;
  columns: any = [];
  customBool: boolean[] = [false];
  action: any;
  type: any;
  permission: any = [];
  cName: any;
  ctype: any = [];
  approvalList: any = [];
  role: any;
  addsubColfirst: any = [];
  footerProbArr: any = [];
  addsubColsec: any = [];
  addRows: any = [];
  addsHeader: any = [];
  mainHeader: any;
  subHeader: any;
  footerTitle: any;
  footerInstruction: any;
  subSecHeader: any;
  footerCheck: any;
  fprobCheck: any;
  mvalue: any;
  mName: any;
  noOfInstances: any;
  numberofDays: any;
  selectedperiod: any;
  mainData: any = [];
  containers = [];
  periodicBox = ['Daily', 'Shift'];
  shiftwise = [
    'Start of the Shift',
    'Number of Instances',
    'End of the Shift',
    'Hourly',
  ];
  periodicHeader = ['Header', 'Sub Header'];
  dayArray = [];
  marked: boolean = false;
  metaMarked: boolean = false;
  submetaMarked: boolean = false;
  mainheaderMarked: boolean = false;
  subheaderMarked: boolean = false;
  approvalMarked: boolean = false;
  selectDaily: boolean = false;
  // startofshift: boolean = false;
  footerMarked: boolean = false;
  fprobMarked: boolean = false;
  togglesubheaderMarked: boolean[] = [false];
  togglesubheaderTwoMarked: boolean[] = [false];
  periodicSubHeader: boolean[] = [false];
  showRadioButton: boolean = false;
  showShiftWise: boolean = false;
  instances: boolean = false;
  shift;
  detail;
  periodicschelude;
  subheaderPeriodic;
  meta;
  subMeta;
  mainHeaderCheck;
  subHeaderCheck;
  approvalCheck;
  togglesHead;
  togglesHeadtwo;
  addSubHeaderArr: any[] = [];
  fileData;
  file1;
  uploadData;
  date: any;
  options: any;
  dateFormat: any;
  addFooterData: any = [];
  subHour: any = [];
  headerHour: any = [];
  current_date_header: any = [];
  current_date_sub: any = [];
  userName: string;
  hour: any;
  selectInstant: boolean = false;
  showSubheader: boolean = false;
  name: string;
  part: any;
  PartId: any;
  multiSelectRole = new FormControl();
  selectedHeader: any;
  selectedShift: any;
  shiftFlag: boolean = false;
  getThresFlag: boolean = false;
  checkedBool: any;
  allShifts: any;
  showSubPeriodicIndex;
  headerbool: boolean = false;
  fileBool: boolean = false;
  fillTypeFormat: any;
  formatNo: any;
  formattype: any;
  pageFillformat: any;
  permissionFormat: any;
  fillTypeRevisionDate: any;
  permissionRevisionDate: any;
  pagerevisionDate: any;
  revisionDatetype: any;
  revisionDate: any;
  revisionNO: any;
  revisionNOType: any;
  pagerevisionNO: any;
  permissionRevisionNO: any;
  fillTypeRevisionNo: any;
  pageFillShift: any;
  permissionshift: any;
  fillTypeShift: any;
  shiftType: any;
  shiftNo: any;
  shiftData: any = [];
  pageFillDate: any;
  permissionDate: any;
  fillTypeDate: any;
  dateType: any;
  Currentdate: any;
  dateData: any = [];
  shiftNote: any;
  fillFromShift: any;
  autoFillValueShift: any;

  showAutoFillDropDown: boolean[] = [false];
  showContentAutoFillDropDown: boolean[] = [false];
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
      value: 'Operation',
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
  showContentDropDownValues: boolean[] = [false];
  showSubContentAutoFillDropDown: boolean[] = [false];
  showSubContentDropDownValues: boolean[] = [false];
  showShiftDrop: boolean = false;
  showShiftDropValue: boolean = false;
  showDateDrop: boolean = false;
  dateAutoFill: any;
  constructor(
    private router: Router,
    private dataService: DataService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.formatNo = 'FORMAT NO';
    this.revisionDate = 'REVISION DATE';
    this.revisionNO = 'REVISION NO';
    this.shiftNo = 'SHIFT';
    this.Currentdate = 'DATE';
    this.userName = sessionStorage.getItem('user');
    this.roleData();
    this.MasterHead();
    this.getPart();
    setInterval(() => {
      this.date = momenttz(new Date());
      this.options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      this.dateFormat = new Intl.DateTimeFormat('en-US', this.options).format(
        this.date
      );
    }, 1000);
  }

  toggleVisibility(e) {
    this.marked = e.target.checked;
  }
  toggleMeta(e) {
    this.metaMarked = e.target.checked;
  }
  togglesubMeta(e) {
    this.submetaMarked = e.target.checked;
  }
  togglemainHeaderCheck(e) {
    this.mainheaderMarked = e.target.checked;
  }
  togglesubHeaderCheck(e) {
    this.subheaderMarked = e.target.checked;
  }
  togglefprobCheck(e) {
    this.fprobMarked = e.target.checked;
  }
  toggleFooterCheck(e) {
    this.footerMarked = e.target.checked;
  }
  toggleapprovalCheck(e) {
    this.approvalMarked = e.target.checked;
  }
  subheaderIndex;
  togglesubHeader(e, i, data) {
    this.subheaderIndex = i;
    if (e.target.checked) {
      (data.autoFillValue = ''),
        (data.fillFrom = ''),
        (data.fillType = ''),
        (data.dateFormat = '');
    }
    this.togglesubheaderMarked[i] = e.target.checked;

    if (this.addSubHeaderArr[i] && this.addSubHeaderArr[i].length >= 0) {
      this.addSubHeaderArr[i] = this.addSubHeaderArr[i];
    } else {
      this.addSubHeaderArr[i] = [{ csName: '', cstype: '' }];
      if (this.showSubPeriodicIndex == i) {
        this.addsubHeadColumn(i);
      }
    }

    // if (e.target.checked === true) {
    //   // this.addsubHeadColumn(i);
    // } else {
    //   this.addSubHeaderArr[i] = [{ csName: '', cstype: '', noSubheader: '' }];

    // }
  }
  togglesubHeadertwo(e, i) {
    this.togglesubheaderTwoMarked[i] = e.target.checked;
  }

  roleData() {
    this.dataService.get('config/role').subscribe((res) => {
      this.role = res['result'];

      this.addrow();
      // this.subAdd();
    });
  }
  MasterHead() {
    this.mainData.push({
      mName: '',
      // mvalue: '',
      mtype: '',
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
  subAdd() {
    this.subAddrows.push({
      sName: '',
      type: '',
    });
  }
  addColumn() {
    if (this.addColumns.length != 0) {
      let checked = this.addColumns.filter((obj) => {
        if (obj.checked == 'true' || obj.threshold == 'true') {
          return obj;
        }
      });
      if (checked.length && (checked[0].checked || checked[0].threshold)) {
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
      // let checkThreshold = this.addColumns.filter((obj) => {
      //   if (obj.threshold == 'true') {
      //     return obj;
      //   }
      // });
      // if (this.getThresFlag && checkThreshold.length && checkThreshold[0].threshold) {
      //   this.addColumns.push({
      //     cName: '',
      //     ctype: '',
      //     periodic: false,
      //     checked: 'false',
      //     threshold: 'false',
      //   });
      // }
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
  addsubHeadColumn(index) {
    if (
      this.selectedperiod == '' ||
      this.selectedHeader == undefined ||
      this.selectedHeader == 'Header'
    ) {
      this.addSubHeaderArr[index].push({
        csName: '',
        cstype: '',
      });
    } else if (
      this.selectedperiod == 'Daily' &&
      this.selectedHeader == 'Sub Header'
    ) {
      if (this.showSubPeriodicIndex == index) {
        if (this.current_date_sub.length == 0) {
          this.addSubHeaderArr[index] = [];
          this.current_date_sub = Array.from(
            Array(momenttz().daysInMonth()),
            (_, i) => i + 1
          );
          let startofmonth = momenttz.tz().startOf('month').date();

          this.current_date_sub.forEach((e) => {
            if (e == startofmonth) {
              this.addSubHeaderArr[index].push({
                csName: 'Day-' + e,
                cstype: 'text',
                pageFill: 'master',
                permission: ['SUPERADMIN'],
                fillType: 'manual',
                periodic: true,
                applytoall: true,
                fillFrom: '',
                autoFillValue: '',
                dateFormat: '',
              });
            } else {
              this.addSubHeaderArr[index].push({
                csName: 'Day-' + e,
                cstype: '',
                periodic: true,
                applytoall: false,
                fillFrom: '',
                autoFillValue: '',
                dateFormat: '',
              });
            }
          });
        } else {
          this.addSubHeaderArr[index].push({
            csName: '',
            cstype: '',
          });
        }
      } else {
        if (
          this.addSubHeaderArr[index] != undefined &&
          this.addSubHeaderArr[index].length != 0
        ) {
          this.addSubHeaderArr[index].push({
            csName: '',
            cstype: '',
          });
        } else {
          this.addSubHeaderArr[index] = [];
          this.addSubHeaderArr[index].push({
            csName: '',
            cstype: '',
          });
        }
      }
    } else if (
      this.selectedperiod == 'Start of the Shift' ||
      this.selectedperiod == 'End of the Shift' ||
      (this.selectedperiod == 'Hourly' && this.selectedHeader == 'Sub Header')
    ) {
      if (this.showSubPeriodicIndex == index) {
        if (this.subHour.length == 0) {
          this.addSubHeaderArr[index] = [];
          this.dataService
            .get(`config/shift?shiftName=${this.selectedShift}`)
            .subscribe((res) => {
              this.shift = res['result'];
              this.subHour = this.shift[0].hour;
              this.subHour.forEach((e) => {
                if (e == this.subHour[0]) {
                  this.addSubHeaderArr[index].push({
                    csName: e,
                    cstype: 'text',
                    pageFill: 'master',
                    permission: ['SUPERADMIN'],
                    fillType: 'manual',
                    periodic: true,
                    applytoall: true,
                  });
                } else {
                  this.addSubHeaderArr[index].push({
                    csName: e,
                    cstype: '',
                    periodic: true,
                    applytoall: false,
                  });
                }
              });
            });
        } else {
          this.addSubHeaderArr[index].push({
            csName: '',
            cstype: '',
          });
        }
      } else {
        if (
          this.addSubHeaderArr[index] != undefined &&
          this.addSubHeaderArr[index].length != 0
        ) {
          this.addSubHeaderArr[index].push({
            csName: '',
            cstype: '',
          });
        } else {
          this.addSubHeaderArr[index] = [];
          this.addSubHeaderArr[index].push({
            csName: '',
            cstype: '',
          });
        }
      }
    } else if (
      this.selectedperiod == 'Number of Instances' &&
      this.selectedHeader == 'Sub Header'
    ) {
      if (this.showSubPeriodicIndex == index) {
        this.addSubHeaderArr[index] = [];
        for (let i = 0; i < this.noOfInstances; i++) {
          this.addSubHeaderArr[index].push({
            csName: '',
            cstype: '',
            // periodic: true
          });
        }
      } else {
        this.addSubHeaderArr[index].push({
          csName: '',
          cstype: '',
          // periodic: true
        });
      }
    }
  }
  addsubColumn1() {
    this.addsubColfirst.push({
      fcName: '',
      fctype: '',
    });
  }
  footerProb() {
    this.footerProbArr.push({});
  }
  addFooter() {
    this.addFooterData.push({
      fName: '',
      fType: '',
    });
  }
  addsubColumnsec() {
    this.addsubColsec.push({
      secName: '',
      sectype: '',
    });
  }
  addApprovalList() {
    let levelno = this.approvalList.length + 1;
    this.approvalList.push({
      level: levelno,
      approvalPersonName: '',
    });
  }

  showPeriodic(e) {
    if (e.target.checked == false) {
      this.showShiftWise = false;
      this.selectInstant = false;
      this.instances = false;
      this.selectedperiod = '';
      this.shiftFlag = false;
      this.headerbool = false;
      this.addColumns = [];
      this.addColumn();
    } else {
      // Do Nothing
    }
    this.showRadioButton = e.target.checked;
  }
  selectHeader(header) {
    // this.addColumns = []
    // this.addSubHeaderArr = []

    this.selectedHeader = header;
    this.headerbool = true;

    if (header == 'Header') {
      this.showSubheader = false;
      // let data = [];
      // this.addSubHeaderArr.forEach((e) => {
      //   if (e.length >= 0) {
      //     e.map((f) => {
      //       if (f.periodic == true) {
      //         e.pop();
      //         e = [{ csName: '', cstype: '' }];
      //       }
      //     });
      //   }

      //   data.push(e);
      // });
      // this.addSubHeaderArr = data;

      if (
        this.selectedperiod == 'Start of the Shift' ||
        this.selectedperiod == 'End of the Shift' ||
        this.selectedperiod == 'Hourly'
      ) {
        this.dataService
          .get(`config/shift?shiftName=${this.selectedShift}`)
          .subscribe((res) => {
            this.showSubheader = false;
            this.shift = res['result'];
            this.headerHour = [];
            this.headerHour = this.shift[0].hour;
            this.headerHour.forEach((e) => {
              if (e == this.headerHour[0]) {
                this.addColumns.push({
                  cName: e,
                  ctype: 'text',
                  pageFill: 'master',
                  permission: ['SUPERADMIN'],
                  fillType: 'manual',
                  periodic: true,
                  applytoall: true,
                });
              } else {
                this.addColumns.push({
                  cName: e,
                  ctype: '',
                  pageFill: '',
                  permission: [],
                  fillType: '',
                  periodic: true,
                  applytoall: false,
                });
              }
            });

            this.numberofDays = this.addColumns.length;
          });
      } else if (this.selectedperiod == 'Daily') {
        this.showSubheader = false;
        let current_date = Array.from(
          Array(momenttz().daysInMonth()),
          (_, i) => i + 1
        );
        this.numberofDays = current_date.length;
        let month = momenttz.tz().format('MMM');
        let startofmonth = momenttz.tz().startOf('month').date();

        current_date.forEach((e) => {
          if (e == startofmonth) {
            this.addColumns.push({
              cName: 'Day-' + e,
              ctype: 'text',
              pageFill: 'master',
              permission: ['SUPERADMIN'],
              fillType: 'manual',
              threshold: 'false',
              periodic: true,
              applytoall: true,
              fillFrom: '',
              autoFillValue: '',
              dateFormat: '',
            });
          } else {
            this.addColumns.push({
              cName: 'Day-' + e,
              ctype: '',
              periodic: true,
              applytoall: false,
              threshold: 'false',
              fillFrom: '',
              autoFillValue: '',
              dateFormat: '',
            });
          }
        });
      } else {
        this.showSubheader = false;
        for (let i = 0; i < this.noOfInstances; i++) {
          this.addColumns.push({
            cName: '',
            ctype: '',
            instances: true,
            // periodic: true
          });
        }
      }
    } else if (header == 'Sub Header') {
      // this.addColumn()
      this.showSubheader = true;
      // this.showShiftWise = false;
      if (this.addColumns.length >= 0) {
        this.addColumns = this.addColumns.filter((obj) => {
          return obj.periodic !== true;
        });
      }
      if (this.addColumns.length >= 0) {
        this.addColumns = this.addColumns.filter((obj) => {
          return obj.instances !== true;
        });
      }

      // this.addColumn();
    } else {
      this.showSubheader = false;
      this.addColumns = [];
      this.addColumn();
    }
  }
  showSubPeriodic(event, i) {
    this.showSubPeriodicIndex = i;

    if (event.target.checked) {
      this.addColumns.forEach((val, index) => {
        if (i == index) {
          val.checked = 'true';
        } else {
          val.checked = 'false';
        }
      });
    } else {
      this.current_date_sub = [];
      this.subHour = [];

      this.addColumns.forEach((val, index) => {
        val.checked = 'true';
      });
      // this.addSubHeaderArr[i] = [];
      // this.addSubHeaderArr[i].push({
      //   csName: '',
      //   cstype: '',
      //   // periodic:true
      // });
    }
    this.periodicSubHeader[i] = event.target.checked;

    // // this.checkedBool = this.checkedBool === i ? null : i;
  }

  periodChange(period) {
    if (period == 'Shift') {
      this.showSubheader = false;
      this.showShiftWise = true;
      this.instances = false;
      this.selectDaily = false;
    } else {
      this.selectedperiod = period;
      if (this.addColumns.length > 0) {
        this.addColumns = [];
      }
      this.showShiftWise = false;
      this.shiftFlag = false;
      // this.selectInstant = false;
      this.showSubheader = false;
      this.instances = false;
      this.selectDaily = true;
    }
  }

  getShiftSelection(e) {
    this.selectedperiod = e.value;
    this.addColumns = [];

    if (
      this.selectedperiod == 'Start of the Shift' ||
      this.selectedperiod == 'End of the Shift' ||
      this.selectedperiod == 'Hourly'
    ) {
      this.getShift();
      this.shiftFlag = true;
      // this.showShiftWise = true;
    } else {
      this.shiftFlag = false;
    }
    if (e.value == 'Number of Instances') {
      this.instances = true;
      // this.selectInstant = true
    } else {
      this.instances = false;
      // this.selectInstant = false
    }
  }
  shiftSelect(event) {
    this.selectedShift = event;
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
  applyToAllHeader(e) {
    if (e.target.checked == false) {
      this.addColumns.forEach((col) => {
        if (col.periodic == true && col.applytoall == false) {
          (col.cName = col.cName),
            (col.ctype = ''),
            (col.fillType = ''),
            (col.pageFill = ''),
            (col.permission = ''),
            (col.threshold = ''),
            (col.periodic = col.periodic),
            (col.applytoall = col.applytoall);
        }
      });
    } else {
      let filterarray = this.addColumns.filter((e) => {
        return e.periodic == true && e.applytoall == true;
      });
      this.addColumns.forEach((col) => {
        if (col.periodic == true && col.applytoall == false) {
          (col.cName = col.cName),
            (col.ctype = filterarray[0].ctype),
            (col.fillType = filterarray[0].fillType),
            (col.pageFill = filterarray[0].pageFill),
            (col.permission = filterarray[0].permission),
            (col.threshold = filterarray[0].threshold);
          (col.periodic = col.periodic), (col.applytoall = col.applytoall);
        }
      });
    }
  }
  applyToAllsubHeader(e, i) {
    if (e.target.checked == false) {
      this.addSubHeaderArr[i].forEach((col) => {
        if (col.periodic == true && col.applytoall == false) {
          (col.csName = col.csName),
            (col.cstype = ''),
            (col.fillType = ''),
            (col.pageFill = ''),
            (col.permission = ''),
            (col.periodic = col.periodic),
            (col.applytoall = col.applytoall);
        }
      });
    } else {
      let filterarray = this.addSubHeaderArr[i].filter((e) => {
        return e.periodic == true && e.applytoall == true;
      });
      this.addSubHeaderArr[i].forEach((col) => {
        if (col.periodic == true && col.applytoall == false) {
          (col.csName = col.csName),
            (col.cstype = filterarray[0].cstype),
            (col.fillType = filterarray[0].fillType),
            (col.pageFill = filterarray[0].pageFill),
            (col.permission = filterarray[0].permission),
          (col.periodic = col.periodic), (col.applytoall = col.applytoall);
        }
      });
    }
  }
  dailyAdd() {
    this.addColumns.push({
      cName: '',
      type: '',
    });
  }
  deleteDaily(index) {
    this.addColumns.splice(index, 1);
  }
  getPart() {
    this.dataService.get(`config/cycletime`).subscribe((res) => {
      if (res) {
        this.part = res['result'];
      }
    });
  }
  getShift() {
    this.dataService.get('config/shift').subscribe((res) => {
      this.allShifts = res['result'];
    });
  }
  formatData: any = [];
  revisionNOData: any = [];
  revisionDateData: any = [];
  headerTypeChange(e, i) {
    e.fillType = '';
    e.fillFrom = '';
    e.autoFillValue = '';
    e.dateFormat = '';
    this.showAutoFillDropDown[i] = false;
    this.showDropDownValues[i] = false;
    this.showDateAutoFill[i] = false;
  }
  fillTypeSelect(e, i) {
    e.fillFrom = '';
    e.autoFillValue = '';
    e.dateFormat = '';
    if (e.mtype == 'date' && e.fillType == 'auto') {
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
  contentTypeChange(e, i) {
    e.fillType = '';
    e.fillFrom = '';
    e.autoFillValue = '';
    e.dateFormat = '';
  }
  contentFillTypeSelect(e, i) {
    e.fillFrom = '';
    e.autoFillValue = '';
    e.dateFormat = '';
  }
  subContentFillTypeSelect(e, i) {
    e.fillFrom = '';
    e.autoFillValue = '';
  }
  fillTypeForShift(shiftField, fillTypeShift) {
    if (fillTypeShift == 'auto') {
      this.showShiftDrop = true;
    } else {
      this.showShiftDrop = false;
      this.showShiftDropValue = false;
      this.fillFromShift = '';
      this.autoFillValueShift = '';
    }
  }
  fillTypeForDate(dateField, fillTypeDate) {
    if (fillTypeDate == 'auto') {
      this.showDateDrop = true;
    } else {
      this.showDateDrop = false;
      this.dateAutoFill = '';
    }
  }
  selectAutoFillShift(autoFill) {
    if (autoFill == 'Configuration') {
      this.showShiftDropValue = true;
    }
  }
  selectAutoFillValueShift(e) {}
  shiftTypeChange() {
    this.fillTypeShift = '';
    this.fillFromShift = '';
    this.autoFillValueShift = '';
  }
  dateTypeChange() {
    this.showDateDrop = false;
    this.dateAutoFill = '';
    this.fillTypeDate = '';
  }
  selectionDate(e) {}
  submit() {
    this.finalArr = [];
    let data = [];

    if (this.addSubHeaderArr.length != 0) {
      this.addColumns = this.addColumns.forEach((e, i) => {
        if (this.addSubHeaderArr[i]?.length > 0) {
          data.push({
            subheader: this.addSubHeaderArr[i],
            ...e,
          });
        } else if (this.addSubHeaderArr[i]?.length == 0) {
          this.addSubHeaderArr[i] = [
            { csName: '', cstype: '', noSubHeader: true },
          ];
          data.push({ subheader: this.addSubHeaderArr[i], ...e });
        } else if (this.addSubHeaderArr[i] == null) {
          // this.addSubHeaderArr[i] = [{ csName: '', cstype: '' }];
          this.addSubHeaderArr[i] = [
            { csName: '', cstype: '', noSubHeader: true },
          ];
          data.push({ subheader: this.addSubHeaderArr[i], ...e });
        }
      });
    }

    if (this.periodicValue == 'Daily') {
      this.formatData = {
        formatNo: this.formatNo,
        formatValue: '',
        formattype: this.formattype,
        fillTypeFormat: this.fillTypeFormat,
        pageFillformat: this.pageFillformat,
        permissionFormat: this.permissionFormat,
      };
      this.revisionNOData = {
        revisionNo: this.revisionNO,
        revisionNoValue: '',
        revisionNOType: this.revisionNOType,
        fillTypeRevisionNo: this.fillTypeRevisionNo,
        permissionRevisionNO: this.permissionRevisionNO,
        pagerevisionNO: this.pagerevisionNO,
      };
      this.revisionDateData = {
        revisionDate: this.revisionDate,
        revisionDateValue: '',
        revisionDatetype: this.revisionDatetype,
        fillTypeRevisionDate: this.fillTypeRevisionDate,
        permissionRevisionDate: this.permissionRevisionDate,
        pagerevisionDate: this.pagerevisionDate,
      };
    } else if (this.periodicValue == 'Shift') {
      this.shiftData = {
        shift: this.shiftNo,
        shiftValue: '',
        shiftType: this.shiftType,
        fillTypeShift: this.fillTypeShift,
        permissionshift: this.permissionshift,
        pageFillShift: this.pageFillShift,
        fillFromShift: this.fillFromShift,
        autoFillValueShift: this.autoFillValueShift,
      };
      this.dateData = {
        date: this.Currentdate,
        dateValue: '',
        dateType: this.dateType,
        fillTypeDate: this.fillTypeDate,
        permissionDate: this.permissionDate,
        pageFillDate: this.pageFillDate,
        dateAutoFill: this.dateAutoFill,
      };
      this.shiftNote = '';
    } else {
      this.formatData = [];
      this.revisionDateData = [];
      this.revisionNOData = [];
      // this.shiftData = [];
      // this.dateData = [];
      // this.shiftNote = '';
    }

    this.finalArr = {
      Tempname: this.tempName,
      PartId: this.PartId,
      metadata: this.addRows,
      subMetdata: this.subAddrows,
      columns: data.length != 0 ? data : this.addColumns,
      periodicSchedule: this.selectedperiod,
      shiftName: this.selectedShift,
      periodicPosition: this.selectedHeader,
      checkPeriodic: this.showRadioButton,
      noOfInstances: this.noOfInstances,
      subColumns: this.addsubColfirst,
      problemFooter: this.footerProbArr,
      subColsec: this.containers,
      approval: this.approvalList,
      mainHeader: this.mainHeader,
      subHeader: this.subHeader,
      subSecHeader: this.subSecHeader,
      mainData: this.mainData,
      shiftData: this.shiftData,
      currentDate: this.dateData,
      shiftNote: this.shiftNote,
      formatData: this.formatData,
      revisionNOData: this.revisionNOData,
      revisionDateData: this.revisionDateData,
      subheaders: this.addSubHeaderArr,
      footerTitle: this.footerTitle,
      footerInstruction: this.footerInstruction,
      footer: this.addFooterData,
      pdf: this.uploadData,
      createdBy: this.userName,
    };
    this.dataService.post('checklist/template', this.finalArr).subscribe(
      (res: any) => {
        if (res['result']) {
          this.toastr.success('Template created');
          this.returnToTemplate();
        } else {
        }
      },
      (error) => {
        if (error) {
          this.toastr.error(error.error.message);
        } else {
          this.toastr.error('Template is Not Created');
        }
      }
    );
  }

  fieldSelect(e, i) {
    if (e === 'Custom') {
      this.customBool[i] = true;
    } else {
      this.customBool[i] = false;
    }
  }
  openModal(template: any, data: any, act: any) {
    this.action = act;
    if (this.addColumns.length == 0) {
      this.addColumn();
    }
    if (this.addsubColfirst.length == 0) {
      this.addsubColumn1();
    }
    if (this.addsubColsec.length == 0) {
      this.addsubColumnsec();
    }
    if (this.addFooterData.length == 0) {
      this.addFooter();
    }
    this.modalService.open(template, {
      size: 'lg',
      backdrop: false,
      centered: true,
    });
  }
  openWidgetEditorDialog(template: any, data: any, act: any) {
    this.showContentAutoFillDropDown[0] = false;
    this.showContentDropDownValues[0] = false;
    if (this.widgetEditorDialogRef) {
      return;
    }
    this.action = act;
    if (this.addColumns.length == 0) {
      this.addColumn();
    }
    if (this.addsubColfirst.length == 0) {
      this.addsubColumn1();
    }
    if (this.addsubColsec.length == 0) {
      this.addsubColumnsec();
    }
    if (this.addFooterData.length == 0) {
      this.addFooter();
    }
    if (this.footerProbArr.length == 0) {
      this.footerProb();
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.role = 'dialog';
    dialogConfig.width = '2000px';
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
    this.subAddrows = [];
    this.addColumns = [];
    this.addsubColfirst = [];
    this.footerProbArr = [];
    this.addsubColsec = [];
    this.approvalList = [];
    this.mainData = [];
    this.addFooterData = [];
    this.router.navigate(['mainpage/template/list']);
  }
  cancel() {
    this.addColumns = [];
    this.addSubHeaderArr = [];
    this.togglesubheaderMarked = [false];
    this.showSubheader = false;
    this.headerbool = false;
    this.showSubPeriodicIndex = '';
    this.modalService.dismissAll();
  }

  subCancel() {
    this.addsubColfirst = [];
    this.modalService.dismissAll();
  }

  subSecCancel() {
    this.addsubColsec = [];
    this.modalService.dismissAll();
  }

  colSubmit() {
    this.modalService.dismissAll();
  }
  subcolSubmit() {
    this.modalService.dismissAll();
  }

  subColSecSubmit() {
    this.modalService.dismissAll();
  }
  footerCancel() {
    this.addFooterData = [];
    this.modalService.dismissAll();
  }
  footerProbCancel() {
    this.footerProbArr = [];
    this.modalService.dismissAll();
  }

  deleteColumnRow(index: any) {
    this.addColumns.splice(index, 1);
  }

  deleteColumnRoWHeaders(index: any, j) {
    this.addSubHeaderArr[index].splice(j, 1);
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
  deleteRow(index) {
    this.addRows.splice(index, 1);
  }
  subDeleteRow(index) {
    this.subAddrows.splice(index, 1);
  }
  footerDelete(index) {
    this.addFooterData.splice(index, 1);
  }

  approvalDelete(index) {
    this.approvalList.splice(index, 1);
  }

  addMe() {
    this.addsubColsec = [];
    this.containers.push(this.addsubColsec);
  }

  onFileSelected(event: any): void {
    // var tmppath = URL.createObjectURL(event.target.files[0]);
    // let path = $('img').fadeIn('fast').attr('src', tmppath);

    this.file1 = event.target.files[0];
    if (this.file1) {
      this.fileBool = true;
      const reader = new FileReader();

      reader.onload = (e: any) => {
        // e.target.result contains the this.file1 data, you can send it to a server or process it locally.
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
  periodicValue;
  getKey(k, a) {
    this.periodicValue = a;
  }
}
