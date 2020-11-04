import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { PrimaType, PRIMA_TYPES } from 'src/app/general/shared/primaType';
import { BankType, BANK_TYPES } from 'src/app/general/shared/bankType';
import { ProvisionType, PROVISION_TYPES } from 'src/app/general/shared/provisionType';
import { PayRollType, PAYROLLTYPES } from 'src/app/general/shared/payRollType';
import { ClaseNominaService } from 'src/app/general/shared/clase-nomina.service';
import { ClaseNomina, PeriodoClase } from '../../shared/master';
import { ClaseNominaComponent } from '../../clase-nomina/clase-nomina.component';
import { messages, Messages } from 'src/app/general/shared/messages';
import { LABEL } from 'src/app/general/shared/label';
import { ClassPayRollType, CLASSPAYROLL_TYPES } from 'src/app/general/shared/classPayRollType';
import { MonthType, MONTH_TYPES } from 'src/app/general/shared/monthType';
import { PeriodoType, PERIODOS_TYPES } from 'src/app/general/shared/periodoType';
import { PeriodoclaseService } from 'src/app/general/shared/periodoclase.service';
import { State, STATES } from 'src/app/general/shared/state';

@Component({
  selector: 'app-create-clase-nomina',
  templateUrl: './periodo-clase.component.html',
  styleUrls: ['./periodo-clase.component.scss']
})
export class PeriodoClaseComponent implements OnInit {

  

claseForm: FormGroup;
months : MonthType[];
periods :PeriodoType[];
periodClase : PeriodoClase;
clases :ClaseNomina[];
estados :State[];
  
 constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private periodoClaseService : PeriodoclaseService,
    private claseNominaService :ClaseNominaService,
    private messagesService:MessagesService
  ) { }
  
  ngOnInit(): void {
  

    this.months = MONTH_TYPES;
    this.periods = PERIODOS_TYPES;
    this.estados = STATES;

   
    this.claseForm = this.formBuilder.group({
      period: [null, Validators.required],
      month :[null, Validators.required],
      clase: [null, Validators.required],
      year: [null, Validators.required],
      active: [null, Validators.required],
      initDate: [null, Validators.required],
      endDate: [null, Validators.required],

    });

   this.claseNominaService.list().subscribe(
      (data)=>{
        console.log(data);
         this.clases = data;
      },
      (error)=>{
        console.log(error);
      }

    );
  
  
  }



  loadPeriodClase(){
  
    let periodoClaseC :PeriodoClase={
    id:0,
    enterprise:1,
    clase: this.claseForm.get('clase').value,
    period:this.claseForm.get('period').value, 
    year:this.claseForm.get('year').value,
    active:this.claseForm.get('active').value,
    user:localStorage.getItem(messages.variableUserSession),
    month:this.claseForm.get('month').value,
    initDate:this.claseForm.get('initDate').value,
    endDate:this.claseForm.get('endDate').value
    };
  
    this.periodClase =periodoClaseC;
   }
  

  add() {
    

this.loadPeriodClase();

    this.periodoClaseService.save(this.periodClase).subscribe(
      (data)=> {
        console.log(data);
        if(data.periodo !=null){
        this.messagesService.showSuccessMessage(Messages.get('insert_success', LABEL.periodClase,this.claseForm.get('period').value));
        }else{
          
          this.messagesService.showErrorMessage(Messages.get('insert_error', LABEL.periodClase,this.claseForm.get('period').value));

        }
      },
      (error)=>{
        console.log(error);
      }

    );   
    
    
  }
  

}
