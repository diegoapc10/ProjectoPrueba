import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeSistema } from 'src/app/enum/mensaje-sistema';
import { TipoDocumentoIdentidad, TipoDocumentoIdentidadRequest } from 'src/app/models/tipodocumentoIdentidad/tipoDocuemtnoIdentidad.model';
import { AlertaService } from 'src/app/services/compartido/alerta.service';
import { SesionUsuarioService } from 'src/app/services/compartido/sesion-usuario.service';
import { TipoDocumentoIdentidadService } from 'src/app/services/tipoDocumentoIdentidad/tipo-documento-identidad.service';

@Component({
  selector: 'app-tipo-documento-identidad',
  templateUrl: './tipo-documento-identidad.component.html',
  styleUrls: ['./tipo-documento-identidad.component.css']
})
export class TipoDocumentoIdentidadComponent implements OnInit {

  usuario: any;
  tiposDocumentoIdentidad: TipoDocumentoIdentidad[] = [];
  bodyTable: boolean = false;
  controles: boolean = false;

  constructor(
    private _tipoDocumentoIdentidadService: TipoDocumentoIdentidadService,
    private _sesionService: SesionUsuarioService,
    private _spinner: NgxSpinnerService,
    private _formBuilder: FormBuilder,
    private _alertaService: AlertaService
  ){}

  ngOnInit(): void {
    this.usuario = this._sesionService.setUsuario();
    this.obtenerTiposDocumentoIdentidad();
  }

  tipoDocumentoIdentidadform = this._formBuilder.group({
    id: [0],
    nombre: ['', Validators.required],
    descripcion: [''],
    usuarioRegistro: [0, Validators.required]
  });

  get nombre(){
    return this.tipoDocumentoIdentidadform.controls['nombre'];
  }

  obtenerTiposDocumentoIdentidad(){
    this.iniciarAnimacion();
    this._tipoDocumentoIdentidadService.obtenerTiposDocumentoIdentidad().subscribe({
      next: (data: TipoDocumentoIdentidad[]) => {
        this.finalizarAnimacion();
        this.tiposDocumentoIdentidad = data;
        this.validarBodyTabla();
      },
      error: (error) => {
        this.finalizarAnimacion();
        console.log(error);
      }
    })
  }

  grabarTipoDocumentoIdentidad(){
    this.iniciarAnimacion();
    this.tipoDocumentoIdentidadform.controls['usuarioRegistro'].setValue(this.usuario.id);
    let idTipodocumentoIdentidad = this.tipoDocumentoIdentidadform.controls['id'].value;
    if(idTipodocumentoIdentidad !== 0){
      this._tipoDocumentoIdentidadService.modificarTipoDocumentoIdentidad(this.tipoDocumentoIdentidadform.value as TipoDocumentoIdentidadRequest).subscribe({
        next: (data: TipoDocumentoIdentidad) => {
          this._alertaService.mostrarMensajeSuccess(MensajeSistema.ModificarTipoDocumentoIdentidad);
          this.resetForm();
          this.obtenerTiposDocumentoIdentidad();
          this.finalizarAnimacion();
          this.deshabilitarControles();
        },
        error: (err) => {
          this.finalizarAnimacion();
          console.log(err);
        }
      })
    } else {
      this._tipoDocumentoIdentidadService.registrarTipoDocumentoIdentidad(this.tipoDocumentoIdentidadform.value as TipoDocumentoIdentidadRequest).subscribe({
        next: (data: TipoDocumentoIdentidad) => {
          this._alertaService.mostrarMensajeSuccess(MensajeSistema.RegistrarTipoDocumentoIDentificacion);
          this.resetForm();
          this.obtenerTiposDocumentoIdentidad();
          this.finalizarAnimacion();
          this.deshabilitarControles();
        },
        error: (err: any) => {
          this.finalizarAnimacion();
          console.log(err);
        }
      });
    }
  }

  eliminarTipoDocumentoIdentidad(id: number){
    this.iniciarAnimacion();
    this._tipoDocumentoIdentidadService.eliminarTipoDocumentoIdentidad(id).subscribe({
      next: (data: boolean) => {
        this._alertaService.mostrarMensajeSuccess(MensajeSistema.EliminarTipoDocumentoIdentidad);
        this.obtenerTiposDocumentoIdentidad();
        this.finalizarAnimacion();
      },
      error: (err: any) => {
        this.finalizarAnimacion();
        console.log(err);
      }
    })
  }

  iniciarAnimacion(){
    this._spinner.show();
  }

  finalizarAnimacion(){
    this._spinner.hide();
  }

  validarBodyTabla(){
    if(this.tiposDocumentoIdentidad != null && this.tiposDocumentoIdentidad.length > 0){
      this.bodyTable = true;
    } else {
      this.bodyTable = false;
    }
  }

  resetForm(){
    this.tipoDocumentoIdentidadform.reset();
    this.tipoDocumentoIdentidadform.controls['id'].setValue(0);
  }

  setTipodocumentoIdentidad(obj: TipoDocumentoIdentidad){
    this.tipoDocumentoIdentidadform.controls['id'].setValue(obj.id);
    this.tipoDocumentoIdentidadform.controls['nombre'].setValue(obj.nombre);
    this.tipoDocumentoIdentidadform.controls['descripcion'].setValue(obj.descripcion);
  }
  
  habilitarControles(){
    this.controles = true;
  }

  deshabilitarControles(){
    this.controles = false;
  }

  nuevo(){
    this.resetForm();
    this.habilitarControles();
  }

  editar(obj: TipoDocumentoIdentidad){
    this.setTipodocumentoIdentidad(obj);
    this.habilitarControles();
  }

  async eliminar(obj: TipoDocumentoIdentidad){
    let titulo = MensajeSistema.ConfirmarEliminarTipoDocumentoIdentidad.replace("[tdi]", obj.nombre);
    let result: any = await this._alertaService.mostrarMensajeConfirmacion(titulo);

    if(result.isConfirmed){
      this.eliminarTipoDocumentoIdentidad(obj.id);
    }
  }

}
