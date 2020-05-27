export interface civilStateType {
  code: string;
  description: string;
}

export const Soltero: civilStateType = {
  code: '1',
  description: 'Soltero'
};

export const Casado: civilStateType = {
  code: '2',
  description: 'Casado'
};

export const Separado: civilStateType = {
  code: '3',
  description: 'Separado'
};


export const Viudo: civilStateType = {
    code: '4',
    description: 'Viudo'
  };
export const CIVILSTATES_TYPES: civilStateType[] = [Soltero , Casado, Separado,Viudo];
