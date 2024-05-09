import React, { useEffect, useState } from "react"; // This imports the useState hook
import styles from "./DetailCourse.module.scss";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import clsx from "clsx";
import * as dataApi from "../../../api/apiService/dataService.js";
import logoPage from "../../../assets/images/logo.png";
import Comment from "../../../component/comment/index.js";

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
                        "cursor-pointer h-full w-full object-contain bg-black"
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
const CurriculumItem = ({
    item,
    index,
    isHighlighted,
    handleVideoSelect,
    setCurrentProgress,
}) => {
    const handleOpenSubLesson = (e) => {
        const sub = document.getElementById(index);
        sub.classList.toggle("disabled");
        e.currentTarget.classList.toggle(styles.active);
    };
    const handleChecked = (e) => {
        if (e.target.checked) {
            setCurrentProgress((prev) => (prev += 1));
        } else {
            setCurrentProgress((prev) => (prev -= 1));
        }
    };

    return (
        <div className={clsx(styles.curriculumItem, {})}>
            <div
                className={clsx(styles.title, "flex cursor-pointer p-2 w-full")}
                onClick={(e) => handleOpenSubLesson(e)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className={clsx(styles.transfrom, "w-6 h-6 mt-1.5")}
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
                                        lesson.title,
                                        lesson.video,
                                        lesson.linkVideo
                                    )
                                }
                                className={clsx(
                                    styles.lessonItem,

                                    "flex items-center ml-6 gap-3.5",
                                    {
                                        [styles.highlighted]:
                                            lesson.title === isHighlighted,
                                    }
                                )}
                            >
                                <div className="checkbox-wrapper ml-3">
                                    <label>
                                        <input
                                            type="checkbox"
                                            onChange={handleChecked}
                                        />
                                        <span className="checkbox"></span>
                                    </label>
                                </div>

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
    const [lessonSelected, setLessonSelected] = useState(null);
    const [course, setCourse] = useState(initFormData);
    const [totalLesson, setTotalLesson] = useState(0);
    const [currentProgress, setCurrentProgress] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    const { id } = useParams();

    const handleCloseComment = () => {
        setOpenModal(false);
    };

    const handleOpenComment = () => {
        setOpenModal(true);
    };

    const handleVideoSelect = (title, video, linkVideo) => {
        if (video !== "" && linkVideo === "") {
            setCurrentVideoUrl(video);
        } else {
            setCurrentVideoUrl(linkVideo);
        }
        setLessonSelected(title);
    };

    const handleShowComment = () => {
        console.log("showComment");
    };

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const data = await dataApi.getCourseById(id);
                let total = 0;
                data.content.sections.map(
                    (section) => (total += section.lessons.length)
                );
                setCurrentVideoUrl(data.content.video);
                setCourse(data.content);
                setTotalLesson(total);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi();
    }, []);

    return (
        <div className={clsx(styles.wrapperPage)}>
            <div
                className={clsx(
                    styles.headerPage,
                    "flex items-center justify-between b-shadow"
                )}
            >
                <Link to={"/"} className={clsx(styles.logoPage)}>
                    <img src={logoPage} alt="" />
                </Link>
                <h5 className="mb-0 text-center">{course.title}</h5>
                <div className={clsx(styles.progress)}>
                    Progress: {currentProgress}/{totalLesson}
                </div>
            </div>
            <main className={clsx(styles.uiUxCourse)}>
                <div className={clsx(styles.sectionVideo, "w-full")}>
                    <div className={clsx("row")}>
                        <div
                            className={clsx(styles.videoContainer, "col-lg-9")}
                        >
                            <CourseHero
                                video={currentVideoUrl}
                                thumbnail={course.thumbnail}
                            />
                            <div
                                className={clsx(styles.sectionComment)}
                                onClick={handleOpenComment}
                            >
                                <div className="flex gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                        />
                                    </svg>
                                    Q&A
                                </div>
                            </div>
                        </div>
                        <div
                            className={clsx(
                                styles.courseSectionsContainer,
                                "col-lg-3"
                            )}
                        >
                            <section className={styles.courseSection}>
                                <div className={clsx(styles.sectionHeader)}>
                                    <div className={styles.sectionNumber}>
                                        Curriculum
                                    </div>
                                </div>
                                <div className={styles.courseCurriculum}>
                                    {course.sections &&
                                        course.sections.map((item, index) => (
                                            <CurriculumItem
                                                setCurrentProgress={
                                                    setCurrentProgress
                                                }
                                                isHighlighted={lessonSelected}
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
                <Comment
                    openModal={openModal}
                    funcCloseModal={handleCloseComment}
                ></Comment>
            </main>
        </div>
    );
}

export default DetailCourse;
