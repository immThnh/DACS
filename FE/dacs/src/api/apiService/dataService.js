import instance, { setToken } from "../instance";
export const getAllCategories = async (page = 0, size = 9999999) => {
    try {
        const res = await instance.get(
            `/data/category/getAll?page=${page}&size=${size}`
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};
export const getAllCategoryDeleted = async (page, size) => {
    try {
        const res = await instance.get(
            `/data/category/getAllDeleted?page=${page}&size=${size}`
        );
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const createCourse = async (
    course,
    thumbnail = "",
    courseVideo = "",
    videos = ""
) => {
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
    formData.append("courseVideo", courseVideo);

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

export const updateCourse = async (id, course, thumbnail, video, videos) => {
    const formData = new FormData();
    console.log(course);
    const json = JSON.stringify(course);
    const courseBlob = new Blob([json], {
        type: "application/json",
    });

    for (let i = 0; i < videos.length; i++) {
        formData.append("videos", videos[i]);
    }

    formData.append("course", courseBlob);
    formData.append("thumbnail", thumbnail);
    formData.append("courseVideo", video);
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

export const getAllCourse = async (page = 0, size = 5) => {
    try {
        const result = await instance.get(
            `/data/course/getAll?page=${page}&size=${size}`
        );
        return result;
    } catch (error) {
        return Promise.reject(error);
    }
};
export const getAllCourseDeleted = async (page, size) => {
    try {
        const result = await instance.get(
            `/data/course/getAllDeleted?page=${page}&size=${size}`
        );
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

export const softDeleteCourse = async (id) => {
    try {
        const result = await instance.put(`/data/course/delete/soft/${id}`);
        return result;
    } catch (error) {
        return Promise.reject(error);
    }
};
export const hardDeleteCourse = async (id) => {
    try {
        const result = await instance.delete(`/data/course/delete/hard/${id}`);
        return result;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getCoursesDeletedByCategory = (id, page, size) => {
    try {
        return instance.get(
            `/data/course/deleted/category?id=${id}&page=${page}&size=${size}`
        );
    } catch (error) {
        console.log(error.mess);
        Promise.reject(error);
    }
};
export const getCoursesByCategory = (id, page, size) => {
    try {
        return instance.get(
            `/data/course/category?id=${id}&page=${page}&size=${size}`
        );
    } catch (error) {
        console.log(error.mess);
        Promise.reject(error);
    }
};

export const getCourseByName = (title, page, selected) => {
    try {
        return instance.get(
            `/data/course?title=${title}&page=${page}&selected=${selected}`
        );
    } catch (error) {
        Promise.reject(error.mess);
    }
};

export const softDeleteCategoryById = (id) => {
    try {
        return instance.put(`/data/category/delete/soft/${id}`);
    } catch (error) {
        Promise.reject(error);
    }
};

export const hardDeleteCategoryById = (id) => {
    try {
        return instance.delete(`/data/category/delete/hard/${id}`);
    } catch (error) {
        Promise.reject(error);
    }
};
export const restoreCategoryById = (id) => {
    try {
        return instance.put(`/data/category/restore/${id}`);
    } catch (error) {
        Promise.reject(error);
    }
};

export const getCategoryByTitle = (name, page, selected) => {
    console.log(name);
    try {
        return instance.get(
            `/data/category?name=${name}&page=${page}&selected`
        );
    } catch (error) {
        Promise.reject(error);
    }
};

export const editCategory = (id, category) => {
    try {
        return instance.put(`/data/category/${id}`, category);
    } catch (error) {
        Promise.reject(error);
    }
};

export const getCategoryById = (id) => {
    try {
        return instance.get(`/data/category/${id}`);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const createCategory = (category) => {
    try {
        return instance.post(`/data/category/create`, category);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const restoreCourseById = (id) => {
    try {
        return instance.put(`data/course/restore/${id}`);
    } catch (error) {
        Promise.reject(error);
    }
};
