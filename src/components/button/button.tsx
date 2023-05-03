import clsx from "clsx";
import { FC } from "react";
import styles from "./button.module.scss";
import { ButtonProps } from "./button.types";

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button className={clsx(styles.button, className)} {...props}>
      {children}
    </button>
  );
};
