import styles from "./LeftNavDash.module.scss";
import clsx from "clsx";
import appDash from "../../../assets/images/app_dash.svg";
import eDash from "../../../assets/images/ecommerce_dash.svg";
import icUser from "../../../assets/images/ic_user.svg";
import icCourse from "../../../assets/images/icCourse.svg";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
function LeftNavDash() {
    const [close, setClose] = useState(false);

    const handleOnSub = (e) => {
        let clickElement = e.target;
        switch (clickElement.textContent) {
            case "User":
                var sub = document.getElementById("subUser");
                var link = document.getElementById("userLink");
                sub.classList.toggle("d-block");
                link.classList.toggle(clsx(styles.active));
                break;
            case "Course":
                sub = document.getElementById("subCourse");
                link = document.getElementById("courseLink");
                sub.classList.toggle("d-block");
                link.classList.toggle(clsx(styles.active));
                break;
            case "Category":
                sub = document.getElementById("subCategory");
                link = document.getElementById("categoryLink");
                sub.classList.toggle("d-block");
                link.classList.toggle(clsx(styles.active));
                break;

            default:
                break;
        }
    };
    const subItemClickHandle = (e) => {
        console.log(e.currentTarget.id);
        var element = e.currentTarget;
        element.classList.toggle(clsx(styles.active));

        switch (element.id) {
            case "list":
                break;
            default:
                break;
        }
    };

    const handleCloseNavBar = () => {
        setClose(!close);
    };

    return (
        <div
            className={clsx(styles.Wrapper, "fixed z-header h-full", {
                [styles.close]: close,
            })}
        >
            <div
                className={clsx(styles.btnClose, "b-shadow")}
                onClick={handleCloseNavBar}
            >
                {!close && <ChevronLeftIcon></ChevronLeftIcon>}
                {close && <ChevronRightIcon></ChevronRightIcon>}
            </div>
            <nav className={clsx(styles.container)}>
                <div className={clsx(styles.sectionNav)}>
                    <li
                        className={clsx(styles.title, {
                            [styles.close]: close,
                        })}
                    >
                        OVERVIEW
                    </li>
                    <div className={clsx(styles.listItem)}>
                        <Link className={clsx(styles.actionLink)}>
                            <span className={clsx(styles.icon)}>
                                <img src={appDash} alt="" />
                            </span>
                            <span
                                className={clsx(
                                    styles.nameAction,
                                    styles.label
                                )}
                            >
                                App
                            </span>
                        </Link>
                        <Link className={clsx(styles.actionLink)}>
                            {" "}
                            <span className={clsx(styles.icon)}>
                                <img src={eDash} alt="" />
                            </span>
                            <span
                                className={clsx(
                                    styles.nameAction,
                                    styles.label
                                )}
                            >
                                Ecomnercy
                            </span>
                        </Link>
                    </div>
                </div>
                <div className={clsx(styles.sectionNav)}>
                    <li
                        className={clsx(styles.title, {
                            [styles.close]: close,
                        })}
                    >
                        Manager
                    </li>
                    <div className={clsx(styles.listItem)}>
                        <div
                            id="userLink"
                            className={clsx(styles.actionLink, {
                                [styles.active]: !close,
                            })}
                            onClick={handleOnSub}
                        >
                            <span className={clsx(styles.icon)}>
                                <img src={icUser} alt="" />
                            </span>
                            <span
                                className={clsx(
                                    styles.nameAction,
                                    styles.label
                                )}
                            >
                                User
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                role="img"
                                className="arrow MuiBox-root css-3o0h5k iconify iconify--eva"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19"
                                ></path>
                            </svg>
                        </div>
                        <div
                            id="subUser"
                            className={clsx(styles.subContent, {
                                "d-block": !close,
                            })}
                        >
                            <ul className={clsx(styles.subList)}>
                                <Link
                                    to="/admin/user/list"
                                    id="list"
                                    onClick={subItemClickHandle}
                                    className={clsx(styles.subItem)}
                                >
                                    <li className="d-flex">
                                        <span
                                            className={clsx(styles.dotItem)}
                                        ></span>
                                        <span className={clsx(styles.text)}>
                                            List
                                        </span>
                                    </li>
                                </Link>

                                <Link
                                    to="/admin/user/create"
                                    onClick={subItemClickHandle}
                                    className={clsx(styles.subItem)}
                                >
                                    <li className="d-flex">
                                        <span
                                            className={clsx(styles.dotItem)}
                                        ></span>
                                        <span className={clsx(styles.text)}>
                                            Create
                                        </span>
                                    </li>
                                </Link>
                                <Link
                                    className={clsx(styles.subItem)}
                                    to="/admin/user/historyDelete"
                                >
                                    <li className="d-flex">
                                        <span
                                            className={clsx(styles.dotItem)}
                                        ></span>
                                        <span className={clsx(styles.text)}>
                                            History Delete
                                        </span>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                        <div
                            onClick={handleOnSub}
                            id="courseLink"
                            className={clsx(styles.actionLink, {
                                [styles.active]: !close,
                            })}
                        >
                            <span className={clsx(styles.icon)}>
                                <img src={icCourse} alt="" />
                            </span>
                            <span
                                className={clsx(
                                    styles.nameAction,
                                    styles.label
                                )}
                            >
                                Course
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                role="img"
                                className="arrow MuiBox-root css-3o0h5k iconify iconify--eva"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19"
                                ></path>
                            </svg>
                        </div>
                        <div
                            id="subCourse"
                            className={clsx(styles.subContent, {
                                "d-block": !close,
                            })}
                        >
                            <ul className={clsx(styles.subList)}>
                                <Link
                                    className={clsx(styles.subItem)}
                                    to="/admin/course/list"
                                >
                                    <li className="d-flex">
                                        <span
                                            className={clsx(styles.dotItem)}
                                        ></span>
                                        <span className={clsx(styles.text)}>
                                            List
                                        </span>
                                    </li>
                                </Link>
                                <Link
                                    className={clsx(styles.subItem)}
                                    to="/admin/course/create"
                                >
                                    <li className="d-flex">
                                        <span
                                            className={clsx(styles.dotItem)}
                                        ></span>
                                        <span className={clsx(styles.text)}>
                                            Create
                                        </span>
                                    </li>
                                </Link>
                                <Link
                                    className={clsx(styles.subItem)}
                                    to="/admin/course/historyDelete"
                                >
                                    <li className="d-flex">
                                        <span
                                            className={clsx(styles.dotItem)}
                                        ></span>
                                        <span className={clsx(styles.text)}>
                                            History Delete
                                        </span>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                        <div
                            id="categoryLink"
                            className={clsx(styles.actionLink, {
                                [styles.active]: !close,
                            })}
                            onClick={handleOnSub}
                        >
                            <span className={clsx(styles.icon)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 -960 960 960"
                                    width="24"
                                    fill="#768490"
                                >
                                    <path d="m260-520 220-360 220 360H260ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-20v-320h320v320H120Zm580-60q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-500-20h160v-160H200v160Zm202-420h156l-78-126-78 126Zm78 0ZM360-340Zm340 80Z" />
                                </svg>
                            </span>
                            <span
                                className={clsx(
                                    styles.nameAction,
                                    styles.label
                                )}
                            >
                                Category
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                role="img"
                                className="arrow MuiBox-root css-3o0h5k iconify iconify--eva"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19"
                                ></path>
                            </svg>
                        </div>
                        <div
                            id="subCategory"
                            className={clsx(styles.subContent, {
                                "d-block": close === false,
                            })}
                        >
                            <ul className={clsx(styles.subList)}>
                                <Link
                                    className={clsx(styles.subItem)}
                                    to="/admin/category/list"
                                >
                                    <li className="d-flex">
                                        <span
                                            className={clsx(styles.dotItem)}
                                        ></span>
                                        <span className={clsx(styles.text)}>
                                            List
                                        </span>
                                    </li>
                                </Link>
                                <Link
                                    className={clsx(styles.subItem)}
                                    to="/admin/category/create"
                                >
                                    <li className="d-flex">
                                        <span
                                            className={clsx(styles.dotItem)}
                                        ></span>
                                        <span className={clsx(styles.text)}>
                                            Create
                                        </span>
                                    </li>
                                </Link>
                                <Link
                                    className={clsx(styles.subItem)}
                                    to="/admin/category/historyDelete"
                                >
                                    <li className="d-flex">
                                        <span
                                            className={clsx(styles.dotItem)}
                                        ></span>
                                        <span className={clsx(styles.text)}>
                                            History Delete
                                        </span>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default LeftNavDash;
