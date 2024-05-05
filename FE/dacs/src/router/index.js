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
import HistoryDeleted from "../pages/admin/Course/historyDeleted";
import HistoryDeletedCategory from "../pages/admin/Category/historyDeleted";
import ListUser from "../pages/admin/user/list";
import ListDeletedUser from "../pages/admin/user/historyDeleted";

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
    { path: "/admin/course/detail/:id", component: DetailCourseAdmin },
    { path: "/admin/course/historyDelete", component: HistoryDeleted },
    { path: "/admin/category/list", component: ListCategory },
    { path: "/admin/category/create", component: CreateCategory },
    { path: "/admin/category/edit/:id", component: CategoryEdit },
    {
        path: "/admin/category/historyDelete",
        component: HistoryDeletedCategory,
    },

    { path: "/admin/user/list", component: ListUser },
    { path: "/admin/user/create", component: CreateCourse },
    { path: "/admin/user/edit/:id", component: EditCourse },
    { path: "/admin/user/detail/:id", component: DetailCourseAdmin },
    { path: "/admin/user/historyDelete", component: ListDeletedUser },
];

export { publicRoutes, adminRoutes };
