import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "isLogin",
    initialState: {
        isLogin: sessionStorage.getItem("token"),
    },
    reducers: {
        setLogin: (state, action) => {
            console.log(action.payload);
            const { isLogin, token, user } = action.payload;
            sessionStorage.setItem("user", JSON.stringify(user));
            sessionStorage.setItem("token", token);
            state.isLogin = isLogin;
        },
        setLogout: (state, payload) => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            localStorage.removeItem("prevPath");
            state.isLogin = false;
        },
    },
});

export default loginSlice;
