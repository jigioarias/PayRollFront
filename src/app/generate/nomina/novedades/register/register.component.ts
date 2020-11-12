import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConceptoService } from 'src/app/general/shared/concepto.service';
import { LABEL } from 'src/app/general/shared/label';
import { messages, Messages } from 'src/app/general/shared/messages';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { NovedadNominaService } from 'src/app/general/shared/novedad-nomina.service';
import { PeriodoclaseService } from 'src/app/general/shared/periodoclase.service';
import { Employee } from 'src/app/inventory/shared/employee';
import { EmployeeService } from 'src/app/inventory/shared/employee.service';
import { Concepto, Filter, NovedadNomina, PeriodoClase } from 'src/app/inventory/shared/master';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  empleado : Employee;
  periods : PeriodoClase[];
  concepts : Concepto[];
  periodSelected : PeriodoClase;
  conceptSelect :Concepto;
  valorCalculado : number;



  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private employeeService :EmployeeService,
    private periodoClaseService :PeriodoclaseService,
    private conceptoService :ConceptoService,
    private novedadNominaService :NovedadNominaService,
    private messagesService:MessagesService



  ) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      document: [null, Validators.required],
      name :[null, Validators.required],
      classpayroll: [null, Validators.required],
      concept: [null, Validators.required],
      period: [null, Validators.required],
      hours: [null, Validators.required],
      valor: [null, Validators.required],
      dateRegister: [null, Validators.required],
      periodoInfo : null, 


    });


    

  }

  //consultar empleado
  findEmployee(){
    let document = this.registerForm.get('document').value;

   let filter :Filter={
    enterprise: parseInt(localStorage.getItem(messages.variableUserEmpresa)),
    document:document,
        active:true
   };

  this.employeeService.get(filter).subscribe(

      (data)=>{
        console.log(data);
          if(data!=null){
         
          this.empleado =data;
          this.registerForm.get('name').setValue(this.empleado.person.firstName+' '+ this.empleado.person.lastName);
          this.registerForm.get('classpayroll').setValue(this.empleado.classPayRoll.description);

          let filter:Filter ={
            classPayRoll: this.empleado.classPayRoll,
            enterprise: parseInt(localStorage.getItem(messages.variableUserEmpresa)),
            active:true
          }
          
      
           this.periodoClaseService.listByClassPayRoll(filter).subscribe((data)=>{
            this.periods = data;
          },(error)=>{
            console.log(error);
          }
          );
      
         
        }else{

          this.messagesService.showErrorMessage(Messages.get('sin_solicitud_vacaciones'));

        }

      },(error)=>{
        console.log(error);

        }
    );
   

    this.conceptoService.list(1).subscribe(
      (data)=>{
        console.log(data);
        this.concepts = data;
      },(error)=>{

        console.log('error',error);
      }

    );

   }

   hoursSave(){

    console.log(this.periodSelected);
    if(this.registerForm.valid &&  this.registerForm.get('hours').value >0){    
      let horasExtras : NovedadNomina ={
        id:0,
        enterprise: parseInt(localStorage.getItem(messages.variableUserEmpresa)),
        document :this.registerForm.get('document').value,
        idClassPayRoll:this.empleado.classPayRoll.id,
        employee:this.empleado.employee.id,
        concept:this.conceptSelect.id,
        period :this.periodSelected.year+this.periodSelected.month+this.periodSelected.period,
        valor:this.registerForm.get('valor').value,
        hours: this.registerForm.get('hours').value,
        initDate:this.periodSelected.initDate,
        endDate:this.periodSelected.endDate,
        user : localStorage.getItem(messages.variableUserSession),
        noveltyDate: this.registerForm.get('dateRegister').value
      }
      console.log('horas extras',horasExtras);
      this.novedadNominaService.save(horasExtras).subscribe((data)=>{
          console.log(data);
      },(error)=>{
        console.log(error);
      }
      );

    }else{
      this.messagesService.showErrorMessage(Messages.get('insert_error', LABEL.extraHour,''));

    }
              
    
   }


   selectConcept(idConcept){
    
    this.valorCalculado = 0;
    let diasNomina = (this.empleado.classPayRoll.payrolltype=='J')?31:30;
    let valorHora =  (this.empleado.employee.salary/diasNomina)/this.empleado.classPayRoll.dayshours;

    console.log(this.concepts);
   //console.log(valorHora);
    
   if(this.registerForm.get('hours').value>0){ 
   this.concepts.forEach(element => {
         if(idConcept==element.code){
         // console.log( this.registerForm.get('hours').value);
         if(0< this.registerForm.get('hours').value &&  this.registerForm.get('hours').value<=element.maxRegisterHour){
          this.valorCalculado = (element.percentaje/100) *  (valorHora*this.registerForm.get('hours').value);
          this.registerForm.get('valor').setValue(this.valorCalculado);
          this.conceptSelect = element;
          }else{
            this.registerForm.get('valor').setValue(0);
            this.messagesService.showErrorMessage(Messages.get('error_calculate_extrahours', LABEL.extraHour,'Numero de horas debe ser menor o igual a'+element.maxRegisterHour));
  
          }
     }       
     }); 
    }else{
      this.registerForm.get('valor').setValue(0);
    }
   
 
   }

   selectPeriod(IdPeriod){
  
    this.periods.forEach(element => {
      if(IdPeriod==element.id){
        this.periodSelected = element;
        this.registerForm.get('periodoInfo').setValue(this.periodSelected.year+'-'+this.periodSelected.month+'-'+this.periodSelected.period);

      }
  });  
  
   }


   calculateValue(horas){
    
    
    this.valorCalculado = 0;
    let diasNomina = (this.empleado.classPayRoll.payrolltype=='J')?31:30;
    let valorHora =  (this.empleado.employee.salary/diasNomina)/this.empleado.classPayRoll.dayshours;

    
   if(this.conceptSelect!=null && horas>0){ 
        // console.log( this.registerForm.get('hours').value);
        if(0< horas &&  horas<=this.conceptSelect.maxRegisterHour){
        this.valorCalculado = (this.conceptSelect.percentaje/100) *  (valorHora*horas);
           this.registerForm.get('valor').setValue(this.valorCalculado);
        }else{
          this.registerForm.get('valor').setValue(0);
          this.messagesService.showErrorMessage(Messages.get('error_calculate_extrahours', LABEL.extraHour,'Numero de horas debe ser menor o igual a'+this.conceptSelect.maxRegisterHour));

        }

    }else{
      this.registerForm.get('valor').setValue(0);
    }
   
 
   }

  

}
