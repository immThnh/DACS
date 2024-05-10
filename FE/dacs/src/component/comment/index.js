import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import avatar from "../../assets/images/avatar_25.jpg";
import clsx from "clsx";
import styles from "./Comment.module.scss";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { useParams } from "react-router-dom";

export default function Comment({ openModal, funcCloseModal }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const { id } = useParams();

    // client.activate();
    var stompClient = null;
    useEffect(() => {
        connect();
        console.log("Connect socket");
    }, []);

    const connect = () => {
        let Sock = new SockJS("http://localhost:8080/ws");
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    };
    const onError = (err) => {
        console.log(err);
    };

    const onConnected = () => {
        stompClient.subscribe(`/comment/lesson/${id}`, onMessageReceived);
    };

    const onMessageReceived = (payload) => {
        var payloadData = payload.body;
        console.log("payload: " + payload);
        setComments([...comments, payloadData]);
    };

    const sendValue = () => {
        if (stompClient) {
            console.log("send Comment");
            stompClient.send(`/comment/lesson/${id}`, {}, comment);
            setComment("");
        }
    };

    const handleComment = () => {
        sendValue();
    };
    console.log(comments);

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
                                                <img src={avatar} alt="" />
                                                <textarea
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
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
                                            <button
                                                type="button"
                                                onClick={handleComment}
                                                className={clsx(
                                                    "btn mt-3 self-end flex-grow-0"
                                                )}
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        className={clsx(
                                            styles.cmtWrap,
                                            "flex flex-col gap-3 mt-8"
                                        )}
                                    >
                                        {comments &&
                                            comments.map((comment, ind) => (
                                                <div
                                                    key={ind}
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
                                                            src={avatar}
                                                            alt=""
                                                        />
                                                        <div
                                                            className={clsx(
                                                                styles.cmtContent,
                                                                "flex-1"
                                                            )}
                                                        >
                                                            <span>
                                                                Nguyen Danh
                                                                Thanh
                                                            </span>
                                                            <div
                                                                className={clsx(
                                                                    styles.content
                                                                )}
                                                            >
                                                                {comment}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
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
