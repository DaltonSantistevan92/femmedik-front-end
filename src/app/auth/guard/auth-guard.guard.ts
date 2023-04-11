import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Datos } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let localStorageUsuario: Datos = JSON.parse(localStorage.getItem('usuario')!);
      //console.log('estamos en auth guard', localStorageUsuario);
      
      if (localStorageUsuario != null) {

        //console.log('rol: ', localStorageUsuario.rol_id);
        if (localStorageUsuario.rol_id === 1) {//administrador
          this.router.navigateByUrl('/dashboard/admin-dash');
        }else if(localStorageUsuario.rol_id === 2){//doctora
          this.router.navigateByUrl('/dashboard/inicio-doc');
        }else if(localStorageUsuario.rol_id === 3){//recepcionista
          this.router.navigateByUrl('/dashboard/inicio-rec');
        }

        return false;
      } else {
        //No hay sesion activa
        //console.log("NO hay auth activa");
        return true;
      }
  }

  
}
