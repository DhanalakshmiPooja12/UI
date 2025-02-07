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
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss'],
})
export class MachineComponent implements OnInit {
  @ViewChild('widgetEditorModal') public widgetEditorModal: TemplateRef<any>;
  private widgetEditorDialogRef: MatDialogRef<TemplateRef<any>>;
  isModalOpen = false;
  action: any;
  machineId: any;
  machineName: any;
  addMachines: any = [];
  addMachineArr: any = [];
  currentPage = 1;
  itemsPerPage = 6;
  maxSize: number;
  paginateData: any = [];
  permission: any;
  machinePermission: any;
  key = 'Machine';
  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.permission = JSON.parse(sessionStorage.getItem('permissions'));
    this.machinePermission = this.permission[this.key];
    this.getMachine();
  }
  loadPage() {
    this.paginateData = this.addMachines.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage
    );
  }
  openWidgetEditorDialog(template: any, data: any, act: any) {
    if (this.widgetEditorDialogRef) {
      return;
    }
    this.action = act;
    this.machineId = data._id;
    if (data) {
      this.machineName = data.machineName;
    } else {
      this.machineName = '';
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
  machineSubmit() {
    this.addMachineArr = {
      machineName: this.machineName,
    };
    if (this.action == 'Add') {
      this.dataService.post('config/machine', this.addMachineArr).subscribe(
        (res) => {
          this.toastr.success(' Successfully Added');
          this.getMachine();
        },
        (error) => {
          this.toastr.error(error.error['message']);
        }
      );
    } else {
      this.dataService
        .put('config/machine/' + this.machineId, this.addMachineArr)
        .subscribe(
          (res) => {
            this.toastr.success(' Successfully Updated');

            this.getMachine();
          },
          (error) => {
            this.toastr.error('Data Already Exist');
          }
        );
    }
  }
  getMachine() {
    this.dataService.get('config/machine').subscribe((res) => {
      if (res && res['result']) {
        let indexVal = 0;
        res['result'].map((val) => {
          indexVal++;
          val['index'] = indexVal;
        });
      }
      this.addMachines = res['result'];
      this.loadPage();
      this.maxSize = this.addMachines.length;
    });
  }
  deleteMachine(e) {
    this.dataService
      .delete('config/machine/' + this.machineId)
      .subscribe((res) => {
        this.toastr.success(' Successfully Deleted');
        this.getMachine();
      });
  }
}
