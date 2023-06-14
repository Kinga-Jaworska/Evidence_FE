import { useFormik } from "formik";
import { FC, ReactNode } from "react";

import { AddTimeSlot, TaskError } from "../../../services";
import { setDurationInMinutes } from "../../../utils/task-utils";
import { Button } from "../../button/button";
import { BaseInput } from "../../inputs/base-input";
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
      duration: "1h",
    },
    validate: (values) => {
      const errors: TaskError = {};
      const regex = /^(\d+w\s?)?(\d+d\s?)?(\d{1,2}h\s?)?(\d{1,2}m)?$/;

      if (!values.start_time) {
        errors.start_time = "Required field";
      }
      if (!regex.test(values.duration)) {
        errors.duration = "Wrong Format (1w 1d 1h 1m)";
      }

      return errors;
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      handleSubmit({
        ...values,
        start_time: values.start_time,
        duration: setDurationInMinutes(values.duration),
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
        <BaseInput
          name="duration"
          value={formik.values.duration}
          label="Duration"
          onChange={formik.handleChange}
          error={formik.errors.duration}
        />
        <Button type="submit" disabled={formik.isSubmitting}>
          Add new time slot
        </Button>
      </form>
    </div>
  );
};
