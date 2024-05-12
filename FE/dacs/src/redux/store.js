import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./reducers/loginSlice";
const store = configureStore({
    reducer: { login: loginSlice.reducer },
});

export default store;
