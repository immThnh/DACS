import axios from "axios";

const getToken = () => {
    return sessionStorage.getItem("token");
};

const publicInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1/public",
    headers: { Authorization: `Bearer ${getToken()}` },
});
export const privateInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1/private",
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
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (token != null) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

privateInstance.interceptors.response.use(
    function (res) {
        return res.data;
    },
    function (error) {
        console.log(error);
        return Promise.reject(error);
    }
);

privateInstance.interceptors.request.use(function (config) {
    let token = sessionStorage.getItem("token");
    console.log(token);
    token =
        "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTQ5NDE4NTIsInN1YiI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE0OTM4MjUyfQ.z-VPHYtdOUBUc0eiwrM1SE5W0UfBkAJeEj6XF8QVuf4";
    if (token != null) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default publicInstance;
