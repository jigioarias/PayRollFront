
export interface InabilityType {
  code: string;
  description: string;
}

export const General: InabilityType = {
  code: 'G',
  description: 'General'
};

export const Maternidad: InabilityType = {
  code: 'M',
  description: 'Maternidad'
};

export const Paternidad: InabilityType = {
  code: 'P',
  description: 'Paternidad'
};

export const INABILITIES_TYPES: InabilityType[] = [General , Maternidad, Paternidad];
