import { Component, OnInit } from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClaseNominaService } from 'src/app/general/shared/clase-nomina.service';
import { ClaseNomina, Concepto, Filter, HoraExtra, HoraExtraData } from 'src/app/inventory/shared/master';
import { HoraExtraType, HORAS_EXTRAS_TYPES } from 'src/app/general/shared/horasExtrasType';
import { HorasExtrasService } from 'src/app/general/shared/horas-extras.service';
import { ConceptoService } from 'src/app/general/shared/concepto.service';
import { messages } from 'src/app/general/shared/messages';


const ELEMENT_DATA: HoraExtraData[] = [];

@Component({
  selector: 'app-list-extrahours',
  templateUrl: './list-extrahours.component.html',
  styleUrls: ['./list-extrahours.component.scss']
})
export class ListExtrahoursComponent implements OnInit {

  displayedColumns: string[] = [ 'document', 'firstName', 'lastName', 'concept','period','noveltyDate','hours','valor'];
  dataSource = new MatTableDataSource<HoraExtraData>(ELEMENT_DATA); 
  selection = new SelectionModel<HoraExtraData>(true, []);
  searchForm: FormGroup;
  clases: ClaseNomina[];
  loadImage: boolean;
  //horaExtraTypes: HoraExtraType[];
  horaExtraTypes:Concepto[];




  constructor(
    private formBuilder: FormBuilder,
    private claseNominaService: ClaseNominaService,
    private conceptoService :ConceptoService,
    private HoraExtraService: HorasExtrasService) { }


  ngOnInit(): void {

    this.loadImage = true;
   // this.horaExtraTypes = HORAS_EXTRAS_TYPES;
    

    var  horaExtra: HoraExtra = {
      id: 0,
      enterprise: parseInt(localStorage.getItem(messages.variableUserEmpresa)),
      document: null,
      noveltyDate: null,
      hours: null,
      user: null,
      type: null,
      employeeId: 0,
      period: null,
      clase: 0,
      InitDayPay:null,
      concept : null,
      endDayPay:null,
      valor:0
      };
    this.HoraExtraService.list(horaExtra).subscribe(
      (data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<HoraExtraData>(data);
        this.loadImage = false;
      },
      (error) => {
        console.log(error);
      }




    );


    this.searchForm = this.formBuilder.group({
      document: [null, Validators.required],
      clase: [null, Validators.required],
      concept:[null, Validators.required],
      
    });
    this.claseNominaService.list().subscribe(
      (data) => {
        this.clases = data;
      }, (error) => {
        console.log(error);
      }

    );


    let  filter: Filter = {
      enterprise: parseInt(localStorage.getItem(messages.variableUserEmpresa)),
      listConcepts :[8,9,10]
    }

    this.conceptoService.listConceptosXIds(filter).subscribe(
      (data) => {
        this.horaExtraTypes = data;
      }, (error) => {
        console.log(error);
      }

    );


    }


  find() {

    this.loadImage = true;
    var HoraExtra: HoraExtra;

    var  horaExtra: HoraExtra = {
      id: 0,
      enterprise: parseInt(localStorage.getItem(messages.variableUserEmpresa)),
      document: (this.searchForm.get('document').value == "") ? null : this.searchForm.get('document').value,
      noveltyDate: null,
      hours: null,
      user: null,
      type: null,
      employeeId: 0,
      period: null,
      clase: (this.searchForm.get('clase').value==null)?0:this.searchForm.get('clase').value,
      InitDayPay:null,
      concept : (this.searchForm.get('concept').value==null)?0:this.searchForm.get('concept').value,
      endDayPay:null,
      valor:0
      };

  


    this.HoraExtraService.list(horaExtra).subscribe(
      (data) => {
       // console.log(data);
        this.dataSource = new MatTableDataSource<HoraExtraData>(data);
        this.loadImage = false;
      },
      (error) => {
        console.log(error);
      }

    );

  }

  select(clase) {
    this.searchForm.get('documentx').setValue('');
  }
  clean() {
    this.searchForm.get('clase').setValue(this.clases);
    this.searchForm.get('concept').setValue(null);

  }



  hideLoader() {
    this.loadImage = false;
  }


  
}
