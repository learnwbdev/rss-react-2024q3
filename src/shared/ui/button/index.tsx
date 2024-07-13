import { ReactNode } from 'react';
import styles from './button.module.css';

interface ButtonProps {
  text: string;
  onClick: React.MouseEventHandler;
  disabled?: boolean;
}

export const Button = ({ text, onClick, disabled = false }: ButtonProps): ReactNode => {
  return (
    <button type="button" className={styles.btn} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};
