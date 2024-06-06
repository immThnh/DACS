import clsx from "clsx";
import { useEffect, useState } from "react";
import * as UserApi from "../../api/apiService/authService";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { Dropdown } from "../../pages/Post/ViewPost";
import Modal from "../modal";
import { toast } from "sonner";

const PostItem = ({ handleRestorePost, openDeleteModal, post }) => {
    const timeEdit = moment(post?.date).fromNow();

    return (
        <div className="p-4 border border-gray-300 rounded-lg boxShadow">
            <div className="flex mb-2 justify-between">
                <Link
                    to={`/posts/${encodeURIComponent(post?.title)}`}
                    className="font-semibold text-lg line-clamp-2"
                >
                    {post?.title}
                </Link>
                <div className="cursor-pointer">
                    <Dropdown
                        handleRestorePost={handleRestorePost}
                        handleOpenDeletePost={openDeleteModal}
                        isMyPost
                        post={post}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                            />
                        </svg>
                    </Dropdown>
                </div>
            </div>
            <div className="text-sm font-normal text-gray-500">
                Edit {timeEdit}
            </div>
        </div>
    );
};

function LayOutMyPost({ page = "MY_POST", children }) {
    const user = useSelector((state) => state.login.user);
    const [isDeleted, setIsDeleted] = useState(false);
    const [posts, setPosts] = useState([]);
    const [deletedModalOpen, setDeletedModalOpen] = useState(false);
    const [deletePostId, setDeletePostId] = useState(null);
    const [quantity, setQuantity] = useState({
        page: 0,
        size: 5,
    });
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await UserApi.getPosts(
                    user.email,
                    isDeleted,
                    quantity.page,
                    quantity.size
                );
                setPosts(result.content);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, [quantity.page, quantity.size, user.email, isDeleted]);

    const openDeleteModal = (postId) => {
        setDeletePostId(postId);
        setDeletedModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeletedModalOpen(false);
    };

    const handleRemovePost = () => {
        const fetchApi = async () => {
            toast.promise(UserApi.deletePost(user.email, deletePostId), {
                loading: "Deleting...",
                success: (result) => {
                    setDeletedModalOpen(false);
                    setPosts(posts.filter((post) => post.id !== deletePostId));
                    return result.mess;
                },
                error: (error) => {
                    console.log(error);
                    return error.mess;
                },
            });
        };
        fetchApi();
    };
    const handleRestorePost = (restorePostId) => {
        const fetchApi = async () => {
            toast.promise(UserApi.restorePost(user.email, restorePostId), {
                loading: "Loading...",
                success: (result) => {
                    setPosts(posts.filter((post) => post.id !== restorePostId));
                    return result.mess;
                },
                error: (error) => {
                    console.log(error);
                    return error.mess;
                },
            });
        };
        fetchApi();
    };

    return (
        <div className="container mt-10">
            <h1 className="uppercase font-bold text-3xl mb-10">My post</h1>
            <div className="border-b-[1px] border-b-gray-200 mb-4">
                {page === "MY_POST" && (
                    <div className="flex">
                        <span
                            onClick={() => setIsDeleted(false)}
                            className={clsx(
                                " cursor-pointer font-semibold text-base py-3 px-3 transition-all ease duration-100 text-gray-500",
                                {
                                    "text-black border-b-black border-b-2":
                                        !isDeleted,
                                }
                            )}
                        >
                            Published
                        </span>
                        <span
                            onClick={() => setIsDeleted(true)}
                            className={clsx(
                                " cursor-pointer font-semibold text-base py-3 px-3 transition-all ease duration-100 text-gray-500",
                                {
                                    "text-black border-b-black border-b-2":
                                        isDeleted,
                                }
                            )}
                        >
                            History Deleted
                        </span>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-3">
                {children}
                {posts?.map((post, index) => {
                    return (
                        <PostItem
                            handleRestorePost={handleRestorePost}
                            openDeleteModal={openDeleteModal}
                            post={post}
                            key={index}
                        ></PostItem>
                    );
                })}
                {posts?.length === 0 && (
                    <span className="flex justify-center text-lg font-medium">
                        You don't have any post yet
                    </span>
                )}
            </div>
            <Modal
                isOpen={deletedModalOpen}
                closeModal={closeDeleteModal}
                title={"Delete"}
                description={"Are you sure want to delete this post?"}
                handleRemove={handleRemovePost}
            ></Modal>
        </div>
    );
}

export default LayOutMyPost;
