import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertaService } from 'src/app/services/compartido/alerta.service';
import { SesionUsuarioService } from 'src/app/services/compartido/sesion-usuario.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-asignar-rol',
  templateUrl: './asignar-rol.component.html',
  styleUrls: ['./asignar-rol.component.css']
})
export class AsignarRolComponent implements OnInit {

  usuario: any;
  usuarios: any[] = [
    { id: 1, nombreCompleto: 'Diego Pastor Cancino' },
    { id: 2, nombreCompleto: 'Jorge Cancino Salinas' }
  ];
  roles: any[] = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Operador' }
  ];

  constructor(
    private _usuarioService: UsuarioService,
    private _sesionService: SesionUsuarioService,
    private _spinner: NgxSpinnerService,
    private _formBuilder: FormBuilder,
    private _alertaService: AlertaService
  ){}

  frm!:FormGroup;

  ngOnInit(): void {
    this.frm = this._formBuilder.group({
      idUsuario: [],
      idRol: []
    });
  }

  grabar(){
    console.log(this.frm.value);
  }

}
