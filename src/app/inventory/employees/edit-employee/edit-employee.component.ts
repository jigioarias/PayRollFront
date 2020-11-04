import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaService } from 'src/app/general/shared/area.service';
import { CentroCostosService } from 'src/app/general/shared/centro-costos.service';
import { CIVILSTATES_TYPES, civilStateType } from 'src/app/general/shared/civilStateType';
import { DOCUMENT_TYPES,DocumentType } from 'src/app/general/shared/document-type';
import { ClaseNominaService } from 'src/app/general/shared/clase-nomina.service';
import { CountryType, COUNTRY_TYPES, DEPARTAMENT_TYPES, DepartmentType, MunicipalityType, MUNICIPALYTY_TYPES } from 'src/app/general/shared/countryType';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { SalaryType, SALARY_TYPES } from 'src/app/general/shared/salaryType';
import { State, STATES } from 'src/app/general/shared/state';
import { SucursalService } from 'src/app/general/shared/sucursal.service';
import { YESNO, Yesno } from 'src/app/general/shared/yesno';
import { Employee, EmployeeData, PersonData } from '../../shared/employee';
import { EmployeeService } from '../../shared/employee.service';
import { Area, CentroCostos, ClaseNomina, Sucursal } from '../../shared/master';
import { messages, Messages } from 'src/app/general/shared/messages';
import { LABEL } from 'src/app/general/shared/label';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  idEmployee: string;
  employeeForm: FormGroup;
  personForm: FormGroup;
  imageForm: FormGroup;
  documentTypes: DocumentType[];
  civilStates: civilStateType[];
  countries : CountryType[];
  departments : DepartmentType[];
  municipalities: MunicipalityType[];
  estados: State[];
  sinos :Yesno[];
  empleado :Employee;
  classPayRolls:ClaseNomina[];
  salaryTypes:SalaryType[];
  areas : Area[];
  sucursales : Sucursal[];
  centrosCostos : CentroCostos[];
  personaConsultada :PersonData;
  empleadoConsultado :EmployeeData;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private employeeService : EmployeeService,
    private areaService : AreaService,
    private sucursalService:SucursalService,
    private centroCostosService :CentroCostosService,
    private claseNominaService :ClaseNominaService,
    private messagesService:MessagesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idEmployee = params['id'];
    });

//    console.log('id Empleado EDIT_:::::',this.idEmployee);

    this.areas =[];
    this.sucursales =[];
    this.centrosCostos = [];  
    this.documentTypes = DOCUMENT_TYPES;
    this.countries = COUNTRY_TYPES;
    this.departments = DEPARTAMENT_TYPES;
    this.municipalities = MUNICIPALYTY_TYPES;
    this.estados = STATES;
    this.sinos = YESNO;
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
      unity:[null, Validators.required],
      transporteSubsidy:[null, Validators.required]

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

    this.employeeService.get(this.idEmployee).subscribe((data)=>{

      this.personForm.get('document').setValue(data.person.document);
      this.personaConsultada = data.person;
      this.empleadoConsultado = data.employee;
      //revisar
      this.personForm.get('documentType').setValue(data.person.typeDocument);
      this.personForm.get('civilState').setValue(data.person.civilState);
      //*/////
      
      this.personForm.get('country').setValue(data.person.country);
      this.personForm.get('departament').setValue(data.person.department);
      this.personForm.get('municipality').setValue(data.person.municipality);

      this.personForm.get('firstName').setValue(data.person.firstName);
      this.personForm.get('lastName').setValue(data.person.lastName);
      this.personForm.get('email').setValue(data.person.email);
      this.personForm.get('address').setValue(data.person.address);
      this.personForm.get('phone').setValue(data.person.phone);
      this.employeeForm.get('salary').setValue(data.employee.salary);
      //revisar
      this.employeeForm.get('salaryType').setValue(data.employee.salaryType);
      
      this.employeeForm.get('initDateContract').setValue(data.employee.initDateContract);
      this.employeeForm.get('endDateContract').setValue(data.employee.endDateContract);
      this.employeeForm.get('classPayRoll').setValue(data.employee.classPayRoll);
      this.employeeForm.get('costCenter').setValue(data.employee.costCenter);
      this.employeeForm.get('department').setValue(data.employee.departament);
      this.employeeForm.get('branchOffice').setValue(data.employee.branchOffice);
      this.employeeForm.get('unity').setValue(data.employee.unity);
      this.employeeForm.get('area').setValue(data.employee.area);
      this.employeeForm.get('transporteSubsidy').setValue(data.employee.transporteSubsidy);
      this.employeeForm.get('active').setValue(data.employee.active);

      

     // console.log(data.employee.classPayRoll);
     
      console.log('empleado',data);
    },(error)=>{
      console.log('error',error);
    });
      


  }

  loadEmployee(){
    
   
    let personac :PersonData={
      id: this.personaConsultada.id,
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
      user :localStorage.getItem(messages.variableUserSession),
      civilState :this.personForm.get('civilState').value

    };
  
    let empleadodatac :EmployeeData ={    
      id:this.empleadoConsultado.id,
      enterprise :'1',
      salary :this.employeeForm.get('salary').value,
      salaryType:this.employeeForm.get('salaryType').value,
      initDateContract :this.employeeForm.get('initDateContract').value,
      endDateContract :this.employeeForm.get('endDateContract').value,
      costCenter: this.employeeForm.get('costCenter').value,
      classPayRoll:this.employeeForm.get('classPayRoll').value,
      departament :this.employeeForm.get('department').value,
      branchOffice: this.employeeForm.get('branchOffice').value,
      active : this.employeeForm.get('active').value,
      unity: this.employeeForm.get('unity').value,
      area: this.employeeForm.get('area').value,
      user : localStorage.getItem(messages.variableUserSession),
      transporteSubsidy:this.employeeForm.get('transporteSubsidy').value
    };

    let empleadoc : Employee={
      person: personac,
      employee:empleadodatac

    }
    this.empleado =empleadoc
   
  }


//
  edit(){


   /* if (this.employeeForm.invalid || this.personForm.invalid){
      this.messagesService.showErrorMessage(Messages.get('insert_error', LABEL.employee,this.personForm.get('document').value));
      return;      p
    }
*/

    this.loadEmployee();
    
    this.employeeService.update(this.empleado).subscribe(
      (data)=> {
       
        
        if(data.employee!=null){
        this.messagesService.showSuccessMessage(Messages.get('edit_success', LABEL.employee,this.personForm.get('document').value));
        }else{
          this.messagesService.showErrorMessage(Messages.get('edit_error', LABEL.employee,data.error));

        }
      },
      (error)=>{
        console.log(error);
      }

    );   

  }

}
