import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/Auth/auth.service';
import { Router } from '@angular/router';
/**
 * Componente para manejar las operaciones de inicio de sesión, cierre de sesión y eliminación de cuenta.
 * Este componente contiene un formulario de inicio de sesión y permite a los usuarios autenticarse,
 * cerrar sesión y eliminar su cuenta.
 */
@Component({
  selector: 'app-tab1',  // El selector del componente para usarlo en las plantillas
  templateUrl: 'tab1.page.html',  // Ruta al archivo de plantilla HTML del componente
  styleUrls: ['tab1.page.scss'],  // Ruta al archivo de estilos SCSS del componente
  standalone: false,  // El componente no es independiente, depende de otros módulos
})
export class Tab1Page implements OnInit{
  loginForm: FormGroup; // Formulario reactivo para el inicio de sesión
  isAuthenticated: boolean = false; // Variable que indica si el usuario está autenticado
   /**
   * Constructor del componente.
   * @param fb FormBuilder para construir el formulario reactivo.
   * @param authService Servicio de autenticación para manejar el inicio de sesión, cierre de sesión y eliminación de cuenta.
   * @param router Servicio de enrutamiento de Angular para redirigir a otras páginas.
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicialización del formulario con validaciones
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Validación para el campo email
      password: ['', [Validators.required, Validators.minLength(8)]], // Validación para el campo password
    });
  }
  /**
   * Método que se ejecuta cuando el componente se inicializa.
   * Verifica si el usuario está autenticado y actualiza el estado de la autenticación.
   */
  async ngOnInit() {
    try {
      // Verifica si el usuario está autenticado
      this.isAuthenticated = await this.authService.isAuthenticated();
      console.log('¿Está autenticado?:', this.isAuthenticated);
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      this.isAuthenticated = false;
    }
  }
  /**
   * Método que se ejecuta cuando el formulario de inicio de sesión se envía.
   * Intenta autenticar al usuario utilizando las credenciales proporcionadas.
   */
  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        // Intenta iniciar sesión con el servicio de autenticación
        const response = await this.authService.login({ email, password });
        if (response && response.token) {
          // Si el inicio de sesión es exitoso, guarda el token y recarga la página
          await this.authService.saveToken(response.token);
          location.reload();
        } else {
          console.error('No se recibió un token válido.');
        }
      } catch (error) {
        console.error('Error en el inicio de sesión:', error);
      }
    }
  }
  /**
   * Método que cierra la sesión del usuario y restablece el formulario.
   */
  async logout() {
    try {
      // Cierra la sesión del usuario
      await this.authService.logout();
      this.isAuthenticated = false;
      // Restablece el formulario
      this.loginForm.reset();
      // Recarga la página para reflejar el cambio
      location.reload();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
  /**
   * Método que elimina la cuenta del usuario y restablece el formulario.
   */
  async deleteAccount() {
    try {
      // Elimina la cuenta del usuario
      await this.authService.deleteAccount();
      this.isAuthenticated = false;
      // Restablece el formulario
      this.loginForm.reset();
      // Recarga la página para reflejar el cambio
      location.reload();
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
    }
  }
}
