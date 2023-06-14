import { FormikErrors } from "formik";
import { Moment } from "moment";
import Datetime from "react-datetime";
import styles from "./datetime-input.module.scss";

type DateTimeInput = {
  time: Date;
  label?: string;
  error?: FormikErrors<Date>;
  handleChange: (value: string | Moment) => void;
};

export const DatetimeInput = ({
  time,
  label,
  error,
  handleChange,
}: DateTimeInput) => {
  return (
    <>
      {label}
      {error}
      <Datetime
        className={styles.dateTime}
        value={time}
        onChange={(value) => handleChange(value)}
      />
    </>
  );
};
