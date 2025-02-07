import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { ToastrService } from 'ngx-toastr';
import * as momenttz from 'moment-timezone';
import * as moment from 'moment';
import { FormControl, Validators } from '@angular/forms';
import { error } from 'jquery';

@Component({
  selector: 'app-formfill',
  templateUrl: './formfill.component.html',
  styleUrls: ['./formfill.component.scss'],
})
export class FormfillComponent implements OnInit {
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
  checkListData: any;
  department: any;
  dName: any;
  current_date: any;
  submitBool: boolean = false;
  footer: any = [];
  footerData: any = [];
  listHeader: any = [];
  listBody: any = [];
  listFooter: any = [];
  listInstruction: any = [];
  lastlistArray: any = [];
  masterHeader: any = [];
  masterBody: any = [];
  masterFooter: any = [];
  masterInstruction: any = [];
  lastMasterArray: any = [];
  shiftwise = [
    'Start of the Shift',
    'Number of Instances',
    'End of the Shift',
    'Hourly',
  ];
  footerTitle;
  footerCol;
  periodicSchedule: any;
  periodFlag: boolean = false;
  approvalList: any = [];
  createdBy: any;
  // name: any;
  subHeaderMain: any = [];
  subHeaderLen: any;
  subHbool: boolean = false;
  mainData: any;
  mainDataValue: any;
  addData1: any = [];
  subHbool1: boolean = false;
  subInstanceFlag: boolean = false;
  instanceFlag: boolean = false;
  imageVal: any;
  periodicPosition: any;
  display: FormControl = new FormControl('', Validators.required);
  file_store: FileList;
  file_list: Array<string> = [];
  uploadData: any;
  urlData: any = [];
  // urlObject:{};
  data: any;
  section: any;
  timer;
  bufferTime: string;
  checklistName: any;
  imageDisplay: any;
  pdf: any;
  pdfBool: boolean = false;
  url: any;
  format: any;
  shiftPeriod: boolean = false;
  hourFlag: boolean = false;
  currentMonth: any;
  currentYear: any;
  today: any;
  footDailyBool: boolean = false;
  revisionDateData: any;
  formatData: any;
  revisionNOData: any;
  probFootArr: any;
  footerInstruction: any;
  problemFooter: any;
  currentDateValue: any;
  shiftNote: any;
  shiftData: any;
  toolTipData: Object;
  getToolTip: any;
  imageFooterBool: boolean = false;
  imageHeaderBool: boolean = true;

