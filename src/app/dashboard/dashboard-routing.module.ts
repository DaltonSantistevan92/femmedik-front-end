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
      { path: 'gestion-usuario', loadChildren: () => import('./../usuario-module/usuario-module.module').then(m => m.UsuarioModuleModule) },
      { path: 'gestion-horario', loadChildren: () => import('./../gestion-horario/gestion-horario.module').then(m => m.GestionHorarioModule) }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
