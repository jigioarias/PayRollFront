import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Licencia, SolicitudVacacion,Incapacidad } from 'src/app/inventory/shared/master';
import { IncapacidadService } from '../../shared/incapacidad.service';
import { LicenciaService } from '../../shared/licencia.service';
import { LogoutServiceService } from '../../shared/logout-service.service';
import { messages } from '../../shared/messages';
import { SolicitudVacacionService } from '../../shared/solicitud-vacacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  usuario: string;
  licencias: number;
  solicitudVacaciones: number;
  opened: boolean;

  constructor(
    private router: Router,
    private logoutService: LogoutServiceService,
    private solicitudVacationService: SolicitudVacacionService,
    private licenciaService: LicenciaService,
    private incapacidadServive:IncapacidadService,
    private solicitudVacacionService :SolicitudVacacionService


  ) { }

  ngOnInit(): void {

    this.usuario = localStorage.getItem(messages.variableUserSession);
   
    let licencia: Licencia = {
      id: 0,
      enterprise: 1,
      document: null,
      initDate: null,
      endDate: null,
      user: null,
      type: null,
      remuneration: false,
      employeeId: null,
      year: null,
      registerPeriod: null,
      clase: null,
      salary: null,
      state: 'S',
      hours: 0
    };

    this.licenciaService.list(licencia).subscribe((data) => {
      console.log(data);
    });
   
    let  incapacidad:  Incapacidad = {
      id : 0,
      enterprise : 1,
      document: null,
      initDate :null,
      endDate : null,
      user : null,
      type : null,
      employeeId : 0,
      year : null, 
      registerPeriod : null,
      clase : null,
      salary : 0,
      state : 'S',
      percentage : 0
      };

      this.incapacidadServive.list(incapacidad).subscribe((data) => {
        console.log(data);
      });
     
   
    //this.updateVacaciones();


  }

  updateVacaciones() {
    let solicitud: SolicitudVacacion = {
      id: 0,
      enterprise: 1,
      document: null,
      enjoyInitDate: null,
      enjoyEndDate: null,
      moneyDays: null,
      state: 'P',
      remuneration: false,
      user: null

    }

    this.solicitudVacationService.list(solicitud).subscribe(
      (data) => {

        this.solicitudVacaciones = data.length;
      },
      (error) => {
        console.log(error);
      }

    );


  }


  logout() {
    this.logoutService.logout();
    this.router.navigateByUrl(messages.urlLogin);
  }

  getLicenciasSinAprobar(): Observable<number> {

    return of(this.licenciaService.licenciasSinAprobar);
  }

  getIncapacidadesSinAprobar(): Observable<number> {
    return of(this.incapacidadServive.IncapacidadesSinAprobar);
  }
  getSolicitudesSinAprobar(): Observable<number> {
    return of(this.solicitudVacacionService.solicitudesVacacionesSinAprobar);
  }

}

export function actualizarLicencias() {

}

