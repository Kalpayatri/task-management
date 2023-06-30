import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "../utilis/validationSchema";

const EditModal = ({ editedTask, isOpen, onClose, onUpdateTask }) => {
  const [updatedTask, setUpdatedTask] = useState(editedTask);

  useEffect(() => {
    setUpdatedTask(editedTask);
  }, [editedTask]);

  const handleUpdate = (values) => {
    onUpdateTask(values);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={editedTask}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
        >
          <Form>
            <div>
              <Field
                as={TextField}
                fullWidth
                label="Date"
                name="date"
                margin="normal"
              />
              <ErrorMessage name="date" component="div" className="text-red-500" />
            </div>
            <div>
              <Field
                as={TextField}
                fullWidth
                label="Title"
                name="title"
                margin="normal"
              />
              <ErrorMessage name="title" component="div" className="text-red-500" />
            </div>
            <div>
              <Field
                as={TextField}
                fullWidth
                label="Description"
                name="description"
                margin="normal"
              />
              <ErrorMessage name="description" component="div" className="text-red-500" />
            </div>
            <Button type="submit" variant="contained" color="primary">Update</Button>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
