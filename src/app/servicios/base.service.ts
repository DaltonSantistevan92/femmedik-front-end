import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  api = environment.api;

  constructor() { }

  getApi(){
    return this.api;
  }
}
