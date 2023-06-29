import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const EditModal = ({ editedTask, isOpen, onClose, onUpdateTask }) => {
  const [updatedTask, setUpdatedTask] = useState(editedTask);

  useEffect(() => {
    setUpdatedTask(editedTask);
  }, [editedTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    onUpdateTask(updatedTask);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Date"
          name="date"
          value={updatedTask.date || ""}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={updatedTask.title || ""}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={updatedTask.description || ""}
          onChange={handleChange}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
