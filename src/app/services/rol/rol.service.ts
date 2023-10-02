import { Injectable } from '@angular/core';
import { endPointRol } from 'src/app/configuraciones/configuration-apis';
import { ConsultaApisService } from '../compartido/consulta-apis.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Rol, RolRequest } from 'src/app/models/rol/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  urlRol: string = '';
  rolApi: any = endPointRol.apiRol;
  rolController: string = '';

  constructor(
    private _consultaApi: ConsultaApisService
  ) { 
    this.urlRol = environment.RolService;
    this.rolController = this.rolApi.apiController;
  }

  obtenerRoles(): Observable<Rol[]>{
    const endPoint = this.rolApi.obtenerRoles;
    const urlCompleta = `${this.urlRol}${this.rolController}/${endPoint}`;
    return this._consultaApi.consumoApiGet<Rol[]>(urlCompleta);
  }

  registrarRol(data: RolRequest): Observable<Rol> {
    const endPoint = this.rolApi.registrarRol;
    const urlCompleta = `${this.urlRol}${this.rolController}/${endPoint}`;
    return this._consultaApi.consumoApiPost<Rol>(urlCompleta,data);
  }
}
