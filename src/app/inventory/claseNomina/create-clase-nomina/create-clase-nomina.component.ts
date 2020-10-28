import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { PrimaType, PRIMA_TYPES } from 'src/app/general/shared/primaType';
import { BankType, BANK_TYPES } from 'src/app/general/shared/bankType';
import { ProvisionType, PROVISION_TYPES } from 'src/app/general/shared/provisionType';
import { PayRollType, PAYROLLTYPES } from 'src/app/general/shared/payRollType';
import { ClaseNominaService } from 'src/app/general/shared/clase-nomina.service';
import { ClaseNomina, SemanaLaboral, PeriodoClase } from '../../shared/master';
import { ClaseNominaComponent } from '../../clase-nomina/clase-nomina.component';
import { Messages } from 'src/app/general/shared/messages';
import { LABEL } from 'src/app/general/shared/label';
import { ClassPayRollType, CLASSPAYROLL_TYPES } from 'src/app/general/shared/classPayRollType';
import { SemanaLaboralService } from 'src/app/general/shared/semana-laboral.service';
import { PERIODOSCLASES, PeriodClase } from 'src/app/general/shared/periodoClase';

@Component({
  selector: 'app-create-clase-nomina',
  templateUrl: './create-clase-nomina.component.html',
  styleUrls: ['./create-clase-nomina.component.scss']
})
export class CreateClaseNominaComponent implements OnInit {

claseForm: FormGroup;
primaTypes : PrimaType[];
banks :BankType[];
provisionTypes : ProvisionType[];
payRollTypes  : PayRollType[];
claseNomina : ClaseNomina;
clases :ClassPayRollType[];
semanasLaborales : SemanaLaboral[];
periodClases : PeriodClase[];
  
 constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private claseNominaService : ClaseNominaService,
    private semanaLaboralService :SemanaLaboralService,
    private messagesService:MessagesService
  ) { }
  
  ngOnInit(): void {
  

    this.primaTypes = PRIMA_TYPES;
    this.banks = BANK_TYPES;
    this.provisionTypes =PROVISION_TYPES;
    this.payRollTypes = PAYROLLTYPES;
    this.clases =CLASSPAYROLL_TYPES;
    this.periodClases = PERIODOSCLASES;
    this.claseForm = this.formBuilder.group({
      description: [null, Validators.required],
      clase: [null, Validators.required],
      vacationdays: [null, Validators.required],
      primaType: [null, Validators.required],
      vacationprima: [null, Validators.required],
      provisionservicedays: [null, Validators.required],
      provisionservicetype :[null, Validators.required],
      payrollltype : [null, Validators.required],
      monthhours: [null, Validators.required],
      dayshours: [null, Validators.required],
      bank: [null, Validators.required], 
      bankbranch:[null, Validators.required], 
      account: [null, Validators.required],
      workweek:[null, Validators.required],
      periodType:[null, Validators.required],
      active:[null, Validators.required],

    });

    this.semanaLaboralService.list().subscribe(
      (data)=>{
          this.semanasLaborales = data;
      },(error)=>{

        console.log('error',error);
      }
    );  
  
  }



  loadClaseNomina(){
    
   

    


    let claseNominac :ClaseNomina={
    id:0,
    enterprise:1,
    clase: this.claseForm.get('clase').value,
    description:this.claseForm.get('description').value, 
    vacationdays:this.claseForm.get('vacationdays').value,
    vacationprima:this.claseForm.get('vacationprima').value,
    primatype:this.claseForm.get('primaType').value,
    provisionservicedays :this.claseForm.get('provisionservicedays').value,
    provisionservicetype:this.claseForm.get('provisionservicetype').value,
    payrolltype:this.claseForm.get('payrollltype').value,
    monthhours:this.claseForm.get('monthhours').value,
    dayshours:this.claseForm.get('dayshours').value,
    bank:this.claseForm.get('bank').value,
    bankbranch:this.claseForm.get('bankbranch').value,
    account:this.claseForm.get('account').value,
    user:'usuario',
    workweek:this.claseForm.get('workweek').value,
    periodType :this.claseForm.get('periodType').value,
    active :this.claseForm.get('active').value
    };
  
    this.claseNomina =claseNominac
   }
  

  add() {
    


   /* if (this.claseForm.invalid ){
      
      this.messagesService.showErrorMessage(Messages.get('insert_error', LABEL.classPayRoll));
      return;     
    }
*/
  

this.loadClaseNomina();

    console.log('clae Nomina',this.claseNomina);
    this.claseNominaService.save(this.claseNomina).subscribe(
      (data)=> {
        console.log(data);
        if(data.clase!=null){
        this.messagesService.showSuccessMessage(Messages.get('insert_success', LABEL.classPayRoll,this.claseForm.get('description').value));
        }else{
          
          this.messagesService.showErrorMessage(Messages.get('insert_error', LABEL.classPayRoll,data.error));

        }
      },
      (error)=>{
        console.log(error);
      }

    );   
    
    
  }
  

}
