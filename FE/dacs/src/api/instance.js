import axios from "axios";

let token;

export const setToken = (jwt) => {
    token = jwt;
};

const instance = axios.create({
    baseURL: "http://localhost:8080/api/v1",
});

instance.interceptors.response.use(
    function (res) {
        return res.data;
    },
    function (error) {
        return Promise.reject(error.response.data);
    }
);

instance.interceptors.request.use(function (config) {
    if (token != null) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default instance;
