import styles from "./NavigationTopBar.module.css";
import SearchImg from "../../assets/images/search.png";
import Avatar from "../../assets/images/avatar_25.jpg";
const NavigationTopBar = () => {
    const searchHandleISubmit = () => {
        console.log("search");
    };
    return (
        <header className={styles.navigationTopBar1}>
            <div className={styles.navigationTopBar11}>
                <div className={styles.topBarBg} />
                <div className={styles.div}></div>
                <div className={styles.navLeftWrapper}>
                    <div className={styles.navLeft}>
                        <div className={styles.search}>
                            <input
                                className={styles.search1}
                                placeholder="Search"
                                type="text"
                            />
                            <div
                                className={styles.searchIcon}
                                onClick={searchHandleISubmit}
                            >
                                <img
                                    className={styles.searchIcon}
                                    alt=""
                                    src={SearchImg}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.navRight}>
                    <div className={styles.profile}>
                        <div className={styles.userInfo}>
                            <div className={styles.userName}>
                                <b className={styles.joneAly}>Moni Roy</b>
                                <div className={styles.admin}>Admin</div>
                            </div>
                        </div>
                        <div className={styles.moreOptions}>
                            <img
                                className={styles.moreIcon}
                                alt=""
                                src={Avatar}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavigationTopBar;
