import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SliceState = {
  error: string;
  loading: boolean;
  account?: any;
};

const initialState = {
  error: "",
  loading: false,
  account: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState: initialState as SliceState,
  reducers: {
    reset: (state) => Object.assign(state, initialState),
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setAccount: (state, action: PayloadAction<any | null>) => {
      state.account = action.payload;
    },
  },
});
