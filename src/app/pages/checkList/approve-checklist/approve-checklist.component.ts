import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import '@angular/localize/init';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
import * as momenttz from 'moment-timezone';
import * as moment from 'moment';
@Component({
  selector: 'app-approve-checklist',
  templateUrl: './approve-checklist.component.html',
  styleUrls: ['./approve-checklist.component.scss'],
})
export class ApproveChecklistComponent implements OnInit {
  @ViewChild('myTable', { static: false }) myTable: ElementRef;

  user: string;
  updateCheckList: any = [];
  showLevel: boolean = false;
  plantName: any;
  localChecklist: any;
  shiftName: any;
  machineName: any;
  imageUrl: any;
  selectTempname: any;
  tempArray: any;
  addData: any;
  tempName: any;
  MasterName: any;
  rows: any;
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
  footer: any = [];
  footerData: any = [];
  footerTitle;
  footerCol;
  approvalList: any = [];
  mainData: any;
  subHbool: boolean = false;
  subHeaderMain: any = [];
  subHeaderLen: any;
  addData1: any = [];
  subHbool1: boolean = false;
  filterChecklist: any = [];
  rejected: boolean = false;
  status: string;
  finalList: any;
  role: any;
  display: FormControl = new FormControl('', Validators.required);
  file_store: FileList;
  file_list: Array<string> = [];
  uploadData: any;
  urlData: any = [];
  data: any;
  periodFlag: boolean = false;
  shift: any;
  plant: any;
  machine: any;
  localmasterName: any;
  formData: any = {};
  periodChecklist = 'Period Check';
  localPermission: any;
  department: any;
  dName: any;
  approvalBool: boolean = false;
  submitbool: boolean = false;

  createdBy: any;
  sentToApproval: boolean = false;
  addApproval: any = {};
  current_date: any;
  periodicSchedule: any;
  periodicPosition: any;
  shiftwise = [
    'Start of the Shift',
    'Number of instances',
    'End of the Shift',
    'Hourly',
  ];
  hourFlag: boolean = false;
  shiftPeriod: boolean = false;
  timer;
  bufferTime: string;
  section: any;
  part: any;
  zone: any;
  footerIndex: any;
  rejectedData: any = [];
  revisionDateData: any;
  formatData: any;
  revisionNOData: any;
  probFootArr: any;
  footerInstruction: any;
  problemFooter: any;
  currentDateValue: any;
  shiftData: any;
  shiftNote: any;
  imageFooterBool: boolean = false;
  imageHeaderBool: boolean = false;

