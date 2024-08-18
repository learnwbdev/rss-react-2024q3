import { ReactNode } from 'react';
import { FormUncontrolled } from '@components';

export const UncontrolledFormPage = (): ReactNode => {
  return (
    <main className="main-container">
      <h1>Uncontrolled Form</h1>
      <FormUncontrolled />
    </main>
  );
};
