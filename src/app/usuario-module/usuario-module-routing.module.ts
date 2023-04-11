import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { UsuarioNavComponent } from './usuario-nav/usuario-nav.component';

const routes: Routes = [
  { path : '', component : UsuarioNavComponent,
    children:[
      { path: '', redirectTo : 'nuevo-usuario', pathMatch : 'full' },
      { path: 'nuevo-usuario', component : NuevoUsuarioComponent },
      { path: 'listar-usuario', component : ListarUsuarioComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioModuleRoutingModule { }
