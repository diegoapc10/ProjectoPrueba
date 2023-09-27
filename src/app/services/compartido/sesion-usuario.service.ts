import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from 'src/app/models/auth/login-response.model';
import { ModuloLogin } from 'src/app/models/usuario/modulo-login.model';
import { UsuarioLogin } from 'src/app/models/usuario/usuario-login.model';

@Injectable({
  providedIn: 'root'
})
export class SesionUsuarioService {

  public ipPublica: string = '';

  constructor(private _httpClient: HttpClient) { }

  almacenarDatosLoginStorage(data: LoginResponse){
    try {
      let expireJs = new Date(data.tokenDto.expiration);
      expireJs.setHours(expireJs.getHours() + 0);
      Cookies.set('token_usuario',data.tokenDto.token, { expires: expireJs })
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      localStorage.setItem('usuario_token', JSON.stringify(data.tokenDto));
    } catch (error) {
      console.log(error)
    }
  }

  borrarDatosLoginStorage(){
    Cookies.remove('token_usuario');
    localStorage.clear();
  }

  usuarioEstaLogeado(): boolean{
    let cookie_token = Cookies.get('token_usuario') ?? '';
    let usuario = localStorage.getItem('usuario') ?? '';
    let usuario_token = localStorage.getItem('usuario_token') ?? '';

    if(usuario_token == '' || usuario == '' || cookie_token == '')
      return false

    return true;
  }

  obtenerIpPublica(){
    this._httpClient.get('https://api.ipify.org?format=json').subscribe({
      next: (data: any) => {
        this.ipPublica = data.ip;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  setUsuario(){
    let usuario: any;
    let jsonUsuario = localStorage.getItem('usuario');
    if(jsonUsuario !== null && jsonUsuario != "")
      usuario = JSON.parse(jsonUsuario ?? "");
    return usuario;
  }

  obtenerPermisos(): string[]{
    let permisos: string[] = [];
    let usuario: any;
    let jsonUsuario = localStorage.getItem('usuario');
    if(jsonUsuario !== null && jsonUsuario != "")
      usuario = JSON.parse(jsonUsuario ?? "");
    let modulos: ModuloLogin[] = usuario.modulos;
    modulos.forEach(x => {
      x.vistas.forEach(v => {
        permisos.push(`/${x.url}/${v.url}`);
      })
    })
    return permisos;
  }
}
