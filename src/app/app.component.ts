import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage-angular';

/**
 * Componente principal de la aplicación.
 * Este componente gestiona la inicialización del almacenamiento local
 * y espera a que la plataforma esté lista antes de interactuar con el almacenamiento.
 */
@Component({
  selector: 'app-root', // Selector utilizado para referenciar este componente en el HTML
  templateUrl: 'app.component.html', // Archivo HTML asociado a este componente
  styleUrls: ['app.component.scss'], // Archivo de estilos (SASS) asociado a este componente
  standalone: false, // Indica que este componente depende de otros módulos y no es independiente
})
export class AppComponent {
  /**
   * Constructor del componente principal.
   * Recibe dos dependencias: `Platform` para gestionar la plataforma y `Storage` para manejar el almacenamiento local.
   * 
   * @param platform - Servicio que permite gestionar características específicas de la plataforma (ej. Android/iOS).
   * @param storage - Servicio que proporciona acceso al almacenamiento local.
   */
  constructor(private platform: Platform, private storage: Storage) {
    // Espera a que la plataforma esté completamente lista
    this.platform.ready().then(() => {
      // Una vez la plataforma esté lista, crea el almacenamiento local
      this.storage.create().then(() => {
        // Mensaje en consola confirmando que la base de datos de almacenamiento local fue creada
        console.log('Base de datos creada');
      });
    });
  }
}
