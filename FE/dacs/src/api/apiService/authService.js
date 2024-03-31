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
            "/auth/register",
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
    return await instance.post(
        "/auth/login",
        {
            email,
            password,
        },
        { "content-type": "application/json" }
    );
};


export const sendMail = async (email) => {
    try {
        const res = await instance.post(
            "/auth/send-verify-email",
            {
                email,
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


