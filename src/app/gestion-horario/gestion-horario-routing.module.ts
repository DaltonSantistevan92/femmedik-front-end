import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorarioNavComponent } from './horario-nav/horario-nav.component';
import { ListarHorarioComponent } from './listar-horario/listar-horario.component';
import { NuevoHorarioComponent } from './nuevo-horario/nuevo-horario.component';

const routes: Routes = [
  { path: '', component: HorarioNavComponent,
    children : [
      { path: '', redirectTo : 'nuevo-horario', pathMatch : 'full' },
      { path: 'nuevo-horario', component : NuevoHorarioComponent },
      { path: 'listar-horario', component : ListarHorarioComponent }
    ]
  },
  
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionHorarioRoutingModule { }
