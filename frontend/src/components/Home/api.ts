import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../utils/apiClient";

export const getCourses = createAsyncThunk(
  "home/getCourses",
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch({
        type: "home/setLoading",
        payload: true,
      });

      const resp = await apiClient.get("course/all");

      thunkApi.dispatch({
        type: "home/setCourses",
        payload: resp.data.courses,
      });

      thunkApi.dispatch({
        type: "home/setLoading",
        payload: false,
      });
    } catch (e) {
      console.log(e);
    }
  }
);
