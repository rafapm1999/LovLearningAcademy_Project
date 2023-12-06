import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Home from "../../views/Home/Home"
import AboutUs from "../../views/About/AboutUs"
import Courses from "../../views/Courses/CoursesPage/CoursesPage"
import CourseInfoPage from "../../views/Courses/CoursesInfoPage/CourseInfoPage"
import ContactUs from "../../views/Contact/ContactUs"
import SignupPage from "../../views/Signup/SignupPage/SignupPage"
import LoginPage from "../../views/Login/LoginPage/LoginPage"
import LoaderPage from "../../views/LoaderPage/LoaderPage"
import ErrorPage from "../../views/ErrorPage/ErrorPage"
import Navbar from "../../components/Navbar/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"

function HomePage() {
    return (
        <Routes>
            <Route path="/" element={<Layout lang="en" />}>
                <Route index element={<Home lang="en" />} />
                <Route path="/about" element={<AboutUs lang="en" />} />
                <Route path="/courses" element={<Courses lang="en" />} />
                <Route path="/course/:title" element={<CourseInfoPage lang="en" />} />
                <Route path="/contact" element={<ContactUs lang="en" />} />
                <Route path="/signup" element={<SignupPage lang="en" />} />
                <Route path="/login" element={<LoginPage lang="en" />} />
                <Route path="/loader-page" element={<LoaderPage lang="en" />} /> 
                <Route path="*" element={<ErrorPage lang="en" />} />
            </Route>
            {/* <Route path="*" element={<ErrorPage lang="es" />} /> */}
        </Routes>
    );
}
function Layout() {
    return (
        <div>
            <Navbar lang="en" />
            <div>
                <Outlet />
            </div>
            <Footer lang="en" />
        </div>
    );
}

export default HomePage;
