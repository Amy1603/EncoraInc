import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './common/components/not-found/not-found.component';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {path:'login',loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)},
  {path:'dashboard',loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),canActivate:[AuthGuardService]},
  {path:'contacts',loadChildren: () => import('./modules/contacts/contacts.module').then(m => m.ContactsModule),canActivate:[AuthGuardService]},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuardService]
})
export class AppRoutingModule { }
