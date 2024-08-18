import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FORM_TYPE, genders, PATH } from '@constants';
import { submitFormData, useAppDispatch, useAppSelector } from '@store';
import { convertFileToBase64, formSchema } from '@utils';
import { InputFields } from '@types';
import styles from './styles.module.css';

const genderOptions = [{ value: '', label: 'Select Gender' }, ...genders];

export const FormHookForm = (): ReactNode => {
  const { countries } = useAppSelector((store) => store.countries);

  const countryOptions = [{ code: '', name: 'Select Country' }, ...countries];

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<InputFields, unknown>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: InputFields) => {
    const { image, ...submitData } = data;

    const imageBase64 = await convertFileToBase64(image);

    void dispatch(submitFormData({ type: FORM_TYPE.HOOK, data: { ...submitData, imageBase64 } }));
    navigate(PATH.MAIN);
    reset();
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void handleSubmit(onSubmit)();
      }}
      className={styles.form}
    >
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.formLabel}>
          Name:
        </label>
        <input
          id="name"
          autoComplete="name"
          type="text"
          {...register('name')}
          placeholder="Name"
          className={styles.formInput}
        />
        {errors.name && <div className={styles.formError}>{errors.name.message}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="age" className={styles.formLabel}>
          Age:
        </label>
        <input id="age" type="number" {...register('age')} placeholder="Age" className={styles.formInput} />
        {errors.age && <div className={styles.formError}>{errors.age.message}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.formLabel}>
          Email:
        </label>
        <input
          id="email"
          autoComplete="username"
          type="email"
          {...register('email')}
          placeholder="Email"
          className={styles.formInput}
        />
        {errors.email && <div className={styles.formError}>{errors.email.message}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.formLabel}>
          Password:
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          {...register('password')}
          placeholder="Password"
          className={styles.formInput}
        />
        {errors.password && <div className={styles.formError}>{errors.password.message}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword" className={styles.formLabel}>
          Confirm Password:
        </label>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          {...register('confirmPassword')}
          placeholder="Confirm Password"
          className={styles.formInput}
        />
        {errors.confirmPassword && <div className={styles.formError}>{errors.confirmPassword.message}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="gender" className={styles.formLabel}>
          Gender:
        </label>
        <select id="gender" {...register('gender')} className={styles.formSelect}>
          {genderOptions.map(({ value, label }) => (
            <option key={value} value={label}>
              {label}
            </option>
          ))}
        </select>
        {errors.gender && <div className={styles.formError}>{errors.gender.message}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="termsAccepted" className={styles.formLabel}>
          Accept Terms and Conditions:
        </label>
        <input id="termsAccepted" type="checkbox" {...register('termsAccepted')} className={styles.formCheckbox} />
        {errors.termsAccepted && <div className={styles.formError}>{errors.termsAccepted.message}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="image" className={styles.formLabel}>
          Upload Image:
        </label>
        <input id="image" type="file" {...register('image')} className={styles.formInput} />
        {errors.image && <div className={styles.formError}>{errors.image.message}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="country" className={styles.formLabel}>
          Country:
        </label>
        <select id="country" {...register('country')} className={styles.formSelect}>
          {countryOptions.map(({ code, name }) => (
            <option key={code} value={name}>
              {name}
            </option>
          ))}
        </select>
        {errors.country && <div className={styles.formError}>{errors.country.message}</div>}
      </div>

      <button type="submit" className={styles.formSubmit} disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};
