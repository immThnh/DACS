import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./reducers/loginReducer";
const store = configureStore({
    reducer: { login: loginSlice.reducer },
});

export default store;
