import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { Messages } from 'src/app/general/shared/messages';
import { LABEL } from 'src/app/general/shared/label';
import { DOCUMENT_TYPES,DocumentType } from 'src/app/general/shared/document-type';
import { State, STATES } from 'src/app/general/shared/state';
import { EmployeeService } from '../../shared/employee.service';
import { PayRollType, PAYROLLTYPES } from 'src/app/general/shared/payRollType';
import { SalaryType, SALARY_TYPES } from 'src/app/general/shared/salaryType';
import { Area, Sucursal, CentroCostos, ClaseNomina } from '../../shared/master';
import { AreaService } from 'src/app/general/shared/area.service';
import { SucursalService } from 'src/app/general/shared/sucursal.service';
import { CentroCostosService } from 'src/app/general/shared/centro-costos.service';
import { civilStateType, CIVILSTATES_TYPES } from 'src/app/general/shared/civilStateType';
import { Employee, PersonData, EmployeeData } from '../../shared/employee';
import { CountryType, COUNTRY_TYPES, DepartmentType, DEPARTAMENT_TYPES, MunicipalityType, MUNICIPALYTY_TYPES } from 'src/app/general/shared/countryType';
import { ClaseNominaService } from 'src/app/general/shared/clase-nomina.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  personForm: FormGroup;
  documentTypes: DocumentType[];
  civilStates: civilStateType[];
  countries : CountryType[];
  departments : DepartmentType[];
  municipalities: MunicipalityType[];
  estados: State[];
  empleado :Employee;
  classPayRolls:ClaseNomina[];
  salaryTypes:SalaryType[];
  areas : Area[];
  sucursales : Sucursal[];
  centrosCostos : CentroCostos[];


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private employeeService : EmployeeService,
    private areaService : AreaService,
    private sucursalService:SucursalService,
    private centroCostosService :CentroCostosService,
    private claseNominaService :ClaseNominaService,
    private messagesService:MessagesService

  ) {}

  ngOnInit() {
   

    this.areas =[];
    this.sucursales =[];
    this.centrosCostos = [];
    this.documentTypes = DOCUMENT_TYPES;
    this.countries = COUNTRY_TYPES;
    this.departments = DEPARTAMENT_TYPES;
    this.municipalities = MUNICIPALYTY_TYPES;
    this.estados = STATES;
    this.classPayRolls = [];
    this.salaryTypes = SALARY_TYPES;
    this.civilStates = CIVILSTATES_TYPES;
    
    this.personForm = this.formBuilder.group({
      documentType: [null, Validators.required],
      document: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      address: [null, Validators.required],
      email: [null, Validators.email],
      phone: [null, Validators.required],
      country: [null, Validators.required],
      departament: [null, Validators.required],
      municipality: [null, Validators.required], 
      civilState: [null, Validators.required]



    });

    this.employeeForm = this.formBuilder.group({
      salary: [null, Validators.required],
      salaryType: [null, Validators.required],
      area :[null, Validators.required],
      branchOffice: [null, Validators.required],
      costCenter:  [null, Validators.required],
      active:  [null, Validators.required],
      classPayRoll : [null, Validators.required],
      endDateContract:[null, Validators.required],
      initDateContract:[null, Validators.required],
      department:[null, Validators.required],
      unity:[null, Validators.required]

    });

    this.areaService.list().subscribe(
      (data)=>{
        console.log('areas');
        this.areas = data;
      },
      (error)=>{

        console.log('ops>>>',error);
      }

    );

    
    this.sucursalService.list().subscribe(
      (data)=>{

        this.sucursales = data;
      },
      (error)=>{

        console.log('ops>>>',error);
      }

    );
    this.centroCostosService.list().subscribe(
      (data)=>{

        this.centrosCostos = data;
      },
      (error)=>{

        console.log('lista de centros de costo ops>>>',error);
      }

    );

    this.claseNominaService.list().subscribe(
      (data)=>{

        this.classPayRolls = data;
      },
      (error)=>{

        console.log('lista de clases de nomina de costo ops>>>',error);
      }

    );

    
  }

  
   loadEmployee(){
    
   
    let personac :PersonData={
      id: 0,
      firstName :this.personForm.get('firstName').value,
      lastName:this.personForm.get('lastName').value,
      phone:this.personForm.get('phone').value,
      email:this.personForm.get('email').value,
      document :this.personForm.get('document').value,
      typeDocument:this.personForm.get('documentType').value ,
      address : this.personForm.get('address').value,
      country:this.personForm.get('country').value,
      department:this.personForm.get('departament').value,
      municipality:this.personForm.get('municipality').value,
      user :'usuario',
      civilState :this.personForm.get('civilState').value

    };
  
    let empleadodatac :EmployeeData ={    
      id:0,
      enterprise :'1',
      salary :this.employeeForm.get('salary').value,
      salaryType:this.employeeForm.get('salaryType').value,
      initDateContract :this.employeeForm.get('initDateContract').value,
      endDateContract :this.employeeForm.get('endDateContract').value,
      costCenter: this.employeeForm.get('costCenter').value,
      classPayRoll:this.employeeForm.get('classPayRoll').value,
      department :this.employeeForm.get('department').value,
      branchOffice: this.employeeForm.get('branchOffice').value,
      active : this.employeeForm.get('active').value,
      unity: this.employeeForm.get('unity').value,
      area: this.employeeForm.get('area').value,
      user : "usuario"
    };

    let empleadoc : Employee={
      person: personac,
      employee:empleadodatac

    }
    this.empleado =empleadoc
   }
  

  add() {
    


   /* if (this.employeeForm.invalid || this.personForm.invalid){
      this.messagesService.showErrorMessage(Messages.get('insert_error', LABEL.employee,this.personForm.get('document').value));
      return;      p
    }
*/
    this.loadEmployee();
    
    this.employeeService.save(this.empleado).subscribe(
      (data)=> {
        console.log(data);
        if(data.employee!=null){
        this.messagesService.showSuccessMessage(Messages.get('insert_success', LABEL.employee,this.personForm.get('document').value));
        }else{
          this.messagesService.showErrorMessage(Messages.get('insert_error', LABEL.employee,this.personForm.get('document').value));

        }
      },
      (error)=>{
        console.log(error);
      }

    );   
    
    
  }
}
