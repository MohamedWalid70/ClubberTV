import { Routes } from '@angular/router';
import { dashboardGuard } from './guards/dashboard-guard/dashboard.guard';
import { playlistGuard } from './guards/playlist-guard/playlist.guard';


export const routes: Routes = [
  {
    path: 'playlist',
    loadComponent: () =>
      import('./Pages/playlist/playlist.component').then(
        (m) => m.PlaylistComponent
      ),
    title: 'My Playlists',
    canActivate: [playlistGuard]
  },
  {
    path: '',
    loadComponent: () => import('./Pages/login/login.component').
    then(m => m.LoginComponent),
    title: 'Login'
  },
  {
    path: 'main-page',
    loadComponent: () => import('./Pages/main-page/main-page.component').
    then(m => m.MainPageComponent),
    title: 'Main Page'
  },
  {
    path: 'signup',
    loadComponent: () => import('./Pages/signup/signup.component').
    then(m => m.SignupComponent),
    title: 'Sign Up'
  },
  {
    path: 'login',
    loadComponent: () => import('./Pages/login/login.component').
    then(m => m.LoginComponent),
    title: 'Login'
  },
  { path: 'dashboard', 
    loadComponent: () => import('./Pages/dashboard/dashboard.component').
    then(m => m.DashboardComponent),
    title: 'Dashboard',
    canActivate: [dashboardGuard]
  },
  {
    path: 'admin-login',
    loadComponent: () => import('./Pages/admin-login/admin-login.component').
    then(m => m.AdminLoginComponent),
    title: 'Admin Login',
    pathMatch: 'full'
  },
  {
    path: 'about',
    loadComponent: () => import('./Pages/about/about.component').
    then(m => m.AboutComponent),
    title: 'About Us'
  },
  // {
  //   path: 'admin-signup',
  //   loadComponent: () => import('./Pages/admin-signup/admin-signup/admin-signup.component').
  //   then(m => m.AdminSignupComponent),
  //   title: 'Admin Sign Up'
  // },
  {
    path: 'super-admin-login',
    loadComponent: () => import('./Pages/super-admin-login/super-admin-login.component').
    then(m => m.SuperAdminLoginComponent),
    title: 'Super Admin Login',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadComponent: () => import('./Pages/not-found/not-found.component').
    then(m => m.NotFoundComponent),
    title: 'Not Found'
  },
];




 

  
