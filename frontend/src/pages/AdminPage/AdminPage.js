import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import AdminDashPage from "../../views/Admin/AdminDashPage/AdminDashPage"
import AdminCreateCourse from "../../views/Admin/AdminCreateCourse/AdminCreateCourse"
import AdminMembers from "../../views/Admin/AdminMembers/AdminMembers"
import AdminCourses from "../../views/Admin/AdminCourses/AdminCourses"
import AdminNavbar from "../../components/Navbar/AdminNavbar/AdminNavbar"
import CourseComplete from "../../views/CourseComplete/CourseComplete";
import Footer from "../../components/Footer/Footer"
import ErrorPage from "../../views/ErrorPage/ErrorPage"
import AdminEditCourse from "../../views/Admin/AdminEditCourse/AdminEditCourse";

function AdminPage() {
    return (
        <Routes>
            <Route path="/" element={<Layout lang="en" />}>
                <Route path="/admin-page" element={<AdminDashPage lang="en" />} />
                <Route path="/edit/:id" element={<AdminEditCourse lang="en" />} />
                <Route path="/create-course" element={<AdminCreateCourse lang="en" />} />
                <Route path="/bbdd-members" element={<AdminMembers lang="en" />} />
                <Route path="/bbdd-courses" element={<AdminCourses lang="en" />} />
                <Route path="/preview/:slug" element={<CourseComplete lang="en"/> } />
                <Route path="*" element={<ErrorPage lang="en" />} />
            </Route>
            <Route path="*" element={<ErrorPage lang="en" />} />
        </Routes>
    );
}

function Layout() {
    return (
        <div>
            <AdminNavbar lang="en" />
            <div>
                <Outlet />
            </div>
            <Footer lang="en" />
        </div>
    );
}
export default AdminPage;
