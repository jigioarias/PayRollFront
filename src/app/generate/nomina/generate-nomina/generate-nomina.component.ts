import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenerateNominaService } from '../shared/generate-nomina.service';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { Filter, ClaseNomina, PeriodoClase } from 'src/app/inventory/shared/master';
import { PeriodoclaseService } from 'src/app/general/shared/periodoclase.service';
import { ClaseNominaService } from 'src/app/general/shared/clase-nomina.service';

@Component({
  selector: 'app-generate-nomina',
  templateUrl: './generate-nomina.component.html',
  styleUrls: ['./generate-nomina.component.scss']
})
export class GenerateNominaComponent implements OnInit {

 
  nominaForm: FormGroup;
  clases :ClaseNomina[];
  periods:PeriodoClase[];
  claeSelected :ClaseNomina;
  periodSelected : PeriodoClase;
 
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private generateNoinaService : GenerateNominaService,
    private periodoClaseService :PeriodoclaseService,
    private claseNominaService : ClaseNominaService,
    private messagesService:MessagesService
  ) { }

  ngOnInit(): void {
 


    this.nominaForm = this.formBuilder.group({
      clase: [null, Validators.required],
      period: [null, Validators.required]
    })
    
    this.claseNominaService.list().subscribe(
        (data)=>{
            this.clases = data;
        },(error)=>{
            console.log(error);
        }

    );
 
  }

  select(clase){


  this.clases.forEach(element => {
        if(clase==element.id){
          this.claeSelected = element;
        }       
    }); 

    
    let filter:Filter ={
      classPayRoll: this.claeSelected,
      enterprise:1,
      active:true
    }
    

     this.periodoClaseService.listByClassPayRoll(filter).subscribe((data)=>{
      this.periods = data;
    },(error)=>{
      console.log(error);
    }
    );

  }

  generate(){


    this.periods.forEach(element => {
        if(this.nominaForm.get('period').value==element.id){
          this.periodSelected = element;
        }
    });

    

    let filter :Filter={
      enterprise : 1,
      classPayRoll: this.claeSelected,
      period: this.periodSelected,
      active:true
    }

    console.log('llamando',filter);
    this.generateNoinaService.generate(filter).subscribe(
      (data)=>{
        console.log('llamando 2');
        console.log(data);
        return;
      },
      (error)=>{
        console.log(error);

      }
    );

  }


}
