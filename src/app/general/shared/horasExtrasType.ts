export interface HoraExtraType {
  code: string;
  description: string;
}

export const DIURNA: HoraExtraType = {
  code: 'D',
  description: 'DIURNA'
};

export const NOCTURNA: HoraExtraType = {
  code: 'N',
  description: 'NOCTURNA'
};

export const FESTIVA_DIURNA: HoraExtraType = {
  code: 'H',
  description: 'Festiva Diurna'
};

export const FESTIVA_NOCTURNA: HoraExtraType = {
    code: 'E',
    description: 'Festiva Nocturna'
  };
  
export const HORAS_EXTRAS_TYPES: HoraExtraType[] = [ DIURNA,NOCTURNA,FESTIVA_DIURNA,FESTIVA_NOCTURNA];
