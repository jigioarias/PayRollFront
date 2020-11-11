import { Component, OnInit } from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClaseNominaService } from 'src/app/general/shared/clase-nomina.service';
import { State, STATES } from 'src/app/general/shared/state';
import { ClaseNomina, Incapacidad, IncapacidadData } from 'src/app/inventory/shared/master';
import { IncapacidadService } from 'src/app/general/shared/incapacidad.service';
import { EstadoIncapacidadType, ESTADOS_INCAPACIDAD_TYPES } from 'src/app/general/shared/EstadosIncapacidadType';


const ELEMENT_DATA: IncapacidadData[] = [];


@Component({
  selector: 'app-list-inabilities',
  templateUrl: './list-inabilities.component.html',
  styleUrls: ['./list-inabilities.component.scss']
})
export class ListInabilitiesComponent implements OnInit {

  displayedColumns: string[] = ['select', 'document', 'firstName', 'lastName', 'period', 'initDate', 'endDate', 'state'];
  dataSource = new MatTableDataSource<IncapacidadData>(ELEMENT_DATA);
  selection = new SelectionModel<IncapacidadData>(true, []);
  searchForm: FormGroup;
  clases: ClaseNomina[];
  estados: State[];
  loadImage: boolean;
  estadosIncapacidad: EstadoIncapacidadType[];





  constructor(
    private formBuilder: FormBuilder,
    private claseNominaService: ClaseNominaService,
    private IncapacidadService: IncapacidadService) { }


  ngOnInit(): void {

    this.loadImage = true;
    this.estadosIncapacidad = ESTADOS_INCAPACIDAD_TYPES;

    var Incapacidad: Incapacidad;

    Incapacidad: Incapacidad = {
      id: 0,
      enterprise: 1,
      document: null,
      initDate: null,
      endDate: null,
      user: null,
      type: null,
      employeeId: 0,
      year: null,
      registerPeriod: null,
      clase: 0,
      salary: 0,
      state: 'S',
      percentage: 0
    };
    this.IncapacidadService.list(Incapacidad).subscribe(
      (data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<IncapacidadData>(data);
        this.loadImage = false;
      },
      (error) => {
        console.log(error);
      }

    );


    this.searchForm = this.formBuilder.group({
      document: [null, Validators.required],
      clase: [null, Validators.required],
      state: 'S',
    });
    this.claseNominaService.list().subscribe(
      (data) => {
        this.clases = data;
      }, (error) => {
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
  checkboxLabel(row?: IncapacidadData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.incapacidad.id + 1}`;
  }


  find() {

    this.loadImage = true;
    // var employeeData:EmployeeData ;
    var Incapacidad: Incapacidad;

    Incapacidad: Incapacidad = {
      id: 0,
      enterprise: 1,
      document: (this.searchForm.get('document').value == "") ? null : this.searchForm.get('document').value,
      initDate: null,
      endDate: null,
      user: null,
      type: null,
      employeeId: 0,
      year: null,
      registerPeriod: null,
      clase: this.searchForm.get('clase').value,
      salary: 0,
      state: this.searchForm.get('state').value,
      percentage: 0
    };


    console.log('find  Incapacidad>>', Incapacidad);

    this.IncapacidadService.list(Incapacidad).subscribe(
      (data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<IncapacidadData>(data);
        this.loadImage = false;
      },
      (error) => {
        console.log(error);
      }

    );

  }

  select(clase) {
    this.searchForm.get('document').setValue('');
  }
  clean() {
    this.searchForm.get('clase').setValue(this.clases);
    this.searchForm.get('state').setValue(null);

  }



  hideLoader() {
    this.loadImage = false;
  }


  changeState(estado) {

    if (this.selection.selected.length > 0) {

      try {

        this.selection.selected.forEach(element => {
          element.incapacidad.state = estado;
        });
        
        this.IncapacidadService.updateMasive(this.selection.selected).subscribe((data) => {
          this.find();


        },
          (error) => {
            console.log(error);
          }
        );


      } catch (error) {
        console.log(error);
      }
    }
  }

}
