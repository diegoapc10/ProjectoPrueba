import { Injectable, OnInit } from '@angular/core';
import { ConsultaApisService } from '../compartido/consulta-apis.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { endPointAuth } from 'src/app/configuraciones/configuration-apis';
import { endPointTipoDocumentoIdentidad } from '../../configuraciones/configuration-apis';
import { TipoDocumentoIdentidad, TipoDocumentoIdentidadRequest } from 'src/app/models/tipodocumentoIdentidad/tipoDocuemtnoIdentidad.model';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoIdentidadService {

  urlTdi: string = ''
  tdiApi: any = endPointTipoDocumentoIdentidad.apiTipoDocumentoIdentidad;
  tdiController: string = '';

  constructor(
    private _consultaApi: ConsultaApisService
  ) {
    this.urlTdi = environment.TipoDocumentoService;
    this.tdiController = this.tdiApi.apiController;
   }

  obtenerTiposDocumentoIdentidad() : Observable<TipoDocumentoIdentidad[]> {
    const endPoint = this.tdiApi.obtenerTiposDocumentoIdentidad;
    const urlCompleta = `${this.urlTdi}${this.tdiController}/${endPoint}`;
    return this._consultaApi.consumoApiGet<TipoDocumentoIdentidad[]>(urlCompleta);
  }

  registrarTipoDocumentoIdentidad(data: TipoDocumentoIdentidadRequest) : Observable<TipoDocumentoIdentidad>{
    const endPoint = this.tdiApi.registrarTipoDocumento;
    const urlCompleta = `${this.urlTdi}${this.tdiController}/${endPoint}`;
    return this._consultaApi.consumoApiPost<TipoDocumentoIdentidad>(urlCompleta, data);
  }

  modificarTipoDocumentoIdentidad(data: TipoDocumentoIdentidadRequest) : Observable<TipoDocumentoIdentidad> {
    const endPoint = this.tdiApi.modificarTipoDocumentoIdentidad;
    const urlCompleta = `${this.urlTdi}${this.tdiController}/${endPoint}`;
    return this._consultaApi.consumoApiPut<TipoDocumentoIdentidad>(urlCompleta, data);
  }

  eliminarTipoDocumentoIdentidad(id: number) : Observable<boolean> {
    const endPoint = this.tdiApi.eliminarTipoDocumentoIdentidad;
    const urlCompleta = `${this.urlTdi}${this.tdiController}/${endPoint}`;
    return this._consultaApi.consumoApiDelete<boolean>(urlCompleta, id);
  }
}
