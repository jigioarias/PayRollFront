import { Employee, PersonData } from './employee';
import { EmployeeComponent } from '../employees/employee/employee.component';

export interface Area {
   
    id:string;
    code:string;
    description:string;
    user?:string;
    active:boolean;
    unity?:number;
    enterprise :number;
  }
 
  export interface Sucursal {
   
    id:string;
    code:string;
    description:string;
    user?:string;
    active:boolean;
    address?:string;
    phone?:string;
    enterprise :number;
  }

  export interface CentroCostos {
   
    id:string;
    code:string;
    description:string;
    user?:string;
    active:boolean;
    branchOffice?:string;
    enterprise :number;
  }
  
  export interface Pais {
   
    id:string;
    code:string;
    description:string;
  }


  export interface Departamento {
   
    id:string;
    code:string;
    description:string;
  }

  export interface Municipio {
   
    id:string;
    code:string;
    description:string;
  }


  export interface ClaseNomina {
   
    id:number;
    enterprise:number;
    clase: number;
    description:string; 
    vacationdays:number;
    vacationprima:string;
    primatype:string;
    provisionservicedays :number;
    provisionservicetype:string;
    payrolltype:string
    monthhours:number;
    dayshours:number;
    bank:string;
    bankbranch:string;
    account:string;
    user:string;
    workweek:number;
    periodType :string;
    active:boolean;
  }

  export interface ClaseNominaDTO {
   
    clase:ClaseNomina;
    error:string;
   
  }

  export interface PeriodoClaseDTO {
     periodo:PeriodoClase;
     error?:string;
  }
  export interface PeriodoClase {
   
    id:number;
    enterprise:number;
    clase: number;
    descriptionClase?:string;
    period:string; 
    year:number;
    active:boolean;
    user:string;
    month:string;
    initDate:string;
    endDate:string;
  }

  

  export interface Concepto {
   
    id:number;
    enterprise:number;
    code:string;
    description :string;
    fittype : string;
    percentaje : number;
    accountingcode :string;
    conceptType:string;
    maxRegisterHour:number;
    user:string;

  }

  export interface ConceptoNomina {
   
    id:number;
    enterprise:number;
    clase: number;
    descriptionClase?:string;
    concept : number;
    descriptionConcept?:string;
    active : boolean;
    user:string;
  }

  export interface ConceptoNominaDTO {
    conceptoNomina:ConceptoNomina;
     error:string;
      
  }


  export interface Filter{
    enterprise?:number;
    active?:boolean;
    conceptType?:string;
    name?:string;
    period?:PeriodoClase;
    classPayRoll?:ClaseNomina;
    clase?:number;
    fechaInicioLaboral?:FechaCalendarioLaboral,
    fechaFinLaboral?:FechaCalendarioLaboral

  }


  export interface DetalleNomina{
    id:Number;
    enterprise?:number;
    payrollId:number;
    employeeId :number;
    period : string;
    concept :number;
    conceptName : string;
    valor : number;
    percentaje :number;
    conceptType : string;
    type : string;
    user ?: string;

  }


   
  

  export interface Nomina{
    id:Number;
    enterprise?:number;
    clase:number;
    employeeId :number;
    document :string;
    name :string;
    address:string;
    email : string;
    phone : string;
    perisod : string;
    valor : number;
    monthSalary :number;
    salary : string;
    type : string;
    InitDayPay :string;
    endDayPay :string;
    days:number;
    user ?: string;
   
  }


   export interface EmployeePayRoll{
    payRoll:Nomina;
    payRollDetail:DetalleNomina[];
   }
 

   
   export interface SemanaLaboral{
    id:number;
    enterprise?:number;
    description :string;
    workcalendar:number;
    user ?: string;
   }

   export interface CalendarioLaboral{
    id:number;
    enterprise?:number;
    description :string;
    user ?: string;
    dates:FechaCalendarioLaboral; 
   }

   export interface FechaCalendarioLaboral{
    id:number;
    enterprise?:number;
    date :string;
    year:number;
    user ?: string;
    calendar:number
   }

   export interface SolicitudVacacion{
    id:number;
    enterprise?:number;
    document :string;
    enjoyInitDate:string;
    enjoyEndDate:string,
    moneyDays:number;
    state:string;
    remuneration:boolean;
    user ?: string;
    
   }

   export interface Licencia{
    id : number;
    enterprise :number;
    document: string;
    initDate :string;
    endDate :string;
    user  :string;
    type : string;
    remuneration:  boolean;
    employeeId :number;
    year : string; 
    registerPeriod : string;
    clase :number;
    salary : number;
    active : boolean;
    hours : number;

   }

   export interface LicenciaData{
     person:PersonData;
     licencia:Licencia;

   }

   export interface SolicitudVacacionData{
    solicitud:SolicitudVacacion;
    person:PersonData;
    
   }


   export interface Vacacion{
    id:number;
    enterprise?:number;
    document :string;
    enjoyInitDate:string;
    enjoyEndDate:string,
    moneyDays:number;
    vacationRequest:SolicitudVacacion,
    enjoyDays:number;
    remuneration:boolean;
    user ?: string;
    classPayRoll:ClaseNomina;
    employee:number;
    period:PeriodoClase;
    dayHours:number;
    salary:number;
   }

  
   
   export interface NovedadNomina{
    id:number;
    enterprise?:number;
    document :string;
    idClassPayRoll:number;
    employee:number;
    concept:number;
    period :string;
    valor:number;
    hours: number;
    initDate:string;
    endDate:string;
    user ?: string;
    noveltyDate?:string;
   
   }

   

   