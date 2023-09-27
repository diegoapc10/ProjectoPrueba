export interface TipoDocumentoIdentidad{
    id: number;
    nombre: string;
    descripcion: string;
}

export interface TipoDocumentoIdentidadRequest{
    nombre: string;
    descripcion: string;
    usuarioRegistro: number;
}