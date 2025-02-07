import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import '@angular/localize/init';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-approvalprocess',
  templateUrl: './approvalprocess.component.html',
  styleUrls: ['./approvalprocess.component.scss'],
})
export class ApprovalprocessComponent implements OnInit {
  localChecklist: any;
  clickedItem: string = 'New';
  user: string;
  checklistStatus: any = [];
  assignedChecklists: any = [];
  newChecklists: any = [];
  upcomingChecklists: any = [];
  approvedChecklists: any = [];
  rejectedChecklists: any = [];
  updateCheckList: any = [];
  filterChecklist: any = [];
  localPermission;
  localmasterName;
  createdBy;
  constructor(
    private router: Router,
    private dataService: DataService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = sessionStorage.getItem('user');
    this.clickedItem = 'New';
    if ((this.clickedItem = 'New')) {
      this.anyChecklistAssigned();
    }
  }
  onClick(item: 'New' | 'Upcoming' | 'Approved' | 'Rejected') {
    this.clickedItem = item;
    this.filterChecklist = [];
    if (this.clickedItem == 'New') {
      this.filterChecklist.push(...this.newChecklists);
    } else if (this.clickedItem == 'Upcoming') {
      this.filterChecklist.push(...this.upcomingChecklists);
    } else if (this.clickedItem == 'Approved') {
      this.filterChecklist.push(...this.approvedChecklists);
    } else if (this.clickedItem == 'Rejected') {
      this.filterChecklist.push(...this.rejectedChecklists);
    }
  }
  anyChecklistAssigned() {
    this.assignedChecklists = [];
    this.checklistStatus = [];
    this.dataService.get('config/approval').subscribe((res) => {
      this.checklistStatus = res['result'];
      this.upcomingChecklists = this.checklistStatus.filter((list: any) => {
        if (
          list['levelOfApproval'].some(
            (level: Object) =>
              level['approvalPersonUser'] == this.user &&
              !level['show'] &&
              !level['status']
          )
        )
          return list;
      });
      this.newChecklists = this.checklistStatus.filter((list: any) => {
        if (
          list['levelOfApproval'].some(
            (level: Object) =>
              level['approvalPersonUser'] == this.user && level['show']
          )
        )
          return list;
      });
      this.approvedChecklists = this.checklistStatus.filter((list: any) => {
        if (
          list['levelOfApproval'].some(
            (level: Object) =>
              level['approvalPersonUser'] == this.user &&
              level['status'] === 'approved'
          )
        )
          return list;
      });
      this.rejectedChecklists = this.checklistStatus.filter((list: any) => {
        if (
          list['levelOfApproval'].some(
            (level: Object) =>
              level['approvalPersonUser'] == this.user &&
              level['status'] == 'rejected'
          )
        )
          return list;
      });
      this.onClick('New');
    });
  }

  checkListProvision(status, list = {}) {
    if (status == 'New') {
      this.approveChecklist(list);
    } else if (status == 'Upcoming') {
      this.upcomingChecklist();
    }
  }
  approveChecklist(list) {
    this.localChecklist = sessionStorage.setItem(
      'localChecklist',
      list['checkListName']
    );
    this.router.navigate([`mainpage/checklist/approvechecklist`]);
  }
  upcomingChecklist() {
    this.toastr.info('you are not having provision to open this checklist');
  }
}
