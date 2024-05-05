import React, { useEffect, useState } from "react"; // This imports the useState hook
import styles from "./DetailCourse.module.scss";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import clsx from "clsx";
import * as dataApi from "../../../api/apiService/dataService.js";

const PlayIcon = () => (
    <div className={styles.playIcon}>
        <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/91b4c2d063585c32b868da3584ddb0514cbf2955902271549e68b7c3ffeb1802?apiKey=9349475655ee4a448868f824f5feb11d&"
            alt="Play icon"
        />
    </div>
);

const TimeInfo = ({ icon, time }) => (
    <div className={styles.timeInfo}>
        <img src={icon} alt="Clock icon" className={styles.clockIcon} />
        <div className={styles.time}>{time} Minutes</div>
    </div>
);
const LessonItem = ({
    id,
    title,
    lesson,
    time,
    isHighlighted,
    videoUrl,
    onVideoSelect,
}) => (
    <div
        className={`${styles.lessonItem} ${
            isHighlighted ? styles.highlighted : ""
        }`}
        onClick={() => onVideoSelect(id, videoUrl)}
    >
        <div className={styles.lessonInfo}>
            <div className={styles.lessonTitle}>{title}</div>
            <div className={styles.lessonNumber}>{lesson}</div>
        </div>
        <div className={styles.timeInfo}>
            <TimeInfo
                icon={
                    isHighlighted
                        ? "https://cdn.builder.io/api/v1/image/assets/TEMP/23214151b02736ebba19b562aabfd0bc3fc955a52ce1a15c8b59fd722461241d?apiKey=9349475655ee4a448868f824f5feb11d&"
                        : "https://cdn.builder.io/api/v1/image/assets/TEMP/23214151b02736ebba19b562aabfd0bc3fc955a52ce1a15c8b59fd722461241d?apiKey=9349475655ee4a448868f824f5feb11d&"
                }
                time={time}
            />
        </div>
    </div>
);

const CourseHero = ({ video = "", thumbnail }) => {
    if (!video.startsWith("https://res.cloudinary.com")) {
        var parts = video.split("/");
        var videoId = parts[parts.length - 1].split("?")[0];
        videoId = `https://www.youtube.com/embed/${videoId}`;
    }

    return (
        <section className={clsx(styles.courseHero)}>
            {video.startsWith("https://res.cloudinary.com") && video !== "" && (
                <video
                    key={video}
                    controls
                    className={clsx(
                        styles.videoPlayer,
                        "rounded-lg cursor-pointer h-full w-full object-contain bg-black"
                    )}
                >
                    <source src={video} type="video/mp4" />
                </video>
            )}
            {!video.startsWith("https://res.cloudinary.com") &&
                video !== "" && (
                    <iframe
                        title="Video"
                        src={videoId}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className={clsx(styles.videoPlayer, "rounded-lg")}
                    ></iframe>
                )}
            {video === "" ? <img src={thumbnail} alt="Course thumbnail" /> : ""}
        </section>
    );
};

const initFormData = {
    title: "",
    desc: "",
    price: "",
    thumbnail: "",
    date: "",
    categories: [],
};
const CurriculumItem = ({ item, index, isHighlighted, handleVideoSelect }) => {
    const handleOpenSubLesson = () => {
        const sub = document.getElementById(index);
        sub.classList.toggle("disabled");
    };

    return (
        <div className={clsx(styles.curriculumItem, {})}>
            <div
                className={clsx(styles.title, "flex cursor-pointer p-2 w-full")}
                onClick={handleOpenSubLesson}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-6 h-6 mt-1.5"
                >
                    <path
                        fillRule="evenodd"
                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                    />
                </svg>
                <div
                    className={clsx(
                        styles.curriculumItemTitle,
                        "flex w-full justify-between"
                    )}
                >
                    <div className="w-3/4 line-clamp-2 flex-1">
                        {item.title}
                    </div>
                </div>
            </div>

            <div
                id={index}
                className={clsx(styles.wrapLesson, "w-full disabled")}
            >
                {item.lessons &&
                    item.lessons.map((lesson, ind) => {
                        return (
                            <div
                                key={ind}
                                onClick={() =>
                                    handleVideoSelect(
                                        ind,
                                        lesson.video,
                                        lesson.linkVideo
                                    )
                                }
                                className={clsx(
                                    styles.lessonItem,

                                    "flex ml-6 gap-6",
                                    {
                                        [styles.highlighted]:
                                            ind === isHighlighted,
                                    }
                                )}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
                                    />
                                </svg>
                                <span>{lesson.title}</span>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
function DetailCourse() {
    const [currentVideoUrl, setCurrentVideoUrl] = useState("");
    const [highlightedId, setHighlightedId] = useState(null);
    const [course, setCourse] = useState(initFormData);
    const { id } = useParams();

    const handleVideoSelect = (id, video, linkVideo) => {
        if (video !== "" && linkVideo === "") {
            setCurrentVideoUrl(video);
        } else {
            setCurrentVideoUrl(linkVideo);
        }
        setHighlightedId(id);
    };

    useEffect(() => {
        const fetchApi = () => {
            toast.promise(dataApi.getCourseById(id), {
                loading: "Loading...",
                success: (data) => {
                    setCurrentVideoUrl(data.content.video);
                    setCourse(data.content);
                    return "Get data is successful";
                },
                error: (error) => {
                    return error.content;
                },
            });
        };

        fetchApi();
    }, []);

    return (
        <>
            <main className={clsx(styles.uiUxCourse)}>
                <div className={clsx("w-full")}>
                    <div className={clsx("row")}>
                        <div
                            className={clsx(styles.videoContainer, "col-lg-9")}
                        >
                            <CourseHero
                                video={currentVideoUrl}
                                thumbnail={course.thumbnail}
                            />
                        </div>
                        <div
                            className={clsx(
                                styles.courseSectionsContainer,
                                "col-lg-3"
                            )}
                        >
                            <section className={styles.courseSection}>
                                <div className={styles.sectionHeader}>
                                    <div className={styles.sectionNumber}>
                                        Curriculum
                                    </div>
                                </div>
                                <div className={styles.courseCurriculum}>
                                    {course.sections &&
                                        course.sections.map((item, index) => (
                                            <CurriculumItem
                                                isHighlighted={highlightedId}
                                                handleVideoSelect={
                                                    handleVideoSelect
                                                }
                                                key={index}
                                                index={index}
                                                item={item}
                                            />
                                        ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default DetailCourse;
