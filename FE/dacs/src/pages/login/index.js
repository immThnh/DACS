import React, { useState, useEffect, Fragment } from "react";
import OAuth2Form from "../../component/OAuth2Form.js";
import * as authService from "../../../src/api/apiService/authService.js";
import { Link, useNavigate } from "react-router-dom";
import eyeSlash from "../../assets/images/eye-slash.png";
import { toast } from "sonner";
import loginSlice from "../../redux/reducers/loginReducer.js";
import { useDispatch, useSelector } from "react-redux";
export default function Login() {
import { Dialog, Transition } from '@headlessui/react';
export default function SignUpForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
        const [code, setCode] = useState();

    const [isModalOpen, setModalOpen] = useState(false);
    const [isEmailModalOpen, setEmailModalOpen] = useState(false);
    const [isResetModalOpen, setResetModalOpen] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [lastClickTime, setLastClickTime] = useState(0);

    const navigate = useNavigate();
    const dangLogin = useSelector((state) => state.login.isLogin);
    const dispatch = useDispatch();

    const handleGoToSignUp = () => {
        if (!dangLogin) return;
        dispatch(loginSlice.actions.setSignUp());
        navigate("/sign-up");
    };

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);   
    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
        errors[name] = "";
        setErrors(errors);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const errors = {};

        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                errors[key] = "This field is required.";
            }
        });

        if (!isPasswordStrong(formData.password)) {
            errors.password =
                "Password must have at least 8 characters, including uppercase, normal, and special characters like #@!$...";
        }

        if (!isValidEmail(formData.email)) {
            errors.email = "Email invalidate";
        }
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const fetchApi = async () => {
            toast.promise(authService.login({ ...formData }), {
                loading: "Loading...",
                success: () => {
                    navigate("/");
                },
                error: "Email or password invalid, please try again",
            });
        };
        fetchApi();
    }
    function isValidEmail(email) {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return emailRegex.test(email);
    }

    function isPasswordStrong(password) {
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
        return passwordRegex.test(password);
    }
    function handleOtpButtonClick() {
        const currentTime = new Date().getTime();
        if (!isValidEmail(formData["email"])) {
            errors.email = "Please enter a valid email";
            setErrors((err) => {
                return { ...err };
            });
            return;
        }
        if (countdown === 0) {
            console.log("Send Code");
            const fetchApi = async () => {
                toast.promise(authService.sendMail(formData["email"]), {
                    loading: "Sending mail...",
                    success: (result) => {
                        console.log(result);
                        setCode(result);
                        return "Send email successfully";
                    },
                    error: "Email is used, please try again",
                });
            };
            fetchApi();
            setLastClickTime(currentTime);
            setCountdown(60);
        }
    }
    function handleShowPassword(e) {
        let passInput = document.getElementById("password");
        if (passInput.type === "password") {
            passInput.type = "text";
            e.target.src =
                "https://cdn.builder.io/api/v1/image/assets/TEMP/a8819b1cf48d19a6e95bc57cb5d373ec0162742f3cfe62b7ec31b90b0b48de06?apiKey=9349475655ee4a448868f824f5feb11d&";
        } else {
            passInput.type = "password";
            e.target.src = eyeSlash;
        }
    }

    
    const handleForgotPasswordClick = () => {
        setEmailModalOpen(true);
    };

    const closeModal = () => {
        setEmailModalOpen(false);
        setResetModalOpen(false);
    };
    return (
        <Fragment>
        <section className="mt-40 flex flex-col p-10 mt-10 max-w-full text-base leading-6 bg-white rounded-xl text-neutral-800 w-[540px] max-md:px-5 max-md:mt-10">
            <h2 className="text-4xl font-semibold text-center max-md:max-w-full">
                Login
            </h2>

            <form onSubmit={handleSubmit} method="post">
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
                            alt="Eye icon"
                            className="cursor-pointer shrink-0 w-6 aspect-square"
                            onClick={(e) => handleShowPassword(e)}
                        />
                    </div>
                    <button
                        className="float-right mt-2 self-stretch relative leading-[150%] text-grey-30 text-right"
                        onClick={handleForgotPasswordClick}
                    >
                        Forgot Password?
                    </button>
             
                        {errors.password && (
                                                <div className="mt-2 text-red-500  text-sm ml-1">
                                                    {errors.password}
                                                </div>
                                            )}
                                        </div>

                <button
                    type="submit"
                    className="justify-center px-5 py-3.5 mt-5 text-sm font-medium text-center text-white bg-black rounded-lg max-md:max-w-full w-full"
                >
                    Login
                </button>
            </form>
            <div className="mb-3 flex gap-3 justify-center items-center mt-6 text-sm text-center whitespace-nowrap text-neutral-400 max-md:flex-wrap">
                <hr className="flex-1 shrink-0 self-stretch my-auto h-px border border-solid bg-zinc-200 border-zinc-200" />
                <span className="self-stretch">OR</span>
                <hr className="flex-1 shrink-0 self-stretch my-auto h-px border border-solid bg-zinc-200 border-zinc-200" />
            </div>
            <OAuth2Form></OAuth2Form>
            <p className="flex gap-1.5 justify-center px-20 mt-6 text-center max-md:flex-wrap max-md:px-5">
                <span>Don't have an account?</span>{" "}
                <button
                    type="button"
                    to="/sign-up"
                    className="cursor-pointer font-medium underline text-neutral-800"
                    onClick={handleGoToSignUp}
                >
                    Sign Up
                </button>
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/52e263b3f77bfff5dc120002e909b75e45aba8be06ea8bd8be14872be77d8f38?apiKey=9349475655ee4a448868f824f5feb11d&"
                    alt="Arrow icon"
                    className="shrink-0 my-auto w-5 aspect-square"
                />
            </p>
        </section>
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
                                <form onSubmit={handleSubmit}>

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
                                <form onSubmit={handleSubmit}>
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
        </Fragment>
    );
}
