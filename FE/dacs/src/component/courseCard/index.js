// File: src/components/CourseCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import PropTypes from "prop-types";
import * as userApi from "../../api/apiService/authService.js";
function Badge({ children }) {
    return (
        <div className="flex justify-center px-2.5 py-1 bg-white rounded-md border border-gray-500 border-solid text-xs ">
            {children}
        </div>
    );
}

const CourseCard = ({ course, textBtn = "Get It Now", courseId = -1 }) => {
    const user = useSelector((state) => state.login.user);
    const navigate = useNavigate();

    if (!course) {
        return null; // or a fallback UI
    }

    const handleGoToCourse = () => {
        if (user) {
            const fetchApi = async () => {
                try {
                    const result = await userApi.getListCourse(user.email);
                    let isEnroll = false;
                    result.content.forEach((progress) => {
                        if (progress.course.id === courseId) {
                            isEnroll = true;
                            navigate(`/course/detail/${courseId}`);
                        }
                    });
                    if (!isEnroll) {
                        navigate(`/course/${courseId}`);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            fetchApi();
        } else {
            toast.info("Please login to enroll this course");
            sessionStorage.setItem("prevPath", window.location.pathname);
            navigate("/login");
        }
    };

    return (
        <div className="course-card w-full px-4 flex flex-col mb-7">
            <div className="b-shadow h-[400px] bg-white rounded-xl border border-gray-100 p-6 flex flex-col ">
                <div className="flex justify-center">
                    <img
                        src={course.thumbnail}
                        alt=""
                        className="course-image rounded-t-lg mb-4 w-full object-cover"
                        style={{ height: "120px", objectFit: "contain" }}
                    />
                </div>
                <div className="flex justify-start space-x-2 mb-2">
                    {course.categories.map((category) => (
                        <Badge key={category.id}>{category.name}</Badge>
                    ))}
                </div>
                <h3 className="text-md sm:text-lg font-semibold text-neutral-800 mb-2 truncate text-start">
                    {course.title}
                </h3>
                <p className="h-14 des-line-3 text-neutral-600 text-xs sm:text-sm mb-4 line-clamp text-start">
                    {course.description}
                </p>
                <button
                    type="button"
                    onClick={handleGoToCourse}
                    className="px-4 py-2 text-xs sm:text-sm font-medium text-center rounded-md border border-gray-100 bg-neutral-100 text-neutral-800"
                >
                    {textBtn}
                </button>
            </div>
        </div>
    );
};

CourseCard.propTypes = {
    course: PropTypes.object.isRequired,
    textBtn: PropTypes.string,
    courseId: PropTypes.number
};

export default React.memo(CourseCard);