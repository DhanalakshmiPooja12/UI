import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss'],
})
export class ApprovalComponent implements OnInit {
  @ViewChild('widgetEditorModal') public widgetEditorModal: TemplateRef<any>;
  private widgetEditorDialogRef: MatDialogRef<TemplateRef<any>>;
  isModalOpen = false;
  action: any;
  role: any;
  user: any;
  constructor(private dataService: DataService, public dialog: MatDialog) {}

  listStatus: any = [];
  filterTerm: any;
  currentPage = 1;
  itemsPerPage = 6;
  maxSize: number;
  paginateData: any = [];
  showProgress: boolean = false;
  completed: boolean = false;
  isLinear = true;
  levelStatus: any;
  currentStatus: any = '';
  statusColor = '';
  reject: boolean = false;
  levelDesc = [];
  showcard: any;
  ngOnInit(): void {
    this.role = sessionStorage.getItem('role');
    this.user = sessionStorage.getItem('user');
    this.getStatus();
  }

  loadPage() {
    this.paginateData = this.listStatus.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage
    );
  }
  openWidgetEditorDialog(template: any, data: any, act: any) {
    this.levelStatus = [];
    this.levelDesc = [];
    this.currentStatus = '';
    this.completed = false;
    this.reject = false;
    if (this.widgetEditorDialogRef) {
      return;
    }
    this.action = act;
    if (data['status'] == 'approved') {
      this.completed = true;
      this.reject = false;
    } else if (
      data['status'] == 'rejected' ||
      data['status'] == 'resent for filling'
    ) {
      this.completed == false;
      this.reject = true;
      this.levelStatus = data['levelOfApproval'].filter((level) => {
        if (level['status'] === 'rejected') return level;
      });
      this.currentStatus = this.levelStatus[0]['level'];
    } else if (data['status'] == 'waiting for confirmation') {
      this.reject = false;
      this.completed = false;
    } else {
      this.reject = false;
      this.completed = false;
      this.levelStatus = data['levelOfApproval'].filter((level) => {
        if (level['show'] === true) return level;
      });
      this.currentStatus = this.levelStatus[0]['level'];
    }
    this.levelDesc = data.levelOfApproval;
    this.showProgress = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.role = 'dialog';
    dialogConfig.width = '800px';
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
        this.showProgress = false;
        this.completed = false;
      });
  }
  getStatus() {
    this.dataService
      .get(
        `config/approval${
          this.role == 'OPERATOR' ? '?preparedBy=' + this.user : ''
        }`
      )
      .subscribe((res) => {
        if (res && res['result']) {
          let indexVal = 0;
          res['result'].map((val) => {
            indexVal++;
            val['index'] = indexVal;
          });
        }
        this.listStatus = res['result'];
        this.loadPage();
        this.maxSize = this.listStatus.length;
      });
  }
  dateConvert(e) {
    return moment(e).format('DD/MM/YYYY hh:mm A');
  }
}
