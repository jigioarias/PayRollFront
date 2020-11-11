

export interface  EstadoIncapacidadType {
  code: string;
  description: string;
}

export const SIN_APROBAR:  EstadoIncapacidadType = {
  code: 'S',
  description: 'Sin Aprobar'
};

export const APROBADO:  EstadoIncapacidadType = {
  code: 'A',
  description: 'Aprobado'
};

export const RECHAZADO:  EstadoIncapacidadType = {
  code: 'R',
  description: 'Rechazado'
};

export const ESTADOS_INCAPACIDAD_TYPES:  EstadoIncapacidadType[] = [SIN_APROBAR , APROBADO,RECHAZADO];
