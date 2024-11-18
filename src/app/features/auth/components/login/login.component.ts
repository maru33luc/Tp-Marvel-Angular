import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="formulario" (ngSubmit)="enviar()">
      <label for="nombre">Nombre</label>
      <input type="text" id="nombre" name="nombre" formControlName="nombre" />

      <label for="email">Email</label>
      <input type="email" id="email" name="email" formControlName="email" />

      <button type="submit">Enviar</button>
    </form>
  `,
  styleUrl: './login.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  fb = inject(FormBuilder);
  user!: User;
  router = inject(Router);
  authService = inject(AuthService);

  formulario = this.fb.nonNullable.group({
    nombre: [''],
    email: ['marina@gmail.com'],
  });

  enviar(): void {
    const data: User = this.formulario.getRawValue();
    if (data) {
      this.user = data;
      this.authService.login(this.user.email);
      console.log(this.user);
      this.formulario.reset();
    }
  }
}
