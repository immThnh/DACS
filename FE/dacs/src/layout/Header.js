import * as React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import loginReducer from "../redux/reducers/loginReducer";
import { useNavigate } from "react-router-dom";
export default function Header() {
    const navigate = useNavigate();
    const dangLogin = useSelector((state) => state.login.isLogin);
    const dispatch = useDispatch();

    const handleGoToSignUp = () => {
        if (!dangLogin) return;
        dispatch(loginReducer.actions.setSignUp());
        navigate("/sign-up");
    };
    const handleGoToLogin = () => {
        if (dangLogin) return;
        dispatch(loginReducer.actions.setLogin());
        navigate("/login");
    };
    return (
        <header className=" mt-10 fixed flex gap-5 justify-between px-16 pt-3 pb-3 w-full text-sm leading-5 border-b border-gray-100 border-solid max-w-[1400px] max-md:flex-wrap max-md:px-5 max-md:max-w-full">
            <div className="flex gap-5 justify-between self-start text-neutral-800">
                <Link to="/">
                    <img
                        loading="lazy"
                        src={logo}
                        alt="Logo"
                        className="shrink-0 w-11 aspect-square"
                    />
                </Link>
                <nav className="flex gap-5 justify-between my-auto">
                    <Link to="#">Home</Link>
                    <Link to="">Courses</Link>
                    <Link to="#">About Us</Link>
                </nav>
            </div>
            <div className="flex gap-5 justify-between">
                <button
                    type="button"
                    onClick={handleGoToSignUp}
                    id="signUp"
                    className={`"cursor-pointer" ${
                        !dangLogin
                            ? "justify-center px-6 py-3 whitespace-nowrap rounded-md max-md:px-5 bg-black text-white"
                            : "my-auto text-neutral-800"
                    }`}
                >
                    Sign Up
                </button>
                <button
                    type="button"
                    onClick={handleGoToLogin}
                    id="login"
                    className={`"cursor-pointer" ${
                        dangLogin
                            ? "justify-center px-6 py-3 whitespace-nowrap rounded-md max-md:px-5 bg-black text-white"
                            : "my-auto text-neutral-800"
                    }`}
                >
                    Login
                </button>
            </div>
        </header>
    );
}
