import { Component, OnInit, ViewChild, ɵDEFAULT_LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenerateNominaService } from '../shared/generate-nomina.service';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { Filter, ClaseNomina, PeriodoClase, Nomina, EmployeePayRoll, DetalleNomina } from 'src/app/inventory/shared/master';
import { PeriodoclaseService } from 'src/app/general/shared/periodoclase.service';
import { ClaseNominaService } from 'src/app/general/shared/clase-nomina.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { messages, Messages } from 'src/app/general/shared/messages';
import { LABEL } from 'src/app/general/shared/label';
import {animate, state, style, transition, trigger} from '@angular/animations';

const ELEMENT_DATA: EmployeePayRoll[] = [];


@Component({
  selector: 'app-generate-nomina',
  templateUrl: './generate-nomina.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./generate-nomina.component.scss']
})
export class GenerateNominaComponent implements OnInit {

 

  displayedColumns: string[] = ['Documento','Nombre','Valor','Periodo','SalarioMensual','dias','Fecha Inicio','Fecha Fin','viewDetail' ];
  columnsToDisplay: string[] =['Documento','Nombre','Valor','Periodo','SalarioMensual','dias','Fecha Inicio','Fecha Fin','viewDetail'];
  //dataSource = new MatTableDataSource<EmployeePayRoll>(ELEMENT_DATA);
  dataSource = ELEMENT_DATA
  expandedElement: EmployeePayRoll | null;

  nominaForm: FormGroup;
  clases :ClaseNomina[];
  periods:PeriodoClase[];
  claeSelected :ClaseNomina;
  periodSelected : PeriodoClase;
  listaNomina : EmployeePayRoll[];
 
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
      period: [null, Validators.required],
      year: [null, Validators.required],
      month:[null, Validators.required],
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
      enterprise: parseInt(localStorage.getItem(messages.variableUserEmpresa)),
      active:true
    }
    

     this.periodoClaseService.listByClassPayRoll(filter).subscribe((data)=>{
      this.periods = data;
    },(error)=>{
      console.log(error);
    }
    );

  }


  selectData(period){

     console.log('periodo',period);
    this.periods.forEach(element => {
          if(period==element.id){
            this.nominaForm.get('year').setValue(element.year);
            this.nominaForm.get('month').setValue(element.month);

          }       
      }); 
  
    
  
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
       console.log(data); 
        this.listaNomina = data;
        this.dataSource = this.listaNomina;
        //this.dataSource = new MatTableDataSource<EmployeePayRoll>(this.listaNomina);
       // this.dataSource.connect().next(this.listaNomina);
        //this.dataSource.sort = this.sort;

        
      },
      (error)=>{
        this.listaNomina = null;
        console.log(error);

      }
    );

  }


  getDetail(listaDetalle:DetalleNomina[])
  {
    let tablaDeducciones = '<table><tr><td colspan="2"><b>Lista Deducciones</b></td></tr>';
    let tablaDevengo = '<table><tr><td colspan="2"><b>Lista Devengo</b></td></tr>';

    listaDetalle.forEach(detail => {
      
       if(detail.conceptType=='R'){
        tablaDeducciones = tablaDeducciones + '<tr><td>' + detail.conceptName + '</td><td>'+detail.valor+'</td></tr>'
      }else{
        tablaDevengo = tablaDevengo + '<tr><td>' + detail.conceptName + '</td><td>'+detail.valor+'</td></tr>'
      }

    });

    tablaDeducciones = tablaDeducciones+ '</table>';
    tablaDevengo  = tablaDevengo + '</table><br>';-
    this.messagesService.showInfoHtml('',tablaDevengo + tablaDeducciones);


  }

}
