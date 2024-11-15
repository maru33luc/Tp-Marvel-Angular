import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";


export const authGuardFn : CanActivateFn = () => {

const authService = inject(AuthService);
const router = inject(Router)

if(authService.isLoggedIn || localStorage.getItem('isLoggedIn')){
  return true;
}
alert('No estás autenticado');
router.navigate(['/']);
return false;

}
