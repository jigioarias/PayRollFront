import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PeriodoClase, ClaseNomina } from 'src/app/inventory/shared/master';
import { Router } from '@angular/router';
import { ClaseNominaService } from 'src/app/general/shared/clase-nomina.service';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { EmployeeService } from 'src/app/inventory/shared/employee.service';
import { Employee } from 'src/app/inventory/shared/employee';

@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.scss']
})
export class VacationsComponent implements OnInit {
  vacationsForm: FormGroup;
  periodClase : PeriodoClase;
  empleado :Employee;
    
   constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private employeeService :EmployeeService,
      private messagesService:MessagesService
    ) { }
    
    ngOnInit(): void {
    
    
      this.vacationsForm = this.formBuilder.group({
        document: [null, Validators.required],
        name: [null, Validators.required]
  
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

        },(error)=>{
          console.log(error);

         }
      );
     
  
     }e
    
  
    add() {
      
  
  

  
      
      
    }
  

}
