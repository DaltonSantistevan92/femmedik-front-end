import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  constructor(private _bs: BaseService, private http: HttpClient) { }


  mostrarArchivo(folder:string,file:string){
    let url:string = `${this._bs.getApi()}/getImg/${folder}/${file}`;
    return url;
  }

  subirArchivo(files: Array<File>, name:string, url:string){
    let urlCompleta = `${this._bs.getApi()}/${url}`;
    let formdata:any = new FormData();
    
    if(files){
      for(let i = 0; i < files.length; i++){
        formdata.append(name + '-'+ i,files[i], files[i].name);
     }
    }
   return this.http.post(urlCompleta, formdata);
  }

  subirImg(files: Array<File>, name:string, url:string, folder:string){
    let urlCompleta =`${this._bs.getApi()}/${url}/${folder}`;
    let formdata = new FormData();
    
    if(files){
      for(let i = 0; i < files.length; i++){
        formdata.append(name,files[i], files[i].name);
     }
    }
   return this.http.post(urlCompleta, formdata);
  }
}
