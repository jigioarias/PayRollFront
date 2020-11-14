import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PeriodoClase, Filter, Vacacion } from 'src/app/inventory/shared/master';
import { Router, ActivatedRoute } from '@angular/router';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { EmployeeService } from 'src/app/inventory/shared/employee.service';
import { Employee } from 'src/app/inventory/shared/employee';
import { messages, Messages } from 'src/app/general/shared/messages';
import {  Aprobada } from 'src/app/general/shared/vacationRequestType';
import { GenerateNominaService } from '../../../shared/generate-nomina.service';
import { LABEL } from 'src/app/general/shared/label';

@Component({
  selector: 'app-create-vacations',
  templateUrl: './create-vacations.component.html',
  styleUrls: ['./create-vacations.component.scss']
})
export class CreateVacationsComponent implements OnInit {
  vacationsForm: FormGroup;
  periodClase : PeriodoClase;
  empleado :Employee;
  vacationDays :number;
  document: string;
    
   constructor(
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private employeeService :EmployeeService,
      private nominaService :GenerateNominaService,
      private messagesService:MessagesService
    ) { }
    
    ngOnInit(): void {

      this.vacationsForm = this.formBuilder.group({
        document: [null, Validators.required],
        name: [null, Validators.required],
        classpayroll: [null, Validators.required],
        initDate: [null, Validators.required],
        vacationDays : [null, Validators.required],
        enjoyDays :  [0],
        enjoyInitDate :[null, Validators.required],
        enjoyEndDate: [null, Validators.required],
        payInitDate: [null, Validators.required],
        payEndDate: [null, Validators.required],
        payDays: [0],
          });
  
      
    }
  
  
  
    findEmployee(){

      let document = this.vacationsForm.get('document').value;


      let filter :Filter={
        enterprise: parseInt(localStorage.getItem(messages.variableUserEmpresa)),
        document:document,
        active:true,
        retrieveALL:true
   };      

    if(document!=null){      
      

      this.employeeService.get(filter).subscribe(
        (data)=>{
          if(data!=null){
           console.log(data);
            this.empleado =data;
            this.vacationsForm.get('name').setValue(this.empleado.person.firstName +' '+this.empleado.person.lastName);
            this.vacationsForm.get('classpayroll').setValue(this.empleado.classPayRoll.description);
            this.vacationsForm.get('vacationDays').setValue(this.empleado.vacationdays);
        
          }
          

        },(error)=>{
          console.log(error);

         }
      );
      }else{
        this.messagesService.showErrorMessage(Messages.get('retrieve_data_error', LABEL.person, ''));
      }
  
     }

     
    vacationRequest(){
        
     // this.empleado.vacationRequest.state = Aprobada.code;
      let vacaciones : Vacacion={
        id:0,
        employee:this.empleado.employee.id,
        document:this.empleado.person.document,
        vacationRequest : this.empleado.vacationRequest,
        classPayRoll:this.empleado.classPayRoll,
        enjoyInitDate:this.vacationsForm.get('enjoyInitDate').value,
        enjoyEndDate:this.vacationsForm.get('enjoyEndDate').value,
        moneyDays: this.vacationsForm.get('payDays').value,
        enjoyDays: this.vacationsForm.get('enjoyDays').value,
        remuneration:true,
        enterprise: parseInt(localStorage.getItem(messages.variableUserEmpresa)),
        user:localStorage.getItem(messages.variableUserSession),
        period :this.empleado.period[0],
        salary:this.empleado.employee.salary,
        dayHours:this.empleado.classPayRoll.dayshours
      }

      console.log(vacaciones);
      this.nominaService.insertVacation(vacaciones).subscribe(
        (data)=>{
          
            if(data!= null){

              this.messagesService.showErrorMessage(Messages.get('vacation_days_dates'));

           
            }else{
              this.messagesService.showSuccessMessage(Messages.get('insert_success', LABEL.vacation, ''));
            }

            this.vacationsForm.get('name').setValue(null);
            this.vacationsForm.get('classpayroll').setValue(null);
            this.vacationsForm.get('initDate').setValue(null);
            this.vacationsForm.get('vacationDays').setValue(null);
            this.vacationsForm.get('enjoyInitDate').setValue(null);
            this.vacationsForm.get('enjoyEndDate').setValue(null);    
            this.vacationsForm.get('payDays').setValue(null);    
            this.vacationsForm.get('enjoyDays').setValue(null); 
        },
        (error)=>{
            console.log(error);
        }

      );

     }
    

     

}
