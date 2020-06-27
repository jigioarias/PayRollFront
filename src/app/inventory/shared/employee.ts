import { ClaseNominaComponent } from '../clase-nomina/clase-nomina.component';
import { ClaseNomina, PeriodoClase, SemanaLaboral, CalendarioLaboral } from './master';

export interface Employee{
  person: PersonData;
  employee :EmployeeData;
  classPayRoll?:ClaseNomina;
  period ?:PeriodoClase;
  workweek?:SemanaLaboral;
  calendarwork?:CalendarioLaboral;
  vacationdays?:number;
  
  
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


  