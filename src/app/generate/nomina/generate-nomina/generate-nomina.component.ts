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
      classPayRoll: [null, Validators.required],
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

    console.log(clase);
    let filter:Filter ={
      classPayRoll:clase,
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

    let filter :Filter={
      enterprise : 1,
      classPayRoll: this.nominaForm.get('classPayRoll').value,
      period: this.nominaForm.get('period').value,
      active:true
    }
    this.generateNoinaService.generate(filter).subscribe(
      (data)=>{

         console.log(data);
      },
      (error)=>{
        console.log(error);

      }
    );

  }


}
