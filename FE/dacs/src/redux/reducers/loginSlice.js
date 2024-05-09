import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "isLogin",
    initialState: {
        isLogin: sessionStorage.getItem("token") !== null,
        user: JSON.parse(sessionStorage.getItem("user")),
        token: sessionStorage.getItem("token"),
    },
    reducers: {
        setLogin: (state, action) => {
            const { isLogin, token, user } = action.payload;
            sessionStorage.setItem("user", JSON.stringify(user));
            sessionStorage.setItem("token", token);
            state.isLogin = isLogin;
            state.user = user;
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
