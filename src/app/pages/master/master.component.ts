import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
})
export class MasterComponent implements OnInit, AfterViewInit {
  constructor() {}
  ngAfterViewInit(): void {}
  sidebarExpanded = true;
  ngOnInit(): void {}
}
