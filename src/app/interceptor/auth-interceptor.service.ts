import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private cookieServ:CookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookieServ.get('token');
  
    if(token){
       req = req.clone({
        setHeaders:{"Authorization":`Bearer ${token}`,
                    "Accept":"application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE",
                    "Access-Control-Allow-Headers": "Authorization, Origin, Content-Type, X-CSRF-Token"}
      });
    }
    return next.handle(req);
  }

}
