import axios from "axios";

const getToken = () => {
    return sessionStorage.getItem("token");
};

const publicInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1/public",
    headers: { Authorization: `Bearer ${getToken()}` },
});

publicInstance.interceptors.response.use(
    function (res) {
        return res.data;
    },
    function (error) {
        return Promise.reject(error.response.data);
    }
);

publicInstance.interceptors.request.use(function (config) {
    let token = sessionStorage.getItem("token");
    if (token != null) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const privateInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1/private",
});

privateInstance.interceptors.response.use(
    function (res) {
        return res.data;
    },
    function (error) {
        return Promise.reject(error.response.data);
    }
);

privateInstance.interceptors.request.use(function (config) {
    let token = sessionStorage.getItem("token");
    if (token != null) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const userInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1/user",
});

userInstance.interceptors.response.use(
    function (res) {
        return res.data;
    },
    function (error) {
        return Promise.reject(error.response.data);
    }
);

userInstance.interceptors.request.use(function (config) {
    let token = sessionStorage.getItem("token");
    if (token != null) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default publicInstance;
