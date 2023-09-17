import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/models/auth/loginRequest.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private _formBuilder: FormBuilder,
    private _auth: AuthService
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
    this._auth.login(this.loginForm.value as LoginRequest).subscribe({
      next: (data: any) => {
        console.log(data)
      },
      error: (errorData) => {
        console.log(errorData)
      }
    })
  }
}
