import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: any;
}

const getInitialUser = () => {
  if (typeof window !== "undefined") {
    const cookies = document.cookie.split("; ");
    const userCookie = cookies.find((row) => row.startsWith("loggedInUser="));
    if (userCookie) {
      try {
        const userStr = decodeURIComponent(userCookie.split("=")[1]);
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
  }
  return null;
};

const initialState: AuthState = {
  user: getInitialUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
