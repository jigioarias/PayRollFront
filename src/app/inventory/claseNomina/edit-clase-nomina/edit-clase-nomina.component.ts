import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BankType, BANK_TYPES } from 'src/app/general/shared/bankType';
import { ClaseNominaService } from 'src/app/general/shared/clase-nomina.service';
import { ClassPayRollType, CLASSPAYROLL_TYPES } from 'src/app/general/shared/classPayRollType';
import { LABEL } from 'src/app/general/shared/label';
import { messages, Messages } from 'src/app/general/shared/messages';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { PayRollType, PAYROLLTYPES } from 'src/app/general/shared/payRollType';
import { PeriodClase, PERIODOSCLASES } from 'src/app/general/shared/periodoClase';
import { PrimaType, PRIMA_TYPES } from 'src/app/general/shared/primaType';
import { ProvisionType, PROVISION_TYPES } from 'src/app/general/shared/provisionType';
import { SemanaLaboralService } from 'src/app/general/shared/semana-laboral.service';
import { ClaseNomina, SemanaLaboral } from '../../shared/master';

@Component({
  selector: 'app-edit-clase-nomina',
  templateUrl: './edit-clase-nomina.component.html',
  styleUrls: ['./edit-clase-nomina.component.scss']
})
export class EditClaseNominaComponent implements OnInit {


idClaseNomina:number;
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
  private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private claseNominaService : ClaseNominaService,
    private semanaLaboralService :SemanaLaboralService,
    private messagesService:MessagesService
  ) { }
  

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idClaseNomina = params['id'];
      console.log(this.idClaseNomina);
    });
    
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
      
    this.claseNominaService.get(this.idClaseNomina).subscribe(
      (data)=>{
       console.log(data);
       this.claseForm.get('description').setValue(data.description);
       this.claseForm.get('clase').setValue(data.clase);
       this.claseForm.get('vacationdays').setValue(data.vacationdays);
       this.claseForm.get('primaType').setValue(data.primatype);
       this.claseForm.get('vacationprima').setValue(data.vacationprima);
       this.claseForm.get('provisionservicedays').setValue(data.provisionservicedays);
       this.claseForm.get('provisionservicetype').setValue(data.provisionservicetype);
       this.claseForm.get('payrollltype').setValue(data.payrolltype);
       this.claseForm.get('monthhours').setValue(data.monthhours);
       this.claseForm.get('dayshours').setValue(data.dayshours);
       this.claseForm.get('bank').setValue(data.bank);
       this.claseForm.get('bankbranch').setValue(data.bankbranch);
       this.claseForm.get('account').setValue(data.account);
       this.claseForm.get('periodType').setValue(data.periodType);
       this.claseForm.get('workweek').setValue(data.workweek);
       this.claseForm.get('active').setValue(data.active);

      },(error)=>{

      console.log('error',error);
    }
    );

  }

  loadClaseNomina(){
    
  
    let claseNominac :ClaseNomina={
    id:this.idClaseNomina,
    enterprise: parseInt(localStorage.getItem(messages.variableUserEmpresa)),
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
  

  edit() {
    



this.loadClaseNomina();

    console.log('clae Nomina',this.claseNomina);
    this.claseNominaService.update(this.claseNomina).subscribe(
      (data)=> {
        console.log(data);
        if(data.clase!=null){
        this.messagesService.showSuccessMessage(Messages.get('edit_success', LABEL.classPayRoll,this.claseForm.get('description').value));
        }else{
          
          this.messagesService.showErrorMessage(Messages.get('edit_error', LABEL.classPayRoll,data.error));

        }
      },
      (error)=>{
        console.log(error);
      }

    );   
    
    
  }




}
