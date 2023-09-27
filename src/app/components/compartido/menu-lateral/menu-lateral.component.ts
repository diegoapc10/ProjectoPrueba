import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioLogin } from 'src/app/models/usuario/usuario-login.model';
import { SesionUsuarioService } from 'src/app/services/compartido/sesion-usuario.service';


@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {

  usuario: any;

  constructor(
    private _sesionService: SesionUsuarioService,
    private _router: Router
    ){}

  ngOnInit(){
    this.usuario = this._sesionService.setUsuario();
  }

  logOut(){
    this._sesionService.borrarDatosLoginStorage();
    this._router.navigateByUrl('login');
  }

}
