import { FORM_TYPE } from '@constants';

export type FormType = (typeof FORM_TYPE)[keyof typeof FORM_TYPE];

export interface FormFields {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  termsAccepted?: boolean;
  imageBase64: string;
  country: string;
}

export interface InputFields {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  termsAccepted?: boolean;
  image: File;
  country: string;
}

export interface FormPost {
  id: string;
  type: FormType;
  data: FormFields;
  isDataFresh: boolean;
}

export interface Country {
  code: string;
  name: string;
}

export interface Gender {
  value: string;
  label: string;
}
