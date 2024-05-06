import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import avatar from "../../assets/images/avatar_25.jpg";
import clsx from "clsx";
import styles from "./Comment.module.scss";

export default function Comment({ openModal, funcCloseModal }) {
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
                                        <div
                                            className={clsx(styles.cmt, "flex")}
                                        >
                                            <img src={avatar} alt="" />
                                            <textarea
                                                className={clsx(
                                                    styles.input,
                                                    "flex-1"
                                                )}
                                                type="text"
                                                placeholder="Do you have any questions about this lesson?"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
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
