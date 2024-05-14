import clsx from "clsx";
import styles from "./Comment.module.scss";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import avatar from "../../assets/images/avatar_25.jpg";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { useSelector } from "react-redux";
import * as dataApi from "../../api/apiService/dataService";
import moment from "moment";

var stompClient = null;

export default function Comment({
    courseId,
    lessonId = -1,
    openModal,
    funcCloseModal,
}) {
    const userInfo = useSelector((state) => state.login.user);
    const initComment = {
        avatar: userInfo.avatar,
        email: userInfo.email,
        userName: userInfo.firstName + " " + userInfo.lastName,
        lessonId: lessonId,
    };
    const [comments, setComments] = useState([]);
    const [showReplyBox, setShowReplyBox] = useState(-1);
    const [subComment, setSubComment] = useState(initComment);
    const [comment, setComment] = useState(initComment);
    const [listViewSubComment, setListViewSubComment] = useState([]);
    const onError = (err) => {
        console.log(err);
    };

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        setComments((prev) => [payloadData, ...prev]);
    };
    const onConnected = () => {
        stompClient.subscribe(`/comment/lesson/${lessonId}`, onMessageReceived);
    };
    const connect = () => {
        const Sock = new SockJS("http://localhost:8080/ws");
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    };

    const onDisconnected = () => {
        console.log("Disconnect Websocket");
    };

    useEffect(() => {
        if (lessonId === "") {
            return;
        }
        connect();

        const fetchApi = async () => {
            try {
                const result = await dataApi.getComments(lessonId);
                setComments(result.content.content);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
        setComment({ ...comment, lessonId: lessonId });
        return () => {
            if (stompClient) {
                stompClient.disconnect(onDisconnected, {});
            }
        };
    }, [lessonId]);
    const sendValue = (sub) => {
        if (stompClient) {
            let data = null;
            sub
                ? (data = {
                      ...subComment,
                      path: `/course/detail/${courseId}/openComment`,
                  })
                : (data = { ...comment });
            stompClient.send(
                `/app/comment/lesson/${lessonId}`,
                {},
                JSON.stringify(data)
            );
            sub
                ? setSubComment({ ...subComment, content: "", parentId: "" })
                : setComment({ ...comment, content: "" });
        } else {
            console.log("stompClient is not connected");
        }
    };

    const handleSendComment = (sub) => {
        sendValue(sub);
        setShowReplyBox(-1);
    };

    const handleReply = (e, cmt) => {
        setShowReplyBox(cmt.id);
        setSubComment({
            ...subComment,
            content: "",
            parentId: cmt.id,
            replyToUser: cmt.userEmail,
        });
        e.currentTarget.scrollIntoView({ behavior: "smooth" });
    };

    const handleViewSubComment = (cmt) => {
        setListViewSubComment([...listViewSubComment, cmt.id]);
    };

    const handleHideSubCmt = (cmt) => {
        const newListViewSubComment = listViewSubComment.filter(
            (c) => c !== cmt.id
        );
        setListViewSubComment([...newListViewSubComment]);
    };

    function getAllSubComments(commentId, comments, checkedIds = new Set()) {
        if (checkedIds.has(commentId)) {
            return [];
        }
        checkedIds.add(commentId);

        let subComments = comments.filter((c) => c.parentId === commentId);
        let allSubComments = [...subComments];
        subComments.forEach((subComment) => {
            let subSubComments = getAllSubComments(
                subComment.id,
                comments,
                checkedIds
            );
            allSubComments = [...allSubComments, ...subSubComments];
        });
        return allSubComments;
    }
    console.log("render ");
    return (
        <>
            <Transition appear show={openModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={funcCloseModal}
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
                                                <img
                                                    src={
                                                        userInfo.avatar ||
                                                        avatar
                                                    }
                                                    alt=""
                                                />
                                                <div
                                                    className={clsx(
                                                        styles.boxInput,
                                                        "flex-1"
                                                    )}
                                                >
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
                                                            "w-full"
                                                        )}
                                                        type="text"
                                                        placeholder="Do you have any questions about this lesson?"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleSendComment(
                                                                false
                                                            )
                                                        }
                                                        className={clsx(
                                                            styles.btnSend,
                                                            "text-sm self-end flex-grow-0"
                                                        )}
                                                    >
                                                        Send
                                                    </button>
                                                </div>
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
                                            comments.map((cmt, ind) => {
                                                let subComments =
                                                    getAllSubComments(
                                                        cmt.id,
                                                        comments
                                                    );
                                                subComments.sort(
                                                    (a, b) =>
                                                        new Date(a.date) -
                                                        new Date(b.date)
                                                );
                                                const totalSubComment =
                                                    subComments.length;
                                                const timeElapsed = moment(
                                                    cmt.date
                                                ).fromNow();
                                                if (cmt.parentId !== 0)
                                                    return (
                                                        <span
                                                            key={ind}
                                                            className="disabled"
                                                        ></span>
                                                    );
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
                                                                        cmt.avatar ||
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
                                                                        <span className="text-xs">
                                                                            {
                                                                                cmt.userName
                                                                            }
                                                                        </span>
                                                                        <div
                                                                            className={clsx(
                                                                                styles.content
                                                                            )}
                                                                        >
                                                                            {
                                                                                cmt.content
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className={clsx(
                                                                            "mt-2"
                                                                        )}
                                                                    >
                                                                        <button
                                                                            className={
                                                                                styles.actionsCmt
                                                                            }
                                                                            type="button"
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                handleReply(
                                                                                    e,
                                                                                    cmt
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
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* //!NOTE ------------------VIEWALL------------------ */}
                                                        <div
                                                            className={clsx(
                                                                styles.viewAll,
                                                                {
                                                                    showFlex:
                                                                        totalSubComment !==
                                                                            0 &&
                                                                        listViewSubComment &&
                                                                        !listViewSubComment.includes(
                                                                            cmt.id
                                                                        ),
                                                                }
                                                            )}
                                                            onClick={() =>
                                                                handleViewSubComment(
                                                                    cmt
                                                                )
                                                            }
                                                        >
                                                            View{" "}
                                                            {totalSubComment}{" "}
                                                            reply to the comment
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 16 16"
                                                                fill="currentColor"
                                                                className="w-4 h-4"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div
                                                            className={clsx(
                                                                styles.viewAll,
                                                                {
                                                                    showFlex:
                                                                        totalSubComment !==
                                                                            0 &&
                                                                        listViewSubComment &&
                                                                        listViewSubComment.includes(
                                                                            cmt.id
                                                                        ),
                                                                }
                                                            )}
                                                            onClick={() =>
                                                                handleHideSubCmt(
                                                                    cmt
                                                                )
                                                            }
                                                        >
                                                            Hide reply to the
                                                            comment
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 16 16"
                                                                fill="currentColor"
                                                                className="w-4 h-4"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </div>
                                                        {/* //!NOTE ------------------VIEWALL------------------ */}

                                                        {subComments &&
                                                            subComments.map(
                                                                (
                                                                    sComment,
                                                                    ind
                                                                ) => {
                                                                    const sCommentTimeElapsed =
                                                                        moment(
                                                                            sComment.date
                                                                        ).fromNow();
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                ind +
                                                                                "sub"
                                                                            }
                                                                            className={clsx(
                                                                                styles.cmtItem,
                                                                                styles.subCmtWrap,
                                                                                "flex flex-col",
                                                                                {
                                                                                    show: listViewSubComment.includes(
                                                                                        cmt.id
                                                                                    ),
                                                                                }
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
                                                                                        sComment.avatar ||
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
                                                                                        <span className="text-xs">
                                                                                            {
                                                                                                sComment.userName
                                                                                            }
                                                                                        </span>
                                                                                        <div
                                                                                            className={clsx(
                                                                                                styles.content
                                                                                            )}
                                                                                        >
                                                                                            <span className="pr-1">
                                                                                                @
                                                                                                {
                                                                                                    sComment.userReply
                                                                                                }
                                                                                            </span>
                                                                                            {
                                                                                                sComment.content
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        className={clsx(
                                                                                            "mt-2"
                                                                                        )}
                                                                                    >
                                                                                        <button
                                                                                            className={
                                                                                                styles.actionsCmt
                                                                                            }
                                                                                            type="button"
                                                                                            onClick={(
                                                                                                e
                                                                                            ) =>
                                                                                                handleReply(
                                                                                                    e,
                                                                                                    sComment
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
                                                                                                sCommentTimeElapsed
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                className={clsx(
                                                                                    styles.replyBox,
                                                                                    {
                                                                                        show:
                                                                                            showReplyBox ===
                                                                                            sComment.id,
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
                                                                                                comment.avatar ||
                                                                                                avatar
                                                                                            }
                                                                                            alt=""
                                                                                        />
                                                                                        <div
                                                                                            className={clsx(
                                                                                                styles.boxInput,
                                                                                                "flex-1"
                                                                                            )}
                                                                                        >
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
                                                                                                    "w-full"
                                                                                                )}
                                                                                                type="text"
                                                                                                placeholder="Do you have any questions about this lesson?"
                                                                                            />
                                                                                            <button
                                                                                                type="button"
                                                                                                onClick={() =>
                                                                                                    handleSendComment(
                                                                                                        true
                                                                                                    )
                                                                                                }
                                                                                                className={clsx(
                                                                                                    styles.btnSend,
                                                                                                    "text-sm self-end flex-grow-0"
                                                                                                )}
                                                                                            >
                                                                                                Send
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        {/* //!NOTE ------------------REPLYBOX------------------ */}
                                                        <div
                                                            className={clsx(
                                                                styles.replyBox,
                                                                {
                                                                    show:
                                                                        showReplyBox ===
                                                                        cmt.id,
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
                                                                            comment.avatar ||
                                                                            avatar
                                                                        }
                                                                        alt=""
                                                                    />
                                                                    <div
                                                                        className={clsx(
                                                                            styles.boxInput,
                                                                            "flex-1"
                                                                        )}
                                                                    >
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
                                                                                "w-full"
                                                                            )}
                                                                            type="text"
                                                                            placeholder="Do you have any questions about this lesson?"
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handleSendComment(
                                                                                    true
                                                                                )
                                                                            }
                                                                            className={clsx(
                                                                                styles.btnSend,
                                                                                "text-sm self-end flex-grow-0"
                                                                            )}
                                                                        >
                                                                            Send
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* //!NOTE ------------------REPLYBOX------------------ */}
                                                    </div>
                                                );
                                            })}
                                    </div>

                                    <div className="mt-8">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={funcCloseModal}
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
        </>
    );
}
