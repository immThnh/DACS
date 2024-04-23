import React,{Fragment,useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export const ForgotPasswordModal = ({ isEmailModalOpen, setEmailModalOpen, setResetModalOpen, formData, handleInputChange, errors }) => {
    const [countdown, setCountdown] = useState(0);

    const handleOtpButtonClick = () => {
        // Implementation of OTP button click
    };
    const closeModal = () => {
        setEmailModalOpen(false);
        setResetModalOpen(false);
    };
    function handleEmailModal(){
    };

    return(
    <Transition appear show={isEmailModalOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <form onSubmit={handleEmailModal}>

                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                            Forgot Password
                        </Dialog.Title>
                        
                        <div className="mt-5 text-left">
        <label
            htmlFor="email"
            className="font-medium max-md:max-w-full"
        >
            Email
        </label>
        <div className="flex p-2.5 mt-2.5 bg-gray-50 rounded-lg border border-gray-100 border-solid text-stone-500 max-md:flex-wrap">
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your Email"
                className="flex-1 bg-transparent outline-none"
            />
        </div>
        {errors.email && (
            <div className="text-red-500 mt-1 text-sm ml-1">
                {errors.email}
            </div>
        )}
    </div>
    <div className="mt-5 text-left">
        <label
            htmlFor="code"
            className="font-medium max-md:max-w-full"
        >
            Code
        </label>
        <div className="flex mt-2.5 bg-gray-50 rounded-lg border border-gray-100 border-solid text-stone-500 max-md:flex-wrap">
            <input
                type="text"
                id="code"
                name="code"
                placeholder="Enter your Code"
                className=" p-2 flex-1 bg-transparent outline-none"
                onChange={handleInputChange}
            />
            <button
                className={`px-2 py-1 m-0 rounded-md h-11 w-28 ${
                    countdown > 0
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-black text-white"
                }  ${
                    formData["email"].length === 0
                        ? "text-whit bg-gray-400"
                        : "bg-black text-white"
                }`}
                onClick={(e) => {
                    e.preventDefault();
                    handleOtpButtonClick();
                }}
                disabled={countdown > 0}
            >
                {countdown > 0 ? `${countdown}s` : "Send code"}
            </button>
        </div>
    </div>
                        <div className="mt-4">
                            <button
                                type="button"
                                className="flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md w-full"
                                onClick={() => {
                                    setEmailModalOpen(false);
                                    setResetModalOpen(true);
                                }}
                            >
                                Next
                            </button>
                        </div>
                        </form>
                    </Dialog.Panel>
                </Transition.Child>
            </div>
        </div>
    </Dialog>
</Transition>
    )
};

export const ResetPasswordModal = ({isResetModalOpen, setResetModalOpen, formData, handleInputChange, errors}) => {
    const [isEmailModalOpen, setEmailModalOpen] = useState(false);

    const handleShowPassword = (e) => {
        // Implementation of show password toggle
    };
    function handleResetModal(){
    };

    const closeModal = () => {
        setEmailModalOpen(false);
        setResetModalOpen(false);
    };
    return(
    <Transition appear show={isResetModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <form onSubmit={handleResetModal}>
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                        Reset Password
                                    </Dialog.Title>
                                    <div className="mt-2">
                                    <div className="mt-5 text-left">
                                    <label
                                        htmlFor="password"
                                        className="font-medium max-md:max-w-full"
                                    >
                                        Password
                                    </label>
                                    <div className="flex p-2.5 mt-2.5 bg-gray-50 rounded-lg border border-gray-100 border-solid text-stone-500 max-md:flex-wrap">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="Enter your Password"
                                            className="flex-1 bg-transparent outline-none"
                                        />
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8819b1cf48d19a6e95bc57cb5d373ec0162742f3cfe62b7ec31b90b0b48de06?apiKey=9349475655ee4a448868f824f5feb11d&"
                                            // src={eyeSlash}
                                            alt="Eye icon"
                                            className="cursor-pointer shrink-0 w-6 aspect-square"
                                            onClick={(e) => handleShowPassword(e, "password")}
                                        />
                                    </div>

                                    {errors.password && (
                                        <div className="text-red-500 mt-1 text-sm ml-1">
                                            {errors.password}
                                        </div>
                                    )}
                                </div>
                                <div className="mt-5 text-left">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="font-medium max-md:max-w-full"
                                    >
                                        Confirm Password
                                    </label>
                                    <div className="flex p-2.5 mt-2.5 bg-gray-50 rounded-lg border border-gray-100 border-solid text-stone-500 max-md:flex-wrap">
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            // value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            placeholder="Enter your confirm Password"
                                            className="flex-1 bg-transparent outline-none"
                                        />
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8819b1cf48d19a6e95bc57cb5d373ec0162742f3cfe62b7ec31b90b0b48de06?apiKey=9349475655ee4a448868f824f5feb11d&"
                                            alt="Eye icon"
                                            className="cursor-pointer shrink-0 w-6 aspect-square"
                                            onClick={(e) =>
                                                handleShowPassword(e, "confirmPassword")
                                            }
                                        />
                                    </div>
                                        {errors.confirmPassword && (
                                            <div className="text-red-500 mt-1 text-sm ml-1">
                                                {errors.confirmPassword}
                                            </div>
                                        )}
                                </div>
                                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 w-full"
                                            onClick={closeModal}
                                        >
                                            Reset Password
                                        </button>
                                    </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
    )
};
