import { configureStore } from "@reduxjs/toolkit";
import { landingCompSlice } from "./landing/landingComp-slice";
import { authSlice } from "./auth/auth-slice";

const store = configureStore({
  reducer: {
    LANDING_COMP: landingCompSlice.reducer,
    AUTH: authSlice.reducer,
  },
});

export { store };
