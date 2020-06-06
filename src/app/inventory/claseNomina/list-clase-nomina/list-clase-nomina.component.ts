import { Component, OnInit } from '@angular/core';
import { ClaseNominaComponent } from '../../clase-nomina/clase-nomina.component';
import { ClaseNomina } from '../../shared/master';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { ClaseNominaService } from 'src/app/general/shared/clase-nomina.service';


const ELEMENT_DATA: ClaseNomina[] = [];


@Component({
  selector: 'app-list-clase-nomina',
  templateUrl: './list-clase-nomina.component.html',
  styleUrls: ['./list-clase-nomina.component.scss']
})
export class ListClaseNominaComponent implements OnInit {

  displayedColumns: string[] = ['description','dayshours','monthhours','edit'];

  //dataSource = ELEMENT_DATA;
  dataSource = ELEMENT_DATA;



  constructor(private router:Router, private messagesService:MessagesService,private claseNominaService:ClaseNominaService) { }

  ngOnInit(): void {
  
    this.claseNominaService.list().subscribe(
      (data)=>{
        console.log(data);
         this.dataSource = data;
      },
      (error)=>{
        console.log(error);
      }

    );
  }


edit(id){

  alert(id);

}

}
