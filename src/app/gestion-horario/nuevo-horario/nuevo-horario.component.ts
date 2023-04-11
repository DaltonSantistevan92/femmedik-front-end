import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HorarioServiceService } from '../servicio/horario-service.service';
import { SnackService } from '../../servicios/snack.service';

@Component({
  selector: 'app-nuevo-horario',
  templateUrl: './nuevo-horario.component.html',
  styleUrls: ['./nuevo-horario.component.scss']
})
export class NuevoHorarioComponent implements OnInit {

  public formulario!: FormGroup;
  public submitted = false;
  public okButton = false;

  public intervalos!: any;

  public intervalo = [] = [
    {id:30,minutos:"30 min"},
    {id:60,minutos:"60 min"}
  ];

  constructor(
    private formBuiler: FormBuilder, private _hs: HorarioServiceService,
    private _sns:SnackService,
  ) { }

  ngOnInit(): void {
    this.iniciarFormularios();
  }

  iniciarFormularios() {
    this.formulario = this.formBuiler.group({
      intervalo: ['',[Validators.required]],
      h_entrada: ['',[Validators.required]],
      h_salida: ['',[Validators.required]],
    });
  }

  guardarDatos(){
    this.submitted = true; 
    const form = this.formulario.value;

    if (this.formulario.valid  && form.intervalo != '0' && form.intervalo != null) {
      this.submitted = false;  this.okButton = true;

      let json = this.returnJson(form);
      this.servicioDoctorHorario(json);    
    } else {
      this._sns.open('Seleccione un intervalo', 'text-warning');
      this.submitted = false;  this.okButton = false; 
    }
  }

  servicioDoctorHorario(json:any){
    this._hs.generateHorario(json).subscribe( (res: any) => {
      if(res.status){
        this._sns.open(res.mensaje, 'text-primary');
        this.formulario.reset();
      }else{
        this._sns.open(res.mensaje, 'text-danger');
        this.formulario.reset();
      }
      this.submitted = false;  this.okButton = false; 
    });
  }

  returnJson( f : any ): any {
    this.intervalos = { 
      horario : { 
        user_id : 1,
        doctor_id : 1, 
        intervalo : f.intervalo,
        h_entrada : f.h_entrada,
        h_salida : f.h_salida 
      } 
    };
    return this.intervalos;
  }

  get f() {
    return this.formulario.controls;
  }

}
