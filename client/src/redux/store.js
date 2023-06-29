import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../manage-table/slices";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
