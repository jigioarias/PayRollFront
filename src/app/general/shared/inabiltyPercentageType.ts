
export interface InabilityPercentageType {
  code: number;
  value: number;
}

export const CIEN: InabilityPercentageType = {
  code: 100,
  value: 100
};

export const SESENTA_SEIS: InabilityPercentageType = {
  code:66,
  value: 66
};


export const PERCENTAGES_INABILITY_TYPES: InabilityPercentageType[] = [CIEN ,SESENTA_SEIS];
