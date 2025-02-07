import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import * as moment from 'moment';

@Component({
  selector: 'app-checklist-preview',
  templateUrl: './checklist-preview.component.html',
  styleUrls: ['./checklist-preview.component.scss'],
})
export class ChecklistPreviewComponent implements OnInit {
  @ViewChild('firstTable', { static: false }) firstTable: ElementRef;
  @ViewChild('dynamicTable', { static: false }) dynamicTable: ElementRef;
  rejectedData: any = [];

  constructor(
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}
  toolbind: any;
  tableTemName: any;
  localTemplateName: any;
  previewData: any;
  localmasterName: any;
  templateName: any;
  plantName: any;
  shiftName: any;
  machineName: any;
  columnData: any[] = [];
  columValue: any;
  imageUrl: any;
  sudMetaHead: any;
  subMetaValue: any;
  submetaLength: any;
  subMetaBool: boolean = false;
  subColHead: any;
  subColValue: any;
  subCol: boolean = false;
  tableLength: any;
  subheaderlength: any;
  tableHead: any;
  subColLength: any;
  metabool: boolean = false;
  metaHead: any;
  metavalue: any;
  sudSecbool: boolean = false;
  subSecHead: any;
  subSecValue: any;
  subColsecLength: any;
  subSecHeader: any;
  subHeader: any;
  mainHeader: any;
  mainData: any;
  mainDatabool: boolean = true;
  getToolTip:any;

  colbool: boolean = true;
  imageVal: any;
  footerHead: any;
  footerData: any;
  footerBool: boolean = false;
  footerBool12: boolean = false;
  footerTitle: any;
  tempHeading: any;
  dataValue: any;
  columnDataLength: any;
  partId: any;
  partData: any = [];
  mainDataHead: any;
  partIdHeader: any;
  partIdValue: any;
  partNameHader: any;
  partNameValue: any;
  partBool: boolean = true;
  mainDataPart;
  mainheaderBool: boolean = false;
  footerHead12: any;
  imageHeaderBool: boolean = false;
  imageFooterBool: boolean = false;
  columnDataHead: any = [];
  StringData = 'csName!@#';
  anotherArray: any = [];
  useableheaddata: any;
  getData: any;
  useabledata: any;
  updatedData: any = [];
  arraydoneObject: any = [];
  arraytodoObject: any = [];
  headerArray: any = [];
  subheaderArray: any = [];
  headerArrayObject = Object;
  elementkey: any = [];
  elementval: any = [];
  arrayheaderkey: any = [];
  arrayheaderval: any = [];
  arrayheaderObject: any = [];
  mainDataPartpush: any = [];
  mastername: any;
  masterNameVal: any;
  tempHeading1: any = [];
  swapData: any = [];
  tempFooter: any;
  columnValueSecond;
  tempHeading2;
  subheadData: any = [];
  localChecklistName: any;
  dailyPerodic: any;
  threshold;
  Data;
  thresholdPush: any = [];
  trueData;
  falseData;
  emptyData;
  columValue2 = [];
  periodicSchedule: any;
  revisionDate: any;
  revisionNO: any;
  formatNO: any;
  probDataHead: any;
  formatData: any;
  revisionNOData: any;
  revisionDateData: any;
  probData: any;
  footerInstruction: any;
  shiftNote: any;
  shiftData: any;
  currentDateValue: any;

