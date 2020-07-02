import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PeriodoClase, ClaseNomina, FechaCalendarioLaboral, Filter } from 'src/app/inventory/shared/master';
import { Router } from '@angular/router';
import { ClaseNominaService } from 'src/app/general/shared/clase-nomina.service';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { EmployeeService } from 'src/app/inventory/shared/employee.service';
import { Employee } from 'src/app/inventory/shared/employee';
import { Messages } from 'src/app/general/shared/messages';
import { LABEL } from 'src/app/general/shared/label';
import { WorkCalendarService } from 'src/app/general/shared/work-calendar.service';
import { error } from 'protractor';

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
           console.log(data);
            this.empleado =data;
            this.vacationsForm.get('name').setValue(this.empleado.person.firstName);
            this.vacationsForm.get('classpayroll').setValue(this.empleado.classPayRoll.description);
            this.vacationsForm.get('initDate').setValue(this.empleado.period[0].initDate);
            this.vacationsForm.get('vacationDays').setValue(this.empleado.vacationdays);
            this.vacationsForm.get('enjoyInitDate').setValue(this.empleado.vacationRequest.enjoyInitDate);
            this.vacationsForm.get('enjoyEndDate').setValue(this.empleado.vacationRequest.enjoyEndDate);    
            this.vacationsForm.get('payDays').setValue(this.empleado.vacationRequest.moneyDays);    

            

            this.vacationDays = this.empleado.vacationdays;



        },(error)=>{
          console.log(error);

         }
      );
     
  
     }

     vacationRequest(){

         const fechaInicial  =  new Date(this.vacationsForm.get('enjoyInitDate').value);
         const fechaFinal =  new Date(this.vacationsForm.get('enjoyEndDate').value);
         const restaDias = (fechaFinal.getTime()- fechaInicial.getTime())/(1000*60*60*24 );
        
        if(restaDias <0){
          this.messagesService.showErrorMessage(Messages.get('vacation_days_dates'));
          return;
        }
         if( restaDias > this.vacationDays){
          this.messagesService.showErrorMessage(Messages.get('vacation_days_majors',restaDias+'',this.vacationDays+''));
          return;
         }

         const restaVaciones = this.vacationDays - restaDias;
         console.log(restaVaciones);


     }
    
  
    findDate() {
        

      const fechaInicial  =  new Date(this.vacationsForm.get('enjoyInitDate').value);
      const fechaFinal =  new Date(this.vacationsForm.get('enjoyEndDate').value);
      let restaDias = (fechaFinal.getTime()- fechaInicial.getTime())/(1000*60*60*24 );
     
     if(restaDias <0){
       this.messagesService.showErrorMessage(Messages.get('vacation_days_dates'));
       return;
     }
    
   /* if( restaDias > this.vacationDays){
       this.messagesService.showErrorMessage(Messages.get('vacation_days_majors',restaDias+'',this.vacationDays+''));
       return;
    }*/


     let restaVaciones = this.vacationDays - restaDias;
     this.vacationsForm.get('enjoyDays').setValue(restaDias);
     console.log(restaVaciones);

     
      let fechaInicialLaboral : FechaCalendarioLaboral = {

            calendar : this.empleado.calendarwork.id,
            date : this.vacationsForm.get('enjoyInitDate').value,
            id: null,
            year:null,
            enterprise:1,
          user :null
        };

       

        let fechaFinalLaboral : FechaCalendarioLaboral = {

          calendar : this.empleado.calendarwork.id,
          date :  this.vacationsForm.get('enjoyEndDate').value,
          id: null,
          year:null,
          enterprise:1,
        user :null
      };

      let filter : Filter ={

        fechaInicioLaboral:fechaInicialLaboral,
        fechaFinLaboral :fechaFinalLaboral
      }
        
      let listaDias = null; 

        this.calensarioService.listDate(filter).subscribe(
          (data) =>{
              listaDias  = data;
              console.log(listaDias);
             if(listaDias!= null && listaDias.length >0)
             {
              restaDias = restaDias - listaDias.length;
              this.vacationsForm.get('enjoyDays').setValue(restaDias);
              
             }


          },(error)=>{
            console.log('opss',error);
          }

        );
      

      
    }

    
    getDateWithDays(fecha, dias){


      let TuFecha = new Date(fecha); 
      let diasSuma = parseInt(dias);
      TuFecha.setDate(TuFecha.getDate() + diasSuma);
      let   year = TuFecha.getFullYear();
      let month = (TuFecha.getMonth()+1);
      let dt = TuFecha.getDate();
      
          
      //console.log(month+'-' + dt + '-'+year);
      return  month+'/' + dt + '/'+year;
    }

}
