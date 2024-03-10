import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../utils/apiClient";

export const getUserData = createAsyncThunk(
  "user/getData",
  async (token: string, thunkApi) => {
    try {
      thunkApi.dispatch({
        type: "login/setLoading",
        payload: true,
      });

      const resp = await apiClient.get(`auth/verify-token/${token}`);

      thunkApi.dispatch({
        type: "login/setAccount",
        payload: resp.data.fullUser,
      });

      if (resp.data.token) {
        localStorage.setItem("learnifyToken", resp.data.token);
      }

      thunkApi.dispatch({
        type: "login/setLoading",
        payload: false,
      });
    } catch (e) {
      localStorage.removeItem("learnifyToken");
      console.log(e);
      thunkApi.dispatch({
        type: "login/setLoading",
        payload: false,
      });
    }
  }
);
