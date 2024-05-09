import axios from "axios";
import loginSlice from "../redux/reducers/loginSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
let redirectPage = null;
export const injectNavigate = (navigate) => {
    redirectPage = navigate;
};

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
        console.log("error: " + error);
        return Promise.reject(error.response.data);
    }
);

privateInstance.interceptors.request.use(function (config) {
    let token = sessionStorage.getItem("token");
    if (token != null) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const userInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1/me",
});

userInstance.interceptors.response.use(
    function (res) {
        return res.data;
    },
    function (error) {
        // const dispatch = useDispatch;
        if (error.response.status === 401) {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            sessionStorage.setItem("prevPath", window.location.pathname);
            toast.error("Session is expired, Please try logging in again");
            redirectPage("/login");
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error.response.data);
    }
);

userInstance.interceptors.request.use(function (config) {
    let token = sessionStorage.getItem("token");
    if (token != null) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default publicInstance;

export function test({ children }) {
    return <>{children}</>;
}
