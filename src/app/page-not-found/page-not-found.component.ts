import { Component, OnInit } from '@angular/core';

/**
 * Componente que muestra la página de error 404, utilizada cuando el usuario intenta
 * acceder a una ruta que no existe en la aplicación.
 */
@Component({
  selector: 'app-page-not-found',  // El selector del componente para usarlo en las plantillas
  templateUrl: './page-not-found.component.html',  // Ruta al archivo de plantilla HTML del componente
  styleUrls: ['./page-not-found.component.scss'],  // Ruta al archivo de estilos SCSS del componente
})
export class PageNotFoundComponent implements OnInit {
  /**
   * Constructor del componente.
   * El constructor puede inyectar dependencias necesarias para el componente.
   */
  constructor() { }

  /**
   * Método que se ejecuta cuando el componente se inicializa.
   * Se usa para realizar configuraciones iniciales o cargar datos, si es necesario.
   */
  ngOnInit() {}
}
