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
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.scss'],
})
export class PlantComponent implements OnInit {
  @ViewChild('widgetEditorModal') public widgetEditorModal: TemplateRef<any>;
  private widgetEditorDialogRef: MatDialogRef<TemplateRef<any>>;
  isModalOpen = false;
  action: any;
  plantId: any;
  plantName: any;
  addPlants: any = [];
  addPlantArr: any = [];
  currentPage = 1;
  itemsPerPage = 6;
  maxSize: number;
  paginateData: any = [];
  permission: any;
  plantPermission: any;
  key = 'Plant';
  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.permission = JSON.parse(sessionStorage.getItem('permissions'));
    this.plantPermission = this.permission[this.key];
    this.getPlant();
  }
  loadPage() {
    this.paginateData = this.addPlants.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage
    );
  }
  openWidgetEditorDialog(template: any, data: any, act: any) {
    if (this.widgetEditorDialogRef) {
      return;
    }
    this.action = act;
    this.plantId = data._id;
    if (data) {
      this.plantName = data.plantName;
    } else {
      this.plantName = '';
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
  plantSubmit() {
    this.addPlantArr = {
      plantName: this.plantName,
    };
    if (this.action == 'Add') {
      this.dataService.post('config/plant', this.addPlantArr).subscribe(
        (res) => {
          this.toastr.success(' Successfully Added');
          this.getPlant();
        },
        (error) => {
          this.toastr.error(error.error['message']);
        }
      );
    } else {
      this.dataService
        .put('config/plant/' + this.plantId, this.addPlantArr)
        .subscribe(
          (res) => {
            this.toastr.success(' Successfully Updated');
            this.getPlant();
          },
          (error) => {
            this.toastr.error('Data Already Exist');
          }
        );
    }
  }
  getPlant() {
    this.dataService.get('config/plant').subscribe((res) => {
      if (res && res['result']) {
        let indexVal = 0;
        res['result'].map((val) => {
          indexVal++;
          val['index'] = indexVal;
        });
      }
      this.addPlants = res['result'];
      this.loadPage();
      this.maxSize = this.addPlants.length;
    });
  }
  deletePlant(e) {
    this.dataService.delete('config/plant/' + this.plantId).subscribe((res) => {
      this.toastr.success(' Successfully Deleted');
      this.getPlant();
    });
  }
}
