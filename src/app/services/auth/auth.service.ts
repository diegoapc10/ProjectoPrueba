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
  authApi: any = endPointAuth.apiAuth;
  authController: string = '';

  constructor(
    private _consultaApi: ConsultaApisService,
    private _sesionUsuario: SesionUsuarioService
    ) { 
    this.urlAuthApi = environment.AuthenticationService;
    this.authController = this.authApi.apiController;
  }

  login(request: LoginRequest): Observable<any>{
    const endPoint = this.authApi.login;
    const urlCompleta = `${this.urlAuthApi}${this.authController}/${endPoint}`;
    return this._consultaApi.consumoApiGet<any>(urlCompleta, request);
  }
}
