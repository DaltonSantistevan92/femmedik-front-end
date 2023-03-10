import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path:'login', loadChildren: () => import('./auth/auth.module').then(m =>m.AuthModule) },
  { path:'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)  }, 
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot( routes , { useHash: true } ) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
