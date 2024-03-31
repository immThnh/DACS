import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./router";
import SignUp from "./pages/signUp";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { Toaster } from "sonner";

function App() {
    return (
        <Router>
            <div className="App flex flex-col items-center bg-neutral-100  sticky top-0">
                <Header></Header>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<Page></Page>}
                            ></Route>
                        );
                    })}
                </Routes>
                <Footer></Footer>
                <Toaster position="top-center" richColors></Toaster>
            </div>
        </Router>
    );
}

export default App;
