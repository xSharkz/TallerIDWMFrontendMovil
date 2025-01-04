import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/Auth/auth.service';

/**
 * Componente que maneja la visualización de las pestañas principales.
 * Las pestañas solo se mostrarán si el usuario está autenticado.
 */
@Component({
  selector: 'app-tabs',  // El selector del componente, utilizado en las plantillas
  templateUrl: 'tabs.page.html',  // Ruta al archivo de plantilla HTML del componente
  styleUrls: ['tabs.page.scss'],  // Ruta al archivo de estilos SCSS del componente
  standalone: false,  // El componente no es independiente, depende de otros módulos
})
export class TabsPage implements OnInit {

  showTabs: boolean = false;  // Determina si se deben mostrar las pestañas

  /**
   * Constructor del componente.
   * @param authService Servicio para manejar la autenticación del usuario.
   */
  constructor(private authService: AuthService) {}

  /**
   * Método que se ejecuta cuando el componente se inicializa.
   * Verifica si el usuario está autenticado y decide si mostrar o no las pestañas.
   */
  async ngOnInit() {
    // Verifica si el usuario está autenticado a través del servicio de autenticación
    const isAuthenticated = await this.authService.isAuthenticated(); 
    this.showTabs = isAuthenticated;  // Muestra las pestañas solo si el usuario está autenticado
  }
}
