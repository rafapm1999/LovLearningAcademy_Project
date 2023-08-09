//import './App.css';
import React from "react";
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
function App() {
  let [logged, setLogged] = useState(false);
  const [userData, setUserData] = useState({})
  const userLogged = (data) => {
    setLogged(data);
  }
  const userDataInfo = (e) => {
    setUserData(e);
  }

  if (logged === false) {
    console.log(userData);
    return (
      <Fragment>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Fragment></Fragment>} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutUs></AboutUs>} />
          <Route path="/courses" element={<CoursesPage></CoursesPage>} />
          <Route path="/contact" element={<ContactUs></ContactUs>} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage onLogin={userLogged}/>} />
          <Route path="/course/:id" element={<CourseInfoPage />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Routes>
        <Footer></Footer>
      </Fragment>
    );
  } else if (logged === true) {
    console.log(userData);
    return (
      <Fragment>
        <UserNavbar userData={userData} onLogin={userLogged} />
        <Routes>
          <Route path="/courses" element={<CoursesPage></CoursesPage>} />
          <Route path="/contact" element={<ContactUs></ContactUs>} />
          <Route path="/course/:id" element={<CourseInfoPage userData={userData}/>} />
          <Route path="/user-dashboard" element={<UserDashboard userInfo={userDataInfo} onLogin={userLogged} />} />
        </Routes>
        <Footer></Footer>
      </Fragment>
    );
  }
  
}

export default App;
