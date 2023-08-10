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
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutUs></AboutUs>} />
          <Route path="/courses" element={<CoursesPage></CoursesPage>} />
          <Route path="/contact" element={<ContactUs></ContactUs>} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage onLogin={userLogged} />} />
          <Route path="/course/:id" element={<CourseInfoPage userData={userData} onLogin={logged}/>} />
        </Routes>
        <Footer></Footer>
      </Fragment>
    );
  } else if (logged === true) {
    console.log('Has entrado en logged = true');
    console.log(userData);
    return (
      <Fragment>
        <UserNavbar userData={userData} onLogin={userLogged} logout={logout} />
        <Routes>
          <Route path="/courses" element={<CoursesPage></CoursesPage>} />
          <Route path="/contact" element={<ContactUs></ContactUs>} />
          <Route path="/course/:id" element={<CourseInfoPage userData={userData} onLogin={logged}/>} />
          <Route path="/user-dashboard" element={<UserDashboard onUserInfo={handlerUserInfo} />} />
          <Route path="/mycourses" element={<LearnPlace />} />
        </Routes>
        <Footer></Footer>
      </Fragment>
    );
  }

}

export default App;
