import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/userSlice";
import connectionReducer from "../feature/connectionSlice";
import feedReducer from "../feature/feedSlice";
import requestReducer from "../feature/requestSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    request: requestReducer,
  },
});
