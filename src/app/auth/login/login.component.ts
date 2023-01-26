import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserLogin, Login } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { SnackService } from '../../servicios/snack.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public submitted = false;
  public spinnerButton = false;

  public formulario!: FormGroup;

  userLogin! : IUserLogin;

  constructor(private formBuiler: FormBuilder, private _us :UserService, private _sns : SnackService,
              private cookieSer:CookieService, private router : Router
  ) { }

  ngOnInit(): void {
    this.iniciarFormularios();
  }

  iniciarFormularios() {
    this.formulario = this.formBuiler.group({
      email    : ['', [ Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]],
      password : ['', [ Validators.required, Validators.minLength(4) ]],
    });
  } 

  login(){
    this.submitted = true;   this.spinnerButton = true;
    const form  = this.formulario.value;

    if (this.formulario.valid) {

      let json = this.returnJson( form );
      //console.log(json);
      this.serviceLogin( json );
    } else {
      this.submitted = false;     
    }
  }

  returnJson( f : Login ): IUserLogin {
    this.userLogin = { usuario : { email : f.email, password : f.password } };
    return this.userLogin;
  }

  serviceLogin( json : IUserLogin ){
    this._us.postLogin( json ).subscribe( res => {
      //console.log(res);
      if (res.status) {
        this._sns.open( res.message );
        localStorage.setItem('usuario', JSON.stringify( res.data ));
        this.cookieSer.set('token', res.token );
        this.redirigir( res.data.rol_id );
      } else {
        this._sns.open(res.message, 'text-danger');
        this.spinnerButton = false;
      }  
    });
  }

  redirigir( rol_id : number ){
    if (rol_id === 1) {
      console.log('administrador');
      this.router.navigateByUrl('/dashboard/admin-dash'); 
    } else if(rol_id === 2) { 
      console.log('doctora');
      this.router.navigateByUrl('/dashboard/inicio-doc');
    } else if(rol_id === 3) { 
      console.log('recepcionista');
      this.router.navigateByUrl('/dashboard/inicio-rec');
    } else {
      console.log('not page 404');
    }
  }

  showPass(){
    let temp:any = document.getElementById("txtPassword");
    if (temp.type === "password") { temp.type = "text"; } else { temp.type = "password"; }
  }

  get f() {
    return this.formulario.controls;
  }

  


}
