import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/shared/data.service';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { PasswordStrengthValidator } from 'src/app/helpers/password-validator';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  FormBuilder,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';

import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';

@Component({
  selector: 'app-userconfig',
  templateUrl: './userconfig.component.html',
  styleUrls: ['./userconfig.component.scss'],
})
export class UserconfigComponent implements OnInit {
  @ViewChild('widgetEditorModal') public widgetEditorModal: TemplateRef<any>;
  private widgetEditorDialogRef: MatDialogRef<TemplateRef<any>>;
  isModalOpen = false;
  passwordVaild: boolean = false;
  color = '#00E6FF';
  template: any;
  finalArr: any;
  userName: any = '';
  email: any = '';
  action: any;
  role: any = '';
  userRole: any;
  password: any = '';
  depart: any;
  userId: any;
  finalArr1: any;
  updateID: any;
  currentPage = 1;
  itemsPerPage = 6;
  maxSize: number;
  paginateData: any = [];
  displayedColumns = ['userId', 'userName', 'email'];
  dataSource = '';
  hide: boolean = false;
  formEP: FormGroup;
  currentUserId = 2;
  addDepartments: any;
  addRoles: any;
  key = 'User';
  permission: any;
  userPermission: any;

  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.permission = JSON.parse(sessionStorage.getItem('permissions'));

    this.userPermission = this.permission[this.key];
    this.formEP = this.formBuilder.group({
      userId: ['', { validators: [Validators.required] }],
      userName: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [
        undefined,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
          ),
          Validators.minLength(8),
        ],
      ],
      role: ['', Validators.required],
      depart: ['', Validators.required],
    });
    this.getUsers();
    this.getDepart();
    this.getRole();
  }

  getInput() {

    let status = this.formEP.get('password').status;
    if (status.includes('INVALID')) this.passwordVaild = true;
    else this.passwordVaild = false;

}
  getUsers() {
    this.formEP.reset(this.formEP.value);
    this.dataService.get('config/user').subscribe((res) => {
      this.finalArr = res['result'];
      this.maxSize = this.finalArr.length;
      this.loadPage();
    });
  }
  getDepart() {
    this.dataService.get('config/department').subscribe((res) => {
      this.addDepartments = res['result'];
    });
  }
  getRole() {
    this.dataService.get('config/role').subscribe((res) => {
      this.addRoles = res['result'];
    });
  }
  loadPage() {
    this.paginateData = this.finalArr.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage
    );
  }
  openModal(template: any, data: any, act: any) {
    this.action = act;
    if (data) {
      this.userId = data.userId;
      this.userName = data.userName;
      this.userRole = data.role;
      this.depart = data.depart;
      this.email = data.email;
      this.password = data.password;
    }
    this.modalService.open(template, {
      size: 'lg',
      backdrop: false,
      centered: true,
    });
   
 
  }
  openWidgetEditorDialog(template: any, data: any, act: any) {
    if (this.widgetEditorDialogRef) {
      return;
    }
    this.action = act;
    this.updateID = data.userId;
    if (data) {
      this.currentUserId = data.userId;
      this.userId = data.userId;
      this.userName = data.userName;
      this.userRole = data.role;
      this.depart = data.depart;
      this.email = data.email;
      this.password = data.password;
    } else {
      this.currentUserId =
        Number(this.finalArr[this.finalArr.length - 1].userId) + 1;
      this.userId = '';
      this.userName = '';
      this.userRole = '';
      this.depart = '';
      this.email = '';
      this.password = '';
    }
    this.hide=false;
    if(act!='Add'){
      this.formEP.controls['password'].disable();
    }else{
      this.formEP.controls['password'].enable();

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
  departSelect(e) {
    this.depart = e;
  }
  roleSelect(e) {
    this.userRole = e;
  }
  addUser() {
    this.finalArr1 = this.formEP.value;

    if (this.action === 'Add') {
      //   if (this.formEP.valid) {

      // }
      this.dataService.post('config/user', this.finalArr1).subscribe(
        (res) => {
          if (res['result']) {
            this.toastr.success(' Successfully Added');
          }
          //  else {
          //   this.toastr.success('Data Already Exists');
          // }
          this.formEP.reset(this.formEP.value);
          this.getUsers();
          this.cancel();
        },
        (error) => {
          this.toastr.error(error.error['message'])
        }
      );
    } else {
      this.dataService
        .put('config/user/' + this.userId, this.finalArr1)
        .subscribe(
          (res) => {
            this.toastr.success(' Successfully Updated ');
            this.formEP.reset(this.formEP.value);
            this.getUsers();
            this.cancel();
          },
          (error) => {
            this.toastr.error('Data Already Exist');
          }
        );
    }
  }
  delete(e) {
    this.dataService.delete('config/user/' + this.updateID).subscribe((res) => {
      this.getUsers();
      if (res['result'] == 'user Deleted!!!') {
        this.toastr.success(' Successfully Deleted');
      }
    });
  }
  cancel() {
    this.userId = '';
    this.userName = '';
    this.email = '';
    this.password = '';
    this.userRole = '';
    this.depart = '';
    this.modalService.dismissAll();
    this.formEP.reset(this.formEP.value);
  }
  get formControls() {
    return this.formEP.controls;
  }
  toggleVisibility() {
    this.hide = !this.hide;
  }
  enable(){
   this.formEP.controls['password'].enable();
    this.password='';
  }
}
