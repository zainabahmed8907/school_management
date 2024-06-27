import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../api/services/auth.service";
import { toast } from "react-toastify";

const initialState = {
  data: [],
  loading: false,
  error: null,
  auth: false,
  token: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,

  reducers:()=>({
    signOut(state){
       state.auth=false;
       state.token=null;
       localStorage.clear();
    }
  }),

  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.error = action.payload.data?.message;
      state.auth = true;
      state.token = action.payload.data.token;
 
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.data = [];
    });
  },
});

export const {signOut}= AuthSlice.actions;

export default AuthSlice.reducer;
