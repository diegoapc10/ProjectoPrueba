import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable, catchError, map, pipe, throwError } from 'rxjs';
import { ResponseService } from 'src/app/models/compartido/response-service.model';
import { TokenDto } from 'src/app/models/usuario/token-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultaApisService {

  tokenDto: TokenDto;

  constructor(private _http: HttpClient) { }
  
  public consumoApiGet<Type>(urlEndPoint: string, model?: any): Observable<Type>{
    let headers = {};
    let jsonToken = localStorage.getItem('usuario_token') ?? '';
    if(jsonToken != ''){
      this.tokenDto =JSON.parse(jsonToken);
      headers = {
        'Authorization': `Bearer ${this.tokenDto.token}`
      }
    }

    let params = new HttpParams();
    if(model)
      params = this.modelHttpParams(model);
    return this._http.get<ResponseService>(urlEndPoint, { params: params, headers: headers }).pipe(this.pipeGenerico());
  }

  public consumoApiPost<Type>(urlEndPoint: string, body: any): Observable<Type> {
    let headers = {};
    let jsonToken = localStorage.getItem('usuario_token') ?? '';
    if(jsonToken != ''){
      this.tokenDto =JSON.parse(jsonToken);
      headers = {
        'Authorization': `Bearer ${this.tokenDto.token}`
      }
    }

    return this._http.post<ResponseService>(urlEndPoint, body, { headers: headers }).pipe(this.pipeGenerico());
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
    console.log(errorResponse);
    if(errorResponse.error !== null)
      return throwError(() => errorResponse.error.message);

      return throwError(() => errorResponse.message);
  }
}
