import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../interfaces/user';
import { UsersService } from './users.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  usersService = inject(UsersService);
  router = inject(Router)
  user = signal<User | null>(null);

  login(email:string): void {

    this.usersService.getUserByEmail(email).subscribe({
      next: (user: User[]) =>{
        if(user.length > 0){
          console.log('user', user);
          this.user.set(user[0]);
          localStorage.setItem('isLoggedIn', 'true');
          alert('Login exitoso');
          this.router.navigate(['/'])
          
        }else{
          alert('Usuario no encontrado');
        }
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

  logout(): void {
    this.user.set(null);
    localStorage.removeItem('isLoggedIn');
    alert('Logout exitoso');
    this.router.navigate(['']);
  }

  
}
