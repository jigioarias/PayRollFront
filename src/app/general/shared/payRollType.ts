export interface PayRollType {
  code: string;
  description: string;
}

export const Comercial: PayRollType = {
  code: '1',
  description: 'Comercial'
};

export const Juliana: PayRollType = {
  code: '2',
  description: 'Juliana'
};

export const PAYROLLTYPES: PayRollType[] = [Comercial, Juliana];
