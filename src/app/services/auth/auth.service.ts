import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from 'src/app/models/auth/login-request.model';
import { environment } from 'src/environments/environment';
import { ConsultaApisService } from '../compartido/consulta-apis.service';
import { endPointAuth } from 'src/app/configuraciones/configuration-apis';
import { SesionUsuarioService } from '../compartido/sesion-usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlAuthApi : string = "";
  authController: string = endPointAuth.apiAuth.apiController;

  constructor(
    private _consultaApi: ConsultaApisService,
    private _sesionUsuario: SesionUsuarioService
    ) { 
    this.urlAuthApi = environment.AuthenticationService;
  }

  login(request: LoginRequest): Observable<any>{
    let urlCompleta = `${this.urlAuthApi}${this.authController}/Login`;
    return this._consultaApi.cosumoApiGet<any>(urlCompleta, request);
  }

  logOut(){
    this._sesionUsuario.borrarDatosLoginStorage();
  }
}
