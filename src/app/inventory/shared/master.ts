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
    accountingcode :string;
    conceptType:string;
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

  export interface Filter{
    enterprise?:number;
    active?:boolean;
    conceptType?:string;
    name?:string;
    period?:PeriodoClase;
    classPayRoll?:ClaseNomina;
    clase?:number;

  }