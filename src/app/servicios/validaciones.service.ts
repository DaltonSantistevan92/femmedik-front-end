import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }

  validateLetters(event:any):Boolean{
    const charcode:any = (event.which) ? event.which : event.keyCode;

    if(charcode == 31 || charcode == 32 || (charcode >= 65 && charcode <= 122)){
      return true;
    }

    return false;
  }

  validateNumber(event:any):Boolean{
    const charcode:any = (event.which) ? event.which : event.keyCode;

    if(charcode == 31 || (charcode >= 48 && charcode <= 57)){
      return true;
    }

    return false;
  }

  validateAphaNumeric(event:any):Boolean{
    const charcode:any = (event.which) ? event.which : event.keyCode;

    if(charcode == 31 || (charcode >= 48 && charcode <= 57) || (charcode >= 65 && charcode <= 122) || ( charcode == 32)){
      return true;
    }

    return false;
  }

  validateWihtDecimal(event:any){
    const charcode:any = (event.which) ? event.which : event.keyCode;

    if(charcode == 31 || charcode == 46 || (charcode >= 48 && charcode <= 57)){
      return true;
    }

    return false;
  }

  validateCedulaEcuatoriana(cedula:string){
    if(cedula.length == 10){

      //Obtenemos el digito de la region que sonlos dos primeros digitos
      let digito_region:any = cedula.substring(0,2);

      //Pregunto si la region existe ecuador se divide en 24 regiones
      if( digito_region >= 1 && digito_region <=24 ){

        // Extraigo el ultimo digito
        let ultimo_digito   = cedula.substring(9,10);

        //Agrupo todos los pares y los sumo
        let pares = parseInt(cedula.substring(1,2)) + parseInt(cedula.substring(3,4)) + parseInt(cedula.substring(5,6)) + parseInt(cedula.substring(7,8));

        //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
        let numero1:any = cedula.substring(0,1);
        numero1 = (numero1 * 2);

        if( numero1 > 9 ){ numero1 = (numero1 - 9); }

        let numero3:any = cedula.substring(2,3);
        numero3 = (numero3 * 2);
        if( numero3 > 9 ){ numero3 = (numero3 - 9); }

        let numero5:any = cedula.substring(4,5);
        numero5 = (numero5 * 2);
        if( numero5 > 9 ){ numero5 = (numero5 - 9); }

        let numero7:any = cedula.substring(6,7);
        numero7 = (numero7 * 2);
        if( numero7 > 9 ){ numero7 = (numero7 - 9); }

        let numero9:any = cedula.substring(8,9);
        numero9 = (numero9 * 2);
        if( numero9 > 9 ){ numero9 = (numero9 - 9); }

        let impares = numero1 + numero3 + numero5 + numero7 + numero9;

        //Suma total
        let suma_total = (pares + impares);

        //extraemos el primero digito
        let primer_digito_suma = String(suma_total).substring(0,1);

        //Obtenemos la decena inmediata
        let decena = (parseInt(primer_digito_suma) + 1)  * 10;

        //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        let digito_validador:any = decena - suma_total;

        //Si el digito validador es = a 10 toma el valor de 0
        if(digito_validador == 10)
          digito_validador = 0;

        //Validamos que el digito validador sea igual al de la cedula
        if(digito_validador == ultimo_digito){
          // console.log('La cedula:' + cedula + ' es correcta');
          // this.toast.warning();
          return true;
        }else{
          // this.toast.warning('La cedula:' + cedula + ' es incorrecta');
          // this._snackService.open('La cedula:' + cedula + ' es incorrecta');
          // console.log('La cedula:' + cedula + ' es incorrecta');
          return false;
        }

      }else{
        // imprimimos en consola si la region no pertenece
        // this.toast.warning('Esta cedula no pertenece a ninguna region');
        // this._snackService.open('Esta cedula no pertenece a ninguna region');
        // console.log('Esta cedula no pertenece a ninguna region');
        return false;
      }
   }else{
      //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
      // console.log('Esta cedula tiene menos de 10 Digitos');
      // this.toast.warning('Esta cedula tiene menos de 10 Digitos');
      // this._snackService.open('Esta cedula tiene menos de 10 Digitos');
      return false;
   }
  }

  validarEmail(email:string){  
    let expreReg:RegExp = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return expreReg.test(email) ? true : false;
  }
}
