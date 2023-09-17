import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable, catchError, map, pipe, throwError } from 'rxjs';
import { ResponseService } from 'src/app/models/compartido/response-service.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultaApisService {

  constructor(private _http: HttpClient) { }
  
  public cosumoApiGet<Type>(urlEndPoint: string, model?: any): Observable<Type>{
    let params = new HttpParams();
    if(model)
      params = this.modelHttpParams(model);
    return this._http.get<ResponseService>(urlEndPoint, { params: params }).pipe(this.pipeGenerico());
  }

  private modelHttpParams = (model: any) => {
    let params = new HttpParams();
    let listKeys = Object.keys(model);
    listKeys.forEach(key => {
      params = params.append(key, model[key]);
    });
    return params;
  }

  private pipeGenerico = () => {
    return pipe(
      map((response: ResponseService) => {
        if(response.result){
          return this.retornarDataConsulta(response);
        } else {
          return this.errorControlado(response);
        }
      }),
      catchError(this.Internalservererror)
    );
  }

  private retornarDataConsulta = (response: ResponseService) => {
    return response.data;
  }

  private errorControlado = (response: ResponseService) => {
    return throwError(() => response.message);
  }

  private Internalservererror = (errorResponse: HttpErrorResponse) => {
    return throwError(() => errorResponse.error.message);
  }
}
