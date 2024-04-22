import SignUp from "../pages/signUp";
import Login from "../pages/login"
import LandingPage from "../pages/landingpage/LandingPageComponent"
import details from "../pages/CourseDetail"
import Course from "../pages/learningPage"
const publicRoutes = [
    { path: "/home", component: LandingPage },
    { path: "/sign-up", component: SignUp },
    {path: "/login", component: Login},
    {path: "/details", component: details},
    {path: "/course", component: Course}

];

export { publicRoutes };
