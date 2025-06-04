// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../../api";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}users/login-user`, credentials);
      const data = response.data;

      // Calculate expiration time in ms (current time + expiresIn minutes)
      const expiresInMinutes = data.expiresIn || 60; // fallback to 60 mins if not provided
      const expirationTime =
        new Date().getTime() + expiresInMinutes * 60 * 1000;

      // Store token, user info, and expiration time in localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authUser", JSON.stringify(data));
      localStorage.setItem("authTokenExpiresAt", expirationTime);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const storedUser = localStorage.getItem("authUser");
const storedExpiresAt = localStorage.getItem("authTokenExpiresAt");

const isTokenExpired = () => {
  if (!storedExpiresAt) return true;
  return new Date().getTime() > parseInt(storedExpiresAt);
};

const initialState = {
  user: storedUser && !isTokenExpired() ? JSON.parse(storedUser) : null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.status = "idle"; // or 'logged_out' or something neutral
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      localStorage.removeItem("authTokenExpiresAt");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
