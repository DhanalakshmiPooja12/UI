import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataService } from '../../../shared/data.service';
import * as momenttz from 'moment-timezone';

@Component({
  selector: 'app-template-preview',
  templateUrl: './template-preview.component.html',
  styleUrls: ['./template-preview.component.scss'],
})
export class TemplatePreviewComponent implements OnInit {
  @ViewChild('firstTable', { static: false }) firstTable: ElementRef;
  @ViewChild('dynamicTable', { static: false }) dynamicTable: ElementRef;

  localtempName: any;
  tempName: any;
  header: any;
  body: any;
  footer: any;
  subHeader: any = [];
  headBool: boolean = false;
  bodyBool: boolean = false;
  footBool: boolean = false;
  subHeadBool: boolean = false;
  periodicSchedule: any;
  footerData: any = [];
  problemFooter: any;
  formatData: any;
  shiftNote: any;
  shiftData: any;
  currentDateValue: any;

  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.localtempName = sessionStorage.getItem('tempName');
    this.getDataByTempname();
  }
  dynamicTableWidth: string;
  rowWidth;
  revisionDateData;
  revisionNOData;

  getDataByTempname() {
    this.dataService
      .get('checklist/template/' + this.localtempName)
      .subscribe((res) => {
        this.tempName = res['result'][0].Tempname;
        this.header = res['result'][0].mainData;
        this.body = res['result'][0].columns;
        this.periodicSchedule = res['result'][0].periodicSchedule;
        if (this.periodicSchedule == 'Daily') {
          // this.footerData = new Array(30);
          const daysInCurrentMonth = momenttz.tz().daysInMonth();
          for (let i = 1; i <= daysInCurrentMonth; i++) {
            this.footerData.push({ day: 'Day-' + i });
          }
          this.problemFooter = res['result'][0].problemFooter;
          this.formatData = res['result'][0].formatData[0]['formatNo'];
          this.revisionDateData =
            res['result'][0].revisionDateData[0]['revisionDate'];
          this.revisionNOData =
            res['result'][0].revisionNOData[0]['revisionNo'];
        } else {
          this.currentDateValue = res['result'][0]['currentDate'][0];
          this.shiftData = res['result'][0]['shiftData'][0];
          this.shiftNote = res['result'][0]['shiftNote'];
        }

        this.body.map((e) => {
          this.subHeader.push(e.subheader);
        });
        if (this.subHeader.length) {
          this.subHeadBool = true;
        }
        this.footer = res['result'][0].footer;
        if (this.header.length) {
          this.headBool = true;
        }
        if (this.body) {
          this.bodyBool = true;
        }
        if (this.footer) {
          this.footBool = true;
        }

        setTimeout(() => {
          this.dynamicTableContent();
        }, 5);
      });
  }
  dynamicTableContent() {
    const tableElement = this.dynamicTable.nativeElement as HTMLTableElement;
    const rowIndex = tableElement.rows.length + 1;
    const rows = tableElement.rows; // Adjust this to the index of the row you want to check
    const specificRow = tableElement?.rows[rowIndex];

    let totalWidth = 0;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i] as HTMLTableRowElement;
      totalWidth += row.offsetWidth;
    }
    this.rowWidth = totalWidth;
    this.dynamicTableWidth = totalWidth + 'px';

    this.cdr.detectChanges();
  }
}
