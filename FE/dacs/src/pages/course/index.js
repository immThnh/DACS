import * as React from "react";
import styles from "./Course.module.scss";
import clsx from "clsx";
import { toast } from "sonner";
import * as dataApi from "../../api/apiService/dataService";
import { useParams } from "react-router-dom";
const CurriculumItem = ({ item, index, isHighlighted }) => (
    <div
        className={clsx(styles.curriculumItem, {
            [styles.highlighted]: isHighlighted,
        })}
    >
        <div className={styles.curriculumItemNumber}>0{index + 1}</div>
        <div className={styles.curriculumItemTitle}>{item.title}</div>
    </div>
);

// const CourseDetails = ({ course, expanded }) => (
//     <div
//         className={clsx(styles.courseDetailsWrapper, {
//             [styles.expanded]: expanded,
//         })}
//     >
//         <h3 className={styles.courseDetailsTitle}>Curriculum</h3>
//         <div className={styles.courseCurriculum}>
//             {course.curriculum.map((item, index) => (
//                 <CurriculumItem
//                     key={index}
//                     item={item}
//                     isHighlighted={index % 2 === 0}
//                 />
//             ))}
//         </div>
//     </div>
// );

const initCourse = {
    title: "Web Design Fundamentals",
    description:
        "Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.",
    images: [
        {
            src: "https://picsum.photos/id/238/800",
            alt: "Course Image 1",
        },
        {
            src: "https://picsum.photos/id/239/800",
            alt: "Course Image 2",
        },
        {
            src: "https://picsum.photos/id/240/800",
            alt: "Course Image 3",
        },
    ],

    thumbnail: "",
    duration: "4 Weeks",
    level: "Beginner",
    author: "John Smith",
    price: "336.000",
    lessons: [
        {
            id: "01",
            title: "Introduction to HTML",
        },
        {
            id: "02",
            title: "Styling with CSS",
        },
        {
            id: "03",
            title: "Introduction to Responsive Design",
        },
        {
            id: "04",
            title: "Design Principles for Web",
        },
        {
            id: "05",
            title: "Building a Basic Website",
        },
        {
            id: "06",
            title: "Introduction to HTML",
        },
        {
            number: "07",
            title: "Introduction to HTML",
        },
    ],
};
function Course() {
    const { id } = useParams();
    const [course, setCourse] = React.useState(initCourse);

    React.useEffect(() => {
        const fetchApi = () => {
            toast.promise(dataApi.getCourseById(id), {
                loading: "Loading...",
                success: (data) => {
                    console.log(data);
                    setCourse(data.content);
                    return "Get data successfully";
                },
                error: (error) => {
                    return error.content;
                },
            });
        };
        fetchApi();
    }, []);
    return (
        <div className={styles.detailsContainer}>
            <div className={styles.courseCard}>
                <div
                    className={clsx(
                        styles.courseHeader,
                        styles.someOtherCondition && styles.additionalClass
                    )}
                >
                    <div className={styles.courseInfo}>
                        <h2 className={styles.courseTitle}>{course.title}</h2>
                        <p className={styles.courseDescription}>
                            {course.description}
                        </p>
                    </div>
                    <div className={styles.coursePrice}>{course.price} VND</div>
                    <div className={styles.courseCta}>Add To Cart</div>
                </div>
                <div className={styles.courseImages}>
                    {/* {coursecourse.thumbnail.map((image, index) => (
                        <div key={index} className={styles.courseImageWrapper}>
                            <img
                                src={image.src}
                                alt={image.alt}
                                className={styles.courseImage}
                            />
                        </div>
                    ))} */}
                    <img
                        src={course.thumbnail}
                        alt={course.thumbnail}
                        className={styles.courseImage}
                    />
                </div>
                <div className={styles.courseMeta}>
                    <div className={styles.courseDetails}>
                        <div className={styles.courseDuration}>
                            {course.duration}
                        </div>
                        <div className={styles.courseLevel}>{course.level}</div>
                    </div>
                </div>
                <div className={clsx(styles.courseDetailsWrapper, "pl-5")}>
                    <div className={clsx(styles.curriculumTitle, "font-semibold")}>Curriculum</div>
                    <div className={styles.courseCurriculum}>
                        {course.lessons &&
                            course.lessons.map((item, index) => (
                                <CurriculumItem
                                    key={index}
                                    index={index}
                                    item={item}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Course;
