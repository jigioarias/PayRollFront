import { Component, OnInit } from '@angular/core';
import { SolicitudVacacionService } from 'src/app/general/shared/solicitud-vacacion.service';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { ClaseNomina, SolicitudVacacion, SolicitudVacacionData } from 'src/app/inventory/shared/master';
import { Router } from '@angular/router';
import { EstadoSolicitudVacacionType, ESTADOS_SOLICITUD_VACACION_TYPES, PENDIENTE } from 'src/app/general/shared/EstadosSolicitudVacacionType';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { ClaseNominaService } from 'src/app/general/shared/clase-nomina.service';


const ELEMENT_DATA: SolicitudVacacionData[] = [];



@Component({
  selector: 'app-list-request-vacations',
  templateUrl: './list-request-vacations.component.html',
  styleUrls: ['./list-request-vacations.component.scss']
})


export class ListRequestVacationsComponent implements OnInit {

  displayedColumns: string[] = ['document', 'firstName','lastName', 'initDate', 'endDate', 'moneyDays', 'edit'];
  searchForm: FormGroup;
  selection = new SelectionModel<SolicitudVacacionData>(true, []);
  clases: ClaseNomina[];
  //employeeData: EmployeeData; 
  loadImage: boolean;
  estadosSolicitudVacacion: EstadoSolicitudVacacionType[];

  //dataSource = ELEMENT_DATA;
  dataSource = ELEMENT_DATA;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private solicitudVacationService: SolicitudVacacionService,
    private claseNominaService: ClaseNominaService,
    private messagesService: MessagesService


  ) {

  }

  ngOnInit(): void {

    this.searchForm = this.formBuilder.group({
      document: [null, Validators.required],
      clase: [null, Validators.required],
      state: PENDIENTE.code,
    });

    let solicitud: SolicitudVacacion = {
      id: 0,
      enterprise: 1,
      document: null,
      enjoyInitDate: null,
      enjoyEndDate: null,
      moneyDays: null,
      state: PENDIENTE.code,
      remuneration: false,
      user: null

    }




    this.solicitudVacationService.list(solicitud).subscribe(
      (data) => {
        console.log(data);
        this.dataSource = data;
      },
      (error) => {

        console.log(error);
      }

    );

    this.claseNominaService.list().subscribe(
      (data) => {
        this.clases = data;
      }, (error) => {
        console.log(error);
      }

    );
    this.estadosSolicitudVacacion = ESTADOS_SOLICITUD_VACACION_TYPES;



  }
  update(id) {

    this.router.navigate([`/app/payroll/requestVacations/${id}`]);
  }

  find() {
  }

  save() {
  }
  
  clean() {
    this.searchForm.get('clase').setValue(this.clases);
    this.searchForm.get('state').setValue(null);

  }
}
