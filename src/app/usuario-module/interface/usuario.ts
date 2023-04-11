  export interface IU {
    status: boolean;
    mensaje: string;
    data: User;
    token: string;
  }
  
  export interface User {
    id: number;
    rol_id: number;
    persona_id?: number;
    name: string;
    imagen: string;
    email: string;
    password? : string;
    email_verified_at?: any;
    estado?: string;
    created_at?: string;
    updated_at?: string;
    rol?: Rol;
    persona?: Persona;
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


  export interface ILU {
    status: boolean;
    cantidad: number;
    usuario: User[];
  }

  export interface IUR {
    status: boolean;
    mensaje: string;
    usuario: User;
  }

  export interface IG {
    status: boolean;
    mensaje: string;
  }

  //interface User Edit
  export interface IUE {
    usuario : UserEdit
  }

  export interface UserEdit {
    id?: number;
    persona_id?: number;
    nombre?: string;
    apellido?: string;
    telefono?: string;
    direccion?: string;
    rol_id?: number;
    name?: string;
    email?: string;
  }



  