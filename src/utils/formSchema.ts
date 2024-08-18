import { object, string, number, mixed, boolean, ref } from 'yup';
import { genders, MAX_IMAGE_SIZE_MB, SUPPORTED_IMAGE_FORMATS } from '@constants';
import { countries } from '@data';

const validGenderValues = genders.map(({ label }) => label);

const validCountryCodes = countries.map(({ name }) => name);

const maxImageSizeBytes = MAX_IMAGE_SIZE_MB * 1024 * 1024;

const imageSchema = mixed<File>()
  .required('Please upload an image.')
  .test('fileType', 'Invalid file format. Please upload a JPEG or PNG image.', (value) => {
    if (value && value instanceof File) {
      const fileType = value.type;
      return SUPPORTED_IMAGE_FORMATS.includes(fileType);
    }
    return false;
  })
  .test('fileSize', `The image is too large. Please upload an image smaller than ${MAX_IMAGE_SIZE_MB}MB.`, (value) => {
    if (value && value instanceof File) {
      return value.size <= maxImageSizeBytes;
    }
    return false;
  });

export const formSchema = object().shape({
  name: string()
    .matches(/^[A-Z][a-zA-Z-' ]*$/, 'Name must start with an uppercase letter')
    .required('Name is required'),

  age: number()
    .required('Please enter your age')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),

  email: string().required('Email is required.').email('Please enter a valid email address'),

  password: string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
    .matches(/[a-z]/, 'Password must include at least one lowercase letter')
    .matches(/\d/, 'Password must include at least one number')
    .matches(/[!@#$%^&*()_\-+=[\]{}|;:'",.<>/?]/, 'Password must include at least one special character'),

  confirmPassword: string()
    .required('Please confirm your password')
    .oneOf([ref('password')], 'Passwords do not match'),

  gender: string().required('Please select your gender').oneOf(validGenderValues, 'Please select a valid gender'),

  termsAccepted: boolean().oneOf([true], 'You must accept the terms and conditions to proceed'),

  image: imageSchema,

  country: string().required('Please select your country.').oneOf(validCountryCodes, 'Please select a valid country'),
});
