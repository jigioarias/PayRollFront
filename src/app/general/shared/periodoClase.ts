import { PeriodoClase } from 'src/app/inventory/shared/master';
import { PeriodoType } from './periodoType';

export interface PeriodClase {
  code: string;
  description: string;
}

export const Quincenal:PeriodClase = {
  code: 'Q',
  description: 'Quincenal'
};

export const Mensual: PeriodClase = {
  code: '2',
  description: 'Mensual'
};

export const PERIODOSCLASES: PeriodClase[] = [Quincenal, Mensual];
