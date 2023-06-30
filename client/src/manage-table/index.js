import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTaskStatus, removeTask, updateTask } from "./slices";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  TextField,
} from "@mui/material";
import FormModal from "./form";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditModal from "./editModal";

const ManageTable = () => {
  const tasks = useSelector((state) => state.tasks);
  console.log("Tasks", tasks);
  const dispatch = useDispatch();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({});

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      dispatch(addTask(JSON.parse(storedTasks)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSubmitForm = (formData) => {
    const { date, title, description } = formData;
    dispatch(addTask({ date, title, description }));
    closeAddModal();
  };

  const handleStatusChange = (taskId, status) => {
    dispatch(updateTaskStatus({ taskId, status }));
  };

  const openEditModal = (task) => {
    setEditedTask(task);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditedTask({});
    setIsEditModalOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    dispatch(removeTask(taskId));
  };

  const handleUpdateTask = (updatedTask) => {
    dispatch(updateTask(updatedTask));
    closeEditModal();
  };

  const filteredTasks = tasks.filter((task) => {
    const lowercaseTitle = task.title?.toLowerCase() || ""; 
    const lowercaseSearchText = searchText.toLowerCase();
    const lowercaseDate = task.date?.toLowerCase() || ""; 
    return (
      lowercaseTitle.includes(lowercaseSearchText) ||
      lowercaseSearchText.includes(lowercaseTitle) ||
      lowercaseDate.includes(lowercaseSearchText)
    );
  });

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center border-b-2 pb-4 mb-4">
        <h1 className="text-3xl font-bold">Task Management</h1>
        <div className="flex items-center">
          <div className="mr-4 mt-3">
            <TextField
              label="Search by Title"
              variant="outlined"
              size="small"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-3 rounded-full"
            onClick={openAddModal}
          >
            Add New Task
          </button>
        </div>
      </div>

      <div className="container mx-auto bg-blue-100 p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Description</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="container mx-auto bg-white p-4">
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td className="p-8">{task.date}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <FormControl className="w-full p-12">
                      <InputLabel id="demo-simple-select-label">
                        Select Status
                      </InputLabel>
                      <Select
                        label="Select Status"
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task.id, e.target.value)
                        }
                      >
                        <MenuItem value="To do">To do</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Testing">Testing</MenuItem>
                      </Select>
                    </FormControl>
                  </td>
                  <td>
                    <div className="flex items-center justify-center">
                      <button onClick={() => openEditModal(task)}>
                        <EditIcon className="mr-2" />
                      </button>
                      <button onClick={() => handleDeleteTask(task.id)}>
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditModal
        editedTask={editedTask}
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onUpdateTask={handleUpdateTask}
      />
      <Dialog open={isAddModalOpen} onClose={closeAddModal} fullWidth>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <FormModal
            onSubmit={handleSubmitForm}
            closeAddModal={closeAddModal}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddModal}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageTable;
