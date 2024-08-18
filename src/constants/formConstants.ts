import { Gender } from '@types';

export const FORM_TYPE = {
  UNCONTROLLED: 'uncontrolled',
  HOOK: 'hook',
} as const;

export const genders: Gender[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-Binary' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer Not to Say' },
] as const;

export const SUPPORTED_IMAGE_FORMATS = ['image/jpeg', 'image/png'];

export const MAX_IMAGE_SIZE_MB = 5;
