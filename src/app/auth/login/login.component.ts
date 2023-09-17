import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginRequest } from 'src/app/models/auth/loginRequest.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SesionUsuarioService } from 'src/app/services/compartido/sesion-usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private suscripciones: Subscription[] = new Array();

  constructor(
    private _formBuilder: FormBuilder,
    private _auth: AuthService,
    private _sesionUsuario: SesionUsuarioService
  ){}

  loginForm = this._formBuilder.group({
    nombreUsuario: ['',[Validators.required]],
    clave: ['',Validators.required]
  });

  get nombreUsuario(){
    return this.loginForm.controls['nombreUsuario'];
  }

  get clave(){
    return this.loginForm.controls['clave'];
  }

  login(){
    this.suscripciones.push(
      this._auth.login(this.loginForm.value as LoginRequest).subscribe({
        next: (data: any) => {
          console.log(data);
          this._sesionUsuario.crearCookie(data.token);
        },
        error: (errorData) => {
          console.log(errorData)
        },
        complete: () => {
          this._sesionUsuario.borrarCookie()
        }
      })
    )
  }
}
