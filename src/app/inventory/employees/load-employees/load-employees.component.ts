import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { Employee, EmployeeData, PersonData } from '../../shared/employee';
import { EmployeeService } from '../../shared/employee.service';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-load-employees',
  templateUrl: './load-employees.component.html',
  styleUrls: ['./load-employees.component.scss']
})
export class LoadEmployeesComponent implements OnInit {


  resultSet:any; // dont need it 
  

  constructor(private employeeService: EmployeeService,
    private messagesService:MessagesService,
    private fb: FormBuilder) { }
    form: FormGroup;
  
    ngOnInit(): void {
    
      this.form = this.fb.group({
        file1: [undefined, Validators.required]

    });
  
  }


 cargar(){

  console.log(this.form.get('file1').value);
 }

//Cargar Archivo
  async csvInputChange(fileInputEvent: any) {

   
    
      var file:File =fileInputEvent.target.files[0];
      var self = this;
      var myReader:FileReader = new FileReader();
      myReader.readAsText(file);
      console.log(myReader.readyState)
 

      myReader.onloadend = await function(e){
  
            var columns = myReader.result.toString().split(/\r\n|\r|\n/g);
            var datos:string [];
            var empleado :string;
            var datosEmpleado :string[];
            var jsonEmpleado :Employee[]=[];

            var empleadoInstance: Employee;
            var personInstance :PersonData;
            var employeeInstance : EmployeeData;

            
              for (var i = 0; i < columns.length; i++) {
                datos =  columns[i].split('\n');

                for (var j = 0; j <datos.length; j++) {
              
                  //console.log(datos[j]);
                  datosEmpleado =datos[j].split(';');
                  
                  personInstance ={
                    id:0,
                    firstName : datosEmpleado[0],
                    lastName : datosEmpleado[1],
                    phone : datosEmpleado[2],
                    email : datosEmpleado[3],
                    document : datosEmpleado[4],
                    typeDocument: datosEmpleado[5],
                    address : datosEmpleado[6],
                    country : datosEmpleado[7],
                    department : datosEmpleado[8],
                    municipality:datosEmpleado[9],
                    user :localStorage.getItem('user'),
                    civilState : parseInt(datosEmpleado[10]),
                  };
                  employeeInstance ={
                    id:0,
                    enterprise : datosEmpleado[11],
                    salary :  parseInt(datosEmpleado[12]),
                    salaryType:  datosEmpleado[13],
                    initDateContract : datosEmpleado[14],
                    endDateContract : datosEmpleado[15],
                    costCenter:   datosEmpleado[16],
                    classPayRoll:  datosEmpleado[17],
                    departament :  datosEmpleado[18],
                    branchOffice:  datosEmpleado[19],
                    active : (datosEmpleado[20]=="true"),
                    unity: datosEmpleado[21],
                    area:  datosEmpleado[22],
                    user : localStorage.getItem('user'),
                    transporteSubsidy:(datosEmpleado[23]=="true"),

                  };

                  empleadoInstance = {
                    person:personInstance,
                    employee: employeeInstance,
                  };
                
                  jsonEmpleado.push(empleadoInstance);
                
                  
                }

              }

              self.employeeService.saveMasive(jsonEmpleado).subscribe((data)=>{
                console.log(data);  
              },
              (error)=>{
                console.log(error);
              }
              )
            };

    
  }




 


}
