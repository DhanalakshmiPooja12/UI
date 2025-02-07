import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }


    isAuthenticated(): boolean{
      
        if (sessionStorage.getItem("accesstoken")) {
         return true;
        }
        else
        {
          // this.router.navigate(['login']);
          return false;
        }
      }


      canActivate(): boolean {
        return this.isAuthenticated();
      }
 
    
}