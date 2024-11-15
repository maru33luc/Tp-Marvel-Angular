import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { AdminPanelComponent } from './features/admin/components/admin-panel/admin-panel.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { authGuardFn } from './features/auth/guards/auth-guard-fn';
import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page/dashboard-page.component';
import { ResolverLoginService } from './features/auth/services/resolver-login.service';
import { authGuardFnRegister } from './features/auth/guards/auth-guard-fn-register';

export const routes: Routes = [
    {
        path: 'home',
        component: DashboardPageComponent 
    },
    {
        path: 'admin',
        component: AdminPanelComponent, 
        canActivate: [authGuardFn]
    },
    {
        path: 'login',
        component: LoginComponent,
        
    },
    // {
    //     path: 'register',
    //     component: RegisterComponent,
    //     canActivate: [authGuardFnRegister]
    // },

    // Lazy Loading
    {
        path: 'register', loadComponent: () => import('./features/auth/components/register/register.component').then(m=>m.RegisterComponent)
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];


