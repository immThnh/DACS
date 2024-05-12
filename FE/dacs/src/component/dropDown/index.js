import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import styles from "./Menu.module.scss";
import { Fragment, useEffect, useState } from "react";
import avatarDefault from "../../assets/images/avatar_25.jpg";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import * as authApi from "../../api/apiService/authService";
import { useDispatch, useSelector } from "react-redux";
import loginSlice from "../../redux/reducers/loginSlice";

function Dropdown({ elementClick, ...props }) {
    const isLogged = useSelector((state) => state.login.isLogin);
    const dispatch = useDispatch();
    const [user, setUser] = useState();
    const handleLogout = () => {
        const fetchApi = async () => {
            try {
                await authApi.logout();
                dispatch(loginSlice.actions.setLogout());
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi();
    };

    useEffect(() => {
        var temp = sessionStorage.getItem("user");
        setUser(JSON.parse(temp));
    }, [isLogged]);

    return (
        <div className="text-right">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                        {elementClick
                            ? elementClick
                            : "Options" +
                              (
                                  <ChevronDownIcon
                                      className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                                      aria-hidden="true"
                                  />
                              )}
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className={clsx(
                            styles.itemClick,
                            "absolute right-0 mt-2origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                        )}
                    >
                        <div className="px-4 py-1 w-max">
                            <div
                                className={`${"text-gray-900"} group flex w-full items-center rounded-md py-2.5 text-sm`}
                            >
                                <div>
                                    <img
                                        className={clsx(styles.avatar)}
                                        src={
                                            user && user.avatar
                                                ? user.avatar
                                                : avatarDefault
                                        }
                                        alt=""
                                    />
                                </div>
                                <div
                                    className={clsx(styles.userName, "flex-1")}
                                >
                                    <span>
                                        {user && user.firstName}
                                        {user && user.lastName}
                                    </span>
                                    <div>
                                        {user &&
                                            "@" +
                                                user.email.substring(
                                                    0,
                                                    user.email.indexOf("@")
                                                )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-1 py-1 ">
                            <Link
                                to={`/me/profile/${
                                    user &&
                                    user.email.substring(
                                        0,
                                        user.email.indexOf("@")
                                    )
                                }`}
                            >
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${
                                                active
                                                    ? "bg-black text-white"
                                                    : "text-gray-900"
                                            } group flex w-full items-center rounded-md px-2 py-2.5 text-sm`}
                                        >
                                            {active ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="mr-2 w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        stroklinejoin="round"
                                                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="mr-2 w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        stroklinejoin="round"
                                                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                    />
                                                </svg>
                                            )}
                                            Profile
                                        </button>
                                    )}
                                </Menu.Item>
                            </Link>
                            <Link to={"/me/course"}>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${
                                                active
                                                    ? "bg-black text-white"
                                                    : "text-gray-900"
                                            } group flex w-full items-center rounded-md px-2 py-2.5 text-sm`}
                                        >
                                            {active ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="mr-2 w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        stroklinejoin="round"
                                                        d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="mr-2 w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        stroklinejoin="round"
                                                        d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z"
                                                    />
                                                </svg>
                                            )}
                                            My course
                                        </button>
                                    )}
                                </Menu.Item>
                            </Link>
                        </div>
                        <div className="px-1 py-1">
                            <div onClick={handleLogout}>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${
                                                active
                                                    ? "bg-black text-white"
                                                    : "text-gray-900"
                                            } group flex w-full items-center rounded-md px-2 py-2.5 text-sm`}
                                        >
                                            {active ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="mr-2 w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        stroklinejoin="round"
                                                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="mr-2 w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        stroklinejoin="round"
                                                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                                                    />
                                                </svg>
                                            )}
                                            Logout
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

export default Dropdown;
