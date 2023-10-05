export interface TipoDocumentoIdentidad{
    id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
}

export interface TipoDocumentoIdentidadRequest{
    id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    usuarioRegistro: number;
}

export interface ComboTipoDocumentoIdentidad{
    id: number;
    nombre: string;
}