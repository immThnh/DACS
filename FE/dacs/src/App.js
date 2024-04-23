import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, adminRoutes } from "./router";
import { Toaster } from "sonner";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import LeftNavDash from "./component/dashboard/leftNavDash";
import HeaderAdmin from "./layout/adminLayout/headerAdmin";
import { redirect } from "react-router-dom";

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
                                    <route.component />
                                    <Footer />
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
                                        <route.component />
                                    </div>
                                </>
                            }
                        >
                        </Route>
                    ))}
                    {/* <Redirect exact  to="/404" /> */}
                </Routes>
                <Toaster position="top-center" richColors />
            </div>
        </Router>
    );
}

export default App;
