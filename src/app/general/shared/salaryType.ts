export interface SalaryType {
  code: string;
  description: string;
}

export const Normal: SalaryType = {
  code: 'N',
  description: 'Normal'
};

export const Integral: SalaryType = {
  code: 'I',
  description: 'Integral'
};

export const Horas: SalaryType = {
  code: 'H',
  description: 'Por Horas'
};

export const SALARY_TYPES: SalaryType[] = [Normal , Integral, Horas];
