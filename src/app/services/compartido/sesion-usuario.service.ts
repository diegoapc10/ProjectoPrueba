import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from 'src/app/models/auth/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class SesionUsuarioService {

  public usuarioEstaLogeaso = new BehaviorSubject<boolean>(false);

  constructor() { }

  almacenarDatosLoginStorage(data: LoginResponse){
    this.usuarioEstaLogeaso.next(true);
    Cookies.set('token_usuario',data.tokenDto.token, { expires: data.tokenDto.expiration })
    localStorage.setItem('usuario', JSON.stringify(data.usuario));
    localStorage.setItem('usuario_token', JSON.stringify(data.tokenDto));
  }

  borrarDatosLoginStorage(){
    this.usuarioEstaLogeaso.next(false);
    Cookies.remove('token_usuario');
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuario_token');
  }

  get usuarioLogeado(): Observable<boolean>{
    return this.usuarioEstaLogeaso.asObservable();
  }
}
