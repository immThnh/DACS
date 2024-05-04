import React, { useState, memo, useEffect } from "react";
import { Link } from "react-router-dom";
import * as dataApi from "../../api/apiService/dataService.js";

function Badge({ children }) {
    return (
        <div className="flex justify-center px-2.5 py-1 bg-white rounded-md border border-gray-500 border-solid text-xs ">
            {children}
        </div>
    );
}
export const CourseCard = memo(
    ({ course, textBtn = "Get It Now", linkTo = "/" }) => {
        return (
            <div className="course-card w-full md:w-1/3 lg:w-1/3 px-4 flex flex-col mb-7">
                <div className="b-shadow bg-white rounded-xl border border-gray-100 p-6 flex flex-col">
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
                    <Link
                        className="px-4 py-2 text-xs sm:text-sm font-medium text-center rounded-md border border-gray-100 bg-neutral-100 text-neutral-800"
                        to={linkTo}
                    >
                        {textBtn}
                    </Link>
                </div>
            </div>
        );
    }
);

const CoursesComponent = () => {
    const [courses, setCourses] = useState();
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await dataApi.getAllCourse(0, 3);
                setCourses(result.content.content);
            } catch (error) {
                console.log("error: " + error);
            }
        };
        fetchApi();
    }, []);
    return (
        <section className="p-4 sm:px-5 sm:py-10 mx-auto max-w-[1200px]">
            <div className="flex flex-wrap justify-center">
                {courses &&
                    courses.map((course, index) => (
                        <CourseCard
                            key={index}
                            course={course}
                            linkTo={`/course/${course.id}`}
                        />
                    ))}
            </div>
        </section>
    );
};

export default CoursesComponent;
