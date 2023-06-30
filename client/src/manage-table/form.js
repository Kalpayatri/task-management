import React from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../manage-table/slices";
import { TextField, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "../utilis/validationSchema";

const FormModal = ({ closeAddModal }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const newTask = {
      title: values.title,
      date: values.date,
      description: values.description,
    };
    dispatch(addTask(newTask));
    resetForm();
    closeAddModal();
  };

  return (
    <Formik
      initialValues={{ title: "", date: "", description: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <Field
              as={TextField}
              name="title"
              label="Title"
              fullWidth
              margin="normal"
              error={errors.title && touched.title}
              helperText={errors.title && touched.title && errors.title}
            />
          </div>
          <div>
            <Field
              as={TextField}
              name="date"
              label="Date"
              fullWidth
              margin="normal"
              error={errors.date && touched.date}
              helperText={errors.date && touched.date && errors.date}
            />
          </div>
          <div>
            <Field
              as={TextField}
              name="description"
              label="Description"
              fullWidth
              margin="normal"
              multiline
              error={errors.description && touched.description}
              helperText={
                errors.description && touched.description && errors.description
              }
            />
          </div>
          <Button type="submit" variant="contained" color="primary">
            Add Task
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormModal;
