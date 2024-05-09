import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Outlet,
} from "react-router-dom";
import { publicRoutes, adminRoutes, userRoutes } from "./router";
import styles from "./App.module.scss";
import { Toaster } from "sonner";
import Header from "./layout/header";
import LeftNavDash from "./component/dashboard/leftNavDash";
import HeaderAdmin from "./layout/headerAdmin";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Interceptors from "./Interceptor";
const PrivateWrapper = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Outlet></Outlet>;
    }
    sessionStorage.setItem("prevPath", window.location.pathname);
    return <Navigate to="/login" />;
};

function App() {
    const isLoggedIn = useSelector((state) => state.login.isLogin);
    const [isLogged, setIsLogged] = useState(isLoggedIn);
    useEffect(() => {
        if (sessionStorage.getItem("token") !== null) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, [isLoggedIn]);
    console.log("Render app");
    return (
        <div className={clsx("App ", {})}>
            <Interceptors></Interceptors>
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
                {userRoutes.map((route, index) => (
                    <Route
                        key={index}
                        element={
                            <PrivateWrapper
                                isAuthenticated={isLogged}
                            ></PrivateWrapper>
                        }
                    >
                        <Route
                            path={route.path}
                            exact
                            key={index}
                            element={
                                <>
                                    {!route.path.includes("/course/detail") && (
                                        <Header />
                                    )}
                                    <div className={clsx("pt-header")}>
                                        <route.component />
                                    </div>
                                </>
                            }
                        />
                    </Route>
                ))}
                {adminRoutes.map((route, index) => (
                    <Route
                        key={index}
                        element={
                            <PrivateWrapper
                                isAuthenticated={isLogged}
                            ></PrivateWrapper>
                        }
                    >
                        <Route
                            path={route.path}
                            exact
                            key={index}
                            element={
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
                            }
                        />
                    </Route>
                ))}
            </Routes>
            <Toaster position="top-center" richColors />
        </div>
    );
}

export default App;
