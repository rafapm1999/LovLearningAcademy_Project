import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import CoursesPage from "../../views/Courses/CoursesPage/CoursesPage"
import CourseInfoPage from "../../views/Courses/CoursesInfoPage/CourseInfoPage"
import LearnPlace from "../../views/LearnPlace/LearnPlace"
import Profile from "../../views/Profile/Profile"
import UserNavbar from "../../components/Navbar/UserNavbar/UserNavbar"
import Footer from "../../components/Footer/Footer"
import ErrorPage from "../../views/ErrorPage/ErrorPage"

function UserPage() {
    return (
        <Routes>
            <Route path="/" element={<Layout lang="en" />}>
                <Route path="/courses" element={<CoursesPage lang="en" />} />
                <Route path="/courses/:title" element={<CourseInfoPage lang="en" />} />
                <Route path="/mylearnplace" element={<LearnPlace lang="en" />} />
                <Route path="/profile" element={<Profile lang="en" />} />
                <Route path="*" element={<ErrorPage lang="es" />} />
            </Route>
            <Route path="*" element={<ErrorPage lang="es" />} />
        </Routes>
    );
}
function Layout() {
    return (
        <div>
            <UserNavbar lang="en" />
            <div>
                <Outlet />
            </div>
            <Footer lang="en" />
        </div>
    );
}

export default UserPage;
