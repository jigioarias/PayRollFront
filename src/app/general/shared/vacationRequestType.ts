export interface VacationRequestType {
  code: string;
  description: string;
}

export const Aprobada: VacationRequestType = {
  code: 'A',
  description: 'Aprobada'
};

export const Pendiente: VacationRequestType = {
  code: 'P',
  description: 'Pendiente'
};
export const Rechazada: VacationRequestType = {
    code: 'R',
    description: 'Rechazada'
  };

export const VACATIONREQUEST_TYPES: VacationRequestType[] = [Aprobada,Pendiente,Rechazada];
