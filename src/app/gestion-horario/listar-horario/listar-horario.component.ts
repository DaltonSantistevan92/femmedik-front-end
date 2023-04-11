import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HorarioServiceService } from '../servicio/horario-service.service';

import { CalendarOptions, DateSelectArg, EventApi, EventClickArg  } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-listar-horario',
  templateUrl: './listar-horario.component.html',
  styleUrls: ['./listar-horario.component.scss']
})
export class ListarHorarioComponent implements OnInit {
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    locale:'es',
    plugins: [interactionPlugin,dayGridPlugin],
    headerToolbar: {left: 'prev,next today',center: 'title',right: 'dayGridMonth'},
    initialView: 'dayGridMonth',
    validRange: { start : '2023-01-01' },
    events: [
      { title: 'event 1', date: '2023-02-15' },
      { title: 'event 2', date: '2023-02-16' }
    ],
    //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    dateClick: this.handleDateClick.bind(this),//sacar la fecha
    //select: this.handleDateSelect.bind(this),//crear un evento
    //eventClick: this.handleEventClick.bind(this), //recoje el evento creado
    //eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  }; 
  currentEvents: EventApi[] = [];

  constructor(private _hs: HorarioServiceService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    //this.changeHorarios(); 
  }

  handleDateClick(arg:any){
    const start = arg.dateStr;
    let date = new Date(start);          let hoy:any = new Date();
    hoy.setDate( hoy.getDate() + 1 );    let ayer = new Date(hoy - 24 * 60 * 60 * 1000);
   
    if (date > ayer) {
        alert('Hay horarios disponibles');
    }else{
        alert('No es posible agendar horas');
    }

  }

  changeHorarios(){
    this._hs.getHorario().subscribe( (res:any) =>  {
      console.log(res);
      //this.dataSource.data = res.horario.Lunes;  
    })
  }

  handleEventClick(clickInfo: EventClickArg) {//recoje el evento creado
    //console.log(clickInfo);

   // alert(`abrir el modal del nombre del evento ${clickInfo.event.title} para ver los horarios disponibles`);
    
    if (confirm(`¿Estás seguro de que quieres eliminar el evento? '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleDateSelect(selectInfo: DateSelectArg) {  //crear un evento
    const title = prompt('Ingrese el nombre de su evento');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: '20',
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }


  /* handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  } */

}
