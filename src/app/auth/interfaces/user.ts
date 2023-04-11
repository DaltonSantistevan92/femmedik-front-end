

 export interface IUser {
  status: boolean;
  message: string;
  data: Datos;
  token: string;
}

export interface Datos {
  id: number;
  rol_id: number;
  persona_id: number;
  name: string;
  imagen: string;
  email: string;
  email_verified_at?: any;
  estado: string;
  created_at: string;
  updated_at: string;
  rol: Rol;
  persona: Persona;
}

export interface Persona {
  id?: number;
  cedula: string;
  nombre: string;
  apellido: string;
  celular: string;
  telefono?: any;
  direccion: string;
  estado?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Rol {
  id?: number;
  cargo: string;
  estado?: string;
  created_at?: string;
  updated_at?: string;
}



export interface IUserLogin{
    usuario : Login;    
}

export interface Login{
    email : string;
    password : string;    

}


