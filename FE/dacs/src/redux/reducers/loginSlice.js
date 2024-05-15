import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState: {
        isLogin: sessionStorage.getItem("token") !== null,
        user: sessionStorage.getItem("user")
            ? JSON.parse(sessionStorage.getItem("user"))
            : null,

        token: sessionStorage.getItem("token"),
    },
    reducers: {
        setLogin: (state, action) => {
            const { token, user } = action.payload;
            user && sessionStorage.setItem("user", JSON.stringify(user));
            token && sessionStorage.setItem("token", token);
            state.user = user;
            state.isLogin = true;
        },
        setLogout: (state, action) => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            localStorage.removeItem("prevPath");
            state.isLogin = false;
            state.user = null;
        },
    },
});

export default loginSlice;
