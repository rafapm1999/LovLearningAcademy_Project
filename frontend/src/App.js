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
import LoaderPage from "./views/LoaderPage/LoaderPage";
import { useState } from "react";
import UserNavbar from "./components/Navbar/UserNavbar";
import LearnPlace from "./views/LearnPlace/LearnPlace";
import AdminPage from "./views/Admin/AdminPage";
import AdminNavbar from "./components/Navbar/AdminNavbar";
import AdminMembers from "./views/Admin/AdminMembers"
import AdminCourses from "./views/Admin/AdminCourses";
import ErrorPage from "./views/ErrorPage/ErrorPage";
import AdminCreateCourse from "./views/Admin/AdminCreateCourse";
import Profile from "./views/Profile/Profile";
/* import { useNavigate } from 'react-router-dom'; */

function App() {
  const [visible, setVisible] = useState(false);
  let [logged, setLogged] = useState(false);
  let [userData, setUserData] = useState({});
  const [openProfile, setOpenProfile] = useState(false)

  /* const navigate = useNavigate(); */

  const userLogged = (data) => {
    setLogged(data);
  };
  const handlerUserInfo = (e) => {
    console.log("Has entrado en handlerUserInfo");
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

    const openAdminProfile = () => {
      console.log('Has entrado en openAdminProfile');
      setVisible(true)
      setOpenProfile(true)
    }
    console.log(openProfile);
    const closeAdminProfile = () => {
      console.log('Has entrado en closeAdminProfile');
      setVisible(!visible)
      setOpenProfile(false)
    }
    console.log(openProfile);
    return (
      <Fragment>
        <AdminNavbar onLogin={userLogged} logout={logout} userData={userData} openProfile={openAdminProfile} closeProfile={closeAdminProfile} visible={visible} openedProfile={openProfile}/>
        <Routes>
          <Route path="/loader-page" element={<LoaderPage userData={userData} onUserInfo={handlerUserInfo} closeProfile={closeAdminProfile} openedProfile={openProfile}/>} />
          <Route path="/admin" element={<AdminPage userData={userData} visible={visible}/>} />
          <Route path="/create-course" element={<AdminCreateCourse visible={visible}/>} />
          <Route path="/bbdd-members" element={<AdminMembers visible={visible}/>} />
          <Route path="/bbdd-courses" element={<AdminCourses openProfile={openProfile}/>} />
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
          <Route path="/loader-page" element={<LoaderPage userData={userData} onUserInfo={handlerUserInfo} />} />
          <Route path="/about" element={<AboutUs></AboutUs>} />
          <Route path="/mylearnplace" element={<LearnPlace userData={userData} newUserData={handlerUserInfo} />} />
          <Route path="/profile" element={<Profile userData={userData} newUserData={handlerUserInfo}/>} />
          <Route path="/error-page" element={<ErrorPage />} />
        </Routes>
        <Footer userData={userData}></Footer>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
       <Navbar></Navbar>
      <Routes>
        <Route path="/error-page" element={<ErrorPage />} />
      </Routes>
      <Footer></Footer>
    </Fragment>
  );
  }
}


export default App;
