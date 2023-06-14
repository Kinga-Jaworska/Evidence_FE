import { useFormik } from "formik";
import { FC, ReactNode } from "react";

import moment from "moment";
import { FormTask, Task, TaskError } from "../../../services";
import { setDurationInMinutes } from "../../../utils/task-utils";
import { Button } from "../../button/button";
import { BaseInput } from "../../inputs/base-input";
import { DatetimeInput } from "../../inputs/datetime-input/datetime-input";
import styles from "./task-form.module.scss";

interface AddFormProps {
  closeIcon?: ReactNode;
  initialValues?: FormTask;
  handleSubmit: (data: Task) => void;
}
export const TaskForm: FC<AddFormProps> = ({
  closeIcon,
  initialValues,
  handleSubmit,
}) => {
  const formik = useFormik({
    initialValues: {
      project_name: initialValues?.project_name ?? "",
      description: initialValues?.description ?? "",
      start_time: moment(initialValues?.start_time).toDate(),
      duration: initialValues?.duration ?? "",
    },
    validate: (values) => {
      const errors: TaskError = {};
      const regex = /^(\d{1,2}h\s?)?(\d{1,2}m)?$/;

      if (!values.project_name) {
        errors.project_name = "Project name is required";
      }
      if (!values.start_time) {
        errors.start_time = "Required field";
      }

      if (setDurationInMinutes(values.duration) >= 60 * 24) {
        errors.duration =
          "Are you sure that you spend on this more than 24h that day? 👀";
      }

      if (!regex.test(values.duration)) {
        errors.duration = "Wrong Format (1h 1m)";
      }

      return errors;
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      handleSubmit({
        ...values,
        start_time: new Date(values.start_time),
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
        <BaseInput
          name="project_name"
          value={formik.values.project_name}
          label="Project Name"
          error={formik.errors.project_name}
          onChange={formik.handleChange}
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
        <BaseInput
          name="duration"
          value={formik.values.duration}
          label="Duration"
          onChange={formik.handleChange}
          error={formik.errors.duration}
        />
        <Button disabled={formik.isSubmitting}>Ok</Button>
      </form>
    </div>
  );
};
