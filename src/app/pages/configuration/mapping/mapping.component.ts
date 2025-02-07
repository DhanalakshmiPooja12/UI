import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/shared/data.service';
import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
// import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.scss'],
})
export class MappingComponent implements OnInit {
  user: any;
  depart: any;
  role: any;
  plant: any;
  zone: any;
  machine: any;
  shift: any;
  userData: any;
  addDepartments: any;
  addRoles: any;
  addPlants: any;
  addZones: any;
  addMachines: any;
  addShifts: any;
  mainData: any;
  Id: any;
  updateID: any;
  finalArr: any = [];
  action: any;
  currentPage = 1;
  itemsPerPage = 6;
  maxSize: number;
  paginateData: any = [];

  @ViewChild('widgetEditorModal') public widgetEditorModal: TemplateRef<any>;
  private widgetEditorDialogRef: MatDialogRef<TemplateRef<any>>;
  name = 'Angular';
  isModalOpen = false;
  level: any;
  permission: any;
  key = 'Mapping';
  mapPermission: any;
  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    public dialog: MatDialog,
    private renderer: Renderer2,
    private el: ElementRef,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.permission = JSON.parse(sessionStorage.getItem('permissions'));
    this.mapPermission = this.permission[this.key];
    this.getData();
    this.getUsers();
    // this.getDepart();
    // this.getRole();
    this.getPlant();
    this.getZone();
    this.getMachine();
    this.getShift();
  }
  loadPage() {
    this.paginateData = this.mainData.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage
    );
  }
  cancel() {
    this.user = '';
    this.depart = '';
    this.role = '';
    this.plant = '';
    this.zone = '';
    this.machine = '';
    this.shift = '';
    this.level = '';
    this.modalService.dismissAll();
  }
  openModal(template: any, data: any, act: any) {
    this.action = act;
    this.updateID = data._id;

    if (data) {
      this.user = data.user;
      this.depart = data.depart;
      this.role = data.role;
      this.plant = data.plant;
      this.zone = data.zone;
      this.machine = data.machine;
      this.shift = data.shift;
      this.level = data.level;
    } else {
      this.user = '';
      this.depart = '';
      this.role = '';
      this.plant = '';
      this.zone = '';
      this.machine = '';
      this.shift = '';
      this.level = '';
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
    this.updateID = data._id;
    if (data) {
      this.user = data.user;
      this.depart = data.depart;
      this.role = data.role;
      this.plant = data.plant;
      this.zone = data.zone;
      this.machine = data.machine;
      this.shift = data.shift;
      this.level = data.level;
    } else {
      this.user = '';
      this.depart = '';
      this.role = '';
      this.plant = '';
      this.zone = '';
      this.machine = '';
      this.shift = '';
      this.level = '';
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
  getUsers() {
    this.dataService.get('config/user').subscribe((res) => {
      this.userData = res['result'];
    });
  }

  getPlant() {
    this.dataService.get('config/plant').subscribe((res) => {
      this.addPlants = res['result'];
    });
  }
  getZone() {
    this.dataService.get('config/zone').subscribe((res) => {
      this.addZones = res['result'];
    });
  }
  getMachine() {
    this.dataService.get('config/machine').subscribe((res) => {
      this.addMachines = res['result'];
    });
  }
  getShift() {
    this.dataService.get('config/shift').subscribe((res) => {
      this.addShifts = res['result'];
    });
  }
  userSelect(e) {
    this.user = e;
  }

  plantSelect(e) {
    this.plant = e;
  }
  zoneSelect(e) {
    this.zone = e;
  }
  machineSelect(e) {
    this.machine = e;
  }
  shiftSelect(e) {
    this.shift = e;
  }
  // levelSelect(e) {
  //   this.level = e;
  // }

  submit(a) {
    this.finalArr = {
      user: this.user,
      // depart: this.depart,
      // role: this.role,
      plant: this.plant,
      zone: this.zone,
      machine: this.machine,
      shift: this.shift,
      // level: this.level,
    };
    if (this.action == 'Add') {
      this.dataService.post('mappingData/map', this.finalArr).subscribe(
        (res) => {
          this.toastr.success('Successfully Added');
          this.getData();
        },
        (error) => {
          this.toastr.error(error.error['message']);
        }
      );
    } else {
      this.dataService
        .put('mappingData/map/' + this.updateID, this.finalArr)
        .subscribe(
          (res) => {
            this.toastr.success('Successfully Updated');

            this.getData();
          },
          (error) => {
            this.toastr.error('Data Already Exist');
          }
        );
    }
    this.modalService.dismissAll();
  }
  getData() {
    this.dataService.get('mappingData/map').subscribe((res) => {
      if (res && res['result']) {
        let indexVal = 0;
        res['result'].map((val) => {
          indexVal++;
          val['index'] = indexVal;
        });
      }
      this.mainData = res['result'];
      this.loadPage();
      this.maxSize = this.mainData.length;
    });
  }
  delete(del) {
    this.dataService
      .delete('mappingData/map/' + this.updateID)
      .subscribe((res) => {
        this.toastr.success(' Successfully Deleted');
        if (res['result'] == 'user Deleted!!!') {
          this.toastr.success(' Successfully Deleted');
        }
        this.getData();
      });
  }
}
