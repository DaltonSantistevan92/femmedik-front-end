import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioModuleRoutingModule } from './usuario-module-routing.module';

import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { NavComponent } from '../components/nav/nav.component';
import { UsuarioNavComponent } from './usuario-nav/usuario-nav.component';
import { EditarUsuarioComponent } from './modales/editar-usuario/editar-usuario.component';

import { ReactiveFormsModule } from '@angular/forms';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    NuevoUsuarioComponent,
    ListarUsuarioComponent,
    UsuarioNavComponent,
    EditarUsuarioComponent,
    //NavComponent,
  ],
  imports: [
    CommonModule,
    UsuarioModuleRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class UsuarioModuleModule { }
