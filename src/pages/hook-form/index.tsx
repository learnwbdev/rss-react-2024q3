import { ReactNode } from 'react';
import { FormHookForm } from '@components';

export const HookFormPage = (): ReactNode => {
  return (
    <main className="main-container">
      <h1>Hook Form</h1>
      <FormHookForm />
    </main>
  );
};
