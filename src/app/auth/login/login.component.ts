import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { LoginRequest } from 'src/app/models/auth/login-request.model';
import { LoginResponse } from 'src/app/models/auth/login-response.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SesionUsuarioService } from 'src/app/services/compartido/sesion-usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    private _auth: AuthService,
    private _sesionUsuario: SesionUsuarioService,
    private _router: Router,
    private _spinner: NgxSpinnerService
  ){}

  loginForm = this._formBuilder.group({
    nombreUsuario: ['',[Validators.required]],
    clave: ['',Validators.required],
    ipPublica: ['']
  });

  ngOnInit(){
    this._sesionUsuario.obtenerIpPublica();
  }

  get nombreUsuario(){
    return this.loginForm.controls['nombreUsuario'];
  }

  get clave(){
    return this.loginForm.controls['clave'];
  }

  login(){
    this.loginForm.controls['ipPublica'].setValue(this._sesionUsuario.ipPublica);
    this.iniciarAnimacion();
    this._auth.login(this.loginForm.value as LoginRequest).subscribe({
      next: (data: LoginResponse) => {
        this._sesionUsuario.almacenarDatosLoginStorage(data);
        this._router.navigateByUrl('');
      },
      error: (errorData) => {
        console.log(errorData);
      },
      complete: () => {
        this.finalizarAnimacion();
      }
    })
  }

  iniciarAnimacion(){
    this._spinner.show();
    console.log('inicio animacion');
  }

  finalizarAnimacion(){
    this._spinner.hide();
    console.log('finalizo animacion');
  }
}
