import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrls: ['./maindashboard.component.scss'],
})
export class MaindashboardComponent implements OnInit {
  master: any;
  template: any;
  localUserName: any;
  listApproveStatus: any = [];
  listStatusBool: boolean = false;
  listStatus: any;
  localRole: any;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.localUserName = sessionStorage.getItem('user');
    this.localRole = sessionStorage.getItem('role');
    this.getdata();
    this.getdataTemplate();
    this.getStatus();
  }
  getdata() {
    this.dataService.get('masterData/master').subscribe((res) => {
      this.master = res['result'];

      // res['result'].forEach((e) => {
      //   if (e.createdBy == this.localUserName) {
      //     this.master = res['result'];
      //   } else {
      //     this.master = 'NO Master Created';
      //   }
      // });
    });
  }
  getdataTemplate() {
    this.dataService.get('checklist/template').subscribe((res) => {
      this.template = res['result'];

      // res['result'].forEach((e) => {
      //   if (e.createdBy == this.localUserName) {
      //     this.template = res['result'];
      //   } else {
      //     this.template = 'No Template Created';
      //   }
      // });
    });
  }
  getStatus() {
    this.dataService.get('config/approval').subscribe((res) => {
      this.listStatus = res['result'];

      this.listStatus.forEach((l) => {
        if (l.status == 'approved' || l.status == 'rejected') {
          this.listStatusBool = true;
          this.listApproveStatus.push(l);
        } else {
          this.listStatusBool = false;
        }
      });
    });
  }
  templateNav() {
    this.router.navigate([`mainpage/template/list`]);
  }
  masterNav() {
    this.router.navigate([`mainpage/master/list`]);
  }
}
