import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { DialogElementsComponent } from './components/dialog-elements/dialog-elements.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogElementsComponent
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
    { provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
