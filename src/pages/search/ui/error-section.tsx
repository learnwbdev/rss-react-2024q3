import { Button } from '@shared/ui';
import { BuggyComponent } from '@shared/utils';
import { ReactNode, useState } from 'react';

export const ErrorSection = (): ReactNode => {
  const [isError, setIsError] = useState(false);

  const handleClick = (): void => {
    setIsError(true);
  };

  return (
    <section>
      <Button text="Throw Error" onClick={handleClick} />
      {isError && <BuggyComponent />}
    </section>
  );
};
