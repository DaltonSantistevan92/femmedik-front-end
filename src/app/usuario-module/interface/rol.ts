export interface IR {
    status: boolean;
    mensaje : string;
    rol : Rol[]
}

export interface Rol {
    id: number;
    cargo: string;
    estado?: string;
    created_at?: string;
    updated_at?: string;
  }