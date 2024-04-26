import { clear } from "@testing-library/user-event/dist/clear";
import instance, { setToken } from "../instance";
export const getAllCategories = async () => {
    try {
        const res = await instance.get("/data/category/getAll");
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const createCourse = async (course, thumbnail = "", videos = "") => {
    const formData = new FormData();
    const json = JSON.stringify(course);
    const courseBlob = new Blob([json], {
        type: "application/json",
    });

    for (let i = 0; i < videos.length; i++) {
        formData.append("videos", videos[i]);
    }
    formData.append("course", courseBlob);
    formData.append("thumbnail", thumbnail);

    try {
        const response = await instance.post("/data/course/create", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("Response:", response);
    } catch (error) {
        return Promise.reject(error.response.data);
    }
};

export const updateCourse = async (id, course, thumbnail, videos) => {
    console.log(course);
    const formData = new FormData();
    const json = JSON.stringify(course);
    const courseBlob = new Blob([json], {
        type: "application/json",
    });

    for (let i = 0; i < videos.length; i++) {
        formData.append("videos", videos[i]);
    }

    formData.append("course", courseBlob);
    formData.append("thumbnail", thumbnail);
    try {
        const result = await instance.putForm(
            `/data/course/edit/${id}`,
            formData
        );
        return result;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAllCourse = async () => {
    try {
        const result = await instance.get("/data/course/getAll");
        return result;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

export const getCourseById = async (id) => {
    try {
        return await instance.get(`/data/course/${id}`);
    } catch (error) {
        return Promise.reject(error.response.data);
    }
};

export const removeCourse = async (id) => {
    try {
        const result = await instance.delete(`/data/course/delete/${id}`);
        return result;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getCoursesByCategory = (id) => {
    console.log(id);
    try {
        return instance.get(`/data/course/category?id=${id}`);
    } catch (error) {
        console.log(error.mess);
        Promise.reject(error);
    }
};

export const getCourseByName = (title) => {
    try {
        return instance.get(`/data/course?title=${title}`);
    } catch (error) {
        Promise.reject(error.mess);
    }
};
