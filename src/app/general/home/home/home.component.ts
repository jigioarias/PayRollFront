import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Licencia, SolicitudVacacion } from 'src/app/inventory/shared/master';
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

  usuario :string;
  licencias :number;
  solicitudVacaciones : number;
  opened :boolean;

  constructor(
    private router:Router,
    private logoutService :LogoutServiceService,
    private solicitudVacationService : SolicitudVacacionService,
    private licenciaService : LicenciaService


  ) { }

  ngOnInit(): void {

    this.usuario = localStorage.getItem(messages.variableUserSession);
    this.updateLicencias();
    this.updateVacaciones();

  }

  updateVacaciones(){
    let solicitud : SolicitudVacacion={
      id:0,
      enterprise:1,
      document :null,
      enjoyInitDate:null,
      enjoyEndDate:null,
      moneyDays:null,
      state:'P',
      remuneration:false,
      user:null

    }

    this.solicitudVacationService.list(solicitud).subscribe(
      (data)=>{
       
        this.solicitudVacaciones = data.length;
      },
      (error)=>{
        console.log(error);
      }

    );


  }
  updateLicencias(){

    let licencia: Licencia = {
      id : 0,
      enterprise :1,
      document: null,
      initDate :null,
      endDate :null,
      user  :null,
      type : null,
      remuneration:  false,
      employeeId :null,
      year : null,
      registerPeriod : null,
      clase : null,
      salary : null,
      state : 'S',
      hours :0
     };
 

    this.licenciaService.list(licencia).subscribe(
      (data)=>{
       
        this.licencias = data.length;
      },
      (error)=>{
        console.log(error);
      }

    );

  }
  logout(){
    this.logoutService.logout();
    this.router.navigateByUrl(messages.urlLogin);
  }


  
}



