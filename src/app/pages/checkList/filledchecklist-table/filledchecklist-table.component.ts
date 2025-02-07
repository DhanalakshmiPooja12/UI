import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import '@angular/localize/init';
import { DataService } from '../../../shared/data.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as momenttz from 'moment-timezone';
import * as moment from 'moment';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-filledchecklist-table',
  templateUrl: './filledchecklist-table.component.html',
  styleUrls: ['./filledchecklist-table.component.scss'],
})
export class FilledchecklistTableComponent implements OnInit, AfterViewInit {
  @ViewChild('myTable', { static: false }) myTable: ElementRef;

  shift: any;
  plant: any;
  machine: any;
  zone: any;
  part: any;
  plantName: any;
  localmasterName: any;
  formData: any = {};
  shiftName: any;
  machineName: any;
  imageUrl: any;
  selectTempname: any;
  tempArray: any;
  addData: any;
  tempName: any;
  MasterName: any;
  rows: any;
  periodChecklist = 'Period Check';
  localPermission: any;
  subrows: any = [];
  colsubrows: any = [];
  colsubsecRows: any = [];
  metadatarow: any = [];
  subsecCol: any;
  metadataAdd: any;
  subCol: any;
  sudAdd: any;
  mData: any;
  listData: any = {};
  fillListData: any;
  checkListData: any;
  department: any;
  dName: any;
  submitbool: boolean = false;
  footer: any = [];
  footerData: any = [];
  footerTitle;
  footerCol;
  approvalData: any;
  approvalList: any = [];
  createdBy: any;
  sentToApproval: boolean = false;
  addApproval: any = {};
  subHbool: boolean = false;
  subHeaderLen: any;
  subHeaderMain: any = [];
  mainData: any;
  current_date: any;
  addData1: any = [];
  subHbool1: boolean = false;
  periodicSchedule: any;
  periodicPosition: any;
  periodFlag: boolean = false;
  masterHeader: any = [];
  masterBody: any = [];
  masterFooter: any = [];
  masterInstruction: any = [];
  lastMasterArray: any = [];
  listHeader: any = [];
  listBody: any = [];
  listFooter: any = [];
  listInstruction: any = [];
  lastlistArray: any = [];
  shiftwise = [
    'Start of the Shift',
    'Number of Instances',
    'End of the Shift',
    'Hourly',
  ];
  display: FormControl = new FormControl('', Validators.required);
  file_store: FileList;
  file_list: Array<string> = [];
  uploadData: any;
  urlData: any = [];
  data: any;
  section: any;
  hidecontentRemarks: boolean = false;
  bufferTime: any;
  timer;
  checklistName: any;
  localChecklistName;
  listStatus: any;
  url: any;
  format: any;
  pdfBool: boolean = false;
  pdf: any;
  shiftPeriod: boolean = false;
  hourFlag: boolean = false;
  imageFooterBool: boolean = false;
  imageHeaderBool: boolean = true;
  imageUrlList: any;
  revisionDateData: any;
  formatData: any;
  revisionNOData: any;
  probFootArr: any;
  footerInstruction: any;
  problemFooter: any;
  currentDateValue: any;
  shiftData: any;
  shiftNote: any;
  subInstanceFlag: boolean = false;
  instanceFlag: boolean = false;
  getToolTip: any;
  toolTipData: Object;

