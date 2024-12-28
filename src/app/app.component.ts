import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private platform: Platform, private storage: Storage) {
    this.platform.ready().then(() => {
      this.storage.create().then(() => {
        console.log('Base de datos creada');
      });
    });
  }
}
