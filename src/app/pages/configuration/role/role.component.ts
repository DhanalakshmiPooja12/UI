import {
  Component,
  OnChanges,
  OnInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { finalize } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { event } from 'jquery';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit, OnChanges {
  @ViewChild('widgetEditorModal') public widgetEditorModal: TemplateRef<any>;
  private widgetEditorDialogRef: MatDialogRef<TemplateRef<any>>;
  isModalOpen = false;
  panelOpenState = false;
  addRoles: any = [];
  addRolesArr: any = [];
  action: any;
  roleId: any;
  name: any;
  description: any;
  permissions: any;
  createCheckBox: any;
  modifyCheckBox: any;
  viewCheckBox: any;
  accordionOpen: boolean = false;
  features = {};
  role = {};
  createCheckMarked: boolean = false;
  modifyCheckMarked: boolean = false;
  viewCheckMarked: boolean = false;
  featureHeading;
  temp: any = {};
  permissionsGranted = {};
  addPermission: boolean = false;
  currentPage = 1;
  itemsPerPage = 6;
  maxSize: number;
  paginateData: any = [];
  key = 'Role';
  permission: any;
  rolePermission: any;
  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.permission = JSON.parse(sessionStorage.getItem('permissions'));
    this.rolePermission = this.permission[this.key];
    this.getRole();
    this.getAllPermissions();
  }
  ngOnChanges() {}
  getRole() {
    this.dataService.get('config/role').subscribe((res) => {
      if (res && res['result']) {
        let indexVal = 0;
        res['result'].map((val) => {
          indexVal++;
          val['index'] = indexVal;
        });
      }
      this.addRoles = res['result'];
      this.loadPage();
      this.maxSize = this.addRoles.length;
    });
  }
  loadPage() {
    this.paginateData = this.addRoles.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage
    );
  }
  openWidgetEditorDialog(template: any, data: any, act: any) {
    this.addPermission = false;
    if (this.widgetEditorDialogRef) {
      return;
    }
    this.action = act;
    if (data) {
      this.roleId = data._id;
      this.name = data.name;
      this.description = data.description;
      this.temp = data.permissions;
    } else {
      this.getAllPermissions();
      this.roleId = '';
      this.name = '';
      this.description = '';
      this.permissions = this.temp;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.role = 'dialog';
    dialogConfig.width = '600px';
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
  roleSubmit() {
    this.addPermission = false;
    this.addRolesArr = {
      name: this.name,
      description: this.description,
      permissions: this.temp,
    };
    if (this.action == 'Add') {
      this.dataService.post('config/role', this.addRolesArr).subscribe(
        (res) => {
          if (res['result'] == 'roles Added!!') {
            this.toastr.success(' Successfully Added');
          }
          this.getRole();
        },
        (error) => {
          this.toastr.error(error.error['message']);
        }
      );
    } else {
      this.dataService
        .put('config/role/' + this.roleId, this.addRolesArr)
        .subscribe((res) => {
          if (res['result'] == 'Data Updated Successfully!!!') {
            this.toastr.success(' Successfully Updated');
          }
          this.getRole();
        });
    }
    this.modalService.dismissAll();
  }
  cancel() {
    this.getRole();
    this.addPermission = false;
  }
  toggleCreateCheck(e, page) {
    this.createCheckMarked = e.target.checked;
    this.temp['Configuration'][`${page}`]['create'] = this.createCheckMarked;
  }
  toggleModifyCheck(e, page) {
    this.modifyCheckMarked = e.target.checked;
    this.temp['Configuration'][`${page}`]['modify'] = this.modifyCheckMarked;
  }
  toggleViewCheck(e, page) {
    this.viewCheckMarked = e.target.checked;
    this.temp['Configuration'][`${page}`]['view'] = this.viewCheckMarked;
  }
  selectAll(value, selkey) {
    var status = selkey ? false : true;
    this.temp['Configuration'][`${value}`] = {
      create: status,
      modify: status,
      view: status,
    };
  }
  resetCreate(e, val, page) {
    this.createCheckMarked = val ? true : false;
    this.temp['Configuration'][`${page}`]['create'] = this.createCheckMarked;
  }
  resetModify(e, val, page) {
    this.modifyCheckMarked = val ? true : false;
    this.temp['Configuration'][`${page}`]['modify'] = this.modifyCheckMarked;
  }
  resetView(e, val, page) {
    this.viewCheckMarked = val ? true : false;
    this.temp['Configuration'][`${page}`]['view'] = this.viewCheckMarked;
  }
  deleteRole(e) {
    this.dataService.delete('config/role/' + this.roleId).subscribe((res) => {
      if (res['result'] == 'Role Deleted!!!') {
        this.toastr.success(' Successfully Deleted');
      }
      this.getRole();
    });
    this.addPermission = false;
  }
  getAllPermissions() {
    this.dataService.get('config/getpages').subscribe((res) => {
      this.features = res['result'][0]['features'];
      this.featureHeading = Object.keys(this.features);
      this.featureHeading.map((feature) => {
        this.temp[feature] = {};
        this.features[feature].map((f) => {
          this.temp[feature][f] = {
            create: false,
            modify: false,
            view: false,
          };
        });
      });
    });
  }
  rol: any;
  addPermissions(data) {
    this.addPermission = false;
    this.action = 'Edit';
    if (data) {
      setTimeout(() => {
        this.addPermission = true;
      }, 1000);
      this.rol = data.name;
      this.roleId = data._id;
      this.name = data.name;
      this.description = data.description;
      this.temp = data.permissions;
    } else {
      this.roleId = '';
      this.name = '';
      this.description = '';
      this.permissions = this.temp;
    }
  }
}
