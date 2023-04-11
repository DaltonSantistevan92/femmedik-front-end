import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionHorarioRoutingModule } from './gestion-horario-routing.module';
import { HorarioNavComponent } from './horario-nav/horario-nav.component';
import { ComponentsModule } from '../components/components.module';
import { NuevoHorarioComponent } from './nuevo-horario/nuevo-horario.component';
import { ListarHorarioComponent } from './listar-horario/listar-horario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';

import { FullCalendarModule } from '@fullcalendar/angular';






@NgModule({
  declarations: [
    HorarioNavComponent,
    NuevoHorarioComponent,
    ListarHorarioComponent,
  ],
  imports: [
    CommonModule,
    GestionHorarioRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    FullCalendarModule
  ]
})
export class GestionHorarioModule { }
