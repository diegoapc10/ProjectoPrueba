import { Injectable } from '@angular/core';
import { ConsultaApisService } from '../compartido/consulta-apis.service';
import { endPointUsuario } from 'src/app/configuraciones/configuration-apis';
import { environment } from 'src/environments/environment';
import { UsuarioRequest } from 'src/app/models/usuario/usuarioRequest.model';
import { Observable } from 'rxjs';
import { UsuarioDto } from 'src/app/models/usuario/usuarioDto.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlUsuario: string = '';
  usuarioApi: any = endPointUsuario.apiUsuario;
  usuarioController: string = '';

  constructor(
    private _consultaApi: ConsultaApisService
  ) { 
    this.urlUsuario = environment.UsuarioService;
    this.usuarioController = this.usuarioApi.apiController;
  }

  obtenerUsuarios(): Observable<UsuarioDto[]>{
    const endPoint = this.usuarioApi.obtenerUsuarios;
    const urlCompleta = `${this.urlUsuario}${this.usuarioController}/${endPoint}`;
    return this._consultaApi.consumoApiGet<UsuarioDto[]>(urlCompleta);
  }

  registrarUsuario(data: UsuarioRequest): Observable<UsuarioDto>{
    const endPoint = this.usuarioApi.registrarUsuario;
    const urlCompleta = `${this.urlUsuario}${this.usuarioController}/${endPoint}`;
    return this._consultaApi.consumoApiPost<UsuarioDto>(urlCompleta, data);
  }

  modificarUsuario(data: UsuarioRequest) : Observable<UsuarioDto>{
    const endPoint = this.usuarioApi.modificarUsuario;
    const urlCompleta = `${this.urlUsuario}${this.usuarioController}/${endPoint}`;
    return this._consultaApi.consumoApiPut<UsuarioDto>(urlCompleta, data);
  }

  eliminarUsuario(data: UsuarioRequest): Observable<boolean>{
    const endPoint = this.usuarioApi.eliminarUsuario;
    const urlCompleta = `${this.urlUsuario}${this.usuarioController}/${endPoint}`;
    return this._consultaApi.consumoApiDelete<boolean>(urlCompleta, data);
  }
}
