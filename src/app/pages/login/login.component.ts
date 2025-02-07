import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  password: any;
  tempName;
  email: any;
  userName: string = '';
  localRole: any;
  hide: boolean = false;
  loginData: any;
  user: any;
  getMap: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    sessionStorage.clear();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  toggleVisibility() {
    this.hide = !this.hide;
  }
  login() {
    this.router.navigate(['mainpage/dashboard']);
    console.log("navigate")
    // this.submitted = true;
    // if (this.loginForm.invalid) {
    //   return;
    // }
    // this.loginData = {
    //   email: this.loginForm.value.email,
    //   password: this.loginForm.value.password,
    // };

    // this.dataService.post('auth/', this.loginData).subscribe(
    //   (data) => {
    //     this.toastr.success('Login Successfully');
    //     sessionStorage.setItem('user', data['userName']);
    //     sessionStorage.setItem('role', data['role']);
    //     sessionStorage.setItem('department', data['department']);
    //     sessionStorage.setItem('accesstoken', data['token']);

    //     this.dataService
    //       .get(`config/role?roleName=${data['role']}`)
    //       .subscribe((res) => {
    //         if (res['result'].length) {
             
    //           sessionStorage.setItem(
    //             'permissions',
    //             JSON.stringify(res['result'][0]['permissions']['Configuration'])
    //           );
    //         }
    //       });
    //     if (
    //       data['role'] == 'SUPERADMIN' ||
    //       data['role'] == 'ADMIN' ||
    //       data['role'] == 'SUPERVISOR' ||
    //       data['role'] == 'MAINTENANCE'
    //     ) {
    //       this.router.navigate(['mainpage/dashboard']);
    //     } else {
    //       this.getMapping(data['userName']);
    //     }
    //   },

    //   (error) => {
    //     this.toastr.error(error.error['message']);
    //   }
    // );
  }

  getMapping(userName) {
    this.dataService
      .get(`mappingData/map?user=${userName}`)
      .subscribe((res) => {
        this.getMap = res['result'];
        if (_.isEmpty(this.getMap)) {
          this.router.navigate(['/deny']);
        } else {
          this.router.navigate(['mainpage/dashboard']);
        }
      });
  }
}
