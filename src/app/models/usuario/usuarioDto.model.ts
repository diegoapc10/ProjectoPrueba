export interface UsuarioDto {
    id: number;
    tipoDocumentoIdentidadId: number;
    tipoDocumentoIdentidadNombre: string;
    documentoIdentidad: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    nombreUsuario: string;
    email: string;
    clave: string;
    telefono: string;
}