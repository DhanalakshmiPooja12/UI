import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/shared/data.service';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
const moment = require('moment');

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss'],
})
export class ShiftComponent implements OnInit {
  @ViewChild('widgetEditorModal') public widgetEditorModal: TemplateRef<any>;
  private widgetEditorDialogRef: MatDialogRef<TemplateRef<any>>;
  isModalOpen = false;
  action: any;
  shiftId: any;
  shiftName: any;
  addShifts: any = [];
  addShiftsArr: any = [];
  start: any;
  end: any;
  currentPage = 1;
  itemsPerPage = 6;
  maxSize: number;
  paginateData: any = [];
  permissions: any;
  key = 'Shift';
  shiftPermission: any;
  shiftPermissionAndExceed: Boolean = true;
  exceedsShift = 0;
  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.permissions = JSON.parse(sessionStorage.getItem('permissions'));

    this.shiftPermission = this.permissions[this.key];

    if (!this.shiftPermission['create'])
      this.shiftPermissionAndExceed = this.shiftPermission['create'];
    this.getShift();
  }
  loadPage() {
    this.paginateData = this.addShifts.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage
    );
  }
  openWidgetEditorDialog(template: any, data: any, act: any) {
    if (this.widgetEditorDialogRef) {
      return;
    }
    this.action = act;
    this.shiftId = data._id;
    if (this.addShifts.length)
      if (data) {
        this.shiftName = data.shiftName;
        this.start = data.startTime;
        this.end = data.endTime;
      } else {
        this.shiftName = '';
        this.start = this.addShifts[this.addShifts.length - 1].endTime;
        this.end = '';
      }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.role = 'dialog';
    dialogConfig.width = '700px';
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
  shiftSubmit() {
    this.addShiftsArr = {
      shiftName: this.shiftName,
      startTime: this.start,
      endTime: this.end,
    };
    if (this.action == 'Add') {
      this.dataService.post('config/shift', this.addShiftsArr).subscribe(
        (res) => {
          this.toastr.success('Successfully Added');
          this.getShift();
        },
        (error) => {
          this.toastr.error(error.error['message']);
        }
      );
    } else {
      this.dataService
        .put('config/shift/' + this.shiftId, this.addShiftsArr)
        .subscribe(
          (res) => {
            this.toastr.success(' Successfully Updated');
            this.getShift();
          },
          (error) => {
            this.toastr.error('Data Already Exist');
          }
        );
    }
    this.modalService.dismissAll();
  }
  getShift() {
    this.dataService.get('config/shift').subscribe((res) => {
      if (res && res['result']) {
        let indexVal = 0;
        res['result'].map((val) => {
          indexVal++;
          val['index'] = indexVal;
        });
      }
      this.addShifts = res['result'];
      this.loadPage();
      this.maxSize = this.addShifts.length;
     
      if (!this.maxSize) {
        this.shiftPermissionAndExceed = true;
      } else {
        // if(this.action=="Add"){
        let exceedsShift = 0;
        for (let i = 0; i < this.addShifts.length; i++) {
          let time = moment.duration(this.addShifts[i]['duration'], 'HH:mm:ss');
          exceedsShift += time.asHours() * 1;
        }

        // }
        if (exceedsShift >= 24) {
          if (this.action == 'Add')
            this.toastr.info('Please configure within 24 hours..');
          this.shiftPermissionAndExceed = false;
        } else {
          this.shiftPermissionAndExceed = true;
        }
      }
    });
  }
  deleteShift(a) {
    this.dataService.delete('config/shift/' + this.shiftId).subscribe((res) => {
      this.toastr.success(' Successfully Deleted');
      this.getShift();
    });
  }
}
