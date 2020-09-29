import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Messages } from 'src/app/general/shared/messages';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { Employee } from 'src/app/inventory/shared/employee';
import { EmployeeService } from 'src/app/inventory/shared/employee.service';
import { Concepto, PeriodoClase } from 'src/app/inventory/shared/master';

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


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private employeeService :EmployeeService,
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


    });

  }

  //consultar empleado
  findEmployee(){
    let document = this.registerForm.get('document').value;
    console.log(document);      
    this.employeeService.find(document).subscribe(

      (data)=>{

        if(data!=null){
         console.log(data);
          this.empleado =data;
          this.registerForm.get('name').setValue(this.empleado.person.firstName+' '+ this.empleado.person.lastName);
          this.registerForm.get('classpayroll').setValue(this.empleado.classPayRoll.description);

         
        }else{

          this.messagesService.showErrorMessage(Messages.get('sin_solicitud_vacaciones'));

        }

      },(error)=>{
        console.log(error);

       }
    );
   

   }

   hoursSave(){

    if(this.registerForm.valid){    
      console.log(this.empleado);
    }else{

        console.log('faltan campos');
    }
              
    
   }


}
