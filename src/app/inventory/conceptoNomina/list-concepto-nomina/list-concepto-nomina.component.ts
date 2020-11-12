import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { ClaseNominaService } from 'src/app/general/shared/clase-nomina.service';
import { ConceptoService } from 'src/app/general/shared/concepto.service';
import { ConceptoNominaService } from 'src/app/general/shared/concepto-nomina.service';
import { ClaseNomina,ConceptoNomina, Concepto, Filter } from '../../shared/master';
import { messages } from 'src/app/general/shared/messages';

const ELEMENT_DATA: ConceptoNomina[] = [];


@Component({
  selector: 'app-list-concepto-nomina',
  templateUrl: './list-concepto-nomina.component.html',
  styleUrls: ['./list-concepto-nomina.component.scss']
})
export class ListConceptoNominaComponent implements OnInit {

  displayedColumns: string[] = ['clase','concept','active','edit'];

  //dataSource = ELEMENT_DATA;
  dataSource = ELEMENT_DATA;
  listaClases : ClaseNomina[];
  listaConceptos : Concepto[];
  

  constructor(private router:Router, private messagesService:MessagesService,private claseNominaService:ClaseNominaService,private conceptoService:ConceptoService,
   private conceptoNominaService:ConceptoNominaService) { }

  ngOnInit(): void {

  let  filter: Filter ={
    enterprise: parseInt(localStorage.getItem(messages.variableUserEmpresa)),
    active:true

    }
  
    this.conceptoNominaService.list(filter).subscribe(
      (data)=>{
        this.claseNominaService.list().subscribe((dataClases)=>{
        
          this.dataSource = data;

        this.listaClases = dataClases;
         this.dataSource.forEach(elementConceptoNomina => {
              this.listaClases.forEach(element => {
                
                  if(elementConceptoNomina.clase==element.id){
                    elementConceptoNomina.descriptionClase = element.description;

                  }
              });

          });


          this.conceptoService.list(1).subscribe((dataConcepto)=>{
            console.log('entorr');
            this.listaConceptos = dataConcepto;
            this.dataSource.forEach(elementConceptoNomina => {
                 this.listaConceptos.forEach(element => {
                     console.log(element);
                     if(elementConceptoNomina.concept==element.id){
                       elementConceptoNomina.descriptionConcept = element.description;
   
                     }
                 });
   
             });

          },(error)=>{

        });





        },(error)=>{

        });


         this.dataSource = data;
      },
      (error)=>{
        console.log(error);
      }

    );
  }


edit(id){

  this.router.navigate([`/app/conceptsPayRoll/edit/${id}`]);  


}

}
