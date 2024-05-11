import React, { Fragment, useEffect, useState } from "react"; // This imports the useState hook
import styles from "./DetailCourse.module.scss";
import { Link, useParams } from "react-router-dom";
import clsx from "clsx";
import * as userApi from "../../../api/apiService/authService.js";
import logoPage from "../../../assets/images/logo.png";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { Dialog, Transition } from "@headlessui/react";
import avatar from "../../../assets/images/avatar_25.jpg";
import * as dataApi from "../.../../../../api/apiService/dataService.js";
import moment from "moment/moment.js";

let timerId = null;
const debounce = (func, delay = 1000) => {
    return () => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func();
        }, delay);
    };
};

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
    course: {
        title: "",
        desc: "",
        price: "",
        thumbnail: "",
        date: "",
        categories: [],
    },
};
const CurriculumItem = ({
    active,
    section,
    aliasEmail,
    sectionId,
    courseId,
    isHighlighted,
    currentProgress,
    handleVideoSelect,
    setCurrentProgress,
}) => {
    const handleOpenSubLesson = (e) => {
        const sub = document.getElementById(`section${sectionId}`);
        sub.classList.toggle("disabled");
        e.currentTarget.classList.toggle(styles.active);
    };
    let newUpdate = currentProgress;

    const handleChecked = (e) => {
        const id = parseInt(e.target.id, 10);
        if (e.target.checked && !currentProgress.includes(id)) {
            newUpdate = [...newUpdate, id];
        } else {
            newUpdate = [...newUpdate.filter((item) => item !== id)];
        }
        setCurrentProgress((prev) => newUpdate);
        const fetchUpdateLessonIds = async () => {
            try {
                console.log("deeeeeee");
                const result = await userApi.updateLessonIds(
                    aliasEmail,
                    courseId,
                    newUpdate
                );
            } catch (error) {
                console.log(error);
            }
        };
        const debounceAPi = debounce(fetchUpdateLessonIds, 500);
        debounceAPi();
    };

    return (
        <div className={clsx(styles.curriculumItem, {})}>
            <div
                className={clsx(
                    styles.title,
                    "flex cursor-pointer p-2 w-full",
                    {
                        [styles.active]: active === 0,
                    }
                )}
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
                        {section.title}
                    </div>
                </div>
            </div>

            <div
                id={`section${sectionId}`}
                className={clsx(styles.wrapLesson, "w-full ", {
                    disabled: active !== 0,
                })}
            >
                {section.lessons &&
                    section.lessons.map((lesson, ind) => {
                        return (
                            <div
                                key={ind}
                                onClick={() => handleVideoSelect(lesson)}
                                className={clsx(
                                    styles.lessonItem,

                                    "flex items-center ml-6 gap-3.5",
                                    {
                                        [styles.highlighted]:
                                            lesson.id === isHighlighted,
                                    }
                                )}
                            >
                                <div className="checkbox-wrapper ml-3">
                                    <label>
                                        <input
                                            checked={currentProgress.includes(
                                                lesson.id
                                            )}
                                            id={lesson.id}
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
    const { id } = useParams();
    const userInfo = useSelector((state) => state.login.user);
    const alias = userInfo.email.split("@")[0];
    const [currentVideoUrl, setCurrentVideoUrl] = useState("");
    const [lessonSelected, setLessonSelected] = useState({
        id: "",
    });
    const [totalLesson, setTotalLesson] = useState(0);
    const [currentProgress, setCurrentProgress] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [progressObject, setProgressObject] = useState(initFormData);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({});
    const [subComment, setSubComment] = useState({});
    const [showReplyBox, setShowReplyBox] = useState(-1);

    const handleCloseComment = () => {
        if (stompClient) {
            stompClient.disconnect(onDisconnected, {});
        }
        setOpenModal(false);
    };

    const onDisconnected = () => {
        console.log("Disconnect");
    };
    const onMessageReceived = (payload) => {
        var payloadData = payload.body;
        comments.push(JSON.parse(payloadData));
        setComments([...comments]);
    };

    const onConnected = () => {
        stompClient.subscribe(
            `/comment/lesson/${lessonSelected.id}`,
            onMessageReceived
        );
    };

    const onError = (err) => {
        console.log(err);
    };

    var stompClient = null;
    const OpenConnect = () => {
        return new Promise((resolve, reject) => {
            const Sock = new SockJS("http://localhost:8080/ws");
            stompClient = over(Sock);
            stompClient.connect(
                {},
                () => {
                    onConnected();
                    resolve();
                },
                onError
            );
        });
    };
    const handleOpenComment = async () => {
        OpenConnect().then(() => {});
        const fetchApi = async () => {
            try {
                const result = await dataApi.getComments(lessonSelected.id);
                setComments(result.content.content);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
        setOpenModal(true);
    };
    const sendValue = (sub) => {
        OpenConnect().then(() => {
            if (stompClient) {
                let data = null;
                !sub ? (data = { ...comment }) : (data = { ...subComment });
                data = {
                    ...data,
                    lessonId: lessonSelected.id,
                    userName: userInfo.firstName + " " + userInfo.lastName,
                    email: userInfo.email,
                };
                stompClient.send(
                    `/app/comment/lesson/${lessonSelected.id}`,
                    {},
                    JSON.stringify(data)
                );
                sub
                    ? setSubComment({ ...subComment, content: "" })
                    : setComment({ ...comment, content: "" });
            } else {
                console.log("WebSocket connection is not established yet");
            }
        });
    };

    const handleSendComment = (sub) => {
        sendValue(sub);
    };

    const handleVideoSelect = (lesson) => {
        if (lesson.video !== "" && lesson.linkVideo === "") {
            setCurrentVideoUrl(lesson.video);
        } else {
            setCurrentVideoUrl(lesson.linkVideo);
        }
        setLessonSelected(lesson);
    };

    const handleReply = (commentId) => {
        setShowReplyBox(commentId);
    };

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const data = await userApi.getProgress(alias, id);
                let total = 0;
                const lessonFirst = data.content.course.sections[0].lessons[0];
                const video = lessonFirst.video;
                const linkVideo = lessonFirst.linkVideo;

                data.content.course.sections.map(
                    (section) => (total += section.lessons.length)
                );
                if (data.content.lessonIds !== null) {
                    setCurrentProgress(data.content.lessonIds);
                }

                setLessonSelected(lessonFirst);
                setCurrentVideoUrl(video ? video : linkVideo);
                setProgressObject(data.content);
                setTotalLesson(total);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi();
    }, [id]);
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
                <h5 className="mb-0 text-center">
                    {progressObject.course.title}
                </h5>
                <div className={clsx(styles.progress)}>
                    Progress: {currentProgress.length}/{totalLesson}
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
                                thumbnail={progressObject.course.thumbnail}
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
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
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
                                    {progressObject.course.sections &&
                                        progressObject.course.sections.map(
                                            (section, index) => (
                                                <CurriculumItem
                                                    active={index}
                                                    setCurrentProgress={
                                                        setCurrentProgress
                                                    }
                                                    courseId={id}
                                                    currentProgress={
                                                        currentProgress
                                                    }
                                                    aliasEmail={alias}
                                                    isHighlighted={
                                                        lessonSelected.id
                                                    }
                                                    handleVideoSelect={
                                                        handleVideoSelect
                                                    }
                                                    sectionId={index}
                                                    key={index}
                                                    section={section}
                                                />
                                            )
                                        )}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                {/* <Comment
                    lessonId={lessonId}
                    openModal={openModal}
                    funcCloseModal={handleCloseComment}
                ></Comment> */}
                <Transition appear show={openModal} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={handleCloseComment}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Q&A
                                        </Dialog.Title>
                                        <div className="mt-6">
                                            <div className="flex flex-col flex-none">
                                                <div
                                                    className={clsx(
                                                        styles.cmt,
                                                        "flex"
                                                    )}
                                                >
                                                    <img src={avatar} alt="" />
                                                    <textarea
                                                        value={comment.content}
                                                        onChange={(e) =>
                                                            setComment({
                                                                ...comment,
                                                                content:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className={clsx(
                                                            styles.input,
                                                            "flex-1"
                                                        )}
                                                        type="text"
                                                        placeholder="Do you have any questions about this lesson?"
                                                    />
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        handleSendComment(false)
                                                    }
                                                    className={clsx(
                                                        styles.btnSend,
                                                        "mt-3 text-sm self-end flex-grow-0"
                                                    )}
                                                >
                                                    Send
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={clsx(
                                                styles.cmtWrap,
                                                "flex flex-col gap-3 mt-8"
                                            )}
                                        >
                                            {comments &&
                                                comments.map((comment, ind) => {
                                                    const timeElapsed = moment(
                                                        comment.date
                                                    ).fromNow();
                                                    return (
                                                        <div key={ind}>
                                                            <div
                                                                className={clsx(
                                                                    styles.cmtItem,
                                                                    "flex flex-col flex-none"
                                                                )}
                                                            >
                                                                <div
                                                                    className={clsx(
                                                                        styles.cmt,
                                                                        "flex"
                                                                    )}
                                                                >
                                                                    <img
                                                                        src={
                                                                            avatar
                                                                        }
                                                                        alt=""
                                                                    />
                                                                    <div
                                                                        className={clsx(
                                                                            styles.cmtContent,
                                                                            "flex-1"
                                                                        )}
                                                                    >
                                                                        <div
                                                                            className={clsx(
                                                                                styles.wrap
                                                                            )}
                                                                        >
                                                                            <span>
                                                                                {
                                                                                    comment.userName
                                                                                }
                                                                            </span>
                                                                            <div
                                                                                className={clsx(
                                                                                    styles.content
                                                                                )}
                                                                            >
                                                                                {
                                                                                    comment.content
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className={clsx(
                                                                                "mt-2 ml-2"
                                                                            )}
                                                                        >
                                                                            <button
                                                                                className={
                                                                                    styles.actionsCmt
                                                                                }
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    handleReply(
                                                                                        comment.id
                                                                                    )
                                                                                }
                                                                            >
                                                                                Reply
                                                                            </button>
                                                                            <span
                                                                                className={
                                                                                    styles.timeCmt
                                                                                }
                                                                            >
                                                                                {
                                                                                    timeElapsed
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        <div
                                                                            className={clsx(
                                                                                styles.replyBox,
                                                                                {
                                                                                    show:
                                                                                        showReplyBox ===
                                                                                        comment.id,
                                                                                }
                                                                            )}
                                                                        >
                                                                            <div className="lex flex-col flex-none">
                                                                                <div
                                                                                    className={clsx(
                                                                                        styles.cmt,
                                                                                        "flex"
                                                                                    )}
                                                                                >
                                                                                    <img
                                                                                        src={
                                                                                            avatar
                                                                                        }
                                                                                        alt=""
                                                                                    />
                                                                                    <textarea
                                                                                        value={
                                                                                            subComment.content
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) =>
                                                                                            setSubComment(
                                                                                                {
                                                                                                    ...subComment,
                                                                                                    content:
                                                                                                        e
                                                                                                            .target
                                                                                                            .value,
                                                                                                }
                                                                                            )
                                                                                        }
                                                                                        className={clsx(
                                                                                            styles.input,
                                                                                            "flex-1"
                                                                                        )}
                                                                                        type="text"
                                                                                        placeholder="Do you have any questions about this lesson?"
                                                                                    />
                                                                                </div>
                                                                                <div
                                                                                    onClick={() =>
                                                                                        handleSendComment(
                                                                                            true
                                                                                        )
                                                                                    }
                                                                                    className={clsx(
                                                                                        styles.btnSend,
                                                                                        "float-right btn mt-3 self-end flex-grow-0"
                                                                                    )}
                                                                                >
                                                                                    Send
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                        </div>

                                        <div className="mt-8">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={handleCloseComment}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </main>
        </div>
    );
}

export default DetailCourse;
