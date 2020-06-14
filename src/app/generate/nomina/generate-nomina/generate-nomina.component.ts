import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenerateNominaService } from '../shared/generate-nomina.service';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { Filter, ClaseNomina, PeriodoClase, Nomina } from 'src/app/inventory/shared/master';
import { PeriodoclaseService } from 'src/app/general/shared/periodoclase.service';
import { ClaseNominaService } from 'src/app/general/shared/clase-nomina.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


const ELEMENT_DATA: Nomina[] = [];


@Component({
  selector: 'app-generate-nomina',
  templateUrl: './generate-nomina.component.html',
  styleUrls: ['./generate-nomina.component.scss']
})
export class GenerateNominaComponent implements OnInit {

 

  displayedColumns: string[] = [
    'name',
    'document','concept','value'  ];

 

  dataSource = new MatTableDataSource<Nomina>(ELEMENT_DATA);

  nominaForm: FormGroup;
  clases :ClaseNomina[];
  periods:PeriodoClase[];
  claeSelected :ClaseNomina;
  periodSelected : PeriodoClase;
  listaNomina : Nomina[];
 
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private generateNoinaService : GenerateNominaService,
    private periodoClaseService :PeriodoclaseService,
    private claseNominaService : ClaseNominaService,
    private messagesService:MessagesService
  ) { }


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit(): void {
 

    this.listaNomina = [];
    this.nominaForm = this.formBuilder.group({
      clase: [null, Validators.required],
      period: [null, Validators.required]
    })
    
    this.claseNominaService.list().subscribe(
        (data)=>{
            this.clases = data;
        },(error)=>{
            console.log(error);
        }

    );
 
  }

  select(clase){


  this.clases.forEach(element => {
        if(clase==element.id){
          this.claeSelected = element;
        }       
    }); 

    
    let filter:Filter ={
      classPayRoll: this.claeSelected,
      enterprise:1,
      active:true
    }
    

     this.periodoClaseService.listByClassPayRoll(filter).subscribe((data)=>{
      this.periods = data;
    },(error)=>{
      console.log(error);
    }
    );

  }

  generate(){

   this.periods.forEach(element => {
        if(this.nominaForm.get('period').value==element.id){
          this.periodSelected = element;
        }
    });

    

    let filter :Filter={
      enterprise : 1,
      classPayRoll: this.claeSelected,
      period: this.periodSelected,
      active:true
    }
    
    this.generateNoinaService.generate(filter).subscribe(
      (data)=>{
        
        this.listaNomina = data;
        this.dataSource = new MatTableDataSource<Nomina>(this.listaNomina);
      },
      (error)=>{
        this.listaNomina = null;
        console.log(error);

      }
    );

  }


  

}
