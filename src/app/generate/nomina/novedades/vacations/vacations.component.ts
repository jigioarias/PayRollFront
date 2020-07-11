import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PeriodoClase, ClaseNomina, FechaCalendarioLaboral, Filter, Vacacion } from 'src/app/inventory/shared/master';
import { Router } from '@angular/router';
import { ClaseNominaService } from 'src/app/general/shared/clase-nomina.service';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { EmployeeService } from 'src/app/inventory/shared/employee.service';
import { Employee } from 'src/app/inventory/shared/employee';
import { Messages } from 'src/app/general/shared/messages';
import { LABEL } from 'src/app/general/shared/label';
import { WorkCalendarService } from 'src/app/general/shared/work-calendar.service';
import { error } from 'protractor';
import { GenerateNominaService } from '../../shared/generate-nomina.service';
import { SolicitudVacacionService } from 'src/app/general/shared/solicitud-vacacion.service';
import { Rechazada, Aprobada } from 'src/app/general/shared/vacationRequestType';

@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.scss']
})
export class VacationsComponent implements OnInit {
  vacationsForm: FormGroup;
  periodClase : PeriodoClase;
  empleado :Employee;
  vacationDays :number;
    
   constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private employeeService :EmployeeService,
      private calensarioService : WorkCalendarService,
      private nominaService :GenerateNominaService,
      private solicitudVacationService : SolicitudVacacionService,
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
      console.log(document);      
      this.employeeService.find(document).subscribe(

        (data)=>{

          if(data!=null){
           console.log(data);
            this.empleado =data;
            this.vacationsForm.get('name').setValue(this.empleado.person.firstName);
            this.vacationsForm.get('classpayroll').setValue(this.empleado.classPayRoll.description);
            this.vacationsForm.get('initDate').setValue(this.empleado.period[0].initDate);
            this.vacationsForm.get('vacationDays').setValue(this.empleado.vacationdays);
            this.vacationsForm.get('enjoyInitDate').setValue(this.empleado.vacationRequest.enjoyInitDate);
            this.vacationsForm.get('enjoyEndDate').setValue(this.empleado.vacationRequest.enjoyEndDate);    
            this.vacationsForm.get('payDays').setValue(this.empleado.vacationRequest.moneyDays);    
            this.vacationsForm.get('enjoyDays').setValue(this.empleado.requestDays);    
          }else{

            this.messagesService.showErrorMessage(Messages.get('sin_solicitud_vacaciones'));

          }

        },(error)=>{
          console.log(error);

         }
      );
     
  
     }

     vacationRequest(){

        
      this.empleado.vacationRequest.state = Aprobada.code;
                
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
        //remuneration:this.vacationsForm.get('remuneration').value,
        remuneration:true,
        enterprise: 1,
        user:'usuario',
        period :this.empleado.period[0],
        salary:this.empleado.employee.salary,
        dayHours:this.empleado.classPayRoll.dayshours
      }

      console.log(vacaciones);
      this.nominaService.insertVacation(vacaciones).subscribe(
        (data)=>{
          
            console.log(data);
            if(data!= null){

              this.messagesService.showErrorMessage(Messages.get('vacation_days_dates'));

           
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
    

     cancelVacationRequest(){

      this.empleado.vacationRequest.state = Rechazada.code;
      
      this.solicitudVacationService.update(this.empleado.vacationRequest).subscribe(
        (data) =>{
            console.log(data,);
        },(error)=>{
          console.log(error);
        }
  
      );
  
      
    }    
    

}
