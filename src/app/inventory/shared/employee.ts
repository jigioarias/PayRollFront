export interface Employee {
   
    id:string;
    firstName :string;
    lastName :string;
    phone:string;
    email :string;
    document:string;
    typeDocument:string;
    salary:number;
    active:boolean;
    salaryType:string;
    address:string;
    country:string;
    department:string;
    municipality:string;
    enterprise :EnterpriseEmployee;
    payRollType:PayRollTypeEmployee;
  }
  
  export interface EnterpriseEmployee {
    nit:string;
    costCenter:string;
    branchOffice:string;  
  }
  export interface PayRollTypeEmployee {

    	code:string;
    	name:string;
  }
  
  export interface EmployeeResponse{

    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    document: string;
    typeDocument: string;
    salary: string;
    nit: string;
    payRollType: string;
    salaryType: string;
    active: boolean;
    address: string;
    country: string;
    department: string;
    municipality: string;

  }


  