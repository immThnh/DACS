import SignUp from "../pages/signUp";
import Login from "../pages/login";
import LandingPage from "../pages/landing/LandingPageComponent";
import AdminPage from "../pages/admin";
import NotFoundPage from "../pages/notFound";
import ListCourse from "../pages/admin/Course/list";
import CreateCourse from "../pages/admin/Course/create";
import EditCourse from "../pages/admin/Course/edit";
import DetailCourseAdmin from "../pages/admin/Course/detail";
import DetailCourse from "../pages/course/detail";
import Course from "../pages/course";

const publicRoutes = [
    { path: "/", component: LandingPage },
    { path: "/sign-up", component: SignUp },
    { path: "/login", component: Login },
    { path: "*", component: NotFoundPage },
    { path: "/course", component: Course },
    { path: "/course/detail", component: DetailCourse },
];

const adminRoutes = [
    { path: "/admin", component: AdminPage },
    { path: "/admin/course/list", component: ListCourse },
    { path: "/admin/course/create", component: CreateCourse },
    { path: "/admin/course/edit/:id", component: EditCourse },
    { path: "/admin/course/view/:id", component: DetailCourseAdmin },
];

export { publicRoutes, adminRoutes };
