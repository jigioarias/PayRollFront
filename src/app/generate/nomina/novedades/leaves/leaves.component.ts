import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APROBADO } from 'src/app/general/shared/EstadosLicenciaType';
import { LABEL } from 'src/app/general/shared/label';
import { LEAVES_TYPES, LeaveType } from 'src/app/general/shared/leavesType';
import { LicenciaService } from 'src/app/general/shared/licencia.service';
import { messages, Messages } from 'src/app/general/shared/messages';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { PeriodoclaseService } from 'src/app/general/shared/periodoclase.service';
import { Employee } from 'src/app/inventory/shared/employee';
import { EmployeeService } from 'src/app/inventory/shared/employee.service';
import { Filter, Licencia, PeriodoClase } from 'src/app/inventory/shared/master';


@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss']
})
export class LeavesComponent implements OnInit {

  registerForm: FormGroup;
  empleado: Employee;
  periods: PeriodoClase[];
  periodSelected: PeriodoClase;
  typeSelect: LeaveType;
  valorCalculado: number;
  leavesTypes: LeaveType[];




  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private periodoClaseService: PeriodoclaseService,
    private messagesService: MessagesService,
    private licenciaService: LicenciaService



  ) { }

  ngOnInit(): void {



    this.registerForm = this.formBuilder.group({
      document: [null, Validators.required],
      name: [null, Validators.required],
      classpayroll: [null, Validators.required],
      type: [null, Validators.required],
      hours: [null, Validators.required],
      period: [null, Validators.required],
      remuneration: [false, Validators.required],
      initDate: [null, Validators.required],
      endDate: [null, Validators.required],
      periodoInfo: null,


    });




  }

  //consultar empleado
  findEmployee() {
    let document = this.registerForm.get('document').value;

  let filter :Filter={
    enterprise: parseInt(localStorage.getItem(messages.variableUserEmpresa)),
    document:document,
      active:true
 };      
    this.employeeService.get(filter).subscribe(

      (data) => {

        if (data != null) {
          console.log(data);
          this.empleado = data;
          this.registerForm.get('name').setValue(this.empleado.person.firstName + ' ' + this.empleado.person.lastName);
          this.registerForm.get('classpayroll').setValue(this.empleado.classPayRoll.description);

          let filter: Filter = {
            classPayRoll: this.empleado.classPayRoll,
            enterprise: parseInt(localStorage.getItem(messages.variableUserEmpresa)),
            active: true
          }


          this.periodoClaseService.listByClassPayRoll(filter).subscribe((data) => {
            this.periods = data;
          }, (error) => {
            console.log(error);
          }
          );


        } else {

          this.messagesService.showErrorMessage(Messages.get('sin_solicitud_vacaciones'));

        }

      }, (error) => {
        console.log(error);

      }
    );

    this.leavesTypes = LEAVES_TYPES;


  }


  selectType(idType) {

    if (idType == 'M' || idType == 'T') {
      this.registerForm.get('remuneration').setValue(true);
      this.registerForm.get('hours').setValue(0);

    }

  }

  selectPeriod(IdPeriod) {

    this.periods.forEach(element => {
      if (IdPeriod == element.id) {
        this.periodSelected = element;
        this.registerForm.get('periodoInfo').setValue(this.periodSelected.year + this.periodSelected.month + this.periodSelected.period);

      }
    });

  }


  guardarLicencia() {


    if (this.registerForm.get('type').value == 'M' || this.registerForm.get('type').value == 'T') {
      this.registerForm.get('remuneration').setValue(true);
      this.registerForm.get('hours').setValue(0);

    }

    let fechaRegistro = new Date();
    let licencia: Licencia = {
      id: 0,
      clase: this.empleado.employee.classPayRoll,
      document: this.registerForm.get('document').value,
      employeeId: this.empleado.employee.id,
      endDate: this.registerForm.get('endDate').value,
      initDate: this.registerForm.get('initDate').value,
      enterprise: parseInt(localStorage.getItem(messages.variableUserEmpresa)),
      hours: this.registerForm.get('hours').value,
      registerPeriod: this.registerForm.get('periodoInfo').value,
      salary: this.empleado.employee.salary,
      remuneration: this.registerForm.get('remuneration').value,
      state: APROBADO.code,
      type: this.registerForm.get('type').value,
      user: localStorage.getItem(messages.variableUserSession),
      year: this.periodSelected.year.toString()
    };

    //console.log(licencia);
    this.licenciaService.create(licencia).subscribe(
      (data) => {
        console.log('data:::', data);
        if (data.error != null) {
          this.messagesService.showErrorMessage(Messages.get('insert_error', data.error, ''));
        } else {
          this.messagesService.showSuccessMessage(Messages.get('insert_success', LABEL.leaves, ''));
        }

      },
      (error) => {
        this.messagesService.showErrorMessage(Messages.get('insert_error', LABEL.leaves, error));

      }

    );

  }

  selectRemuneration() {

    if ((!this.registerForm.get('remuneration').value) && (this.registerForm.get('type').value == 'M'
      || this.registerForm.get('type').value == 'T')) {
      this.registerForm.get('type').setValue('P');

    }

  }

}
