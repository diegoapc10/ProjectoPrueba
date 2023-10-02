import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Rol, RolRequest } from 'src/app/models/rol/rol.model';
import { AlertaService } from 'src/app/services/compartido/alerta.service';
import { SesionUsuarioService } from 'src/app/services/compartido/sesion-usuario.service';
import { RolService } from 'src/app/services/rol/rol.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  usuario: any;
  roles: Rol[] = []
  bodyTable: boolean = false;
  controles: boolean = false

  constructor(
    private _rolService: RolService,
    private _sesionService: SesionUsuarioService,
    private _spinner: NgxSpinnerService,
    private _formBuilder: FormBuilder,
    private _alertaService: AlertaService
  ){}

  ngOnInit(): void {
    this.usuario = this._sesionService.setUsuario();
    this.obtenerRoles();
  }

  rolForm = this._formBuilder.group({
    id: [0],
    nombre: ['', Validators.required],
    usuarioRegistro: [0]
  })

  get nombre(){
    return this.rolForm.controls['nombre'];
  }

  obtenerRoles(){
    this.iniciarAnimacion();
    this._rolService.obtenerRoles().subscribe({
      next: (data: Rol[]) => {
        this.finalizarAnimacion();
        this.roles = data;
        this.validarBodyTabla();
      },
      error: (err: any) => {
        this.finalizarAnimacion();
        console.log(err);
      }
    })
  }

  grabarRol(){
    this.iniciarAnimacion();
    this.rolForm.controls['usuarioRegistro'].setValue(this.usuario.id);
    let idRol = this.rolForm.controls['id'].value;
    if(idRol !== 0){

    } else {
      this._rolService.registrarRol(this.rolForm.value as RolRequest).subscribe({
        next: (data: Rol) => {
          this.resetForm();
          this.obtenerRoles();
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

  iniciarAnimacion(){
    this._spinner.show();
  }

  finalizarAnimacion(){
    this._spinner.hide();
  }

  validarBodyTabla(){
    if(this.roles != null && this.roles.length > 0){
      this.bodyTable = true;
    } else {
      this.bodyTable = false;
    }
  }

  resetForm(){
    this.rolForm.reset();
    this.rolForm.controls['id'].setValue(0);
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

  editar(obj: Rol){
    this.setRol(obj);
    this.habilitarControles();
  }

  setRol(obj: Rol){
    this.rolForm.controls['id'].setValue(obj.id);
    this.rolForm.controls['nombre'].setValue(obj.nombre);
  }

  async eliminar(obj: Rol){
    
  }

}
