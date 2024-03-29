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
            <div className="App flex flex-col items-center pt-5 bg-neutral-100">
                <div className="fixed shrink-0 max-w-full h-10 bg-black rounded-md w-[1400px]" />
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
