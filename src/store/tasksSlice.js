// src/store/tasksSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      key: "1",
      number: "5043",
      ticket: "960566",
      dateCreated: "6/4/23 1:53 PM",
      title: "HttpAttribute",
      department: "Information Technology Department",
      agent: "Software Dev - External Web Team",
      collaborators: "None",
      status: "Open",
      comments: [
        {
          author: "Admin",
          timestamp: "6/5/23 10:00 AM",
          content: "Initial task created.",
        },
      ],
    },
    {
      key: "2",
      number: "5042",
      ticket: "960466",
      dateCreated: "6/4/23 1:53 PM",
      title: "SameSiteAttribute",
      department: "Information Technology Department",
      agent: "Software Dev - External Web Team",
      collaborators: "None",
      status: "Open",
      comments: [],
    },
  ],
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
    updateStatus(state, action) {
      const { taskId, status } = action.payload;
      const task = state.tasks.find((t) => t.key === taskId);
      if (task) {
        task.status = status;
      }
    },
    addComment(state, action) {
      const { taskId, comment } = action.payload;
      const task = state.tasks.find((t) => t.key === taskId);
      if (task) {
        task.comments.push(comment);
      }
    },
  },
});

export const {
  setTasks,
  addTask,
  setSearchText,
  toggleModal,
  updateStatus,
  addComment,
} = tasksSlice.actions;

export default tasksSlice.reducer;
