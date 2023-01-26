import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { Data } from "../../auth/interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class SesionGuardGuard implements CanActivate {

  constructor(
    private router:Router,
    //private cookie:CookieService
  ){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    let user: Data = JSON.parse(localStorage.getItem('usuario')!);

    //console.log('estamos en sesion guard', user);
    
    if(user != null){
      return true;
    }else{
      //console.log("NO hay session guard");
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  
}
