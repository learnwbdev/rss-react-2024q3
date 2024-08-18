import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';
import { submitFormData, useAppDispatch } from '@store';
import { FORM_TYPE, genders, PATH } from '@constants';
import { useAppSelector } from '@store';
import { formSchema, getFile, convertFileToBase64 } from '@utils';
import { InputFields } from '@types';
import styles from './styles.module.css';

const genderOptions = [{ value: '', label: 'Select Gender' }, ...genders];

const extractFormData = (formData: FormData): InputFields => {
  return {
    name: formData.get('name')?.toString() ?? '',
    age: Number(formData.get('age')) || 0,
    email: formData.get('email')?.toString() ?? '',
    password: formData.get('password')?.toString() ?? '',
    confirmPassword: formData.get('confirmPassword')?.toString() ?? '',
    gender: formData.get('gender')?.toString() ?? '',
    termsAccepted: formData.get('termsAccepted') === 'on' || false,
    image: getFile('image', formData),
    country: formData.get('country')?.toString() ?? '',
  };
};

export const FormUncontrolled = (): ReactNode => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { countries } = useAppSelector((store) => store.countries);

  const countryOptions = [{ code: '', name: 'Select Country' }, ...countries];

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data: InputFields = extractFormData(formData);

    try {
      await formSchema.validate(data, { abortEarly: false });

      const { image, ...submitData } = data;

      const imageBase64 = await convertFileToBase64(image);

      void dispatch(
        submitFormData({
          type: FORM_TYPE.UNCONTROLLED,
          data: { ...submitData, imageBase64 },
        })
      );
      navigate(PATH.MAIN);
    } catch (error) {
      if (error instanceof ValidationError) {
        const newErrors: Record<string, string> = {};

        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });

        setErrors(newErrors);
      }
    }
  };

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
      className={styles.form}
    >
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.formLabel}>
          Name:
        </label>
        <input id="name" name="name" autoComplete="name" type="text" className={styles.formInput} />
        {errors.name && <div className={styles.formError}>{errors.name}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="age" className={styles.formLabel}>
          Age:
        </label>
        <input id="age" name="age" type="number" className={styles.formInput} />
        {errors.age && <div className={styles.formError}>{errors.age}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.formLabel}>
          Email:
        </label>
        <input id="email" name="email" autoComplete="username" type="email" className={styles.formInput} />
        {errors.email && <div className={styles.formError}>{errors.email}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.formLabel}>
          Password:
        </label>
        <input id="password" name="password" autoComplete="new-password" type="password" className={styles.formInput} />
        {errors.password && <div className={styles.formError}>{errors.password}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword" className={styles.formLabel}>
          Confirm Password:
        </label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
          className={styles.formInput}
        />
        {errors.confirmPassword && <div className={styles.formError}>{errors.confirmPassword}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="gender" className={styles.formLabel}>
          Gender:
        </label>
        <select id="gender" name="gender" className={styles.formSelect}>
          {genderOptions.map(({ value, label }) => (
            <option key={value} value={label}>
              {label}
            </option>
          ))}
        </select>
        {errors.gender && <div className={styles.formError}>{errors.gender}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="termsAccepted" className={styles.formLabel}>
          Accept Terms and Conditions:
        </label>
        <input id="termsAccepted" name="termsAccepted" type="checkbox" className={styles.formCheckbox} />
        {errors.termsAccepted && <div className={styles.formError}>{errors.termsAccepted}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="image" className={styles.formLabel}>
          Upload Image:
        </label>
        <input id="image" name="image" type="file" className={styles.formInput} />
        {errors.image && <div className={styles.formError}>{errors.image}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="country" className={styles.formLabel}>
          Country:
        </label>
        <select id="country" name="country" className={styles.formSelect}>
          {countryOptions.map(({ code, name }) => (
            <option key={code} value={name}>
              {name}
            </option>
          ))}
        </select>
        {errors.country && <div className={styles.formError}>{errors.country}</div>}
      </div>

      <button type="submit" className={styles.formSubmit}>
        Submit
      </button>
    </form>
  );
};
