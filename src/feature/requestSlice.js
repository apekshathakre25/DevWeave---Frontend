import { createSlice } from "@reduxjs/toolkit";

export const requestSlice = createSlice({
  name: "request",
  initialState: [],
  reducers: {
    getRequest: (_, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      return state.filter((conn) => conn._id != action.payload);
    },
  },
});

export const { getRequest, removeRequest } = requestSlice.actions;

export default requestSlice.reducer;
