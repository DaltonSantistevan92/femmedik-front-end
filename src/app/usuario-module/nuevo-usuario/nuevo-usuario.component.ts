import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from '../../auth/interfaces/user';
import { SnackService } from '../../servicios/snack.service';
import { ToolService } from '../../servicios/tool.service';
import { ValidacionesService } from '../../servicios/validaciones.service';
import { UsuarioService } from '../services/usuario.service';
import { Rol } from "../interface/rol";
import { User } from '../interface/usuario';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.scss']
})
export class NuevoUsuarioComponent implements OnInit {

  public files: File[] = [];
  public roles: Rol[] = [];
  public activeImage: boolean = false;
  public persona!: Persona;
  public usuario!: User;
  public rol!: Rol;

  public formulario!: FormGroup;
  public submitted = false;
  public okButton = false;
  public cedulaValid = false;
  private foto_default = "user-default.jpg";

  constructor(
    private formBuiler: FormBuilder,
    private _vs:ValidacionesService,
    private _sns:SnackService,
    private _us: UsuarioService,
    private _ts: ToolService, 

  ) { }

  ngOnInit(): void {
    this.initPersona();
    this.initUsuario();
    this.iniciarFormularios(); 
    this.mostrarRoles(); 
  }

  initPersona(){
    this.persona = {
      cedula : '',
      nombre : '',
      apellido : '',
      celular : '',
      direccion : ''
    }
  }

  initUsuario(){
    this.usuario = {
      id : 0,
      rol_id : 0,
      name : '',
      imagen : '',
      email : '',
      password : '',      
    }
  }

  iniciarFormularios() {
    this.formulario = this.formBuiler.group({
      cedula: ['', [Validators.required, Validators.minLength(10)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.minLength(10)]],
      direccion: [''],
      celular: ['',[Validators.required, Validators.minLength(10)]],
      rol_id: ['0'], 
      email:['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['',[Validators.required, Validators.minLength(3)]],
    });
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

  validarCedula(event:any){                
    this.persona.cedula = event.target.value;            
    this.cedulaValid = this._vs.validateCedulaEcuatoriana(this.persona.cedula);
    
    if(!this.cedulaValid){  
      this._sns.open('La Cédula es Incorrecta', 'text-danger');
      return this.cedulaValid; 
    } else {
      this._sns.open('La Cédula es Correcta', 'text-primary');
      return this.cedulaValid;
    };
  }

  onSelect(event: any) {
    if (!this.activeImage) {
      this.files.push(...event.addedFiles);
      this.activeImage = true;
    } else {
      this._sns.open("Solo sube 1 imagen !!", "text-primary");
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.activeImage = false;
    this.usuario.imagen = '';
  }

  mostrarRoles() {
    this._us.getRol().subscribe( res => { this.roles = res.rol; });
  }

  selectChangeRoles(event:any) {
    let id = parseInt(event.target.value);
    this.usuario.rol_id = id > 0 ? id : 0;    
  }
  
  validarCombos(form:any){
    if(form.rol_id == 0 || form.rol_id == null){
      return false;
    }else return true;
  }

  guardarDatos(){
    this.submitted = true; 
    const form = this.formulario.value;

    if(this.formulario.valid){

      if(this.validarCombos(form)){
        this.submitted = false;  this.cedulaValid = false;
          
        let json : any = {
          usuario : {
            rol_id:form.rol_id,
            name: form.name,
            imagen: (this.activeImage) ? this.files[0].name : 'user-default.jpg',
            email: form.email,
            password: form.password
          },
          persona:{
            cedula: form.cedula,
            nombre: form.nombre,
            apellido: form.apellido,
            celular: form.celular,
            telefono: form.telefono,
            direccion: form.direccion,
          }
        }
      
        //subir la img al backend
        let imgdelUsuario = json.usuario.imagen;

        if(imgdelUsuario == this.foto_default){
          //guardar el usuario con img defaul en el backend
          this.crearUsuarioService(json);
        }else{
          //servicio para guardar el usuario con img real en el backend
          this._ts.subirArchivo(this.files, 'img_user', 'subirArchivo').subscribe((res:any) => {
            if(res.status){  
              this.usuario.imagen = res.imagen; 
              this.crearUsuarioService(json);

              const index = this.files[0].name.indexOf(imgdelUsuario,1);
              this.files.splice(index, 1);
              this.activeImage = false;
            }
          }); 
        }
      }else{
        this._sns.open('Seleccione un rol','text-warning');
      } 
    }else{
      alert("formulario invalido");
      this.submitted = false; 

    }
  }

  crearUsuarioService(json:any){
    this._us.saveUser(json).subscribe((res:any)=>{
      //console.log(res);   
      if(res.status){
        this._sns.open(res.mensaje, 'text-primary');
        this.formulario.reset();
      }else{
        this._sns.open(res.mensaje, 'text-danger');
        this.formulario.reset();
      }
    });
    //this.okButton = false;
    this.submitted = false; 
  }

  get f() {
    return this.formulario.controls;
  }
  

}
