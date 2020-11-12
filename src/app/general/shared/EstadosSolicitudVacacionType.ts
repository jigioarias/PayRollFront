export interface EstadoSolicitudVacacionType {
  code: string;
  description: string;
}

export const PENDIENTE: EstadoSolicitudVacacionType = {
  code: 'P',
  description: 'Pendiente'
};

export const APROBADO: EstadoSolicitudVacacionType = {
  code: 'A',
  description: 'Aprobado'
};

export const RECHAZADO: EstadoSolicitudVacacionType = {
  code: 'R',
  description: 'Rechazado'
};

export const ESTADOS_SOLICITUD_VACACION_TYPES: EstadoSolicitudVacacionType[] = [PENDIENTE , APROBADO,RECHAZADO];