  ngOnInit(): void {
    // this.previewData = '';
    this.subheaderArray = [];
    this.mainDataPartpush = [];
    this.localmasterName = sessionStorage.getItem('localmasterName');
    this.localTemplateName = sessionStorage.getItem('tempName');
    this.localChecklistName = sessionStorage.getItem('checklistName');
    this.getTemplateData();
    // this.getMasterData();
    this.getvalue();
  }
  dynamicTableWidth: string;
  rowWidth;
  ngAfterViewInit() {
    // Access the nativeElement and get the dynamic width
    const tableElement = this.dynamicTable.nativeElement as HTMLTableElement;
    const rowIndex = tableElement.rows.length - 1;
    const rows = tableElement.rows; // Adjust this to the index of the row you want to check
    const specificRow = tableElement.rows[rowIndex];
    let totalWidth = 0;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i] as HTMLTableRowElement;
      totalWidth += row.offsetWidth;
    }
    this.rowWidth = totalWidth;
    this.dynamicTableWidth = totalWidth + 'px';

    this.cdr.detectChanges();
  }
  getTemplateData() {
    this.dataService
      .get('checklist/template/' + this.localTemplateName)
      .subscribe((res) => {
        this.dataValue = res['result'][0];
        if (res['result'][0]['columns'][0]?.subheader) {
          this.tempHeading = res['result'][0]['columns'];
          this.tempHeading.forEach((e) => {
            this.subheadData.push(e.subheader);
          });
        }
        this.tempHeading1 = res['result'][0]['columns'];
        this.dailyPerodic = res['result'][0]['periodicSchedule'];
        this.tempHeading2 = res['result'][0]['columns'];
        this.swapData = this.dataValue['columns'];
        this.periodicSchedule = res['result'][0]['periodicSchedule'];
        if (this.periodicSchedule == 'Daily') {
          this.probDataHead = this.dataValue['problemFooter'];
          this.revisionDate =
            this.dataValue['revisionDateData'][0]['revisionDate'];
          this.revisionNO = this.dataValue['revisionNOData'][0]['revisionNo'];
          this.formatNO = this.dataValue['formatData'][0]['formatNo'];
        }
      });
  }

  compareAndUpdate(responses) {
    const cNamesFromResponse1 = this.tempHeading1.map((item) => item.cName);

    responses.forEach((obj) => {
      cNamesFromResponse1.forEach((cName) => {
        if (!obj.hasOwnProperty(cName)) {
          obj[' ' + cName] = ''; // Add missing cName as a key with empty string value
        }
      });
    });
    return responses;
  }
  comparefooter(resSubHeader) {
    const footerFromResponse = this.tempFooter.map((item) => item.fName);
    resSubHeader.forEach((obj) => {
      footerFromResponse.forEach((fName) => {
        if (!obj.hasOwnProperty(fName)) {
          obj[fName] = '';
        }
      });
    });
  }

  getMasterData() {
    this.subheaderArray = [];
    this.mainDataPartpush = [];
    this.dataService
      .get('fillChecklist/list/' + this.localChecklistName)
      .subscribe((res) => {
        this.previewData = JSON.parse(JSON.stringify(res['result'][0]));
        console.log(this.previewData, 'previewData');
        this.templateName = this.previewData.Tempname;
        this.partId = this.previewData['PartId'];
        this.getPart(this.partId);
        this.mainHeader = this.previewData.mainHeader;
        if (this.mainHeader) {
          this.mainheaderBool = true;
        } else {
          this.mainheaderBool = false;
        }
        this.plantName = this.previewData.plantName;
        this.shiftName = this.previewData.shiftName;
        this.machineName = this.previewData.machineName;
        this.subMetaValue = this.previewData.subMetdata;
        this.masterNameVal = this.previewData.masterName;
        this.threshold = this.previewData.threshold;
        this.rejectedData = this.previewData.rejectedData;
        if (this.previewData['column'].length) {
          this.colbool = true;
          // this.columValue = this.previewData.column;
          // this.columValue2 = this.compareAndUpdate(this.previewData.column);
          this.columValue = this.compareAndUpdate(this.previewData.column);
          // this.checkThreshold();
          this.columnData = Object.keys(this.columValue[0]);
          if (this.tempHeading) {
            let cNames_res1 = this.tempHeading.map((item) => item.cName);
            this.columnData = [];
            // this.columnData = this.columnData.filter(
            //   (word) => !cNames_res1.includes(word)
            // );
            this.tempHeading.forEach((e, i) => {
              e.subheader.forEach((f) => {
                if (f.csName == '') {
                  this.columnData.push(`csName!@#%!$${i}`);
                } else {
                  this.columnData.push(f.csName);
                }
              });
            });
          }
        }
        if (this.previewData['subMetdata'].length) {
          this.subMetaBool = true;
          this.sudMetaHead = Object.keys(this.previewData.subMetdata[0]);
          this.submetaLength = this.sudMetaHead.length;
          this.tableHead = this.sudMetaHead.length;
        } else {
          this.subMetaBool = false;
        }

        if (this.previewData['subColumns'].length) {
          this.subCol = true;
          this.subheaderlength = this.tableTemName;

          this.subColHead = Object.keys(this.previewData.subColumns[0]);
          this.subColValue = this.previewData.subColumns;
          this.subColLength = this.tableLength;
          this.subHeader = this.previewData.subHeader;
        } else {
          this.subCol = false;
        }
        if (this.previewData['metadata'].length) {
          this.metabool = true;
          this.metaHead = Object.keys(this.previewData.metadata[0]);
          this.metavalue = this.previewData.metadata;
        }
        if (this.previewData['subColsec'].length) {
          this.sudSecbool = true;
          this.subSecHeader = this.previewData.subSecHeader;

          this.subColsecLength = this.tableLength;
          this.subSecHead = Object.keys(this.previewData.subColsec[0]);
          this.subSecValue = this.previewData.subColsec;
        }
        if (this.previewData['mainData'].length) {
          this.mainDatabool = true;
          this.mainData = this.previewData.mainData;
        } else {
          this.mainDataHead = Object.keys(this.previewData.mainData[0]);
          this.mainDatabool = false;
        }
        if (this.previewData['footer'].length) {
          this.footerBool = true;
          this.footerTitle = this.previewData.footerTitle;
          this.footerHead = Object.keys(this.previewData.footer[0]);
          this.tempFooter = this.dataValue['footer'];
          this.footerData = this.comparefooter(this.previewData.footer);
          this.footerData = this.previewData.footer;
        }
        if (!this.footerHead?.length) {
          this.footerBool = false;
          this.tempFooter = this.dataValue['footer'];
        }

        if (this.previewData['imageDisplay'] == 'header') {
          this.imageHeaderBool = true;
          this.imageFooterBool = false;
        } else if (this.previewData['imageDisplay'] == 'footer') {
          this.imageFooterBool = true;
          this.imageHeaderBool = false;
        }
        if (this.mainData.length) {
          this.getsubheadData();
        }
        if (this.periodicSchedule == 'Daily') {
          this.probData = this.previewData['problemFooter'];
          this.footerInstruction = this.previewData['footerInstruction'];
          this.revisionDateData =
            this.previewData['revisionDateData'][0]['revisionDateValue'];
          this.revisionNOData =
            this.previewData['revisionNOData'][0]['revisionNoValue'];
          this.formatData = this.previewData['formatData'][0]['formatValue'];
        } else {
          this.currentDateValue = this.previewData['currentDate'][0];
          this.shiftData = this.previewData['shiftData'][0];
          this.shiftNote = this.previewData['shiftNote'];
        }
      });
    this.getImage();
    this.getToolip();
  }
  getToolip(){
    this.dataService
    .get('config/tooltip?checklistName=' + this.localChecklistName)
    .subscribe((res) => {
     
      this.getToolTip = res['result'][0];
     
    });
  }
  tooltipPush: any[] = [];
  ToolName;
  toolBool: boolean = false;
  tooltipContent: any;
  toolTipStyle(type, i, j) {
  
    this.tooltipPush = [];  
    this.toolBool = false;
    let d = [];
    if (type == 'body') {
      d = this.getToolTip['body'].filter(
        (val) => j == val.bodyHeader && val.index == i
      );
     
    } else if (type == 'footer') {
      d = this.getToolTip['footer'].filter(
        (val) => j.fName == val.footerHeader && val.index == i
      );
    } else if (type =='header') {
      d = this.getToolTip['header'].filter(
        (val) => j == val.HeaderName && val.index == i
      );
     
    }
    else if(type == 'Instruction'){
     
      d = this.getToolTip['Instruction'].filter(
        (val) => j.probName == val.instructionHeader && val.index == i
        );
       
    }
   
    if (d.length)
      this.toolbind = `Filled By: ${d[0].filledBy},
     Filled At: ${moment(d[0].filledAt).format('DD/ MM /YYYY , HH:mm:ss')}`;
    else this.toolbind = '';
    // }
     return this.tooltipContent;
  }

  checkString(daata) {
    if (daata.startsWith(this.StringData)) {
      return '';
    } else {
      return daata;
    }
  }
  getStyleForIndex(index: number, dataIndex: any) {
    // this.threshold = {};
    if (this.threshold.length && this.threshold[index][dataIndex] === true) {
      return {
        'background-color': 'limegreen',
      };
    } else if (
      this.threshold.length &&
      this.threshold[index][dataIndex] === false
    ) {
      return {
        'background-color': 'red',
      };
    } else {
      return {};
    }
  }
  returnValue: any;
  getStyleForRejection(index, dataIndex) {
    // for (let i = 0; i < this.rejectedData.length; i++) {
    if (this.rejectedData.length) {
      this.rejectedData.map((e, j) => {
        if (e[dataIndex] === true) {
          this.returnValue = 'red';
        } else if (e[dataIndex] === false) {
          this.returnValue = 'limegreen';
        } else {
          this.returnValue = '';
        }
      });
      return { 'background-color': this.returnValue };
    } else {
      return {};
    }
  }
  urlsPresent(value) {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }
  getImage() {
    this.dataService.get('imageData/image').subscribe((res) => {
      this.imageVal = res['result'];

      this.imageVal.forEach((val) => {
        if (val.masterName == this.masterNameVal) {
          this.imageUrl = val.image;
        }
      });
    });
  }
  getPart(a) {
    this.dataService.get(`config/cycletime`).subscribe((res) => {
      if (res) {
        this.mainDataPart = res['result'];

        this.mainDataPart.forEach((e) => {
          if (a == e.partId) {
            this.partBool = true;
            this.mainDataPartpush.push(
              {
                PartID: this.mainDataPart[0].partId,
              },
              { PartName: this.mainDataPart[0].partName }
            );
          } else {
            this.partBool = false;
          }
        });
        for (let i = 0; i < this.mainDataPart.length; i++) {
          this.arrayheaderkey = Object.keys(this.mainDataPart[i]);
          this.arrayheaderval = Object.values(this.mainDataPart[i]);
        }
      }
    });
  }
  getObjectKeys(obj: object) {
    return Object.keys(obj[0]);
  }
  getvalue() {
    this.subheaderArray = [];
    this.mainDataPartpush = [];
    this.dataService
      .get(`fillChecklist/drag?masterName=${this.localmasterName}`)
      .subscribe((res) => {
        if (res['result'].length) {
          this.mastername = this.localmasterName;

          this.templateName = this.localTemplateName;
          this.useabledata = res['result'][0].column;
          this.useableheaddata = res['result'][0].headcolumn;
          this.subheaderArray = this.useabledata;
          this.mainDataPartpush = this.useableheaddata;

          for (let i = 0; i < this.subheaderArray.length; i++) {
            this.elementkey.push(...Object.keys(this.subheaderArray[i]));
            this.elementval.push(...Object.values(this.subheaderArray[i]));
          }
          for (let i = 0; i < this.mainDataPartpush.length; i++) {
            this.arrayheaderkey.push(...Object.keys(this.mainDataPartpush[i]));
            this.arrayheaderval.push(
              ...Object.values(this.mainDataPartpush[i])
            );
          }

          this.dataService
            .get('masterData/master/' + this.localmasterName)
            .subscribe((res) => {
              this.previewData = res['result'][0];
              // this.partId = this.previewData['PartId'];
              // this.getPart(this.partId)

              if (this.previewData['column'].length) {
                this.colbool = true;
                this.columnData = Object.keys(this.previewData.column[0]);

                // this.columnDataLength = this.previewData.column[0]['subheader'];
                this.columValue = this.previewData.column;
              }
              if (this.previewData['footer'].length) {
                this.footerBool = true;
                this.footerTitle = this.previewData.footerTitle;
                this.footerHead = Object.keys(this.previewData.footer[0]);
                this.footerData = this.previewData.footer;
              }
              if (this.previewData['imageDisplay'] == 'header') {
                this.imageHeaderBool = true;
                this.imageFooterBool = false;
              } else if (this.previewData['imageDisplay'] == 'footer') {
                this.imageFooterBool = true;
                this.imageHeaderBool = false;
              }
            });
        } else {
          this.getMasterData();
        }
      });
  }
  drop(event: CdkDragDrop<string[]>) {
    this.updatedData = [];
    this.arraytodoObject = [];
    this.arraydoneObject = [];
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.arraydoneObject = Object.values(this.subheaderArray);
    this.arraytodoObject = Object.values(this.mainDataPartpush);
    for (let i = 0; i < this.arraytodoObject.length; i++) {
      this.arrayheaderkey[i] = Object.keys(this.arraytodoObject[i]);
      this.arrayheaderval[i] = Object.values(this.arraytodoObject[i]);
    }
    for (let i = 0; i < this.arraydoneObject.length; i++) {
      this.elementkey[i] = Object.keys(this.arraydoneObject[i]);
      this.elementval[i] = Object.values(this.arraydoneObject[i]);
    }

    this.getresponce();
  }
  getresponce() {
    // this.subheaderArray = [];
    // this.mainDataPartpush = [];
    // this.elementkey = [];
    // this.elementval = [];
    this.dataService
      .get(`fillChecklist/drag?masterName=${this.localmasterName}`)
      .subscribe((res) => {
        this.getData = res;
       

        if (res && res['result'].length) {
          let dataToSave = {};
          dataToSave['masterName'] = this.localmasterName;
          dataToSave['column'] = this.subheaderArray;
          dataToSave['headcolumn'] = this.mainDataPartpush;

          this.dataService
            .put(`fillChecklist/drag/${this.localmasterName}`, dataToSave)
            .subscribe((res: any) => {});
        } else {
          let dataToSave = {};
          dataToSave['masterName'] = this.localmasterName;
          dataToSave['column'] = this.subheaderArray;
          dataToSave['headcolumn'] = this.mainDataPartpush;

          this.dataService
            .post('fillChecklist/drag', dataToSave)
            .subscribe((res: any) => {});
        }
      });
  }
  getsubheadData() {
    this.subheaderArray = [];
    this.elementkey = [];
    this.elementval = [];
    for (let i = 0; i < this.mainData.length; i++) {
      if (this.mainData[i].mName && this.mainData[i].mvalue) {
        this.elementkey.push(this.mainData[i].mName);
        this.elementval[i] = this.mainData[i].mvalue;
        this.subheaderArray.push({
          [this.mainData[i].mName]: this.mainData[i].mvalue,
        });
      }
    }
  }
}
