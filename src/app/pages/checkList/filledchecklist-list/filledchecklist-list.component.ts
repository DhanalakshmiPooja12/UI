import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filledchecklist-list',
  templateUrl: './filledchecklist-list.component.html',
  styleUrls: ['./filledchecklist-list.component.scss'],
})
export class FilledchecklistListComponent implements OnInit {
  master: any;
  tempName: any;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.dataService.get('checklist/template').subscribe((res) => {
      this.master = res['result'];
    });
  }
  tempClick(e) {
    this.tempName = sessionStorage.setItem('tempName', e.Tempname);
    this.router.navigate([`mainpage/checklist/filledCL/${e.Tempname}`]);
  }
}
