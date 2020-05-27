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
