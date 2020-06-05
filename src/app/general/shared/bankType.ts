export interface BankType {
  code: string;
  description: string;
  accountingAccount:String;
}

export const Bancolombia:  BankType= {
  code: '1',
  description: 'Bancolombia',
  accountingAccount:'112005'
};

export const BancoBogota: BankType = {
  code: '2',
  description: 'Banco de Bogota',
  accountingAccount :'33333'
};


export const BANK_TYPES: BankType[] = [Bancolombia , BancoBogota];