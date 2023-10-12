import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeSistema } from 'src/app/enum/mensaje-sistema';
import { ComboTipoDocumentoIdentidad } from 'src/app/models/tipodocumentoIdentidad/tipoDocuemtnoIdentidad.model';
import { UsuarioDto } from 'src/app/models/usuario/usuarioDto.model';
import { UsuarioRequest } from 'src/app/models/usuario/usuarioRequest.model';
import { AlertaService } from 'src/app/services/compartido/alerta.service';
import { SesionUsuarioService } from 'src/app/services/compartido/sesion-usuario.service';
import { TipoDocumentoIdentidadService } from 'src/app/services/tipoDocumentoIdentidad/tipo-documento-identidad.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: any;
  tdi: ComboTipoDocumentoIdentidad[] = [];
  usuarios: UsuarioDto[] = [];
  bodyTable: boolean = false;

  constructor(
    private _tipoDocumentoIdentidadService: TipoDocumentoIdentidadService,
    private _usuarioService: UsuarioService,
    private _sesionService: SesionUsuarioService,
    private _spinner: NgxSpinnerService,
    private _formBuilder: FormBuilder,
    private _alertaService: AlertaService
  ){}

  ngOnInit(): void {
    this.usuario = this._sesionService.setUsuario();
    this.listarComboBoxTipoDocumentoIdentidad();
    this.obtenerUsuarios();
    this.cancelar();
  }

  usuarioForm = this._formBuilder.group({
    id: [0],
    tipoDocumentoIdentidadId: [0, [Validators.required, this.seleccionarItemValido()]],
    documentoIdentidad: ['', Validators.required],
    nombres: ['', Validators.required],
    apellidoPaterno: ['', Validators.required],
    apellidoMaterno: ['', Validators.required],
    nombreUsuario: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    clave: ['', Validators.required],
    telefono: [''],
    usuarioRegistro: [0]
  })

  get tipoDocumentoIdentidadId(){
    return this.usuarioForm.controls['tipoDocumentoIdentidadId'];
  }

  get documentoIdentidad(){
    return this.usuarioForm.controls['documentoIdentidad'];
  }

  get nombres(){
    return this.usuarioForm.controls['nombres'];
  }

  get apellidoPaterno(){
    return this.usuarioForm.controls['apellidoPaterno'];
  }

  get apellidoMaterno(){
    return this.usuarioForm.controls['apellidoMaterno'];
  }

  get nombreUsuario(){
    return this.usuarioForm.controls['nombreUsuario'];
  }

  get email(){
    return this.usuarioForm.controls['email'];
  }

  get clave(){
    return this.usuarioForm.controls['clave'];
  }

  get telefono(){
    return this.usuarioForm.controls['telefono'];
  }

  validarFormRegistrar(){
    return this.usuarioForm.valid;
  }

  validarFormModificar(){
    let errores: string[] = [];
    let tipoDocumentoIdentidadId = this.tipoDocumentoIdentidadId.value;
    let documentoIdentidad = this.documentoIdentidad.value;
    let nombres = this.nombres.value;
    let apellidoPaterno = this.apellidoPaterno.value;
    let apellidoMaterno = this.apellidoMaterno.value;
    let nombreUsuario = this.nombreUsuario.value;
    let email = this.email.value;

    if(tipoDocumentoIdentidadId == null || tipoDocumentoIdentidadId == 0){
      errores.push('Falta seleccionar un tipo de documento de identidad');
    }

    if(documentoIdentidad == null || documentoIdentidad.length == 0 ){
      errores.push('Ingrese un documento de identidad válido');
    }

    if(nombres == null || nombres.length == 0 ){
      errores.push('Falta ingresar el nombre');
    }

    if(apellidoPaterno == null || apellidoPaterno.length == 0 ){
      errores.push('Falta ingresar el Apellido Paterno');
    }

    if(apellidoMaterno == null || apellidoMaterno.length == 0 ){
      errores.push('Falta ingresar el Apellido Materno');
    }

    if(nombreUsuario == null || nombreUsuario.length == 0 ){
      errores.push('Falta ingresar el nombre de usuario');
    }

    if(email == null || email.length == 0 ){
      errores.push('Falta ingresar el email');
    }

    return errores;
  }

  seleccionarItemValido() : ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      return control.value == 0 ? { itemValido: { value: control.value } } : null;
    }
  }

  obtenerUsuarios(){
    this.iniciarAnimacion();
    this._usuarioService.obtenerUsuarios().subscribe({
      next: (data: UsuarioDto[]) => {
        this.finalizarAnimacion();
        this.usuarios = data;
        this.validarBodyTabla();
      },
      error: (err: any) => {
        this.finalizarAnimacion();
        console.log(err);
      }
    })
  }

  listarComboBoxTipoDocumentoIdentidad(){
    this.iniciarAnimacion();
    this._tipoDocumentoIdentidadService.listarComboBox().subscribe({
      next: (data: ComboTipoDocumentoIdentidad[]) => {
        this.finalizarAnimacion();
        this.tdi = data;
      },
      error: (err: any) => {
        this.finalizarAnimacion();
        console.log(err);
      }
    })
  }

  grabar(){
    this.iniciarAnimacion();
    this.usuarioForm.controls['usuarioRegistro'].setValue(this.usuario.id);
    let idUsuario = this.usuarioForm.controls['id'].value;
    if(idUsuario !== 0){
      let errores: string[] = this.validarFormModificar();

      if(errores.length > 0){
        this.finalizarAnimacion();
        let mensaje: string = '';
        errores.forEach((error) => {
          mensaje += `<span class="badge rounded-pill text-bg-info">${error}</span><br/>`;
        })
        this._alertaService.mostrarMensajeHTML('Error!',mensaje);
        return;
      }

      this._usuarioService.modificarUsuario(this.usuarioForm.value as UsuarioRequest).subscribe({
        next: (data: UsuarioDto) => {
          this._alertaService.mostrarMensajeSuccess(MensajeSistema.ModificarUsuario);
          this.resetForm();
          this.obtenerUsuarios();
          this.finalizarAnimacion();
          this.deshabilitarControles();
        },
        error: (err: any) => {
          this.finalizarAnimacion();
          console.log(err);
        }
      })
    } else {

      if(!this.validarFormRegistrar()){
        this.finalizarAnimacion();
        this._alertaService.mostrarMensajeInformacion('Debe completar todos los datos requeridos');
        return;
      }

      this._usuarioService.registrarUsuario(this.usuarioForm.value as UsuarioRequest).subscribe({
        next: (data: UsuarioDto) => {
          this._alertaService.mostrarMensajeSuccess(MensajeSistema.RegistrarUsuario);
          this.resetForm();
          this.obtenerUsuarios();
          this.finalizarAnimacion();
          this.deshabilitarControles();
        },
        error: (err: any) => {
          this.finalizarAnimacion();
          console.log(err);
        }
      })
    }
  }

  eliminarUsuario(){
    this.iniciarAnimacion();
    this.usuarioForm.controls['usuarioRegistro'].setValue(this.usuario.id);
    this._usuarioService.eliminarUsuario(this.usuarioForm.value as UsuarioRequest).subscribe({
      next: (data: boolean) => {
        this._alertaService.mostrarMensajeSuccess(MensajeSistema.EliminarUsuario);
        this.resetForm();
        this.finalizarAnimacion();
        this.deshabilitarControles();
        this.obtenerUsuarios();
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
    if(this.usuarios != null && this.usuarios.length > 0){
      this.bodyTable = true;
    } else {
      this.bodyTable = false;
    }
  }

  resetForm(){
    this.usuarioForm.reset({ tipoDocumentoIdentidadId: 0 });
    this.usuarioForm.controls['id'].setValue(0);
  }

  habilitarControles(){
    this.tipoDocumentoIdentidadId.enable();
    this.documentoIdentidad.enable();
    this.nombres.enable();
    this.apellidoPaterno.enable();
    this.apellidoMaterno.enable();
    this.nombreUsuario.enable();
    this.email.enable();
    this.telefono.enable();
  }

  deshabilitarControles(){
    this.tipoDocumentoIdentidadId.disable();
    this.documentoIdentidad.disable();
    this.nombres.disable();
    this.apellidoPaterno.disable();
    this.apellidoMaterno.disable();
    this.nombreUsuario.disable();
    this.email.disable();
    this.telefono.disable();
  }

  nuevo(){
    this.resetForm();
    this.habilitarControles();
    this.clave.enable();
  }

  editar(obj: UsuarioDto){
    this.setUsuario(obj);
    this.habilitarControles();
    this.clave.disable();
  }

  setUsuario(obj: UsuarioDto){
    this.usuarioForm.controls['id'].setValue(obj.id);
    this.usuarioForm.patchValue({ tipoDocumentoIdentidadId: obj.tipoDocumentoIdentidadId });
    this.usuarioForm.controls['documentoIdentidad'].setValue(obj.documentoIdentidad);
    this.usuarioForm.controls['nombres'].setValue(obj.nombres);
    this.usuarioForm.controls['apellidoPaterno'].setValue(obj.apellidoPaterno);
    this.usuarioForm.controls['apellidoMaterno'].setValue(obj.apellidoMaterno);
    this.usuarioForm.controls['nombreUsuario'].setValue(obj.nombreUsuario);
    this.usuarioForm.controls['email'].setValue(obj.email);
    this.usuarioForm.controls['telefono'].setValue(obj.telefono ?? '');
  }

  async eliminar(obj: UsuarioDto){
    let titulo = MensajeSistema.ConfirmarEliminarUsuario.replace("[usuario]", obj.nombreUsuario);
    let result: any = await this._alertaService.mostrarMensajeConfirmacion(titulo);

    if(result.isConfirmed){
      this.setUsuario(obj);
      this.eliminarUsuario();
    }
  }

  cancelar(){
    this.resetForm();
    this.deshabilitarControles();
    this.clave.disable();
  }

}
