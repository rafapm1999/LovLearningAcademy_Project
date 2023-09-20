//import './App.css';
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./views/Login/SignupPage";
import LoginPage from "./views/Login/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import ContactUs from "./views/Contact/ContactUs";
import AboutUs from "./views/About/AboutUs";
import HomePage from "./views/Home/HomePage";
import Footer from "./components/Footer/Footer";
import { Fragment } from "react";
import CoursesPage from "./views/Courses/CoursesPage";
import CourseInfoPage from "./views/Courses/CourseInfoPage";
import UserDashboard from "./views/UserDashboard/UserDashboard";
import { useState } from "react";
import UserNavbar from "./components/Navbar/UserNavbar";
import LearnPlace from "./views/LearnPlace/LearnPlace";
import AdminPage from "./views/Admin/AdminPage";
import AdminNavbar from "./components/Navbar/AdminNavbar";
import AdminMembers from "./views/Admin/AdminMembers"
import AdminCourses from "./views/Admin/AdminCourses";
import ErrorPage from "./views/ErrorPage/ErrorPage";
/* import { useNavigate } from 'react-router-dom'; */

function App() {
  let [logged, setLogged] = useState(false);
  let [userData, setUserData] = useState({});
  /* const navigate = useNavigate(); */

  const userLogged = (data) => {
    setLogged(data);
  };
  const handlerUserInfo = (e) => {
    setUserData(e);
  };

  const logout = () => {
    setUserData(null);
  };

  if (logged === false) {
    console.log('Has entrado en logged = false');
    console.log(userData);
    return (
      <Fragment>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutUs></AboutUs>} />
          <Route path="/courses" element={<CoursesPage></CoursesPage>} />
          <Route path="/contact" element={<ContactUs></ContactUs>} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage newUserData={handlerUserInfo} onLogin={userLogged} />} />
          <Route path="/course/:id" element={<CourseInfoPage userData={userData} onLogin={logged} />} />
          <Route path="/error-page" element={<ErrorPage />} />
        </Routes>
        <Footer></Footer>
      </Fragment>
    );

  } else if (logged === true && userData.role === "admin") {
    console.log('logged === true && userData.role === "admin"');
    return (
      <Fragment>
        <AdminNavbar onLogin={userLogged} logout={logout}/>
        <Routes>
          <Route path="/user-dashboard" element={<UserDashboard userData={userData} onUserInfo={handlerUserInfo} />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/bbdd-members" element={<AdminMembers />} />
          <Route path="/bbdd-courses" element={<AdminCourses />} />
          <Route path="/error-page" element={<ErrorPage />} />
        </Routes>
      </Fragment>
    );
  } else if (logged === true && userData.role === "user") {
    console.log('Has entrado en logged = true');
    console.log(userData);
    return (
      <Fragment>
        <UserNavbar userData={userData} onLogin={userLogged} logout={logout} />
        <Routes>
          <Route path="/courses" element={<CoursesPage></CoursesPage>} />
          <Route path="/contact" element={<ContactUs userData={userData} />} />
          <Route path="/course/:id" element={<CourseInfoPage userData={userData} onLogin={logged} newUserData={handlerUserInfo} />} />
          <Route path="/user-dashboard" element={<UserDashboard userData={userData} onUserInfo={handlerUserInfo} />} />
          <Route path="/mylearnplace" element={<LearnPlace userData={userData} newUserData={handlerUserInfo} />} />
          <Route path="/error-page" element={<ErrorPage />} />
        </Routes>
        <Footer></Footer>
      </Fragment>
    );



  }
}


export default App;
