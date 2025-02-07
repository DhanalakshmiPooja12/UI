import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DataService } from '../../../shared/data.service';
import { finalize } from 'rxjs/operators';
import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss'],
})
export class TemplateListComponent implements OnInit {
  @ViewChild('widgetEditorModal') public widgetEditorModal: TemplateRef<any>;
  private widgetEditorDialogRef: MatDialogRef<TemplateRef<any>>;
  isModalOpen = false;
  template: any = [];
  tempName;
  tempname: any;
  filterTerm: any;
  localRole;
  currentPage = 1;
  itemsPerPage = 6;
  maxSize: number;
  paginateData: any = [];
  action: any;
  permission: any;
  key = 'Template';
  tempPermission: any;

  constructor(
    private router: Router,
    private dataService: DataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.permission = JSON.parse(sessionStorage.getItem('permissions'));
    this.tempPermission = this.permission[this.key];
    this.localRole = sessionStorage.getItem('Role');
    this.getdata();
  }
  loadPage() {
    this.paginateData = this.template.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage
    );
  }
  openWidgetEditorDialog(template: any, data: any, act: any) {
    if (this.widgetEditorDialogRef) {
      return;
    }
    this.action = act;
    this.tempname = data.Tempname;

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
  getdata() {
    this.dataService.get('checklist/template').subscribe((res) => {
      if (res && res['result']) {
        let indexVal = 0;
        res['result'].map((val) => {
          indexVal++;
          val['index'] = indexVal;
        });
      }
      this.template = res['result'];
      this.loadPage();
      this.maxSize = this.template.length;
    });
  }

  createTemplate() {
    this.router.navigate(['mainpage/template/new']);
  }

  edit(e) {
    this.tempName = sessionStorage.setItem('tempName', e.Tempname);
    this.router.navigate([`mainpage/template/edit/${e.Tempname}`]);
  }

  dateConvert(e) {
    return moment(e).format('DD/MM/YYYY hh:mm A');
  }

  Preview(p) {
    this.tempName = sessionStorage.setItem('tempName', p.Tempname);
    this.router.navigate([`mainpage/template/temPreview/${p.Tempname}`]);
  }

  view(v) {
    this.tempName = sessionStorage.setItem('tempName', v.Tempname);
    this.router.navigate([`mainpage/template/temView/${v.Tempname}`]);
  }

  delete() {
    this.dataService
      .delete(`checklist/template/${this.tempname}`)
      .subscribe((res) => {
        this.getdata();
      });
  }
}
