import publicInstance, { userInstance } from "../instance";
import instance, { privateInstance, setToken } from "../instance";
export const register = async ({
    firstName,
    lastName,
    email,
    password,
    otp,
}) => {
    try {
        const res = await instance.post(
            "/user/register",
            {
                firstName,
                lastName,
                email,
                password,
            },
            {
                "content-type": "application/json",
            }
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const login = async ({ email, password }) => {
    try {
        const res = await instance.post(
            "/user/login",
            {
                email,
                password,
            },
            { "content-type": "application/json" }
        );

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const sendMail = async (email) => {
    console.log(email);
    try {
        const res = await instance.post(
            "/user/send-verify-email",
            {
                email,
            },
            {
                "content-type": "application/json",
            }
        );
        return res;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

export const sendResetPasswordEmail = async (email) => {
    try {
        return await instance.post(
            "/user/send-reset-password-email",
            { email },
            { "content-type": "application/json" }
        );
    } catch (error) {
        return Promise.reject(error);
    }
};

export const validateCode = async ({ email, code }) => {
    try {
        return await instance.post(
            "/user/verify-reset-password-code",
            {
                email,
                code,
            },
            { "content-type": "application/json" }
        );
    } catch (error) {}
};

export const resetPassword = async ({ email, password }) => {
    try {
        return await instance.post(
            "/user/reset-password",
            {
                email,
                password,
            },
            {
                "content-type": "application/json",
            }
        );
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAllUser = async () => {
    try {
        return await privateInstance.get("/user/getAll?page=0&size=5");
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAllDeletedUser = async () => {
    try {
        return await privateInstance.get("/user/getAllDeleted?page=0&size=5");
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAllRole = async () => {
    try {
        return await privateInstance.get("/user/getAllRole");
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getUserByName = async (userName, page, size) => {
    try {
        return privateInstance.get(
            `/user/search?name=${userName}&page=${page}&size=${size}`
        );
    } catch (error) {
        Promise.reject(error);
    }
};

export const getUserByRole = (role, page, size) => {
    try {
        return privateInstance.get(
            `/user/filter?role=${role}&page=${page}&size=${size}`
        );
    } catch (error) {
        Promise.reject(error);
    }
};

export const getUserByPage = async (page, size) => {
    try {
        return privateInstance.get(`/user/getAll?page=${page}&size=${size}`);
    } catch (error) {
        Promise.reject(error);
    }
};

export const softDeleteUser = async (id) => {
    try {
        const result = await privateInstance.put(`/user/delete/soft/${id}`);
        return result;
    } catch (error) {
        return Promise.reject(error);
    }
};
export const hardDeleteUser = async (id) => {
    try {
        const result = await privateInstance.delete(`/user/delete/hard/${id}`);
        return result;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const restoreUserById = async (id) => {
    try {
        return privateInstance.put(`/user/restore/${id}`);
    } catch (error) {
        Promise.reject(error);
    }
};

export const getAdminDashBoard = async () => {
    try {
        return privateInstance.get("/user");
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getUserInfo = async () => {
    try {
        return userInstance.get("/username");
    } catch (error) {
        return Promise.reject(error);
    }
};

export const logout = async () => {
    try {
        return userInstance.post("/logout");
    } catch (error) {
        return Promise.reject(error);
    }
};
