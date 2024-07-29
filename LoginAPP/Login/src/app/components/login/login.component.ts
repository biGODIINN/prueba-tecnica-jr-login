import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { UserService } from '../../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent { 
  formulario: FormGroup;
  
  username: string = '';
  password: string = '';

  constructor(
    private fb:FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.formulario = this.fb.group({
    usuario: ['', Validators.required],
    contraseña: ['', Validators.required],
  });}
  

  login() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        if (response.success) {
          Swal.fire({
            icon: 'success',
            title: '¡Bienvenido!',
            text: `¡Hola, ${this.username}!`,
            timer: 2000,
            timerProgressBar: true
          }).then(() => {
            
            console.log('SweetAlert closed');
          });
          this.userService.setUsername(this.username);
          this.router.navigate(['/success']); 
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error de inicio de sesión',
            text: 'Usuario o contraseña incorrectos. Por favor, intenta de nuevo.'
          });
        }
      },
      error => {
        console.error('Login error:', error);
      }
    );
  }
}



