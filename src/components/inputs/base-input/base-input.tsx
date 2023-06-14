import { FC } from "react";
import styles from "./base-input.module.scss";

export interface BaseInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label: string;
}

export const BaseInput: FC<BaseInputProps> = ({
  value,
  label,
  error,
  ...props
}) => {
  return (
    <>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>{label}</legend>
        <input
          value={value}
          className={styles.input}
          placeholder={label}
          {...props}
        />
      </fieldset>
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};
