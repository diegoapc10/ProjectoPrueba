import { TokenDto } from "../usuario/token-dto.model";
import { UsuarioLogin } from "../usuario/usuario-login.model";

export interface LoginResponse{
    tokenDto: TokenDto;
    usuario: UsuarioLogin
}