import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5220/api/Auth';
  constructor(private http: HttpClient, private storage: Storage) {}

  login(credentials: { email: string; password: string }) {
    const formData = new FormData();
    formData.append('email', credentials.email);
    formData.append('password', credentials.password);

    return this.http
      .post<{ token: string }>(`${this.baseUrl}/login`, formData)
      .toPromise();
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.storage.get('jwt_token');
    console.log('Token almacenado:', token);
    return !!token;
  }

  async saveToken(token: string) {
    await this.storage.set('jwt_token', token);
  }

  async logout() {
    return this.http.post(`${this.baseUrl}/logout`, {}).toPromise()
      .then(() => {
        this.storage.clear(); 
        console.log('Sesión cerrada correctamente');
      })
      .catch(error => {
        if (error.status === 401) {
          console.warn('El token ya no es válido.');
        }
        this.storage.remove('jwt_token'); 
      });
  }
  

  async deleteAccount() {
    return this.http.delete(`${this.baseUrl}/delete-account`).toPromise()
      .then(() => {
        this.storage.clear();
        console.log('Cuenta eliminada y sesión cerrada');
      })
      .catch((error) => {
        console.error('Error al eliminar la cuenta:', error);
        this.storage.remove('jwt_token'); 
      });
  }
  
}
