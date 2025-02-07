import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-filled-checklist',
  templateUrl: './filled-checklist.component.html',
  styleUrls: ['./filled-checklist.component.scss'],
})
export class FilledChecklistComponent implements OnInit {
  master: any;
  tempName: any;
  localtempName: any;
  selectedMaster: any;
  masterName: any = [];
  localmasterName;
  checkListData;
  clickedItem: string;
  showworkingList: boolean = false;
  showrejectedList: boolean = false;
  showApprovedList: boolean = false;
  rejectedLists: any = [];
  user: any;
  comments: any = '';
  workingLists: any = [];
  approvedLists: any = [];
  localChecklistName: any;
  listStatus: any;
  listApproveStatus: any = [];
  listStatusBool: boolean = false;
  listStatusBool11: boolean = false;
  permission: any;
  filledCLPermission: any;
  key = 'Checklist';
  department: string;
  filterTerm: any;
  currentPage = 1;
  itemsPerPage = 4;
  maxSize: number;
  rejMaxSize: any;
  approvedMaxSize: any;
  paginateData: any = [];
  rejpaginateData: any = [];
  approvedpaginateData: any = [];

  rLists: any = [];
  allLists: any = [];
  formattedDate: any;
  showLoader: boolean = false;
  role: any;
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.permission = JSON.parse(sessionStorage.getItem('permissions'));
    this.filledCLPermission = this.permission[this.key];
    this.clickedItem = 'workingList';
    if ((this.clickedItem = 'workingList')) {
      this.showworkingList = true;
      this.showrejectedList = false;
      this.showApprovedList = false;
    }
    this.user = sessionStorage.getItem('user');
    this.role = sessionStorage.getItem('role');
    this.localtempName = sessionStorage.getItem('tempName');
    this.localmasterName = sessionStorage.getItem('localmasterName');
    let currentDate = new Date();
    this.formattedDate = currentDate.toLocaleDateString();
    // this.department = sessionStorage.getItem('department')
    this.getMasterData();
    this.getListData();
    this.getStatus();
    this.rejectedLists = [];
  }
  loadPage() {
    this.maxSize = this.workingLists.length;
    this.paginateData = this.workingLists.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage
    );
  }
  rejloadPage() {
    this.rejMaxSize = this.rejectedLists.length;
    this.rejpaginateData = this.rejectedLists.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage
    );
  }
  approvedloadPage() {
    this.approvedMaxSize = this.approvedLists.length;
    this.approvedpaginateData = this.approvedLists.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage
    );
  }
  onClick(item: 'workingList' | 'rejectedList' | 'approvedList') {
    this.clickedItem = item;

    if (this.clickedItem == 'workingList') {
      this.anyChecklistRejected();
      this.showworkingList = true;
      this.showrejectedList = false;
      this.showApprovedList = false;
      this.loadPage();
    } else if (this.clickedItem == 'rejectedList') {
      this.showworkingList = false;
      this.showrejectedList = true;
      this.showApprovedList = false;
      this.rejloadPage();
    } else if (this.clickedItem == 'approvedList') {
      this.showApprovedList = true;
      this.showworkingList = false;
      this.showrejectedList = false;
      this.approvedloadPage();
    }
  }
  list: any = [];
  statusList: any = [];
  updatedList: any;
  tableClick(e) {
    // this.tempName = sessionStorage.setItem('tempName', e.tempName);
    this.tempName = sessionStorage.setItem('tempName', e.Tempname);
    this.localmasterName = sessionStorage.setItem(
      'localmasterName',
      e.masterName
    );
    this.localChecklistName = sessionStorage.setItem(
      'checklistName',
      e.checklistName
    );
    this.router.navigate([`mainpage/checklist/filledTable/${e}`]);
    // this.router.navigate([`mainpage/checklist/InputPreview/${e}`]);
  }
  fillAgain(e) {
    if (!e.Tempname) {
      this.dataService
        .get('fillChecklist/list/' + e.checkListName)
        .subscribe((res) => {
          this.list = res['result'];

          this.tempName = sessionStorage.setItem(
            'tempName',
            this.list[0]['Tempname']
          );
          this.list[0]['sentToApproval'] = 'false';
          this.dataService
            .put('fillChecklist/list/' + e.checkListName, this.list[0])
            .subscribe((res) => {
              this.updatedList = res['result'];
            });
          this.rejectedLists.forEach((element, index) => {
            if (element.checkListName == this.list[0]['masterName']) {
              delete this.rejectedLists[index];
            }
            //   this.anyChecklistRejected()
          });
          this.allLists.push(this.list[0]);
        });
      this.dataService
        .get('config/approval?checkListName=' + e.checkListName)
        .subscribe((res) => {
          this.statusList = res['result'];

          this.statusList[0]['status'] = 'resent for filling';
          this.dataService
            .put(
              'config/approval?checkListName=' + e.checkListName,
              this.statusList[0]
            )
            .subscribe((res) => {});
        });
    }
    if (e.checkListName) {
      this.localChecklistName = sessionStorage.setItem(
        'checklistName',
        e.checkListName
      );
    }
    // if (this.updatedList) {
    this.router.navigate([`mainpage/checklist/filledTable/${e}`]);
  }
  // fillAgain(e) {
  // this.dataService
  //   .get('fillChecklist/list/' + e.checkListName)
  //   .subscribe((res) => {
  //     this.list = res['result'];
  //     this.list[0]['sentToApproval'] = 'false';
  //     this.dataService
  //       .put('fillChecklist/list/' + e.checkListName, this.list[0])
  //       .subscribe((res) => {
  //       });
  //   });
  // if (this.list) {
  //   this.rejectedLists.forEach((element, index) => {
  //     if (element.checkListName == this.list[0]['masterName']) {
  //       delete this.rejectedLists[index];
  //     }
  //     this.anyChecklistRejected()
  //   });
  //   this.workingLists.push(this.list[0]);
  // }
  // }
  getMasterData() {
    this.dataService.get('masterData/master').subscribe((res) => {
      this.master = res['result'];
      if (!this.master.length) {
        this.showLoader = true;
      } else {
        this.showLoader = false;
        this.master.forEach((e) => {
          this.selectedMaster = e.Tempname;
          if (this.localtempName == this.selectedMaster) {
            this.masterName.push({
              masterName: e.masterName,
              tempName: e.Tempname,
            });
          }
        });
      }
    });
  }
  dateConvert(e) {
    return moment(e).format('DD/MM/YYYY hh:mm A');
  }
  getListData() {
    this.dataService
      .get(
        `fillChecklist/list${
          this.role == 'OPERATOR' ? '?filledBy=' + this.user : ''
        }`
      )
      .subscribe((res) => {
        this.checkListData = res['result'];
      });
  }
  anyChecklistRejected() {
    this.dataService
      .get(
        `config/approval?status=rejected${
          this.role == 'OPERATOR' ? '&preparedBy=' + this.user : ''
        }`
      )
      .subscribe((res) => {
        this.rejectedLists = res['result'];
        if (this.rejectedLists && this.checkListData) {
          this.allLists = this.checkListData.filter(
            (masterDetails: any, index: any) => {
              if (
                !this.rejectedLists.some(
                  ({ checkListName: checkListName }) =>
                    masterDetails.checklistName === checkListName
                )
              ) {
                return masterDetails;
              }
            }
          );
          this.allLists.forEach((e) => {
            this.listStatus.forEach((f) => {
              if (e.checklistName == f.checkListName) {
                if (f.status == 'approved') {
                  e['status'] = 'approved';
                } else if (f.status == 'rejected') {
                  e['status'] = 'rejected';
                } else {
                }
              }
            });
          });
        }
        let rejNumber = 0;
        this.rejectedLists.map((val) => {
          rejNumber++;
          val['index'] = rejNumber;
          this.rLists.push(val);
        });

        let approvedIndex = 0;
        this.approvedLists = this.allLists.filter((val) => {
          if (val['status'] == 'approved') {
            approvedIndex++;
            val['index'] = approvedIndex;
            return val;
          }
        });
        let workingListsNumber = 0;
        this.workingLists = this.allLists.filter((val) => {
          if (val['status'] !== 'approved') {
            workingListsNumber++;
            val['index'] = workingListsNumber;
            return val;
          }
        });
        this.loadPage();
      });
  }
  Preview(p) {
    this.localChecklistName = sessionStorage.setItem(
      'checklistName',
      p.checklistName
    );
    this.tempName = sessionStorage.setItem('tempName', p.Tempname);
    this.router.navigate([
      `mainpage/checklist/checklistPreview/${p.checklistName}`,
    ]);
  }
  updatedDate;
  options;
  updateButton;
  updateBool: boolean = false;
  formattedDate1;
  periodicSchedule;
  getStatus() {
    this.dataService.get('config/approval').subscribe((res) => {
      this.listStatus = res['result'];
      if (this.listStatus.length) {
        this.listStatus.forEach((l) => {
          this.periodicSchedule = l.periodicSchedule;
          if (l.periodicSchedule == 'Daily') {
            let filteredData = this.checkListData?.filter((val) => {
              return val.checklistName == l.checkListName;
            });
            if (filteredData && filteredData.length) {
              this.updatedDate = moment(filteredData[0]?.updatedAt).format(
                'M/D/YYYY'
              );
              this.formattedDate1 = this.updatedDate;

              if (this.formattedDate1 !== this.formattedDate) {
                l['status'] = 'waiting for confirmation';
                l['levelOfApproval'].map((level: Object) => {
                  level['show'] = false;
                  level['status'] = '';
                  level['comment'] = '';
                });
                this.dataService
                  .put('config/approval?checkListName=' + l.checkListName, l)
                  .subscribe((res) => {
                    if (res) this.anyChecklistRejected();
                  });

                filteredData[0]['column'].map((val) => {
                  val['rejected'] = false;
                });
                filteredData[0]['sentToApproval'] = false;
                this.dataService
                  .put('fillChecklist/list/' + l.checkListName, filteredData[0])
                  .subscribe((res) => {});
              } else {
                this.anyChecklistRejected();
              }
            } else {
              this.anyChecklistRejected();
            }
          } else {
            this.anyChecklistRejected();
          }
        });
      } else {
        this.anyChecklistRejected();
      }
    });
  }
  checkAndDisable(checkDate, data) {
    return moment(checkDate).format('M/D/YYYY') == this.formattedDate;
  }
}
