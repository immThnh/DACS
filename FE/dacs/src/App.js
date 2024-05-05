import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, adminRoutes } from "./router";
import styles from "./App.module.scss";
import { Toaster } from "sonner";
import Header from "./layout/header";
import Footer from "./layout/footer";
import LeftNavDash from "./component/dashboard/leftNavDash";
import HeaderAdmin from "./layout/headerAdmin";
import clsx from "clsx";

function App() {
    return (
        <Router>
            <div className="App bg-neutral-100">
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
                        ></Route>
                    ))}
                </Routes>
                <Toaster position="top-center" richColors />
            </div>
        </Router>
    );
}

export default App;
