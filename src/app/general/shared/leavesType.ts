
export interface LeaveType {
  code: string;
  description: string;
}

export const Permiso: LeaveType = {
  code: 'P',
  description: 'Permiso'
};

export const Maternidad: LeaveType = {
  code: 'M',
  description: 'Maternidad'
};

export const Paternidad: LeaveType = {
  code: 'T',
  description: 'Paternidad'
};

export const LEAVES_TYPES: LeaveType[] = [Permiso , Maternidad, Paternidad];
