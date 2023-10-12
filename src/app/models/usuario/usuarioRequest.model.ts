export interface UsuarioRequest {
    id: number;
    tipoDocumentoIdentidadId: number;
    documentoIdentidad: string;
    nombres: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    bombreUsuario: string;
    email: string;
    clave?: string;
    telefono: string;
    usuarioRegistro?: number;
}