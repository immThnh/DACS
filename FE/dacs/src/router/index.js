import SignUp from "../pages/signUp";
import Login from "../pages/login";
import Login from "../pages/login";
import LandingPage from "../pages/landingpage/LandingPageComponent";
const publicRoutes = [
    { path: "/home", component: LandingPage },
    { path: "/sign-up", component: SignUp },
    { path: "/login", component: Login },
];

export { publicRoutes };
