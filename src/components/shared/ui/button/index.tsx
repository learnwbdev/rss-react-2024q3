'use client';

import { ComponentProps, ReactNode } from 'react';
import styles from './button.module.css';

interface ButtonProps extends ComponentProps<'button'> {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  color?: 'primary' | 'warning';
}

export const Button = ({
  text,
  onClick,
  disabled = false,
  color = 'primary',
  className,
  ...props
}: ButtonProps): ReactNode => {
  const colorClass = color !== 'primary' ? styles[`btn__${color}`] : '';

  return (
    <button
      type="button"
      className={`${className} ${styles.btn} ${colorClass}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {text}
    </button>
  );
};
