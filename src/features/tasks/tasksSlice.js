import { createSlice } from "@reduxjs/toolkit";

const tasksSLice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTasks: (state, action) => {
      state.push(action.payload);
    },
    deleteTasks: (state, action) => {
      return state.filter((task) => task.id !== action.payload.id);
    },
    toggleCompleted: (state, action) => {
      return state.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      });
    },
    editTask: (state, action) => {
      const {
        text,
        priority,
        id,
        city,
        country,
        conditionText,
        conditionImg,
        humidity,
        temperature,
        WindSpeed,
      } = action.payload;
      return state.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            text: text,
            priority: priority,
            city: city,
            country: country,
            conditionText: conditionText,
            conditionImg: conditionImg,
            humidity: humidity,
            temperature: temperature,
            WindSpeed: WindSpeed,
          };
        } else {
          return task;
        }
      });
    },
  },
});

export const { addTasks, deleteTasks, toggleCompleted, editTask } =
  tasksSLice.actions;
export default tasksSLice.reducer;
