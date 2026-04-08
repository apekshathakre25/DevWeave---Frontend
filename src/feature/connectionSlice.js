import { createSlice } from "@reduxjs/toolkit";

export const connectionSlice = createSlice({
  name: "connection",
  initialState: [],
  reducers: {
    addConnection: (state, action) => {
      return action.payload;
    },
    removeConnection: (state, action) => {
      return state.filter((conn) => conn._id !== action.payload);
    },
  },
});

export const { addConnection, removeConnection } = connectionSlice.actions;

export default connectionSlice.reducer;
