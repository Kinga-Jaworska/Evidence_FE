import { useFormik } from "formik";
import { FC, ReactNode } from "react";

import moment from "moment";
import { Task, TaskError } from "../../../services";
import { setDuration, setEndTime } from "../../../utils/task-utils";
import { Button } from "../../button/button";
import { BaseInput } from "../../inputs/base-input";
import { DatetimeInput } from "../../inputs/datetime-input/datetime-input";
import styles from "./task-form.module.scss";

interface AddFormProps {
  closeIcon?: ReactNode;
  initialValues?: Task;
  handleSubmit: (data: Task) => void;
}
export const TaskForm: FC<AddFormProps> = ({
  closeIcon,
  initialValues,
  handleSubmit,
}) => {
  const formik = useFormik({
    initialValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      start_time: moment(initialValues?.start_time).toDate(),
      end_time:
        setEndTime(
          initialValues?.start_time || new Date(),
          initialValues?.duration || 0
        ) ?? new Date(),
    },
    validate: (values) => {
      const errors: TaskError = {};

      if (!values.title) {
        errors.title = "Title is required";
      }
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
        start_time: new Date(values.start_time),
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
          name="title"
          value={formik.values.title}
          label="Title"
          onChange={formik.handleChange}
          error={formik.errors.title}
        />
        <BaseInput
          name="description"
          value={formik.values.description}
          label="Description"
          onChange={formik.handleChange}
        />
        <DatetimeInput
          time={formik.values.start_time}
          error={formik.errors.start_time}
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
          Ok
        </Button>
      </form>
    </div>
  );
};
