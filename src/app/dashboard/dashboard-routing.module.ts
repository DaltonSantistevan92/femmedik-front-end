import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashComponent } from '../admin/admin-dash/admin-dash.component';
import { SesionGuardGuard } from './guard/sesion-guard.guard';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {
    path: '', component: MenuComponent, canActivate: [SesionGuardGuard],
    children: [
      { path: '', redirectTo: 'admin-dash', pathMatch: 'full' },
      { path: 'admin-dash', component: AdminDashComponent, canActivate: [SesionGuardGuard] }, //contenido
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
