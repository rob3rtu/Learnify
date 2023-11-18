import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase-config";
import { CourseInterface, defaultFilters } from "./types";

export const getAllCourses = createAsyncThunk(
  "home/getAllCourses",
  async (_, thunkApi) => {
    thunkApi.dispatch({ type: "home/setLoading", payload: true });

    try {
      const resp = await getDocs(collection(firestore, "courses"));
      const data: CourseInterface[] = [];
      resp.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as CourseInterface);
      });

      thunkApi.dispatch({
        type: "home/setCourses",
        payload: data,
      });

      thunkApi.dispatch({
        type: "home/setFilteredCourses",
        payload: data.filter((course) => {
          return (
            course.domain === defaultFilters.domain &&
            course.year === defaultFilters.year &&
            course.semester === defaultFilters.semester
          );
        }),
      });

      thunkApi.dispatch({ type: "home/setLoading", payload: false });
    } catch (e) {
      console.log(e);
    }
  }
);
