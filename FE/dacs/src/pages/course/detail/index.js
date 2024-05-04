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

const CourseSection = ({ sectionNumber, sectionTitle, lessons }) => (
    <section className={styles.courseSection}>
        <div className={styles.sectionHeader}>
            <div className={styles.sectionNumber}>{sectionNumber}</div>
            <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
        </div>
        {lessons.map((lesson, index) => (
            <LessonItem key={index} {...lesson} />
        ))}
    </section>
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
                    controls
                    className={clsx(
                        styles.videoPlayer,
                        "rounded-lg cursor-pointer h-full"
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

const CourseIntro = ({ name = "Course name", desc = "Course description" }) => (
    <section className={styles.courseIntro}>
        <div className={styles.introContent}>
            <h1 className={styles.courseTitle}>{name}</h1>
            <p className={styles.courseDescription}>{desc}</p>
        </div>
    </section>
);
const initFormData = {
    title: "",
    desc: "",
    price: "",
    thumbnail: "",
    date: "",
    categories: [],
};
function DetailCourse() {
    const [currentVideoUrl, setCurrentVideoUrl] = useState("");
    const [highlightedId, setHighlightedId] = useState(null);
    const [course, setCourse] = useState(initFormData);
    const { id } = useParams();

    const handleVideoSelect = (id, video, linkVideo) => {
        if (video !== "" && linkVideo === "") {
            console.log(typeof linkVideo);
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
            <main className={clsx(styles.uiUxCourse, "container")}>
                <CourseIntro name={course.title} desc={course.description} />

                <div className={clsx("w-full")}>
                    <div className={clsx("row")}>
                        <div
                            className={clsx(styles.videoContainer, "col-lg-8")}
                        >
                            {" "}
                            <CourseHero
                                video={currentVideoUrl}
                                thumbnail={course.thumbnail}
                            />
                        </div>
                        <div
                            className={clsx(
                                styles.courseSectionsContainer,
                                "col-lg-4"
                            )}
                        >
                            <section className={styles.courseSection}>
                                <div className={styles.sectionHeader}>
                                    <div className={styles.sectionNumber}>
                                        Curriculum
                                    </div>
                                    <div className={styles.sectionTitle}></div>
                                </div>
                                {course.lessons &&
                                    course.lessons.map((lesson, index) => (
                                        <LessonItem
                                            key={index}
                                            {...lesson}
                                            index={index}
                                            onVideoSelect={() => {
                                                handleVideoSelect(
                                                    lesson.id,
                                                    lesson.video,
                                                    lesson.linkVideo
                                                );
                                            }}
                                            isHighlighted={
                                                lesson.id === highlightedId
                                            }
                                        />
                                    ))}
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default DetailCourse;
