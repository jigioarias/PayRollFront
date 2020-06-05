export interface ClassPayRollType {
  code: string;
  description: string;

}

export const General:  ClassPayRollType= {
  code: 'GE',
  description: 'General'
};

export const Administrativa: ClassPayRollType = {
  code: 'AD',
  description: 'Administrativa'
};
export const Temporal: ClassPayRollType = {
    code: 'TP',
    description: 'Temporal'
  };

  export const Operativa: ClassPayRollType = {
    code: 'OP',
    description: 'Operativa'
  };

export const CLASSPAYROLL_TYPES: ClassPayRollType[] = [General , Administrativa,Operativa,Temporal];