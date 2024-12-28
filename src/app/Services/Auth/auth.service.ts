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
    return !!token;
  }

  async saveToken(token: string) {
    await this.storage.set('jwt_token', token);
  }
}
