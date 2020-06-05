export interface ProvisionType {
  code: string;
  description: string;
}

export const Provision1:  ProvisionType= {
  code: '1',
  description: 'Normal'
};

export const Provision2: ProvisionType = {
  code: '2',
  description: 'Extra'
};


export const PROVISION_TYPES: ProvisionType[] = [Provision1 , Provision2];