  constructor(
    private router: Router,
    private dataService: DataService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.localmasterName = sessionStorage.getItem('localmasterName');
    this.localPermission = sessionStorage.getItem('role');
    this.currentMonth = momenttz().format('MMMM');
    this.currentYear = momenttz().format('YYYY');
    this.today = momenttz().format('DD/MM/YYYY');
    this.createdBy = this.localPermission;
    let time = momenttz(new Date()).format('YYYY-MM-DDTHH:mm:ss');
    this.timer = time;
    this.current_value = 'Day-' + momenttz.tz().date();
    // this.current_date = true
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
    this.createdBy = sessionStorage.getItem('user');
    this.getMasterData();
    // this.getListData();
    this.getImage();
    this.getTooltip();
    // this.getShift();
    // this.getPlant();
    // this.getMachine();
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
      this.part = res['result'];
    });
  }
  getMasterData() {
    // this.rows = '';
    this.dataService
      .get('masterData/master/' + this.localmasterName)
      .subscribe((res) => {
        this.mData = res['result'];
        this.imageDisplay = this.mData[0].imageDisplay;
        this.MasterName = this.mData[0].masterName;
        this.tempName = this.mData[0].Tempname;
        // this.imageUrl = this.mData[0].image;
        this.fieldSelect(this.tempName);
        this.mainData = this.mData[0].mainData;
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
        if (this.mData[0]['imageDisplay'] == 'header') {
          this.imageHeaderBool = true;
          this.imageFooterBool = false;
        } else if (this.mData[0]['imageDisplay'] == 'footer') {
          this.imageFooterBool = true;
          this.imageHeaderBool = false;
        }
        this.approvalList = this.mData[0].approval;
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
      });

    // this.getShift();
    this.getPlant();
    this.getMachine();
    this.getPart();
    this.getZone();
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
    }
    // this.toolTip(type,i,headerName)
    return arr;
  }
  toolTipHeader:any=[];
  toolTipBody:any = [];
  toolTipFooter:any = [];
  toolTipInstruction:any=[];
  getTooltip(){
    this.dataService
    .get('config/tooltip?masterName=' + this.localmasterName)
    .subscribe((res) => {

      this.getToolTip = res['result'][0];

       this.toolTipHeader=this.getToolTip ? this.getToolTip['header']: '';
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
    this.listData = {
      checklistName: this.checklistName,
      masterName: this.MasterName,
      Tempname: this.tempName,
      mainData: this.mainData,
      imageDisplay: this.imageDisplay,
      periodicSchedule: this.periodicSchedule,
      headerRemarks: this.mainData.forEach((e) => {
        e['remarks'] = '';
        e['rejected'] = false;
      }),
      plantName: this.plantName,
      shiftName: this.shiftName,
      machineName: this.machineName,
      metadata: this.metadatarow,
      column: this.rows,
      contentRemarks: this.rows.forEach((e) => {
        e['remarks'] = '';
        e['rejected'] = false;
      }),
      // subHeader: this.subHeaderMain,
      subMetdata: this.subrows,
      subColumns: this.colsubrows,
      subColsec: this.colsubsecRows,
      footerTitle: this.footerTitle,
      footer: this.footerData,
      footerRemarks: this.footerData.forEach((e) => {
        e['remarks'] = '';
        e['rejected'] = false;
      }),
      footerInstruction: this.footerInstruction,
      formatData: this.formatData,
      revisionNOData: this.revisionNOData,
      revisionDateData: this.revisionDateData,
      problemFooter: this.probFootArr,
      shiftNote: this.shiftNote,
      shiftData: this.shiftData,
      currentDate: this.currentDateValue,
      approval: this.approvalList,
      createdBy: this.createdBy,
      rejectedData: [],
      submitBool: 'true',
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
        if (res && res['result'] == `${this.checklistName} is added`) {
          this.toastr.success(res['result']);
          this.router.navigate([
            `mainpage/checklist/fillform/${this.localmasterName}`,
          ]);
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
  }
  // getListData() {
  //   this.dataService
  //     .get('fillChecklist/list/' + this.localmasterName)
  //     .subscribe((res) => {
  //       this.checkListData = res['result'];

  //       // if (this.checkListData.length) {

  //       this.MasterName = this.checkListData[0].masterName;
  //       this.tempName = this.checkListData[0].Tempname;
  //       this.mainData = this.checkListData[0].mainData;
  //       this.plantName = this.checkListData[0].plantName;

  //       this.fieldSelect(this.tempName);
  //       this.shiftName = this.checkListData[0].shiftName;
  //       this.machineName = this.checkListData[0].machineName;
  //       this.metadatarow = this.checkListData[0].metadata;
  //       this.rows = this.checkListData[0].column;
  //       this.subrows = this.checkListData[0].subMetdata;
  //       this.colsubrows = this.checkListData[0].subColumns;
  //       this.colsubsecRows = this.checkListData[0].subColsec;
  //       this.submitBool = this.checkListData[0].submitBool;
  //       this.footerTitle = this.checkListData[0].footerTitle;
  //       this.footerData = this.checkListData[0].footer;
  //       this.approvalList = this.checkListData[0].approval;
  //
  //     });
  // }
  getImage() {
    this.dataService.get('imageData/image').subscribe((res) => {
      // this.imageUrl = res['result'][0].image;
      this.imageVal = res['result'];

      this.imageVal.forEach((val) => {
        if (val.masterName == this.localmasterName) {
          this.imageUrl = val.image;
        }
      });
    });
  }
  filterperiodic: any = [];
  startTime;
  bTime;
  current_value;
  fieldSelect(e) {
    this.subHeaderMain = [];
    this.selectTempname = e;
    this.dataService.get('checklist/template/' + e).subscribe((res) => {
      this.tempArray = res['result'];
      this.addData = this.tempArray[0]['columns'];
      this.sudAdd = this.tempArray[0]['subMetdata'];
      this.subCol = this.tempArray[0]['subColumns'];
      this.metadataAdd = this.tempArray[0]['metadata'];
      this.subsecCol = this.tempArray[0]['subColsec'];
      this.periodicSchedule = this.tempArray[0]['periodicSchedule'];
      this.footerCol = this.tempArray[0]['footer'];

      this.pdf = this.tempArray[0]['pdf'];
      if (this.pdf?.length) {
        this.pdfBool = true;
      } else {
        this.pdfBool = false;
      }
      // this.approvalList = this.tempArray[0]['approval'];
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
      // this.approvalList = this.tempArray[0]['approval'];
      this.mainDataValue = this.tempArray[0]['mainData'];

      // if (this.addData[0]?.subheader) {

      let filteredArray = this.addData.map((element: any) =>
        element.subheader?.some((subElement) => subElement['noSubHeader'])
      );
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
      this.problemFooter = this.tempArray[0]['problemFooter'];
      if (this.periodicSchedule === 'Daily') {
        this.footerInstruction = this.mData[0].footerInstruction;
        this.probFootArr = this.mData[0].problemFooter;
        this.formatData = this.mData[0]['formatData'];
        this.revisionNOData = this.mData[0]['revisionNOData'];
        this.revisionDateData = this.mData[0]['revisionDateData'];
      } else {
        this.currentDateValue = this.mData[0]['currentDate'];
        this.shiftData = this.mData[0]['shiftData'];
        this.shiftNote = this.mData[0]['shiftNote'];
        this.currentDateValue.map((val) => {
          if (val['pageFillDate'] == 'fillChecklist' && val['dateAutoFill']) {
            if (val['dateAutoFill'] == 'month') {
              val['dateValue'] = this.currentMonth;
            } else if (val['dateAutoFill'] == 'year') {
              val['dateValue'] = this.currentYear;
            } else if (val['dateAutoFill'] == 'all') {
              val['dateValue'] = this.today;
            }
          }
        });
      }
    })
  }
  returnToMaster() {
    this.router.navigate(['mainpage/checklist/fillnew']);
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
  update() {
    this.submit();
    // this.router.navigate([
    //   `mainpage/checklist/fillform/${this.localmasterName}`,
    // ]);
  }
  // submit() {
  //   this.addListData();
  // }
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
