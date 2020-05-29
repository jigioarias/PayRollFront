import { Component, OnInit } from '@angular/core';
import { Employee } from '../../shared/employee';
import { Messages } from 'src/app/general/shared/messages';

import { MessagesService } from 'src/app/general/shared/messages.service';
import { LABEL } from 'src/app/general/shared/label';
import { Router } from '@angular/router';
import { EmployeeService } from '../../shared/employee.service';


const ELEMENT_DATA: Employee[] = [];

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})
export class ListEmployeesComponent implements OnInit {

  displayedColumns: string[] = ['firstName',  'edit', 'remove'];
  dataSource = ELEMENT_DATA;
  

  constructor(private router:Router, private messagesService:MessagesService,private employeeeService:EmployeeService) { }

  ngOnInit(): void {
  
   /* this.employeeeService.list().subscribe(
      (data)=>{
        console.log(data);
         this.dataSource =data;
      },
      (error)=>{
        console.log(error);
      }

    );*/
  }



  edit(id: string) {
    this.router.navigate([`/app/users/edit/${id}`]);
  }

  remove(id: string) {
    const confirmMessage = Messages.get('confirm_delete', LABEL.user);
   
  }
}
