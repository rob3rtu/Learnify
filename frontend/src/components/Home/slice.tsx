import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CourseInterface, FiltersInterface, defaultFilters } from "./types";

type SliceState = {
  loading: boolean;
  courses: CourseInterface[];
  filteredCourses: CourseInterface[];
  filters: FiltersInterface;
};

const initialState = {
  loading: false,
  courses: [],
  filteredCourses: [],
  filters: defaultFilters,
};

export const homeSlice = createSlice({
  name: "home",
  initialState: initialState as SliceState,
  reducers: {
    reset: (state) => Object.assign(state, initialState),
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCourses: (state, action: PayloadAction<CourseInterface[]>) => {
      state.courses = action.payload;
    },
    setFilteredCourses: (state, action: PayloadAction<CourseInterface[]>) => {
      state.filteredCourses = action.payload;
    },
    setFilters: (state, action: PayloadAction<FiltersInterface>) => {
      state.filters = action.payload;
    },
  },
});
