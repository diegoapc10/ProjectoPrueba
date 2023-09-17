import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class SesionUsuarioService {

  constructor() { }

  crearCookie(token: any){
    let expirationDate = new Date();
    expirationDate.setDate(token.expiration);
    Cookies.set('token_usuario',token.token, { expires: expirationDate })
  }

  borrarCookie(){
    Cookies.remove('token_usuario');
  }
}
