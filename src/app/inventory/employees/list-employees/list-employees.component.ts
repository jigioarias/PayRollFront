import { Component, OnInit } from '@angular/core';
import { Employee } from '../../shared/employee';
import { Messages } from 'src/app/general/shared/messages';

import { MessagesService } from 'src/app/general/shared/messages.service';
import { LABEL } from 'src/app/general/shared/label';
import { Router } from '@angular/router';
import { EmployeeService } from '../../shared/employee.service';
import { EmployeeComponent } from '../employee/employee.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';


const ELEMENT_DATA: Employee[] = [];

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})
export class ListEmployeesComponent implements OnInit {

  displayedColumns: string[] = ['select','document','firstName','lastName','classPayRoll','initDate', 'endDate', 'active'];
  //dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<Employee>(ELEMENT_DATA);

  selection = new SelectionModel<Employee>(true, []);


  constructor(private router:Router, private messagesService:MessagesService,private employeeeService:EmployeeService) { }

  ngOnInit(): void {
  
    this.employeeeService.list().subscribe(
      (data)=>{
        console.log(data);
         this.dataSource = new MatTableDataSource<Employee>(data);
      },
      (error)=>{
        console.log(error);
      }

    );
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
    this.router.navigate([`/app/users/edit/${id}`]);
  }

  remove(id: string) {
    const confirmMessage = Messages.get('confirm_delete', LABEL.user);
   
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
 


}
