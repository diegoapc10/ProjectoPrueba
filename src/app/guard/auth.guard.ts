import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SesionUsuarioService } from '../services/compartido/sesion-usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _sesionUsuario: SesionUsuarioService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let login = this._sesionUsuario.usuarioEstaLogeado();

    if(!login){
      this._sesionUsuario.borrarDatosLoginStorage();
      this._router.navigateByUrl('login')
      return false;
    }

    return true;
  }
  
}
