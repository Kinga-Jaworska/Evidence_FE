import { useFormik } from "formik";
import moment from "moment";
import { FC } from "react";
import { BaseInput } from "../base-input";
import { Button } from "../button/button";
import styles from "./add-form.module.scss";

export type Task = {
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  duration: number;
};

export type TaskError = {
  title?: string;
  start_time?: string;
};

interface AddFormProps {
  handleSubmit: (data: Task) => void;
}

export const AddForm: FC<AddFormProps> = ({ handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      start_time: "",
      end_time: "",
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
          Ok
        </Button>
      </form>
    </div>
  );
};
