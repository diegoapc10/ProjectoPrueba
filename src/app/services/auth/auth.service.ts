import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/models/auth/loginRequest.model';
import { environment } from 'src/environments/environment';
import { ConsultaApisService } from '../compartido/consulta-apis.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlAuthApi : string = "";
  authController: string = "";

  constructor(private _consultaApi: ConsultaApisService) { 
    this.urlAuthApi = environment.AuthenticationService;
    this.authController = "api/Auth";
  }

  login(request: LoginRequest): Observable<any>{
    let urlCompleta = `${this.urlAuthApi}${this.authController}/Login`;
    return this._consultaApi.cosumoApiGet<any>(urlCompleta, request);
  }
}
