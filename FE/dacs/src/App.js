import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
    Navigate,
} from "react-router-dom";
import { publicRoutes, adminRoutes } from "./router";
import styles from "./App.module.scss";
import { Toaster } from "sonner";
import Header from "./layout/header";
import LeftNavDash from "./component/dashboard/leftNavDash";
import HeaderAdmin from "./layout/headerAdmin";
import clsx from "clsx";

function App() {
    const getLogin = () => {
        if (sessionStorage.getItem("token") !== null) {
            return true;
        }
        return false;
    };

    console.log("Render app");
    return (
        <Router>
            <div
                className={clsx("App ", {
                    // hideScroll: hideScrollBar,
                })}
            >
                <Routes>
                    {publicRoutes.map((route, index) => (
                        <Route
                            exact
                            key={index}
                            path={route.path}
                            element={
                                <>
                                    <Header />
                                    <div className={clsx("pt-header")}>
                                        <route.component />
                                    </div>
                                </>
                            }
                        />
                    ))}
                    {adminRoutes.map((route, index) => (
                        <Route
                            key={index}
                            exact
                            path={route.path}
                            element={
                                !getLogin() ? (
                                    <Navigate to={"/login"} replace={true} />
                                ) : (
                                    <>
                                        <HeaderAdmin></HeaderAdmin>
                                        <div className="flex bg-white">
                                            <LeftNavDash></LeftNavDash>
                                            <div
                                                className={clsx(
                                                    styles.adminContent
                                                )}
                                            >
                                                <route.component />
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        ></Route>
                    ))}
                </Routes>
                <Toaster position="top-center" richColors />
            </div>
        </Router>
    );
}

export default App;
