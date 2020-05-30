export interface CountryType {
  code: string;
  description: string;
}

export const Colombia: CountryType = {
  code: '01',
  description: 'Colombia'
};

export interface DepartmentType {
    code: string;
    description: string;
}
  

export const Antioquia: DepartmentType = {
    code: '05',
    description: 'Antioquia'
};

  export const Cundimarca: DepartmentType = {
    code: '01',
    description: 'Cundinamarca'
  };


  export interface MunicipalityType {
    code: string;
    description: string;
  }
  
  export const Medellin: MunicipalityType = {
    code: '01',
    description: 'Medellin'
  };


  export const MUNICIPALYTY_TYPES: MunicipalityType[] = [Medellin ];
  export const COUNTRY_TYPES: CountryType[] = [Colombia ];
  export const DEPARTAMENT_TYPES: DepartmentType[] = [Antioquia,Cundimarca ];

