import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { Messages } from 'src/app/general/shared/messages';
import { LABEL } from 'src/app/general/shared/label';
import { DOCUMENT_TYPES,DocumentType } from 'src/app/general/shared/document-type';
import { State, STATES } from 'src/app/general/shared/state';
import { Employee } from '../../shared/employee';
import { EmployeeService } from '../../shared/employee.service';
import { PayRollType, PAYROLLTYPES } from 'src/app/general/shared/payRollType';
import { SalaryType, SALARY_TYPES } from 'src/app/general/shared/salaryType';
import { Area, Sucursal, CentroCostos } from '../../shared/master';
import { AreaService } from 'src/app/general/shared/area.service';
import { SucursalService } from 'src/app/general/shared/sucursal.service';
import { CentroCostosService } from 'src/app/general/shared/centro-costos.service';
import { civilStateType, CIVILSTATES_TYPES } from 'src/app/general/shared/civilStateType';


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
  estados: State[];
  empleado :Employee;
  payRollTypes:PayRollType[];
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
    private messagesService:MessagesService

  ) {}

  ngOnInit() {
   

    this.areas =[];
    this.sucursales =[];
    this.centrosCostos = [];
    this.documentTypes = DOCUMENT_TYPES;
    this.estados = STATES;
    this.payRollTypes = PAYROLLTYPES;
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
      payRollType : [null, Validators.required],
      endDateContract:[null, Validators.required],
      initDateContract:[null, Validators.required]
     
    });

    this.areaService.list().subscribe(
      (data)=>{

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

    
  }

  
   loadEmployee(){


    let empleadoc :Employee={
      
      address :this.personForm.get('address').value,
      country:this.personForm.get('country').value,
      department:this.personForm.get('departament').value,
      document :this.personForm.get('document').value,
      email:this.personForm.get('email').value,
      enterprise:{
        branchOffice:this.employeeForm.get('branchOffice').value,
        costCenter:this.employeeForm.get('costCenter').value,
        nit:"80000000"
      },
      id:null,
      lastName:this.personForm.get('lastName').value,
      municipality:this.personForm.get('municipality').value,
      payRollType:{
        code:this.employeeForm.get('payRollType').value,
        name:this.employeeForm.get('payRollType').value
      },
      phone:this.personForm.get('phone').value,
      salary:this.employeeForm.get('salary').value,
      salaryType:this.employeeForm.get('salaryType').value,
      typeDocument:this.personForm.get('documentType').value ,
      firstName:this.personForm.get('firstName').value,
      active :true,
    };
    this.empleado = empleadoc;
   }
  

  add() {
    

    if (this.employeeForm.invalid || this.personForm.invalid){

      this.messagesService.showErrorMessage(Messages.get('insert_error', LABEL.employee,this.personForm.get('document').value));
      
    }

    this.loadEmployee();
    console.log('empleadoooZ>>>',this.empleado);
    
    this.employeeService.save(this.empleado).subscribe(
      (data)=> {
        console.log(data);
        this.messagesService.showSuccessMessage(Messages.get('insert_success', LABEL.employee,this.personForm.get('document').value));
  
      },
      (error)=>{
        console.log(error);
      }

    );   
    
    
  }
}
