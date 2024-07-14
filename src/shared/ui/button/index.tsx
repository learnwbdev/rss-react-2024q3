import { ReactNode } from 'react';
import styles from './button.module.css';

interface ButtonProps {
  text: string;
  onClick: React.MouseEventHandler;
  disabled?: boolean;
  color?: 'primary' | 'warning';
}

export const Button = ({ text, onClick, disabled = false, color = 'primary' }: ButtonProps): ReactNode => {
  const colorClass = color !== 'primary' ? styles[`btn__${color}`] : '';

  return (
    <button type="button" className={`${styles.btn} ${colorClass}`} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};
