export interface FormFields {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  termsAccepted: boolean;
  imageBase64: string;
  country: string;
}

export interface FormState {
  formData: FormFields | null;
  isDataFresh: boolean;
}

export type FormType = 'uncontrolled' | 'hook';

export interface Country {
  code: string;
  name: string;
}
