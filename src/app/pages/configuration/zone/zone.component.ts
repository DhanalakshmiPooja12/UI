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
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss'],
})
export class ZoneComponent implements OnInit {
  @ViewChild('widgetEditorModal') public widgetEditorModal: TemplateRef<any>;
  private widgetEditorDialogRef: MatDialogRef<TemplateRef<any>>;
  isModalOpen = false;
  action: any;
  zoneId: any;
  zoneName: any;
  addZones: any = [];
  addZoneArr: any = [];
  currentPage = 1;
  itemsPerPage = 6;
  maxSize: number;
  paginateData: any = [];
  permission: any;
  zonePermission: any;
  key = 'Zone';
  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.permission = JSON.parse(sessionStorage.getItem('permissions'));
    this.zonePermission = this.permission[this.key];
    this.getZone();
  }
  loadPage() {
    this.paginateData = this.addZones.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage
    );
  }
  openWidgetEditorDialog(template: any, data: any, act: any) {
    if (this.widgetEditorDialogRef) {
      return;
    }
    this.action = act;
    this.zoneId = data._id;
    if (data) {
      this.zoneName = data.zoneName;
    } else {
      this.zoneName = '';
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
  zoneSubmit() {
    this.addZoneArr = {
      zoneName: this.zoneName,
    };
    if (this.action == 'Add') {
      this.dataService.post('config/zone', this.addZoneArr).subscribe(
        (res) => {
          this.toastr.success('Successfully Added');
          this.getZone();
        },
        (error) => {
          this.toastr.error(error.error['message']);
        }
      );
    } else {
      this.dataService
        .put('config/zone/' + this.zoneId, this.addZoneArr)
        .subscribe(
          (res) => {
            this.toastr.success('Successfully Updated');
            this.getZone();
          },
          (error) => {
            this.toastr.error('Data Already Exist');
          }
        );
    }
    this.modalService.dismissAll();
  }
  getZone() {
    this.dataService.get('config/zone').subscribe((res) => {
      if (res && res['result']) {
        let indexVal = 0;
        res['result'].map((val) => {
          indexVal++;
          val['index'] = indexVal;
        });
      }
      this.addZones = res['result'];
      this.loadPage();
      this.maxSize = this.addZones.length;
    });
  }
  deleteZone(e) {
    this.dataService.delete('config/zone/' + this.zoneId).subscribe((res) => {
      this.toastr.success(' Successfully Deleted');
      this.getZone();
    });
  }
}
