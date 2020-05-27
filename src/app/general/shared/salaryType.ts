export interface SalaryType {
  code: string;
  description: string;
}

export const Normal: SalaryType = {
  code: '1',
  description: 'Normal'
};

export const Integral: SalaryType = {
  code: '2',
  description: 'Integral'
};

export const Horas: SalaryType = {
  code: '3',
  description: 'Por Horas'
};

export const SALARY_TYPES: SalaryType[] = [Normal , Integral, Horas];
