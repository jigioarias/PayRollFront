export interface ClassPayRollType {
  code: string;
  description: string;

}

export const General:  ClassPayRollType= {
  code: 'G',
  description: 'General'
};

export const Administrativa: ClassPayRollType = {
  code: 'A',
  description: 'Administrativa'
};
export const Temporal: ClassPayRollType = {
    code: 'T',
    description: 'Temporal'
  };

  export const Operativa: ClassPayRollType = {
    code: 'O',
    description: 'Operativa'
  };

export const CLASSPAYROLL_TYPES: ClassPayRollType[] = [General , Administrativa,Operativa,Temporal];