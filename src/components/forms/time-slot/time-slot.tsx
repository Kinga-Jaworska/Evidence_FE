import { useFormik } from "formik";
import { FC, ReactNode } from "react";

import { AddTimeSlot, TaskError } from "../../../services";
import { setDuration } from "../../../utils/task-utils";
import { Button } from "../../button/button";
import { DatetimeInput } from "../../inputs/datetime-input/datetime-input";
import styles from "./time-slot.module.scss";

interface AddTimeSlotProps {
  handleSubmit: (data: AddTimeSlot) => void;
  initialValues: AddTimeSlot;
  closeIcon?: ReactNode;
}

export const AddTimeSlotForm: FC<AddTimeSlotProps> = ({
  closeIcon,
  handleSubmit,
}) => {
  const formik = useFormik({
    initialValues: {
      start_time: new Date(),
      end_time: new Date(),
    },
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
      handleSubmit({
        ...values,
        duration: setDuration(values.start_time, values.end_time),
        start_time: values.start_time,
      });
      setSubmitting(false);
      resetForm();
    },
  });

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        {closeIcon}
        <DatetimeInput
          time={formik.values.start_time}
          handleChange={(value) =>
            formik.setFieldValue("start_time", new Date(value.toString()))
          }
        />
        <DatetimeInput
          time={formik.values.end_time}
          handleChange={(value) =>
            formik.setFieldValue("end_time", new Date(value.toString()))
          }
        />
        <Button type="submit" disabled={formik.isSubmitting}>
          Add new time slot
        </Button>
      </form>
    </div>
  );
};
