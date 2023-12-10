import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { loginSlice } from "./components/Login/slice";
import { homeSlice } from "./components/Home/slice";

export const store = configureStore({
  reducer: {
    auth: loginSlice.reducer,
    home: homeSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
export type RootState = ReturnType<typeof store.getState>;
