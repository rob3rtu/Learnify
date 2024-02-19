import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  CourseFilters,
  ForumInterface,
  FullCourseInterface,
  SideFiltersInterface,
  SideSortingInterface,
} from "./types";

type SliceState = {
  loading: boolean;
  course: FullCourseInterface | null;
  filters: CourseFilters;
  sideSorting: SideSortingInterface;
  sideFilters: SideFiltersInterface;
  forum: ForumInterface | null;
};

const initialState = {
  loading: false,
  course: null,
  filters: { section: "materials" },
  sideSorting: { sortBy: null },
  sideFilters: { filterBy: null },
  forum: null,
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
    setFilters: (state, action: PayloadAction<CourseFilters>) => {
      state.filters = action.payload;
    },
    setSideSorting: (state, action: PayloadAction<SideSortingInterface>) => {
      state.sideSorting = action.payload;
    },
    setSideFilters: (state, action: PayloadAction<SideFiltersInterface>) => {
      state.sideFilters = action.payload;
    },
    setForum: (state, action: PayloadAction<ForumInterface | null>) => {
      state.forum = action.payload;
    },
  },
});
