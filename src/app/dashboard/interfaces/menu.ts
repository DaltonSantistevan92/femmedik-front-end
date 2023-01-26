

export interface IM {
  status: boolean; 
  mensaje: string; 
  datos: Menu[];
}


export interface Menu{
    id : number;
    rol_id : number;
    id_seccion : number;
    menu : string;
    icono : string;
    url : string;
    posicion : number;
    estado : string;
  }