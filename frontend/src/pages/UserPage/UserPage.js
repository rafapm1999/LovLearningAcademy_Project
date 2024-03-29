import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import CoursesPage from "../../views/Courses/CoursesPage/CoursesPage"
import CourseInfoPage from "../../views/Courses/CoursesInfoPage/CourseInfoPage"
import MyCourses from "../../views/MyCourses/MyCourses";
import LearnPlace from "../../views/LearnPlace/LearnPlace"
import Profile from "../../views/Profile/Profile"
import UserNavbar from "../../components/Navbar/UserNavbar/UserNavbar"
import Unauthorized from "../../views/Unauthorized/Unauthorized";
import Footer from "../../components/Footer/Footer"
import ErrorPage from "../../views/ErrorPage/ErrorPage"
import CourseComplete from "../../views/CourseComplete/CourseComplete";


function UserPage() {
    return (
        <Routes>
            <Route path="/" element={<Layout lang="en" />}>
                <Route path="/courses" element={<CoursesPage lang="en" />} />
                <Route path="/courses/:slug" element={<CourseInfoPage lang="en" />} />
                <Route  index path="/mycourses" element={<MyCourses lang="en" />} />
                <Route path="/mycourses/:slug" element={<CourseComplete lang="en"/> } />
                <Route path="/profile" element={<Profile lang="en" />} />
                <Route path="/unauthorized" element={<Unauthorized lang="en" />} />
                <Route path="*" element={<ErrorPage lang="en" />} />
            </Route>
        </Routes>
    );
}
function Layout() {
    return (
        <div>
            <UserNavbar lang="en" />
            <>
                <Outlet />
            </>
            <Footer lang="en" />
        </div>
    );
}

export default UserPage;
