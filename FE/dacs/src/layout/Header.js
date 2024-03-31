import * as React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
export default function Header() {
    return (
        <header className="fixed flex gap-5 justify-between px-16 pt-3 pb-3 w-full rounded-xl text-sm leading-5 border-b bg-white border-gray-100 border-solid max-w-[1400px] max-md:flex-wrap max-md:px-5 max-md:max-w-full z-30">
            <div className="flex gap-5 justify-between self-start text-neutral-800 ">
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
                <Link to="sign-up" className="my-auto text-neutral-800">
                    Sign Up
                </Link>
                <Link
                    to="login"
                    className="justify-center px-6 py-3 text-white whitespace-nowrap bg-black rounded-md max-md:px-5"
                >
                    Login
                </Link>
            </div>
        </header>
    );
}
