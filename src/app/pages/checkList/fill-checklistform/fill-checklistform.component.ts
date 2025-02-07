import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fill-checklistform',
  templateUrl: './fill-checklistform.component.html',
  styleUrls: ['./fill-checklistform.component.scss'],
})
export class FillChecklistformComponent implements OnInit {
  localtempName: any;
  master: any;
  selectedMaster: any;
  localmasterName;
  masterData = [];
  submitBool = [];
  masterFilled: any;
  data: any;
  boolSubmit: boolean = false;
  permission: any;
  newCLPermission: any;
  key = 'Checklist';
  department: string;
  userName: string;
  machines: any;
  mapArray: any = [];
  mappingData: any = [];
  shift: any = [];
  currentShiftName: any = '';
  role;
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.permission = JSON.parse(sessionStorage.getItem('permissions'));
    this.role = sessionStorage.getItem('role');
    this.newCLPermission = this.permission[this.key];
    this.localtempName = sessionStorage.getItem('tempName');
    this.localmasterName = sessionStorage.getItem('localmasterName');
    this.userName = sessionStorage.getItem('user');
    if (this.role != 'OPERATOR') {
      this.getMasterData();
    } else {
      this.getCurrentShift();
    }

    // this.department = sessionStorage.getItem('department')
  }
  getMasterData() {
    this.masterData = [];
    this.dataService.get('masterData/master').subscribe((res) => {
      this.master = res['result'];
      this.master.forEach((e) => {
        this.selectedMaster = e.Tempname;
        if (this.role != 'OPERATOR') {
          if (this.localtempName == this.selectedMaster) {
            this.masterFilled = e.masterName;
            this.masterData.push({
              masterName: e.masterName,
              tempName: e.Tempname,
              department: e.dName,
              submitBool: e.submitBool ? e.submitBool : false,
            });
          }
        } else {
          if (this.localtempName == this.selectedMaster) {
            if (
              e.shiftName == '' &&
              this.mapArray.some((el) => el.machine === e.machineName)
            ) {
              this.masterFilled = e.masterName;
              this.masterData.push({
                masterName: e.masterName,
                tempName: e.Tempname,
                department: e.dName,
                submitBool: e.submitBool ? e.submitBool : false,
              });
            }
            if (
              (e.machineName == null || e.machineName == '') &&
              e.shiftName === this.currentShiftName
            ) {
              this.masterFilled = e.masterName;
              this.masterData.push({
                masterName: e.masterName,
                tempName: e.Tempname,
                department: e.dName,
                submitBool: e.submitBool ? e.submitBool : false,
              });
            }
          }
        }

        // this.getData();
      });
    });
  }
  getCurrentShift() {
    this.dataService.get(`config/shift?type=shift`).subscribe((res) => {
      if (res && res['result'].length) {
        this.shift = res['result'];
        this.currentShiftName = this.shift[0]['currentShift'][0]['name'];
        this.getMapping();
      }
    });
  }
  getMapping() {
    this.dataService
      .get('mappingData/map?user=' + this.userName)
      .subscribe((res) => {
        if (res && res['result'].length) {
          this.mappingData = res['result'];
          this.mappingData.forEach((element) => {
            if (element.shift == this.currentShiftName) {
              this.mapArray.push({
                machine: element.machine,
              });
            }
          });
          this.getMasterData();
        }
      });
  }
  getData() {
    this.dataService
      .get('fillChecklist/list/' + this.masterFilled)
      .subscribe((res) => {
        this.data = res['result'];
        this.data.forEach((e) => {
          this.masterData.push({
            masterName: e.masterName,
            tempName: e.Tempname,
            submitBool: e.submitBool ? e.submitBool : false,
          });
        });
      });
  }
  fill(e) {
    this.localmasterName = sessionStorage.setItem('localmasterName', e);
    this.router.navigate([`mainpage/checklist/form/${e}`]);
  }
  returnToMaster() {
    this.router.navigate([`mainpage/checklist/fillnew`]);
  }
}
