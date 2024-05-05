import * as React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/avatar_25.jpg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Styles from "./Header.module.scss";
import clsx from "clsx";
export default function Header() {
    const navigate = useNavigate();
    const logged = useSelector((state) => state.login.isLogin);
    const [page, setPage] = React.useState("login");
    const [isAdmin, setIsAdmin] = React.useState(false);
    React.useEffect(() => {
        if (window.location.pathname === "/admin") {
            setIsAdmin(true);
        }
    });

    const handleGoToSignUp = () => {
        if (window.location.pathname === "/sign-up") return;
        setPage("sign-up");
        navigate("/sign-up");
    };
    const handleGoToLogin = () => {
        if (window.location.pathname === "/login") return;
        setPage("login");
        navigate("/login");
    };

    const handleGotoProfile = () => {
        console.log("go to profile");
    };

    return (
        !isAdmin && (
            <div className="z-1000 relative w-full flex justify-center">
                <div className="w-1400 fixed shrink-0 max-w-full h-10 bg-black rounded-t-md w-full z-50"></div>
                <header
                    className={clsx(` ${Styles.boxShadow} rounded-b-xl z-header w-1400  bg-white mt-10 fixed flex gap-5 justify-between px-16 pt-3 pb-3 text-sm leading-5 border-b border-gray-100 border-solid  max-md:flex-wrap max-md:px-5 max-md:max-w-full`)}
                >
                    <div className="flex gap-5 justify-between self-start text-neutral-800">
                        <Link to="/">
                            <img
                                loading="lazy"
                                src={logo}
                                alt="Logo"
                                className="shrink-0 w-11 aspect-square"
                            />
                        </Link>
                        <nav className="flex gap-4 justify-between my-auto">
                            <Link
                                className={`nav-header ${
                                    window.location.pathname === "/"
                                        ? "nav-header-active"
                                        : ""
                                }`}
                                to="/"
                            >
                                Home
                            </Link>
                            <Link
                                className={`nav-header ${
                                    window.location.pathname === "/courses"
                                        ? "nav-header-active"
                                        : ""
                                }`}
                                to="/course"
                            >
                                Courses
                            </Link>
                            <Link
                                className={`nav-header ${
                                    window.location.pathname === "/about-us"
                                        ? "nav-header-active"
                                        : ""
                                }`}
                                to="#"
                            >
                                About Us
                            </Link>
                        </nav>
                    </div>
                    <div className="flex gap-3 justify-between">
                        {!logged ? (
                            <>
                                <button
                                    type="button"
                                    onClick={handleGoToSignUp}
                                    id="signUp"
                                    className={`"cursor-pointer" ${
                                        page === "sign-up"
                                            ? "justify-center px-6 py-3 whitespace-nowrap rounded-md max-md:px-5 bg-black text-white"
                                            : "my-auto px-6 py-3 text-neutral-800 whitespace-nowrap rounded-md"
                                    }`}
                                >
                                    Sign Up
                                </button>
                                <button
                                    type="button"
                                    onClick={handleGoToLogin}
                                    id="login"
                                    className={`"cursor-pointer" ${
                                        page === "login"
                                            ? "justify-center px-6 py-3 whitespace-nowrap rounded-md max-md:px-5 bg-black text-white"
                                            : "my-auto px-6 py-3 text-neutral-800 whitespace-nowrap rounded-md"
                                    }`}
                                >
                                    Login
                                </button>
                            </>
                        ) : (
                            <img
                                className="cursor-pointer h-10 rounded-full"
                                src={avatar}
                                alt=""
                                onClick={handleGotoProfile}
                            />
                        )}
                    </div>
                </header>
            </div>
        )
    );
}
