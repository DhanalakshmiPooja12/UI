import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fill-newchecklist',
  templateUrl: './fill-newchecklist.component.html',
  styleUrls: ['./fill-newchecklist.component.scss'],
})
export class FillNewchecklistComponent implements OnInit {
  master: any;
  tempName: any;
  masterName;
  localtempName;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.localtempName = sessionStorage.getItem('tempName');
    this.getData();
  }
  getData() {
    this.dataService.get('checklist/template').subscribe((res) => {
      this.master = res['result'];
    });
  }
  tempClick(e) {
    this.tempName = sessionStorage.setItem('tempName', e.Tempname);
    this.masterName = sessionStorage.setItem('masterName', e.masterName);

    this.router.navigate([`mainpage/checklist/fillform/${e.Tempname}`]);
  }
}
