import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FullCourseInterface } from "./types";

type SliceState = {
  loading: boolean;
  course: FullCourseInterface | null;
};

const initialState = {
  loading: false,
  course: null,
};

export const courseSlice = createSlice({
  name: "course",
  initialState: initialState as SliceState,
  reducers: {
    reset: (state) => Object.assign(state, initialState),
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCourse: (state, action: PayloadAction<FullCourseInterface>) => {
      state.course = action.payload;
    },
  },
});
