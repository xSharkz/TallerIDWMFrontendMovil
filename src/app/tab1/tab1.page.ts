import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit{
  loginForm: FormGroup;
  isAuthenticated: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  async ngOnInit() {
    try {
      this.isAuthenticated = await this.authService.isAuthenticated();
      console.log('¿Está autenticado?:', this.isAuthenticated);
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      this.isAuthenticated = false;
    }
  }
  
  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        const response = await this.authService.login({ email, password });
        if (response && response.token) {
          await this.authService.saveToken(response.token);
          this.router.navigate(['/tab2']);
        } else {
          console.error('No se recibió un token válido.');
        }
      } catch (error) {
        console.error('Error en el inicio de sesión:', error);
      }
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      this.isAuthenticated = false;
      this.loginForm.reset();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  async deleteAccount() {
    try {
      await this.authService.deleteAccount();
      this.isAuthenticated = false;
      this.loginForm.reset();
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
    }
  }
}
