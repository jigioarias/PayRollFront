import { Component, Input, OnInit } from '@angular/core';
import { messages, Messages } from 'src/app/general/shared/messages';

import { MessagesService } from 'src/app/general/shared/messages.service';
import { LABEL } from 'src/app/general/shared/label';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClaseNominaService } from 'src/app/general/shared/clase-nomina.service';
import { State, STATES } from 'src/app/general/shared/state';
import { ClaseNomina, Licencia, LicenciaData } from 'src/app/inventory/shared/master';
//import { Employee, EmployeeData, PersonData } from 'src/app/inventory/shared/employee';
import { LicenciaService } from 'src/app/general/shared/licencia.service';


const ELEMENT_DATA: LicenciaData[] = [];

@Component({
  selector: 'app-list-leaves',
  templateUrl: './list-leaves.component.html',
  styleUrls: ['./list-leaves.component.scss']
})
export class ListLeavesComponent implements OnInit {

 
  displayedColumns: string[] = ['select','document','firstName','lastName','initDate', 'endDate'];
  //dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<LicenciaData>(ELEMENT_DATA);

  selection = new SelectionModel<Licencia>(true, []);
  searchForm: FormGroup; 
  clases :ClaseNomina[];
  estados: State[];
  //employeeData: EmployeeData; 
  loadImage : boolean;

  


  constructor(
    private formBuilder: FormBuilder,
    private claseNominaService : ClaseNominaService,
    private router:Router, 
    private messagesService:MessagesService,
    private licenciaService:LicenciaService) { }



  ngOnInit(): void {
  
   //this.dataSource.data.length
  this.loadImage = true;
  // var employeeData:EmployeeData ;
   var licencia : Licencia;
  
    licencia = {
     id : 0,
     enterprise :1,
     document: null,
     initDate :null,
     endDate :null,
     user  :null,
     type : null,
     remuneration:  false,
     employeeId :null,
     year : null,
     registerPeriod : null,
     clase : null,
     salary : null,
     active : true,
     hours :0
    };

  this.licenciaService.list(licencia).subscribe(
  (data)=>{
    console.log(data);
     this.dataSource = new MatTableDataSource<LicenciaData>(data);
     this.loadImage = false;
  },
  (error)=>{
    console.log(error);
  }
 
 );


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
      this.dataSource.data.forEach(row => this.selection.select(row.licencia));
      
}

/** The label for the checkbox on the passed row */
checkboxLabel(row?: LicenciaData): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row.licencia) ? 'deselect' : 'select'} row ${row.licencia.id + 1}`;
}


 find(){

  this.loadImage = true;
 // var employeeData:EmployeeData ;
  var licencia : Licencia;
  
 /* employeeData = {
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
         user : localStorage.getItem(messages.variableUserSession),
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
    user : localStorage.getItem(messages.variableUserSession),
    civilState : 0

   };
*/
   licencia = {
    id : 0,
    enterprise :1,
    document: this.searchForm.get('document').value,
    initDate :null,
    endDate :null,
    user  :null,
    type : null,
    remuneration:  false,
    employeeId :null,
    year : null,
    registerPeriod : null,
    clase : this.searchForm.get('clase').value,
    salary : null,
    active : true,
    hours :0
   };
 this.licenciaService.list(licencia).subscribe(
 (data)=>{
   console.log(data);
    this.dataSource = new MatTableDataSource<LicenciaData >(data);
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



hideLoader(){
  this.loadImage=false;
}



}
