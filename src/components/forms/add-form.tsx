import { Formik } from "formik";
import { FC } from "react";
import { BaseInput } from "../base-input";
import { Button } from "../button/button";
import styles from "./add-form.module.scss";

export const AddForm: FC = () => {
  return (
    <div className={styles.container}>
      <Formik
        initialValues={{ title: "", description: "", start_time: "" }}
        //  valnameate={values => {
        //    const errors = {};
        //    if (!values.email) {
        //      errors.email = 'Required';
        //    } else if (
        //      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //    ) {
        //      errors.email = 'Invalname email address';
        //    }
        //    return errors;
        //  }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* {errors.email && touched.email && errors.email} */}
            <BaseInput
              name="title"
              value={values.title}
              label="Title"
              onChange={handleChange}
            />
            <BaseInput
              name="description"
              value={values.description}
              label="Description"
              onChange={handleChange}
            />
            <BaseInput
              name="start_time"
              type="datetime-local"
              value={values.start_time}
              label="Start Time"
              onChange={handleChange}
            />
            <Button type="submit" disabled={isSubmitting}>
              Ok
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
