import { FC } from "react";
import { ButtonProps } from "./button.types";
import styles from "./button.module.scss";

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};
