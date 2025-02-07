import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.scss'],
})
export class MasterListComponent implements OnInit {
  @ViewChild('widgetEditorModal') public widgetEditorModal: TemplateRef<any>;
  private widgetEditorDialogRef: MatDialogRef<TemplateRef<any>>;
  isModalOpen = false;
  action: any;
  permission: any;
  masterPermission: any;
  key = 'Master';
  constructor(
    private router: Router,
    private dataService: DataService,
    public dialog: MatDialog
  ) {}
  master: any = [];
  masterName: any;
  masterId: any;
  filterTerm: any;
  tempName: any;

  currentPage = 1;
  itemsPerPage = 6;
  maxSize: number;
  paginateData: any = [];
  ngOnInit(): void {
    this.permission = JSON.parse(sessionStorage.getItem('permissions'));

    this.masterPermission = this.permission[this.key];
    this.getdata();
  }
  loadPage() {
    this.paginateData = this.master.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage
    );
  }
  getdata() {
    this.dataService.get('masterData/master').subscribe((res) => {
      if (res && res['result']) {
        let indexVal = 0;
        res['result'].map((val) => {
          indexVal++;
          val['index'] = indexVal;
        });
      }
      this.master = res['result'];
      this.loadPage();
      this.maxSize = this.master.length;
    });
  }
  openWidgetEditorDialog(template: any, data: any, act: any) {
    if (this.widgetEditorDialogRef) {
      return;
    }
    this.action = act;
    this.masterId = data.masterName;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.role = 'dialog';
    dialogConfig.width = '400px';
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
  createMaster() {
    this.router.navigate(['mainpage/master/create']);
  }

  edit(e) {
    this.masterName = sessionStorage.setItem('masterName', e.masterName);
    this.router.navigate([`mainpage/master/edit/[${e.masterName}]`]);
  }

  delete() {
    this.dataService
      .delete(`masterData/master/${this.masterId}`)
      .subscribe((res) => {
        this.getdata();
      });
  }
  Preview(e) {
    this.masterName = sessionStorage.setItem('masterName', e.masterName);
    this.tempName = sessionStorage.setItem('tempName', e.Tempname);
    this.router.navigate([
      `mainpage/master/preview/${JSON.stringify(e.masterName)}`,
    ]);
  }

  dateConvert(e) {
    return moment(e).format('DD/MM/YYYY hh:mm A');
  }
}
