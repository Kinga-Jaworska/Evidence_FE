import { useFormik } from "formik";
import { FC, ReactNode } from "react";

import moment from "moment";
import { AddTimeSlot } from "../../../services";
import { BaseInput } from "../../base-input";
import { Button } from "../../button/button";
import styles from "./add-time-slot.module.scss";

export type TaskError = {
  start_time?: string;
};

interface AddTimeSlotProps {
  handleSubmit: (data: AddTimeSlot) => void;
  initialValues: AddTimeSlot;
  closeIcon?: ReactNode;
}

export const AddTimeSlotForm: FC<AddTimeSlotProps> = ({
  closeIcon,
  initialValues,
  handleSubmit,
}) => {
  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const errors: TaskError = {};
      if (!values.start_time) {
        errors.start_time = "Required field";
      }
      if (values.start_time > values.end_time) {
        errors.start_time = "Start time have to be before end time";
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const start = new Date(values.start_time);
      const end = new Date(values.end_time);

      const timeDiffInMs = Math.floor(end.getTime() - start.getTime());
      const duration = Math.floor((timeDiffInMs / 3600) * 60) / 1000;

      handleSubmit({
        ...values,
        duration,
        start_time: moment(start).format("DD-MM-YYYY"),
        end_time: moment(end).format("DD-MM-YYYY"),
      });
      setSubmitting(false);
      resetForm();
    },
  });

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        {closeIcon}
        <BaseInput
          name="start_time"
          type="datetime-local"
          value={formik.values.start_time}
          label="Start Time"
          onChange={formik.handleChange}
          error={formik.errors.start_time}
        />
        <BaseInput
          name="end_time"
          type="datetime-local"
          value={formik.values.end_time}
          label="End Time"
          onChange={formik.handleChange}
        />
        <Button type="submit" disabled={formik.isSubmitting}>
          Edit
        </Button>
      </form>
    </div>
  );
};
