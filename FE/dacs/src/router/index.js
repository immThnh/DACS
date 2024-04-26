import SignUp from "../pages/signUp";
import Login from "../pages/login";
import LandingPage from "../pages/landing";
import AdminPage from "../pages/admin";
import NotFoundPage from "../pages/notFound";
import ListCourse from "../pages/admin/Course/list";
import CreateCourse from "../pages/admin/Course/create";
import EditCourse from "../pages/admin/Course/edit";
import DetailCourseAdmin from "../pages/admin/Course/detail";
import DetailCourse from "../pages/course/detail";
import Course from "../pages/course";
import ListCategory from "../pages/admin/Category/list";
import CategoryEdit from "../pages/admin/Category/edit";
import CreateCategory from "../pages/admin/Category/create";

const publicRoutes = [
    { path: "/", component: LandingPage },
    { path: "/sign-up", component: SignUp },
    { path: "/login", component: Login },
    { path: "*", component: NotFoundPage },
    { path: "/course/:id", component: Course },
    { path: "/course/detail/:id", component: DetailCourse },
];

const adminRoutes = [
    { path: "/admin", component: AdminPage },
    { path: "/admin/course/list", component: ListCourse },
    { path: "/admin/course/create", component: CreateCourse },
    { path: "/admin/course/edit/:id", component: EditCourse },
    { path: "/admin/course/view/:id", component: DetailCourseAdmin },
    { path: "/admin/category/list", component: ListCategory },
    { path: "/admin/category/create", component: CreateCategory },
    { path: "/admin/category/edit/:id", component: CategoryEdit },
];

export { publicRoutes, adminRoutes };
