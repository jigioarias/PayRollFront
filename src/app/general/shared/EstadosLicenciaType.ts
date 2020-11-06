export interface EstadoLicenciaType {
  code: string;
  description: string;
}

export const SIN_APROBAR: EstadoLicenciaType = {
  code: 'S',
  description: 'Sin Aprobar'
};

export const APROBADO: EstadoLicenciaType = {
  code: 'A',
  description: 'Aprobado'
};

export const RECHAZADO: EstadoLicenciaType = {
  code: 'R',
  description: 'Rechazado'
};

export const ESTADOS_LICENCIA_TYPES: EstadoLicenciaType[] = [SIN_APROBAR , APROBADO,RECHAZADO];
