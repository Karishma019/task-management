import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./features/tasks/tasksSlice";
import authSlice from "./features/auth/authSlice";
import { loadState, saveState } from "../src/features/tasks/localstorageTasks"; // localStorage functions
import weatherSlice from "./features/weatherApi/weatherSlice";

const persistedState = loadState(); // Load state from local storage

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    auth: authSlice,
    weather: weatherSlice,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    // Serialize the state to JSON
    tasks: store.getState().tasks,
    auth: store.getState().auth,
  });
});
