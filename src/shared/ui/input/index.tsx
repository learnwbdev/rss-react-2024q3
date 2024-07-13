import { ReactNode } from 'react';
import styles from './input.module.css';

interface InputProps {
  name: string;
  label: string;
  value: string;
  disabled: boolean;
  onChange: React.ChangeEventHandler;
}

export const Input = ({ name, label, value, disabled, onChange }: InputProps): ReactNode => {
  return (
    <label className={styles.label}>
      <span className={styles.label_text}>{`${label}:`}</span>
      <input type="text" name={name} className={styles.input} value={value} disabled={disabled} onChange={onChange} />
    </label>
  );
};
