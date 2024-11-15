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
          <a
            routerLink="/login"
            routerLinkActive="active"
            (click)="onAuthClick()"
            >{{ isLoggedIn ? 'Logout' : 'Login' }}</a
          >

          <a routerLink="/register" routerLinkActive="active">Register</a>
        </div>
      </div>
    </nav>
  `,
  styleUrl: './navBar.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  authService = inject(AuthService);
  isLoggedIn = this.authService.isLoggedIn;

  ngOnInit(): void {
    this.chequearLogin();
  }

  chequearLogin(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  onAuthClick(): void {
    this.isLoggedIn ? this.authService.logout() : this.authService.login();
    this.isLoggedIn = !this.isLoggedIn;
  }
}
