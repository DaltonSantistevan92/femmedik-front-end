import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ValidacionesService } from '../../../servicios/validaciones.service';
import { IUE, IUR, Rol } from '../../interface/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { SnackService } from '../../../servicios/snack.service';

import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {
  public formulario!: FormGroup;
  public objUsuario! : IUE;

  public submitted = false;
  public nombreValid = true;
  public apellidoValid = true;
  public emailValid = true;
  public telefonoValid = true;
  public usuarioValid = true;
  public okButton = true;

  constructor(
    public dialog : MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _vs:ValidacionesService,
    private formBuiler:FormBuilder,
    private _us:UsuarioService,
    private _sns:SnackService,

  ) { }

  ngOnInit(): void {
    //console.log('estamos en editar usuario_id',this.data);
    this.initForm(); 
    this.cargarUsuario();     
  }

  initForm(){
    this.formulario = this.formBuiler.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.minLength(3)]],
      direccion: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      rol_id: ['0'], 
      cargo : [''],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    });
  }

  cargarUsuario(){
    if (this.data) {
      this.formulario.get('nombre')?.setValue(this.data.user.persona.nombre);
      this.formulario.get('apellido')?.setValue(this.data.user.persona.apellido);
      this.formulario.get('telefono')?.setValue(this.data.user.persona.telefono);
      this.formulario.get('direccion')?.setValue(this.data.user.persona.direccion);
      this.formulario.get('name')?.setValue(this.data.user.name);
      this.formulario.get('rol_id')?.setValue(this.data.user.rol_id);
      this.formulario.get('cargo')?.setValue(this.data.user.rol.cargo);
      //this.formulario.get('email')?.setValue(res.usuario.email);
      this.formulario.get('email')?.patchValue(this.data.user.email);
    } 
  }

  validarNumero(event: any) {
    return this._vs.validateNumber(event);
  }

  validarLetras(event: any) {
    return this._vs.validateLetters(event);
  }

  validarAlfaNumerico(event: any) {
    return this._vs.validateAphaNumeric(event);
  }

  cancelar(){
    this.dialog.close();
  }

  actualizarUsuario(){
    this.submitted = true;
    const form = this.formulario.value;

    if (this.formulario.valid) {
      this.submitted = false;   this.okButton = true;   this.emailValid = true;

      let json = this.returnObj(this.data, form); 
      this.serviceEditUser(json);
    }else{
      this._sns.open('Ups...! Verifique su formulario','text-warning');
      this.okButton = true;  this.emailValid = true;
    }
  }

  returnObj(data:any,form: any): IUE{
    this.objUsuario = { usuario: {
        id : data.user.id,
        persona_id : data.user.persona_id,
        nombre : form.nombre,
        apellido : form.apellido,
        telefono : form.telefono,
        direccion : form.direccion,
        rol_id : data.user.rol_id,
        name : form.name,
        email : form.email 
      }
    }
    return this.objUsuario;
  }

  serviceEditUser(json: IUE){
    this._us.edituser(json).subscribe( res => {
      if (res.status) {
        this._sns.open(res.mensaje);
      }else {
        this._sns.open(res.mensaje, 'text-danger');
      }
    }); 
  }

  get f() {
    return this.formulario.controls;
  }

}
