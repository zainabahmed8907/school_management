import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config";


//Sign In API
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    const logindata = await axiosInstance
      .post("/login", data)
      .then((response) => {
        
        localStorage.setItem("token", response.data?.token);
        return response;
      })

      .catch((err) => rejectWithValue(err.response.data));

    return logindata;
  }
);

