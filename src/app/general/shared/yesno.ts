export interface Yesno {
  code: boolean;
  description: string;
}

export const Si: Yesno = {
  code: true,
  description: 'Si'
};

export const No: Yesno = {
  code: false,
  description: 'No'
};

export const YESNO: Yesno[] = [Si, No];
