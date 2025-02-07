import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as momenttz from 'moment-timezone';

@Component({
  selector: 'app-deny',
  templateUrl: './deny.component.html',
  styleUrls: ['./deny.component.scss']
})
export class DenyComponent implements OnInit {
  date: any;
  constructor(
    private router: Router,
   
   ) { }

  ngOnInit(): void {
    setInterval(() => {
      // this.date =momenttz.tz(new Date(),timeStamp).format('d MMM, y , HH:mm:ss') ;},1000
      this.date = momenttz(new Date());
    }, 1000);
  }
  logout() {
    sessionStorage.clear()
    this.router.navigate(['login']);
  }
 
 
}
