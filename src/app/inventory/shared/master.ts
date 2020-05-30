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
   
    id:string;
    enterprise:string;
    clase: string;
    description:string; 
    vacationDays:number;
    vacationPrima:string;
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


