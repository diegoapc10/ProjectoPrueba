import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ComboTipoDocumentoIdentidad } from 'src/app/models/tipodocumentoIdentidad/tipoDocuemtnoIdentidad.model';
import { AlertaService } from 'src/app/services/compartido/alerta.service';
import { SesionUsuarioService } from 'src/app/services/compartido/sesion-usuario.service';
import { TipoDocumentoIdentidadService } from 'src/app/services/tipoDocumentoIdentidad/tipo-documento-identidad.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: any;
  tdi: ComboTipoDocumentoIdentidad[] = [];

  constructor(
    private _tipoDocumentoIdentidadService: TipoDocumentoIdentidadService,
    private _sesionService: SesionUsuarioService,
    private _spinner: NgxSpinnerService,
    private _formBuilder: FormBuilder,
    private _alertaService: AlertaService
  ){}

  ngOnInit(): void {
    this.usuario = this._sesionService.setUsuario();
    this.listarComboBoxTipoDocumentoIdentidad();
  }

  usuarioForm = this._formBuilder.group({
    id: [0],
    tipoDocumentoIdentidadId: [0, this.seleccionarItemValido(), Validators.required],
    documentoIdentidad: ['', Validators.required],
    nombres: ['', Validators.required],
    apellidoPaterno: ['', Validators.required],
    apellidoMaterno: ['', Validators.required],
    nombreUsuario: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
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

  seleccionarItemValido() : ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      return control.value == 0 ?  { itemValido: { value: control.value } } : null;
    }
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
    console.log(this.usuarioForm.controls);
  }

  iniciarAnimacion(){
    this._spinner.show();
  }

  finalizarAnimacion(){
    this._spinner.hide();
  }

}