  constructor(
    private router: Router,
    private dataService: DataService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.localChecklist = sessionStorage.getItem('localChecklist');
    this.user = sessionStorage.getItem('user');
    this.role = sessionStorage.getItem('role');
    this.getListData(this.localChecklist);
    this.getImage();
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
  }
  rowWidth;
  dynamicTableWidth;
  ngAfterViewInit() {
    setTimeout(() => {
      const tableWidth = this.myTable.nativeElement.offsetWidth;
      this.dynamicTableWidth = tableWidth + 'px';
    }, 200);
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
  getListData(listname) {
    this.dataService.get('fillChecklist/list/' + listname).subscribe((res) => {
      this.checkListData = res['result'];
      this.MasterName = this.checkListData[0].masterName;
      this.tempName = this.checkListData[0].Tempname;
      this.plantName = this.checkListData[0].plantName;
      this.fieldSelect(this.tempName);
      this.mainData = this.checkListData[0].mainData;
      this.shiftName = this.checkListData[0].shiftName;
      this.machineName = this.checkListData[0].machineName;
      this.metadatarow = this.checkListData[0].metadata;
      this.rows = this.checkListData[0].column;
      if (this.checkListData[0].rejectedData.length == 0) {
        this.rejectedData = JSON.parse(JSON.stringify(this.rows));
      } else {
        this.rejectedData = this.checkListData[0].rejectedData;
      }
      this.subrows = this.checkListData[0].subMetdata;
      this.colsubrows = this.checkListData[0].subColumns;
      this.colsubsecRows = this.checkListData[0].subColsec;
      this.footerTitle = this.checkListData[0].footerTitle;
      this.footerData = this.checkListData[0].footer;
      this.approvalList = this.checkListData[0].approval;
      this.footerInstruction = this.checkListData[0].footerInstruction;
      this.probFootArr = this.checkListData[0].problemFooter;
      this.formatData = this.checkListData[0]['formatData'];
      this.revisionNOData = this.checkListData[0]['revisionNOData'];
      this.revisionDateData = this.checkListData[0]['revisionDateData'];
      this.currentDateValue = this.checkListData[0]['currentDate'];
      this.shiftData = this.checkListData[0]['shiftData'];
      this.shiftNote = this.checkListData[0]['shiftNote'];
      if (this.checkListData[0]['imageDisplay'] == 'header') {
        this.imageHeaderBool = true;
        this.imageFooterBool = false;
      } else if (this.checkListData[0]['imageDisplay'] == 'footer') {
        this.imageFooterBool = true;
        this.imageHeaderBool = false;
      }
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
    }
    return arr;
  }
  getImage() {
    this.dataService.get('imageData/image').subscribe((res) => {
      this.imageUrl = res['result'][0].image;
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
  fieldSelect(e) {
    this.addData1 = [];
    this.subHeaderMain = [];
    this.selectTempname = e;
    this.dataService.get('checklist/template/' + e).subscribe((res) => {
      this.tempArray = res['result'];
      this.addData = this.tempArray[0]['columns'];
      this.sudAdd = this.tempArray[0]['subMetdata'];
      this.subCol = this.tempArray[0]['subColumns'];
      this.metadataAdd = this.tempArray[0]['metadata'];
      this.approvalList = this.tempArray[0]['approval'];
      this.subsecCol = this.tempArray[0]['subColsec'];
      this.footerCol = this.tempArray[0]['footer'];
      this.periodicSchedule = this.tempArray[0]['periodicSchedule'];
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
              moment().format(`YYYY-MM-HHT${this.current_value}`)
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
              moment().format(`YYYY-MM-HHT${this.current_value}`)
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
              moment().format(`YYYY-MM-HHT${this.current_value}`)
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
        if (!this.rejected) {
          this.footerCol.map((footer) => {
            if (
              footer['permission'].includes(this.role) &&
              footer['pageFill'] == 'approval' &&
              footer['fillType'] == 'auto'
            ) {
              this.footerData[0][`${footer['fName']}`] = this.user;
            }
          });
        } else {
          this.footerCol.map((footer) => {
            if (
              footer['permission'].includes(this.role) &&
              footer['pageFill'] == 'approval' &&
              footer['fillType'] == 'auto'
            ) {
              this.footerData[0][`${footer['fName']}`] = '';
            }
          });
        }
      } else {
        this.footerIndex = this.footerData.findIndex(
          (x) => x['day'] === this.current_value
        );
        if (!this.rejected) {
          this.footerCol.map((footer) => {
            if (
              footer['permission'].includes(this.role) &&
              footer['pageFill'] == 'approval' &&
              footer['fillType'] == 'auto'
            ) {
              this.footerData[this.footerIndex][`${footer['fName']}`] =
                this.user;
            }
          });
        } else {
          this.footerCol.map((footer) => {
            if (
              footer['permission'].includes(this.role) &&
              footer['pageFill'] == 'approval' &&
              footer['fillType'] == 'auto'
            ) {
              this.footerData[this.footerIndex][`${footer['fName']}`] = '';
            }
          });
        }
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
                  moment().format(`YYYY-MM-HHT${this.current_value}`)
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
                  moment().format(`YYYY-MM-HHT${this.current_value}`)
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
                this.current_value = moment().startOf('hour').format('HH:mm');
                if (this.current_value !== this.filterperiodic[0].csName) {
                  this.current_date = false;
                }
                this.bufferTime = moment(
                  moment().format(`YYYY-MM-HHT${this.current_value}`)
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
    });
  }
  returnToMaster() {
    this.router.navigate([`mainpage/checklist/approvalprocess`]);
  }
  rejectHead(e) {
    e['rejected'] = true;
    this.rejected = true;
    this.fieldSelect(this.tempName);
  }
  approve() {
    this.status = 'approved';

    this.updateListStatus(this.status);
    this.checklistLevelUpdate(this.checkListData, this.status);
    this.toastr.success('checklist approved');
  }
  reject() {
    this.status = 'rejected';

    this.updateListStatus(this.status);
    this.checklistLevelUpdate(this.checkListData, this.status);

    this.toastr.success('checklist rejected');
  }
  fillList: any;
  updateListStatus(status) {
    // if (this.periodicSchedule == 'Daily') {
    //   for (let i = 0; i < this.footerData.length; i++) {
    //     const data = this.footerData[i];
    //     for (const item of this.footer) {
    //       if (!data[item.fName]) {
    //         data[item.fName] = ''; // Add the missing key with an empty string value
    //       }
    //     }
    //   }
    // }
    if (this.periodicSchedule == 'Daily') {
      if (status == 'approved') {
        this.rejectedData.map((obj) => {
          let keys = Object.keys(obj);
          keys.map((key) => {
            if (key == this.current_value) {
              obj[`${this.current_value}`] = false;
            } else {
              obj[key] = obj[key];
            }
          });
        });
      } else if (status == 'rejected') {
        this.rows.map((val) => {
          this.rejectedData.map((obj) => {
            let keys = Object.keys(obj);
            keys.map((key) => {
              if (key == this.current_value) {
                obj[`${this.current_value}`] = true;
              } else {
                obj[key] = obj[key];
              }
            });
          });
        });
      }
    }
    this.listData = {
      checklistName: this.localChecklist,
      masterName: this.MasterName,
      Tempname: this.tempName,
      mainData: this.mainData,
      column: this.rows,
      footer: this.footerData,
      rejectedData: this.rejectedData,
    };
    this.dataService
      .post('fillChecklist/list', this.listData)
      .subscribe((res) => {
        this.fillList = res['result'];
      });
  }
  checklistLevelUpdate(listdata: any, status: any) {
    this.dataService
      .get('config/approval?checkListName=' + this.localChecklist)
      .subscribe((res) => {
        this.updateCheckList = res['result'][0];

        if (status == 'approved') {
          this.updateCheckList['status'] = 'waiting for approval';

          this.updateCheckList['levelOfApproval'].map((level: Object) => {
            if (level['approvalPersonUser'] == this.user) {
              level['show'] = false;
              level['status'] = status;

              this.showLevel = level['level'] + 1;
            }
          });
          this.updateCheckList['levelOfApproval'].map((level: Object) => {
            if (level['level'] == this.showLevel) {
              level['show'] = true;
            } else {
            }
          });

          this.dataService
            .put(
              'config/approval?checkListName=' + this.localChecklist,
              this.updateCheckList
            )
            .subscribe((res) => {
              this.fillListData = res['result'];

              if (this.fillListData) {
                this.dataService
                  .get('config/approval?checkListName=' + this.localChecklist)
                  .subscribe((res) => {
                    this.finalList = res['result'][0];
                    if (
                      this.finalList['levelOfApproval'][
                        this.finalList['levelOfApproval'].length - 1
                      ]['approvalPersonUser'] == this.user
                    ) {
                      this.finalList['status'] = 'approved';
                    }
                    this.dataService
                      .put(
                        'config/approval?checkListName=' + this.localChecklist,
                        this.finalList
                      )
                      .subscribe((res) => {
                        if (res['result'] && res['result'].length) {
                          this.returnToMaster();
                        }
                      });
                  });
              }
            });
        } else if (status == 'rejected') {
          this.updateCheckList['status'] = 'rejected';
          this.updateCheckList['levelOfApproval'].map((level: Object) => {
            if (level['approvalPersonUser'] == this.user) {
              level['status'] = status;
              level['show'] = false;
            }
          });

          this.dataService
            .put(
              'config/approval?checkListName=' + this.localChecklist,
              this.updateCheckList
            )
            .subscribe((res) => {
              this.fillListData = res['result'];

              if (this.fillListData) {
                this.returnToMaster();
              }
            });
        }
      });
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
}
