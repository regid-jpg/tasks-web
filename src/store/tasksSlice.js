// src/store/tasksSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  searchText: "",
  isModalVisible: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    setSearchText(state, action) {
      state.searchText = action.payload;
    },
    toggleModal(state, action) {
      state.isModalVisible = action.payload;
    },
  },
});

export const { setTasks, addTask, setSearchText, toggleModal } = tasksSlice.actions;

export default tasksSlice.reducer;
