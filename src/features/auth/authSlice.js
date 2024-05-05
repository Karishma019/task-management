import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: false,
  reducers: {
    toggleAuth: (state) => {
      return !state;
    },
  },
});

export const { toggleAuth } = authSlice.actions;
export default authSlice.reducer;
