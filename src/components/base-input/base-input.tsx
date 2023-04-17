import { FC, useState } from "react";
import styles from "./base-input.module.scss";
import { BaseInputProps } from "./base-input.types";

export const BaseInput: FC<BaseInputProps> = ({
  shrinkState = false,
  value,
  label,
  ...props
}) => {
  const [isShrink, setIsShrink] = useState(shrinkState);
  return (
    <fieldset className={styles.fieldset}>
      {isShrink && <legend className={styles.legend}>{label}</legend>}
      <input
        value={value}
        className={styles.input}
        onFocus={() => setIsShrink(true)}
        onBlur={() => setIsShrink(!!value)}
        placeholder={label}
        {...props}
      />
    </fieldset>
  );
};
