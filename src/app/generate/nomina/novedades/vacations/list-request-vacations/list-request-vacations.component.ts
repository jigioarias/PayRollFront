import { Component, OnInit } from '@angular/core';
import { SolicitudVacacionService } from 'src/app/general/shared/solicitud-vacacion.service';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { SolicitudVacacion, SolicitudVacacionData } from 'src/app/inventory/shared/master';
import { Router } from '@angular/router';


const ELEMENT_DATA: SolicitudVacacionData[] = [];



@Component({
  selector: 'app-list-request-vacations',
  templateUrl: './list-request-vacations.component.html',
  styleUrls: ['./list-request-vacations.component.scss']
})


export class ListRequestVacationsComponent implements OnInit {

  displayedColumns: string[] = ['document','name','initDate','endDate','moneyDays','edit'];

  //dataSource = ELEMENT_DATA;
  dataSource = ELEMENT_DATA;


  constructor(
    private router: Router,
    private solicitudVacationService : SolicitudVacacionService,
    private messagesService:MessagesService


  ) {

   }

  ngOnInit(): void {
  
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
        console.log(data);
         this.dataSource = data;
      },
      (error)=>{

        console.log(error);
      }

    );

  }
  update(id){
    
    this.router.navigate([`/app/payroll/requestVacations/${id}`]);
  }

  save(){
     }
}
