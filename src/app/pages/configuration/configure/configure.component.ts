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
import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss'],
})
export class ConfigureComponent implements OnInit, OnChanges {
  @ViewChild('widgetEditorModal') public widgetEditorModal: TemplateRef<any>;
  private widgetEditorDialogRef: MatDialogRef<TemplateRef<any>>;
  isModalOpen = false;
  color = '#26a69a';
  selected: any;
  roleColor = '#64b5f6';
  addDepartments: any = [];
  addRoles: any = [];
  addPlants: any = [];
  addZones: any = [];
  addMachines: any = [];
  addShifts: any = [];
  action: any;
  actionRole: any;
  dName: any;
  Id;
  departArr: any = [];
  actionPlant: any;
  actionZone: any;
  actionShift: any;
  actionMachine: any;
  depBool: boolean = false;
  roleBool: boolean = false;
  plantBool: boolean = false;
  zoneBool: boolean = false;
  machineBool: boolean = false;
  shiftBool: boolean = false;
  departId: any;
  name: any;
  plantName: any;
  zoneName: any;
  machineName: any;
  shiftName: any;
  addRolesArr: any = [];
  addPlantArr: any = [];
  addShiftsArr: any = [];
  addDepartArr: any = [];
  addZoneArr: any = [];
  addMachineArr: any = [];
  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getDepart();
    this.getRole();
    this.getPlant();
    this.getZone();
    this.getMachine();
    this.getShift();
  }
  ngOnChanges(changes: SimpleChanges) {}

  openModal(template: any, data: any, act: any) {
    this.action = act;
    this.departId = data._id;

    if (data) {
      this.dName = data.dName;
      this.name = data.name;
      this.plantName = data.plantName;
      this.zoneName = data.zoneName;
      this.machineName = data.machineName;
      this.shiftName = data.shiftName;
    }

    this.modalService.open(template, {
      size: 'sm',
      backdrop: false,
      centered: true,
    });
  }
  openWidgetEditorDialog(template: any, data: any, act: any) {
    if (this.widgetEditorDialogRef) {
      return;
    }
    this.action = act;
    this.departId = data._id;

    if (data) {
      this.dName = data.dName;
      this.name = data.name;
      this.plantName = data.plantName;
      this.zoneName = data.zoneName;
      this.machineName = data.machineName;
      this.shiftName = data.shiftName;
    } else {
      this.dName = '';
      this.name = '';
      this.plantName = '';
      this.zoneName = '';
      this.machineName = '';
      this.shiftName = '';
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
  cancel() {
    this.modalService.dismissAll();
  }

  deleteDepartment(index: any, e) {
    this.addDepartments.splice(index, 1);
    this.dataService.delete('config/department/' + e._id).subscribe((res) => {
      this.getDepart();
    });
  }
  deleteRole(index: any, e) {
    this.addRoles.splice(index, 1);
    this.dataService.delete('config/role/' + e._id).subscribe((res) => {
      this.getRole();
    });
  }
  deletePlant(index: any, e) {
    this.addPlants.splice(index, 1);
    this.dataService.delete('config/plant/' + e._id).subscribe((res) => {
      this.getPlant();
    });
  }
  deleteZone(index: any, e) {
    this.addZones.splice(index, 1);
    this.dataService.delete('config/zone/' + e._id).subscribe((res) => {
      this.getZone();
    });
  }
  deleteMachine(index: any, e) {
    this.addMachines.splice(index, 1);
    this.dataService.delete('config/machine/' + e._id).subscribe((res) => {
      this.getMachine();
    });
  }
  deleteShift(index: any, a) {
    this.addShifts.splice(index, 1);
    this.dataService.delete('config/shift/' + a._id).subscribe((res) => {
      this.getZone();
    });
  }

  colSubmit() {
    this.addDepartArr = {
      dName: this.dName,
    };

    if (this.action == 'Add') {
      this.dataService
        .post('config/department', this.addDepartArr)
        .subscribe((res) => {
          this.getDepart();
        });
    } else {
      this.dataService
        .put('config/department/' + this.departId, this.addDepartArr)
        .subscribe((res) => {
          this.getDepart();
        });
    }
    this.modalService.dismissAll();
  }
  getDepart() {
    this.dataService.get('config/department').subscribe((res) => {
      this.depBool = true;
      this.addDepartments = res['result'];
    });
  }
  roleSubmit() {
    this.addRolesArr = {
      name: this.name,
    };
    if (this.action == 'Add') {
      this.dataService
        .post('config/role', this.addRolesArr)
        .subscribe((res) => {
          this.getRole();
        });
    } else {
      this.dataService
        .put('config/role/' + this.departId, this.addRolesArr)
        .subscribe((res) => {
          this.getRole();
        });
    }
    this.modalService.dismissAll();
  }
  getRole() {
    this.dataService.get('config/role').subscribe((res) => {
      this.addRoles = res['result'];
    });
  }
  plantSubmit() {
    this.addPlantArr = {
      plantName: this.plantName,
    };
    if (this.action == 'Add') {
      this.dataService
        .post('config/plant', this.addPlantArr)
        .subscribe((res) => {
          this.getPlant();
        });
    } else {
      this.dataService
        .put('config/plant/' + this.departId, this.addPlantArr)
        .subscribe((res) => {
          this.getPlant();
        });
    }
    this.modalService.dismissAll();
  }
  getPlant() {
    this.dataService.get('config/plant').subscribe((res) => {
      this.addPlants = res['result'];
    });
  }
  zoneSubmit() {
    this.addZoneArr = {
      zoneName: this.zoneName,
    };
    if (this.action == 'Add') {
      this.dataService.post('config/zone', this.addZoneArr).subscribe((res) => {
        this.getZone();
      });
    } else {
      this.dataService
        .put('config/zone/' + this.departId, this.addZoneArr)
        .subscribe((res) => {
          this.getZone();
        });
    }
    this.modalService.dismissAll();
  }
  getZone() {
    this.dataService.get('config/zone').subscribe((res) => {
      this.addZones = res['result'];
    });
  }
  machineSubmit() {
    this.addMachineArr = {
      machineName: this.machineName,
    };
    if (this.action == 'Add') {
      this.dataService
        .post('config/machine', this.addMachineArr)
        .subscribe((res) => {
          this.getMachine();
        });
    } else {
      this.dataService
        .put('config/machine/' + this.departId, this.addMachineArr)
        .subscribe((res) => {
          this.getMachine();
        });
    }
    this.modalService.dismissAll();
  }
  getMachine() {
    this.dataService.get('config/machine').subscribe((res) => {
      this.addMachines = res['result'];
    });
  }
  shiftSubmit() {
    this.addShiftsArr = {
      shiftName: this.shiftName,
    };
    if (this.action == 'Add') {
      this.dataService
        .post('config/shift', this.addShiftsArr)
        .subscribe((res) => {
          this.getShift();
        });
    } else {
      this.dataService
        .put('config/shift/' + this.departId, this.addShiftsArr)
        .subscribe((res) => {
          this.getShift();
        });
    }
    this.modalService.dismissAll();
  }
  getShift() {
    this.dataService.get('config/shift').subscribe((res) => {
      this.addShifts = res['result'];
    });
  }
  depClick() {
    this.depBool = true;
    this.roleBool = false;
    this.plantBool = false;
    this.zoneBool = false;
    this.machineBool = false;
    this.shiftBool = false;
  }
  roleClick() {
    this.roleBool = true;
    this.plantBool = false;
    this.depBool = false;
    this.zoneBool = false;
    this.machineBool = false;
    this.shiftBool = false;
  }
  plantClick() {
    this.plantBool = true;
    this.roleBool = false;
    this.depBool = false;
    this.zoneBool = false;
    this.machineBool = false;
    this.shiftBool = false;
  }
  zoneClick() {
    this.zoneBool = true;
    this.roleBool = false;
    this.plantBool = false;
    this.depBool = false;
    this.machineBool = false;
    this.shiftBool = false;
  }
  machineClick() {
    this.machineBool = true;
    this.roleBool = false;
    this.plantBool = false;
    this.depBool = false;
    this.zoneBool = false;
    this.shiftBool = false;
  }
  shiftClick() {
    this.shiftBool = true;
    this.roleBool = false;
    this.plantBool = false;
    this.depBool = false;
    this.zoneBool = false;
    this.machineBool = false;
  }
}
