import { createSlice } from "@reduxjs/toolkit";

export const landingCompSlice = createSlice({
  name: "landingCompSlice",
  initialState: {
    compName: "",
  },
  reducers: {
    setCompNameAction: (currentSlice, action) => {
      currentSlice.compName = action.payload;
    },
  },
});

export const { setCompNameAction } = landingCompSlice.actions;
