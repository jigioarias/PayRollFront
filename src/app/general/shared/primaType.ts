export interface PrimaType {
  code: string;
  description: string;
}

export const Normal: PrimaType = {
  code: 'N',
  description: 'Normal'
};

export const Extralegal: PrimaType = {
  code: 'E',
  description: 'Extralegal'
};


export const PRIMA_TYPES: PrimaType[] = [Normal , Extralegal];
