import { ClaseNominaComponent } from '../clase-nomina/clase-nomina.component';
import { EmployeeComponent } from '../employees/employee/employee.component';
import { ClaseNomina, PeriodoClase, SemanaLaboral, CalendarioLaboral, SolicitudVacacion } from './master';



export interface EmployeeDTO{

  employee :Employee;
  error?:string;
} 

export interface Employee{
  person: PersonData;
  employee :EmployeeData;
  classPayRoll?:ClaseNomina;
  period ?:PeriodoClase;
  workweek?:SemanaLaboral;
  calendarwork?:CalendarioLaboral;
  vacationdays?:number;
  vacationRequest?:SolicitudVacacion;
  requestDays?:number;
  
}


export interface EmployeeData{
    id:number;
    enterprise :string;
    salary :number;
    salaryType:string;
    initDateContract :string;
    endDateContract :string;
    costCenter: string;
    classPayRoll:string;
    departament :string;
    branchOffice: string;
    active : boolean;
    unity: string;
    area: string;
    user : string;
    transporteSubsidy:boolean;
}
  


export interface PersonData{
  id: number;
  firstName : string;
  lastName : string;
  phone : string;
  email : string;
  document : string;
  typeDocument: string;
  address : string;
  country : string;
  department : string;
  municipality:string;
  user :string;
  civilState : number;
}


  