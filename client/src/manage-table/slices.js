import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      const { date, title, description } = action.payload;
      const newTask = {
        id: uuidv4(),
        date,
        title,
        description,
      };
      state.push(newTask);
    },

    updateTaskStatus: (state, action) => {
      const { taskId, status } = action.payload;
      return state.map((task) => {
        if (task.id === taskId) {
          return { ...task, status };
        }
        return task;
      });
    },
    updateTask: (state, action) => {
      const updatedTask = action.payload;
      const taskIndex = state.findIndex((task) => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        state[taskIndex] = updatedTask;
      }
    },
    removeTask: (state, action) => {
      const taskId = action.payload;
      return state.filter((task) => task.id !== taskId);
    },
  },
});

export const { addTask, updateTaskStatus, removeTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;
