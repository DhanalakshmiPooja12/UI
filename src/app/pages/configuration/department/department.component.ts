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

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
  @ViewChild('widgetEditorModal') public widgetEditorModal: TemplateRef<any>;
  private widgetEditorDialogRef: MatDialogRef<TemplateRef<any>>;
  isModalOpen = false;
  action: any;
  departId: any;
  dName: any;
  addDepartments: any = [];
  addDepartArr: any = [];
  currentPage = 1;
  itemsPerPage = 6;
  maxSize: number;
  paginateData: any = [];
  permission: any;
  key = 'Department';
  departPermission: any;
  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.permission = JSON.parse(sessionStorage.getItem('permissions'));
    this.departPermission = this.permission[this.key];
    this.getDepart();
  }
  loadPage() {
    this.paginateData = this.addDepartments.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage
    );
  }
  openWidgetEditorDialog(template: any, data: any, act: any) {
    if (this.widgetEditorDialogRef) {
      return;
    }
    this.action = act;
    this.departId = data._id;

    if (data) {
      this.dName = data.dName;
    } else {
      this.dName = '';
    }

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
  colSubmit() {
    this.addDepartArr = {
      dName: this.dName,
    };

    if (this.action == 'Add') {
      this.dataService.post('config/department', this.addDepartArr).subscribe(
        (res) => {
          this.toastr.success(' Successfully Added');
          this.getDepart();
        },
        (error) => {
          this.toastr.error(error.error['message']);
        }
      );
    } else {
      this.dataService
        .put('config/department/' + this.departId, this.addDepartArr)
        .subscribe(
          (res) => {
            this.toastr.success(' Successfully Updated');
            this.getDepart();
          },
          (error) => {
            this.toastr.error('Data Already Exist');
          }
        );
    }
  }
  getDepart() {
    this.dataService.get('config/department').subscribe((res) => {
      if (res && res['result']) {
        let indexVal = 0;
        res['result'].map((val) => {
          indexVal++;
          val['index'] = indexVal;
        });
      }
      this.addDepartments = res['result'];
      this.loadPage();
      this.maxSize = this.addDepartments.length;
    });
  }
  deleteDepartment(e) {
    this.dataService
      .delete('config/department/' + this.departId)
      .subscribe((res) => {
        this.toastr.success(' Successfully Deleted');
        this.getDepart();
      });
  }
}
