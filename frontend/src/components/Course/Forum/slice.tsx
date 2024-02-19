import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ForumInterface } from "../types";

type SliceState = {
  loading: boolean;
  forum: ForumInterface | null;
};

const initialState = {
  loading: false,
  forum: null,
};

export const forumSlice = createSlice({
  name: "forum",
  initialState: initialState as SliceState,
  reducers: {
    reset: (state) => Object.assign(state, initialState),
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setForum: (state, action: PayloadAction<ForumInterface | null>) => {
      state.forum = action.payload;
    },
  },
});
