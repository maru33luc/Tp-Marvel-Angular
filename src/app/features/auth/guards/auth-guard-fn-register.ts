import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";


export const authGuardFnRegister : CanActivateFn = () => {

const router = inject(Router)
const authService = inject(AuthService);

if(authService.user()){
  alert('Ya estás logueado');
  router.navigate(['/']);
  return false;
}
return true;

}
