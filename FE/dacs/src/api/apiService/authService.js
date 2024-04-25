import instance, { setToken } from "../instance";
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
        return await instance.get("/api/v1/user/getAll");
    } catch (error) {
        return Promise.reject(error);
    }
};
