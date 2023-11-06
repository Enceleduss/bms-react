import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: "",
    roles: [],
    accessToken: "",
  },
  reducers: {
    setAuthDetailsAction: (currentSlice, action) => {
      console.log(
        "inside setAuthDetailsAction with payload ",
        JSON.stringify(action.payload)
      );
      currentSlice.accessToken = action.payload.accessToken;
      currentSlice.roles = action.payload.roles;
      currentSlice.user = action.payload.user;
    },
    setAccessTokenAction: (currentSlice, action) => {
      currentSlice.accessToken = action.payload;
    },
    clearAuthDetailsAction: (currentSlice) => {
      currentSlice.accessToken = "";
      currentSlice.roles = [];
      currentSlice.user = "";
    },
  },
});

export const { setAuthDetailsAction, setAccessTokenAction,clearAuthDetailsAction } = authSlice.actions;
