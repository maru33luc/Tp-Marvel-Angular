import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverLoginService implements Resolve<void> {

  constructor() { }

  authService = inject(AuthService);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.login();
  }

  
}
