import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn: boolean = false;

  login(): void {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    alert('Login exitoso');
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    alert('Logout exitoso');
  }
}
