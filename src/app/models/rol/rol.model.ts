export interface Rol {
    id: number;
    nombre: string;
}

export interface RolRequest {
    id: number;
    nombre: string;
    usuarioRegistro: number;
}