  constructor(
    private router: Router,
    private dataService: DataService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  localtempName: any;
  table: any;
  currentMonth: any;
  currentYear: any;
  today: any;
  ngOnInit(): void {
    this.localmasterName = sessionStorage.getItem('localmasterName');
    this.localPermission = sessionStorage.getItem('role');
    this.createdBy = sessionStorage.getItem('user');
    this.localChecklistName = sessionStorage.getItem('checklistName');
    this.currentMonth = momenttz().format('MMMM');
    this.currentYear = momenttz().format('YYYY');
    this.today = momenttz().format('DD/MM/YYYY');
    this.currentDate = new Date().toLocaleDateString();
    // this.current_date = momenttz().date();
    // this.getMasterData();
    let time = momenttz(new Date()).format('YYYY-MM-DDTHH:mm:ss');
    this.timer = time;
    setInterval(() => {
      let time = momenttz(new Date()).format('YYYY-MM-DDTHH:mm:ss');
      this.timer = time;
      if (this.periodicSchedule == 'Start of the Shift') {
        this.current_date = moment(this.timer).isBetween(
          this.startTime,
          this.bTime
        );
      } else if (this.periodicSchedule == 'End of the Shift') {
        this.current_date = moment(this.timer).isBetween(
          this.bTime,
          this.startTime
        );
      } else if (this.periodicSchedule == 'Hourly') {
        this.current_date = moment(this.timer).isBetween(
          this.startTime,
          this.bTime
        );
        if (this.current_value !== this.filterperiodic[0].csName) {
          this.current_date = false;
        }
        if (this.current_value !== this.filterperiodic[0].cName) {
          this.current_date = false;
        }
      }
    }, 10000);
    this.getListData();
    this.getTooltip();
  }
  rowWidth;
  dynamicTableWidth;
  ngAfterViewInit() {
    setTimeout(() => {
      const tableWidth = this.myTable.nativeElement.offsetWidth;
      this.dynamicTableWidth = tableWidth + 'px';
    }, 200);
  }

  getShift() {
    this.dataService.get('config/shift').subscribe((res) => {
      this.shift = res['result'];
    });
  }

  getPlant() {
    this.dataService.get('config/plant').subscribe((res) => {
      this.plant = res['result'];
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
  getMasterData() {
    this.rows = '';
    this.dataService
      .get('masterData/master/' + this.localmasterName)
      .subscribe((res) => {
        this.mData = res['result'];
        this.MasterName = this.mData[0].masterName;
        this.tempName = this.mData[0].Tempname;
        this.fieldSelect(this.tempName);
        this.plantName = this.mData[0].plantName;
        this.shiftName = this.mData[0].shiftName;
        this.machineName = this.mData[0].machineName;
        this.dName = this.mData[0].dName;
        this.metadatarow = this.mData[0].metadata;
        this.rows = this.mData[0].column;
        this.subrows = this.mData[0].subMetdata;
        this.colsubrows = this.mData[0].subColumns;
        this.colsubsecRows = this.mData[0].subColsec;
        this.footerTitle = this.mData[0].footerTitle;
        this.footerData = this.mData[0].footer;
        this.approvalList = this.mData[0].approval;
      });
  }
  getval(val: any,type,i,headerName) {
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
    }
    this.toolTip(type,i,headerName)
    return arr;
  }
  toolTipHeader:any=[];
  toolTipBody:any = [];
  toolTipFooter:any = [];
  toolTipInstruction:any=[];
  getTooltip(){
    this.dataService
    .get('config/tooltip?checklistName=' + this.localChecklistName)
    .subscribe((res) => {

      this.getToolTip = res['result'][0];
       this.toolTipHeader=this.getToolTip['header'];
       this.toolTipBody=this.getToolTip['body'];
       this.toolTipFooter=this.getToolTip['footer'];
       this.toolTipInstruction=this.getToolTip['Instruction'];
     });
  }
  toolTip(type, index, headerName) {



    if (type == 'footer') {
      if (!this.listFooter.length) {
        this.listFooter.push({
          index: index,
          footerHeader: headerName,
          filledBy: sessionStorage.getItem('user'),
          filledAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
        });
      } else {
        let findIndexForFooter = this.listFooter.findIndex(
          (val) => val.footerHeader == headerName && val.index == index
        );
        if (Math.sign(findIndexForFooter) == -1) {
          this.listFooter.push({
            index: index,
            footerHeader: headerName,
            filledBy: sessionStorage.getItem('user'),
            filledAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
          });
        } else {
          (this.listFooter[findIndexForFooter]['filledBy'] =
            sessionStorage.getItem('user')),
            (this.listFooter[findIndexForFooter]['filledAt'] =
              moment().format('YYYY-MM-DDTHH:mm:ss'));
        }
      }
      this.listFooter.map((val)=>{
        this.toolTipFooter.push(val)
      })
    } else if (type == 'body') {

      if (!this.listBody.length) {
        this.listBody.push({
          index: index,
          bodyHeader: headerName[0],
          filledBy: sessionStorage.getItem('user'),
          filledAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
        });
      } else {
        let findIndex = this.listBody.findIndex(
          (val) => val.bodyHeader == headerName && val.index == index
        );
        if (Math.sign(findIndex) == -1) {
          this.listBody.push({
            index,
            bodyHeader: headerName[0],
            filledBy: sessionStorage.getItem('user'),
            filledAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
          });
        } else {
          (this.listBody[findIndex]['filledBy'] =
            sessionStorage.getItem('user')),
            (this.listBody[findIndex]['filledAt'] = moment().format(
              'YYYY-MM-DDTHH:mm:ss'
            ));
        }
      }
      this.listBody.map((val)=>{
        this.toolTipBody.push(val)
      })
    } else if (type == 'header') {
      if (!this.listHeader.length) {
        this.listHeader.push({
          index: index,
          HeaderName: headerName,
          filledBy: sessionStorage.getItem('user'),
          filledAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
        });
      } else {
        let findIndexOfHeader = this.listHeader.findIndex(
          (val) => val.HeaderName == headerName && val.index == index
        );
        if (Math.sign(findIndexOfHeader) == -1) {
          this.listHeader.push({
            index,
            HeaderName: headerName,
            filledBy: sessionStorage.getItem('user'),
            filledAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
          });
        } else {
          (this.listHeader[findIndexOfHeader]['filledBy'] =
            sessionStorage.getItem('user')),
            (this.listHeader[findIndexOfHeader]['filledAt'] = moment().format(
              'YYYY-MM-DDTHH:mm:ss'
            ));
        }
      }
  this.listHeader.map((val)=>{
    this.toolTipHeader.push(val)
  })
    }
    else{
      if (!this.listInstruction.length) {
        this.listInstruction.push({
          index: index,
          instructionHeader: headerName[0],
          filledBy: sessionStorage.getItem('user'),
          filledAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
        });
      } else {
        let findIndex = this.listInstruction.findIndex(
          (val) => val.instructionHeader == headerName && val.index == index
        );
        if (Math.sign(findIndex) == -1) {
          this.listInstruction.push({
            index,
            instructionHeader: headerName[0],
            filledBy: sessionStorage.getItem('user'),
            filledAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
          });
        } else {
          (this.listInstruction[findIndex]['filledBy'] =
            sessionStorage.getItem('user')),
            (this.listInstruction[findIndex]['filledAt'] = moment().format(
              'YYYY-MM-DDTHH:mm:ss'
            ));
        }
      }
    }
    this.listInstruction.map((val)=>{
      this.toolTipInstruction.push(val)
    })

  }

  // getMasterData() {
  //   this.rows = '';
  //   this.dataService
  //     .get('masterData/master/' + this.localmasterName)
  //     .subscribe((res) => {
  //       this.mData = res['result'];
  //       this.MasterName = this.mData[0].masterName;
  //       this.tempName = this.mData[0].Tempname;
  //       this.fieldSelect(this.tempName);
  //       this.plantName = this.mData[0].plantName;
  //       this.shiftName = this.mData[0].shiftName;
  //       this.machineName = this.mData[0].machineName;
  //       this.dName = this.mData[0].dName;
  //       this.metadatarow = this.mData[0].metadata;
  //       this.rows = this.mData[0].column;
  //       this.subrows = this.mData[0].subMetdata;
  //       this.colsubrows = this.mData[0].subColumns;
  //       this.colsubsecRows = this.mData[0].subColsec;
  //       this.footerTitle = this.mData[0].footerTitle;
  //       this.footerData = this.mData[0].footer;
  //     });
  // }
  addListData(action) {
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
    this.listData = {
      checklistName: this.checklistName,
      masterName: this.MasterName,
      Tempname: this.tempName,
      plantName: this.plantName,
      shiftName: this.shiftName,
      periodicSchedule: this.periodicSchedule,
      machineName: this.machineName,
      metadata: this.metadatarow,
      mainData: this.mainData,
      column: this.rows,
      subMetdata: this.subrows,
      subColumns: this.colsubrows,
      subColsec: this.colsubsecRows,
      footerTitle: this.footerTitle,
      footer: this.footerData,
      approval: this.approvalList,
      createdBy: this.createdBy,
      sentToApproval: this.sentToApproval,
      footerInstruction: this.footerInstruction,
      formatData: this.formatData,
      revisionNOData: this.revisionNOData,
      revisionDateData: this.revisionDateData,
      problemFooter: this.probFootArr,
      shiftNote: this.shiftNote,
      shiftData: this.shiftData,
      currentDate: this.currentDateValue,
    };
    this.lastMasterArray = [
      {
        checklistName: this.checklistName,
        masterName: this.MasterName,
        Tempname: this.tempName,
        headers: this.toolTipHeader,
        body: this.toolTipBody,
        footer: this.toolTipFooter,
        Instruction:this.toolTipInstruction
      },
    ];

    this.dataService.post('fillChecklist/list', this.listData).subscribe(
      (res) => {
        this.fillListData = res['result'];
        if (res && res['result'].length) {
          this.dataService
            .get('fillChecklist/list/' + this.localChecklistName)
            .subscribe((res) => {
              this.approvalData = res['result'][0];
              if (
                action == 'sentToApproval' &&
                this.approvalData != undefined
              ) {
                this.toastr.success('list sent for approval!!');
                this.addApprovalData();
              } else {
                this.toastr.success('list updated!!');
              }
            });
        }
      },
      (error) => {
        this.toastr.error(error.error['message']);
      }
    );
    this.dataService
    .put('config/tooltip', this.lastMasterArray)
    .subscribe((res) => {
      this.toolTipData = res;

    });
  }
  getListData() {
    this.dataService
      .get('fillChecklist/list/' + this.localChecklistName)
      .subscribe((res) => {
        this.checkListData = res['result'];
        this.checklistName = this.checkListData[0].checklistName;
        this.MasterName = this.checkListData[0].masterName;
        this.tempName = this.checkListData[0].Tempname;
        this.plantName = this.checkListData[0].plantName;
        this.fieldSelect(this.tempName);
        this.mainData = this.checkListData[0].mainData;
        this.shiftName = this.checkListData[0].shiftName;
        this.machineName = this.checkListData[0].machineName;
        this.metadatarow = this.checkListData[0].metadata;
        this.rows = this.checkListData[0].column;
        this.subrows = this.checkListData[0].subMetdata;
        this.colsubrows = this.checkListData[0].subColumns;
        this.colsubsecRows = this.checkListData[0].subColsec;
        this.footerTitle = this.checkListData[0].footerTitle;
        this.footerData = this.checkListData[0].footer;
        if (this.checkListData[0]['imageDisplay'] == 'header') {
          this.imageHeaderBool = true;
          this.imageFooterBool = false;
        } else if (this.checkListData[0]['imageDisplay'] == 'footer') {
          this.imageFooterBool = true;
          this.imageHeaderBool = false;
        }
        this.approvalList = this.checkListData[0].approval;
        this.rows.map((val) => {
          if (val['remarks'] && val['rejected']) {
            this.hidecontentRemarks = true;
          }
        });
        this.mainData.map((val) => {
          if (val['pageFill'] == 'fillChecklist' && val['dateFormat']) {
            if (val['dateFormat'] == 'month') {
              val['mvalue'] = this.currentMonth;
            } else if (val['dateFormat'] == 'year') {
              val['mvalue'] = this.currentYear;
            } else if (val['dateFormat'] == 'all') {
              val['mvalue'] = this.today;
            }
          }
        });

        // if (this.periodicSchedule == 'Daily') {
        this.footerInstruction = this.checkListData[0].footerInstruction;
        this.probFootArr = this.checkListData[0].problemFooter;
        this.formatData = this.checkListData[0]['formatData'];
        this.revisionNOData = this.checkListData[0]['revisionNOData'];
        this.revisionDateData = this.checkListData[0]['revisionDateData'];
        this.currentDateValue = this.checkListData[0]['currentDate'];
        this.shiftData = this.checkListData[0]['shiftData'];
        this.shiftNote = this.checkListData[0]['shiftNote'];
        // }
      });
    this.getImage();
  }
  getImage() {
    this.dataService.get('imageData/image').subscribe((res) => {
      this.imageUrlList = res['result'];
      this.imageUrlList.forEach((val) => {
        if (val.masterName == this.MasterName) {
          this.imageUrl = val.image;
        }
      });
    });
    this.getPlant();
    this.getMachine();
    this.getZone();
    this.getPart();
  }
  filterperiodic: any = [];
  startTime;
  bTime;
  current_value;
  footDaily;
  footerIndex;
  fieldSelect(e) {
    this.selectTempname = e;
    this.dataService.get('checklist/template/' + e).subscribe((res) => {
      this.tempArray = res['result'];
      this.addData = this.tempArray[0]['columns'];
      this.sudAdd = this.tempArray[0]['subMetdata'];
      this.subCol = this.tempArray[0]['subColumns'];
      this.metadataAdd = this.tempArray[0]['metadata'];
      // this.approvalList = this.tempArray[0]['approval'];
      this.subsecCol = this.tempArray[0]['subColsec'];
      this.periodicSchedule = this.tempArray[0]['periodicSchedule'];
      this.footerCol = this.tempArray[0]['footer'];
      // if (this.periodicSchedule == 'Daily') {
      //   // this.footerData = new Array(30);
      //   const daysInCurrentMonth = momenttz.tz().daysInMonth();
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
      // this.mainData = this.tempArray[0].mainData;
      // this.periodicSchedule = this.tempArray[0]['periodicSchedule'];
      this.periodicPosition = this.tempArray[0]['periodicPosition'];
      if (this.periodicPosition == 'Header') {
        if (this.periodicSchedule == this.shiftwise[0]) {
          this.periodFlag = true;
          this.shiftPeriod = true;
          this.hourFlag = false;
          this.filterperiodic = this.addData.filter((e) => {
            return e.periodic == true;
          });

          if (this.filterperiodic.length != 0) {
            this.current_value = this.filterperiodic[0].cName;
            this.bufferTime = moment(
              moment().format(`YYYY-MM-DDT${this.current_value}`)
            )
              .add(15, 'minutes')
              .format('HH:mm');
            this.startTime = moment(this.current_value, 'HH:mm');
            this.bTime = moment(this.bufferTime, 'HH:mm');

            this.current_date = moment(this.timer).isBetween(
              this.startTime,
              this.bTime
            );
          }
        } else if (this.periodicSchedule == this.shiftwise[2]) {
          this.periodFlag = true;
          this.shiftPeriod = true;
          this.hourFlag = false;
          this.filterperiodic = this.addData.filter((e) => {
            return e.periodic == true;
          });

          if (this.filterperiodic.length != 0) {
            this.current_value =
              this.filterperiodic[this.filterperiodic.length - 1].cName;
            this.bufferTime = moment(
              moment().format(`YYYY-MM-DDT${this.current_value}`)
            )
              .subtract(15, 'minutes')
              .format('HH:mm');
            this.startTime = moment(this.current_value, 'HH:mm');
            this.bTime = moment(this.bufferTime, 'HH:mm');

            this.current_date = moment(this.timer).isBetween(
              this.bTime,
              this.startTime
            );
          }
          // this.current_date = this.addData[this.addData.length - 1 ].cName
        } else if (this.periodicSchedule == this.shiftwise[3]) {
          this.periodFlag = true;
          this.hourFlag = true;
          this.shiftPeriod = true;
          this.filterperiodic = this.addData.filter((e) => {
            return e.periodic == true;
          });

          if (this.filterperiodic.length != 0) {
            this.current_value = moment().startOf('hour').format('HH:mm');
            if (this.current_value !== this.filterperiodic[0].cName) {
              this.current_date = false;
            }

            this.bufferTime = moment(
              moment().format(`YYYY-MM-DDT${this.current_value}`)
            )
              .add(1, 'hour')
              .format('HH:mm');
            this.startTime = moment(this.current_value, 'HH:mm');
            this.bTime = moment(this.bufferTime, 'HH:mm');

            this.current_date = moment(this.timer).isBetween(
              this.bTime,
              this.startTime
            );
          }
        } else if (this.periodicSchedule == 'Daily') {
          this.periodFlag = true;
          this.shiftPeriod = false;
          this.hourFlag = false;
          let data = [];
          let month = momenttz.tz().format('MMM');
          this.current_value = 'Day-' + momenttz.tz().date();
          this.current_date = true;
          this.addData.forEach((r) => {
            if (r.periodic == true && r.cName == this.current_value) {
              data.push({
                cName: r.cName,
                ctype: r.ctype,
                periodic: r.periodic,
                pageFill: r.pageFill,
                fillType: r.fillType,
                checked: r.checked,
                permission: r.permission,
                fillFrom: r.fillFrom,
                dateFormat: r.dateFormat,
                autoFillValue: r.autoFillValue,
              });
            }
          });
          this.addData = this.addData.filter((e) => {
            return e.periodic !== true;
          });
          this.addData = [...this.addData, ...data];
        } else {
          this.periodFlag = false;
          this.shiftPeriod = false;
          this.hourFlag = false;
          this.current_date = '';
        }
      }

      if (this.periodicSchedule !== 'Daily') {
        this.footerCol.map((footer) => {
          if (
            (footer['permission'].includes(this.localPermission) &&
              footer['pageFill'] == 'fillChecklist' &&
              footer['fillType'] == 'auto') ||
            (footer['pageFill'] != 'approval' && footer['fillType'] == 'auto')
          ) {
            this.footerData[0][`${footer['fName']}`] = this.createdBy;
          }
        });

        // this.footerCol.map((footer) => {
        //   if (
        //     footer['permission'].includes(this.localPermission) &&
        //     footer['pageFill'] == 'approval' &&
        //     footer['fillType'] == 'auto'
        //   ) {
        //     this.footerData[0][`${footer['fName']}`] = '';
        //   }
        // });
      } else {
        this.footerIndex = this.footerData.findIndex(
          (x) => x['day'] === this.current_value
        );
        this.footerCol.map((footer) => {
          if (
            (footer['permission'].includes(this.localPermission) &&
              footer['pageFill'] == 'fillChecklist' &&
              footer['fillType'] == 'auto') ||
            (footer['pageFill'] != 'approval' && footer['fillType'] == 'auto')
          ) {
            this.footerData[this.footerIndex][`${footer['fName']}`] =
              this.createdBy;
          }
        });
      }
      if (this.periodicSchedule == 'Daily') {
        this.problemFooter = this.tempArray[0]['problemFooter'];
      }

      this.addData.forEach((e) => {
        if (e.subheader) {
          this.subHbool = true;
          this.subHeaderLen = e.subheader.length;

          e.subheader.forEach((a) => {
            this.subHeaderMain.push(a);
          });
          if (this.periodicPosition == 'Sub Header') {
            if (this.periodicSchedule == this.shiftwise[0]) {
              this.periodFlag = true;
              this.shiftPeriod = true;
              this.hourFlag = false;
              this.filterperiodic = e.subheader.filter((e) => {
                return e.periodic == true;
              });

              if (this.filterperiodic.length != 0) {
                this.current_value = this.filterperiodic[0].csName;
                this.bufferTime = moment(
                  moment().format(`YYYY-MM-DDT${this.current_value}`)
                )
                  .add(15, 'minutes')
                  .format('HH:mm');
                this.startTime = moment(this.current_value, 'HH:mm');
                this.bTime = moment(this.bufferTime, 'HH:mm');

                this.current_date = moment(this.timer).isBetween(
                  this.startTime,
                  this.bTime
                );
              }
            } else if (this.periodicSchedule == this.shiftwise[2]) {
              this.periodFlag = true;
              this.shiftPeriod = true;
              this.hourFlag = false;
              this.filterperiodic = e.subheader.filter((e) => {
                return e.periodic == true;
              });

              if (this.filterperiodic.length != 0) {
                this.current_value =
                  this.filterperiodic[this.filterperiodic.length - 1].csName;
                this.bufferTime = moment(
                  moment().format(`YYYY-MM-DDT${this.current_value}`)
                )
                  .subtract(15, 'minutes')
                  .format('HH:mm');
                this.startTime = moment(this.current_value, 'HH:mm');
                this.bTime = moment(this.bufferTime, 'HH:mm');

                this.current_date = moment(this.timer).isBetween(
                  this.bTime,
                  this.startTime
                );
              }

              // this.current_date = e.subheader[this.addData.length - 1 ].cName
            } else if (this.periodicSchedule == this.shiftwise[3]) {
              this.periodFlag = true;
              this.hourFlag = true;
              this.shiftPeriod = true;
              this.filterperiodic = e.subheader.filter((e) => {
                return e.periodic == true;
              });

              if (this.filterperiodic.length != 0) {
                if (this.filterperiodic[0].csName.includes(30)) {
                  this.current_value = moment()
                    .startOf('hour')
                    .add(30, 'minutes')
                    .format('HH:mm');
                } else {
                  this.current_value = moment().startOf('hour').format('HH:mm');
                }
                if (this.current_value !== this.filterperiodic[0].csName) {
                  this.current_date = false;
                }
                this.bufferTime = moment(
                  moment().format(`YYYY-MM-DDT${this.current_value}`)
                )
                  .add(1, 'hour')
                  .format('HH:mm');
                this.startTime = moment(this.current_value, 'HH:mm');
                this.bTime = moment(this.bufferTime, 'HH:mm');
                this.current_date = moment(this.timer).isBetween(
                  this.bTime,
                  this.startTime
                );
              }
            } else if (this.periodicSchedule == 'Daily') {
              this.periodFlag = true;
              this.shiftPeriod = false;
              this.hourFlag = false;
              let month = momenttz.tz().format('MMM');
              this.current_value = 'Day-' + momenttz.tz().date();
              this.current_date = true;
            } else {
              this.periodFlag = false;
              this.hourFlag = false;
              this.shiftPeriod = false;
              this.current_date = '';
            }
          }
        } else {
          this.subHbool1 = true;
          this.addData1.push(e);
        }
      });
      if (this.subHbool && this.periodicSchedule == this.shiftwise[1]) {
        this.subInstanceFlag = true;
        this.instanceFlag = false;
      } else if (this.subHbool1 && this.periodicSchedule == this.shiftwise[1]) {
        this.instanceFlag = true;
        this.subInstanceFlag = false;
      }
    });
  }
  returnToMaster() {
    this.router.navigate([`mainpage/checklist/filledCL`]);
  }
  enteredTime:any
  readOnly: boolean[] = [false]
  readOnly1:boolean[] = [false]
  autoTime(val,val1,name){
    this.enteredTime = moment().format("HH:mm:ss")
    // Object.assign(this.rows[val1], {[this.subHeaderMain[val+1]["csName"]]: this.enteredTime});
    if(this.subInstanceFlag){
      this.subHeaderMain.map((e,i)=>{
        if(e['csName'].toLowerCase().includes('time') && i == val+1){
          this.readOnly[val+1] = true
          this.readOnly1[val1] = true
          Object.assign(this.rows[val1], {[e["csName"]]: this.enteredTime});
        }
      })
    }else if(this.instanceFlag){
      this.addData1.map((e,i)=>{
        if(e['cName'].toLowerCase().includes('time') && i == val+1){
          this.readOnly[val+1] = true
          this.readOnly1[val1] = true
          Object.assign(this.rows[val1], {[e["cName"]]: this.enteredTime});
        }
      })
    }
  }
  submit(action) {
    this.addListData(action);
  }
  existData: any;
  updatedDate: any;
  currentDate: any;
  addApprovalData() {
    this.dataService
      .get('config/approval?checkListName=' + this.localChecklistName)
      .subscribe((res) => {
        if (res['result'].length) this.existData = res['result'][0];
        if (this.existData) {
          if (this.periodicSchedule != 'Daily') {
            this.existData['levelOfApproval'].map((level: Object) => {
              if (level['status'] && level['status'] == 'rejected') {
                level['show'] = true;
                level['status'] = '';
                level['comment'] = '';
              }
              this.existData['status'] = 'waiting for approval';
            });
          }
          this.updatedDate = new Date(
            this.existData['updatedTime']
          ).toLocaleDateString();
          if (this.periodicSchedule == 'Daily') {
            if (this.updatedDate == this.currentDate) {
              if (
                this.existData['status'] == 'approved' ||
                this.existData['status'] == 'rejected' ||
                this.existData['status'] == 'waiting for confirmation'
              ) {
                this.existData['status'] = 'open';
                this.existData['levelOfApproval'].map((level: Object) => {
                  // if (level['status'] && level['status'] == 'rejected') {
                  if (level['level'] == 1) {
                    level['show'] = true;
                    level['status'] = '';
                    level['comment'] = '';
                  } else {
                    level['show'] = false;
                  }
                  // }
                });
              }
            } else if (this.updatedDate != this.currentDate) {
              this.existData['status'] = 'open';
              this.existData['levelOfApproval'].map((level: Object) => {
                // if (level['status'] && level['status'] == 'rejected') {
                if (level['level'] == 1) {
                  level['show'] = true;
                  level['status'] = '';
                  level['comment'] = '';
                } else {
                  level['show'] = false;
                }
              });
            }
          }
          this.dataService
            .put(
              'config/approval?checkListName=' + this.localChecklistName,
              this.existData
            )
            .subscribe((res) => {});
          // })
        } else {
          this.approvalData['approval'].forEach((val) => {
            if (val['level'] == 1) {
              val['show'] = true;
            } else {
              val['show'] = false;
            }
          });

          this.addApproval = {
            checkListName: this.localChecklistName,
            createdAt: this.approvalData['updatedAt'],
            preparedBy: this.approvalData['createdBy'],
            levelOfApproval: this.approvalData['approval'],
            periodicSchedule: this.periodicSchedule,
            status: 'open',
          };
          this.dataService.post('config/approval', this.addApproval).subscribe(
            (res) => {
              this.returnToMaster();
            },
            (error) => {
              this.toastr.error(error.error['message']);
            }
          );
        }
      });
  }
  approval(action) {
    this.submitbool = true;
    this.sentToApproval = true;
    this.rows = this.rows.map((val) => {
      val['remarks'] = '';
      val['rejected'] = false;
      return val;
    });
    this.footerData = this.footerData.map((val) => {
      val['remarks'] = '';
      val['rejected'] = false;
      return val;
    });
    this.mainData = this.mainData.map((val) => {
      val['remarks'] = '';
      val['rejected'] = false;
      return val;
    });

    this.addListData(action);
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
}
