import styles from "./LeftNavDash.module.scss";
import clsx from "clsx";
import logoImg from "../../../assets/images/logo.png";
import appDash from "../../../assets/images/app_dash.svg";
import eDash from "../../../assets/images/ecommerce_dash.svg";
import icUser from "../../../assets/images/ic_user.svg";
import icCourse from "../../../assets/images/icCourse.svg";
import { Link } from "react-router-dom";
function LeftNavDash() {
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
                var sub = document.getElementById("subCourse");
                var link = document.getElementById("courseLink");
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
    return (
        <div className={clsx(styles.Wrapper)}>
            <nav className={clsx(styles.container)}>
                <div className={clsx(styles.sectionNav)}>
                    <li className={styles.title}>OVERVIEW</li>
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
                    <li className={clsx(styles.title)}>Manager</li>
                    <div className={clsx(styles.listItem)}>
                        <div
                            id="userLink"
                            className={clsx(styles.actionLink)}
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
                        <div id="subUser" className={clsx(styles.subContent)}>
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
                                    to="/admin/product/details"
                                    onClick={subItemClickHandle}
                                    className={clsx(styles.subItem)}
                                >
                                    <li className="d-flex">
                                        <span
                                            className={clsx(styles.dotItem)}
                                        ></span>
                                        <span className={clsx(styles.text)}>
                                            Details
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
                                    to="/admin/product/edit"
                                    onClick={subItemClickHandle}
                                    className={clsx(styles.subItem)}
                                >
                                    <li className="d-flex">
                                        <span
                                            className={clsx(styles.dotItem)}
                                        ></span>
                                        <span className={clsx(styles.text)}>
                                            Edit
                                        </span>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                        <div
                            onClick={handleOnSub}
                            id="courseLink"
                            className={clsx(styles.actionLink)}
                        >
                            {" "}
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
                        <div id="subCourse" className={clsx(styles.subContent)}>
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
                                <Link className={clsx(styles.subItem)} to="">
                                    <li className="d-flex">
                                        <span
                                            className={clsx(styles.dotItem)}
                                        ></span>
                                        <span className={clsx(styles.text)}>
                                            Details
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
                                <Link className={clsx(styles.subItem)} to="">
                                    <li className="d-flex">
                                        <span
                                            className={clsx(styles.dotItem)}
                                        ></span>
                                        <span className={clsx(styles.text)}>
                                            Edit
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
