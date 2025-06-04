// src/features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    details: null,
    loading: false,
  },
  reducers: {
    setUserDetails(state, action) {
      state.details = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setUserDetails, setLoading } = userSlice.actions;
export default userSlice.reducer;
