import { Component } from '@angular/core';
import { UsuarioLogin } from 'src/app/models/usuario/usuario-login.model';


@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {

  usuario: UsuarioLogin;

  constructor(){}

  ngOnInit(){
    this.usuario = JSON.parse(localStorage.getItem('usuario') ?? "");
  }

}
