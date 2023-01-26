import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//mis CookieService
import { CookieService } from 'ngx-cookie-service';

//interceptor
import { AuthInterceptorService } from './interceptor/auth-interceptor.service';

import { MatSnackBarModule } from '@angular/material/snack-bar';

//guards
import { AuthGuardGuard } from './auth/guard/auth-guard.guard';
import { SesionGuardGuard } from './dashboard/guard/sesion-guard.guard';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    CookieService,
    //AuthGuardGuard,
    //SesionGuardGuard,
    { provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
