import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "isLogin",
    initialState: {
        isLogin: false,
    },
    reducers: {
        setLogin: (state, action) => {
            state.isLogin = true;
        },
        setLogout: (state, payload) => {
            state.isLogin = false;
        },
    },
});

export default loginSlice;
