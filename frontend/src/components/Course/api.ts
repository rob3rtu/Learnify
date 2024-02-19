import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../utils/apiClient";

export const getCurrentCourse = createAsyncThunk(
  "course/getCurrentCourse",
  async (id: string, thunkApi) => {
    try {
      thunkApi.dispatch({
        type: "course/setLoading",
        payload: true,
      });
      thunkApi.dispatch({
        type: "course/setCourse",
        payload: null,
      });

      const resp = await apiClient.get(`course/${id}`);

      thunkApi.dispatch({
        type: "course/setCourse",
        payload: resp.data,
      });

      thunkApi.dispatch({
        type: "course/setLoading",
        payload: false,
      });
    } catch (e) {
      console.log(e);
      thunkApi.dispatch({
        type: "course/setCourse",
        payload: null,
      });

      thunkApi.dispatch({
        type: "course/setLoading",
        payload: false,
      });
    }
  }
);

export const getForum = createAsyncThunk(
  "forum/getForum",
  async (id: string, thunkApi) => {
    try {
      thunkApi.dispatch({
        type: "forum/setLoading",
        payload: true,
      });

      const resp = await apiClient.get(`forum/${id}`);

      thunkApi.dispatch({
        type: "forum/setForum",
        payload: resp.data,
      });

      thunkApi.dispatch({
        type: "forum/setLoading",
        payload: false,
      });
    } catch (e) {
      console.log(e);
      thunkApi.dispatch({
        type: "forum/setForum",
        payload: null,
      });

      thunkApi.dispatch({
        type: "forum/setLoading",
        payload: false,
      });
    }
  }
);
