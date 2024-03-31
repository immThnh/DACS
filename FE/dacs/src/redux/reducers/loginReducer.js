import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "isLogin",
    initialState: {
        isLogin: "",
        isLogout: "",
    },
    reducers: {
        setLogin: (state, action) => {
            state.isLogin = true;
        },
        setSignUp: (state) => {
            state.isLogin = false;
        },
        setLogout: (state, payload) => {
            state.isLogout = payload.action;
        },
    },
});

export default loginSlice;
