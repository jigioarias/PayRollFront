import { Component, OnInit } from '@angular/core';
import { PeriodoClase, ClaseNomina } from '../../shared/master';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { PeriodoclaseService } from 'src/app/general/shared/periodoclase.service';
import { ClaseNominaService } from 'src/app/general/shared/clase-nomina.service';

const ELEMENT_DATA: PeriodoClase[] = [];


@Component({
  selector: 'app-list-periodo-clase',
  templateUrl: './list-periodo-clase.component.html',
  styleUrls: ['./list-periodo-clase.component.scss']
})
export class ListPeriodoClaseComponent implements OnInit {

  displayedColumns: string[] = ['period','class','year','month','active','edit'];

  //dataSource = ELEMENT_DATA;
  dataSource = ELEMENT_DATA;
  listaClases : ClaseNomina[];


  constructor(private router:Router, private messagesService:MessagesService,private claseNominaService:ClaseNominaService,
    
    private periodoClaseService:PeriodoclaseService) { }

  ngOnInit(): void {
  

    this.periodoClaseService.list().subscribe(
      (data)=>{

        this.claseNominaService.list(null).subscribe((dataNomina)=>{
          this.dataSource = data;

          
           this.listaClases = dataNomina;
         this.dataSource.forEach(elementPeriodo => {
              this.listaClases.forEach(element => {
                  if(elementPeriodo.clase==element.id){
                    elementPeriodo.descriptionClase = element.description;
                  }
              });
          });

        },(error)=>{

        });
        



      },
      (error)=>{
        console.log(error);
      }

    );
  }


edit(id){

  this.router.navigate([`/app/periods/edit/${id}`]);  

}

}
