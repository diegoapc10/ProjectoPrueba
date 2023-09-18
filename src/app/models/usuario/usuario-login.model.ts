import { ModuloLogin } from "./modulo-login.model";

export interface UsuarioLogin {
    id: number;
    tipoDocumentoIdentidadId: number;
    tipoDocumentoIdentidadNombre: string;
    documentoIdentidad: string;
    nombreCompleto: string;
    nombreUsuario: string;
    email: string;
    telefono: string;
    rolId: number;
    rolNombre: string;
    modulos: ModuloLogin[];
}