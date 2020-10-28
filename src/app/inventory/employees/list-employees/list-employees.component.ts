import { Component, Input, OnInit } from '@angular/core';
import { Employee, EmployeeData, PersonData } from '../../shared/employee';
import { Messages } from 'src/app/general/shared/messages';

import { MessagesService } from 'src/app/general/shared/messages.service';
import { LABEL } from 'src/app/general/shared/label';
import { Router } from '@angular/router';
import { EmployeeService } from '../../shared/employee.service';
import { EmployeeComponent } from '../employee/employee.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClaseNominaService } from 'src/app/general/shared/clase-nomina.service';
import { ClaseNomina } from '../../shared/master';
import { State, STATES } from 'src/app/general/shared/state';


const ELEMENT_DATA: Employee[] = [];

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})
export class ListEmployeesComponent implements OnInit {


  displayedColumns: string[] = ['select','document','firstName','lastName','initDate', 'endDate', 'active','edit'];
  //dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<Employee>(ELEMENT_DATA);

  selection = new SelectionModel<Employee>(true, []);
  searchForm: FormGroup; 
  clases :ClaseNomina[];
  estados: State[];
  employeeData: EmployeeData; 
  loadImage : boolean;

  


  constructor(
    private formBuilder: FormBuilder,
    private claseNominaService : ClaseNominaService,
    private router:Router, 
    private messagesService:MessagesService,
    private employeeeService:EmployeeService) { }



  ngOnInit(): void {
  
   //this.dataSource.data.length
    this.searchForm = this.formBuilder.group({
      document: [null, Validators.required],
      clase: [null, Validators.required],
      active: [true],
    });
    this.claseNominaService.list().subscribe(
      (data)=>{
          this.clases = data;
      },(error)=>{
          console.log(error);
      }

  );
  this.estados = STATES;


  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

 /** Selects all rows if they are not all selected; otherwise clear selection. */
 masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
      
}

/** The label for the checkbox on the passed row */
checkboxLabel(row?: Employee): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.employee.id + 1}`;
}

  edit(id: string) {
   
    this.router.navigate([`/app/employees/edit/${id}`]);
  }

 

  save(){
    
    let selectedFileIds: string[] = [];
    for (let employee of this.selection.selected) {
      employee.employee.active = false;
      
      this.employeeeService.update(employee).subscribe(
      (data)=>{
          console.log(data);
      },(error)=>{
        console.log(error);
      }
      );
    }

  }
 

 find(){

  this.loadImage = true;
  var employeeData:EmployeeData ;
  var employee : Employee;
  
  employeeData = {
         id:null,
         enterprise :'1',
         salary :0,
         salaryType:null,
         initDateContract :null,
         endDateContract : null,
         costCenter: null,
         classPayRoll:  this.searchForm.get('clase').value,
         departament :null,  
         branchOffice:null,
         active : this.searchForm.get('active').value,
         unity: null,
         area: null,
         user : null,
         transporteSubsidy:false
   };
   let personData : PersonData;
   personData={
    id: 0,
    firstName :null,
    lastName : null,
    phone : null,
    email : null,
    document : this.searchForm.get('document').value,
    typeDocument: null, 
    address :  null,
    country :  null,
    department :  null,
    municipality: null,
    user : null,
    civilState : 0

   };

   employee = {
      person: personData,
      employee:employeeData
   };
 this.employeeeService.list(employee).subscribe(
 (data)=>{
   console.log(data);

    this.dataSource = new MatTableDataSource<Employee>(data);
    this.loadImage = false;
 },
 (error)=>{
   console.log(error);
 }

);

 }

 select(clase){
    this.searchForm.get('document').setValue(''); 
}
clean(){
  this.searchForm.get('clase').setValue(this.clases); 
}

inactivate(){

  if( this.selection.selected.length >0){

          try {

          this.selection.selected.forEach(element => {
            element.employee.active =(!this.searchForm.get('active').value);
            
          });

          this.employeeeService.updateMasive(this.selection.selected).subscribe((data)=>{
            console.log('actualizados',data);
            this.find();

          },
          (error)=>{
            console.log(error);
          }
          );

          
          } catch (error) {
            console.log(error);
          }
    } 
  
}

hideLoader(){
  this.loadImage=false;
}

}
