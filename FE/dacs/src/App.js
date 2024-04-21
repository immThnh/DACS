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
        {/* Remove the 'sticky top-0' from here, it should be on the Header component only */}
        <div className="App flex flex-col items-center bg-neutral-100">
            <Header /> {/* Header should have 'sticky top-0' within its own styles */}
            {/* Add a class to give padding equal to the Header's height */}
            <div className="page-content">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<Page />}
                            />
                        );
                    })}
                </Routes>
            </div>
            <Footer />
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    </Router>
    );
}

export default App;
