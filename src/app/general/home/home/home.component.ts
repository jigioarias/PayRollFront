import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudVacacion } from 'src/app/inventory/shared/master';
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
    private solicitudVacationService : SolicitudVacacionService


  ) { }

  ngOnInit(): void {

    this.usuario = localStorage.getItem(messages.variableUserSession);
    this.licencias = 3;
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

  logout(){

    this.logoutService.logout();
    this.router.navigateByUrl(messages.urlLogin);


  }

}
