import SignUp from "../pages/signUp";
import Login from "../pages/login"
import LandingPage from "../pages/landingpage/LandingPageComponent"
import Addcourse from "../pages/addCourse"
import details from "../pages/CourseDetail"
const publicRoutes = [
    { path: "/home", component: LandingPage },
    { path: "/sign-up", component: SignUp },
    {path: "/login", component: Login},
    {path: "/addcourse", component: Addcourse},
    {path: "/details", component: details}

];

export { publicRoutes };
