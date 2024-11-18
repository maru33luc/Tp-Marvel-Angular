import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <a routerLink="/" class="brand-text">GameApp</a>
        </div>
        <div class="nav-links">
          <a
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            >Home</a
          >
          <a routerLink="/admin" routerLinkActive="active">Admin</a>

        @if(!isLoggedIn()){

          <a routerLink="/login"
            routerLinkActive="active"
            >Login</a
          >
          <a routerLink="/register" routerLinkActive="active">Register</a>
        }

        @if(isLoggedIn()){
          <a (click)="logout()">Logout</a>
          <p>Bienvenido {{userName()}} !</p>
        }

        </div>
      </div>
    </nav>
  `,
  styleUrl: './navBar.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  authService = inject(AuthService);
  userName = computed(()=>{
    return this.authService.user()?.nombre;
  })
  isLoggedIn = computed(()=>{
    return this.authService.user();
  });

logout(): void {
  this.authService.logout();
}
}
