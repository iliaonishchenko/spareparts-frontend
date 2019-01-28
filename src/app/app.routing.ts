import { Routes, RouterModule } from '@angular/router';

// import { HomeComponent } from './home';
// import { AuthGuard } from './_guards';
// import {AuthComponent} from './auth/auth.component';

const appRoutes: Routes = [
  // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'login', component: AuthComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

