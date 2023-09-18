import { VistaLogin } from "./vista-login.model";

export interface ModuloLogin{
    id: number;
    nombre: string;
    claseIcono: string;
    url: string;
    vistas: VistaLogin[];
}