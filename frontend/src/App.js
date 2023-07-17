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
import {Fragment} from "react";
import CoursesPage from "./views/Courses/CoursesPage";



function App() {
  return (
    <Fragment>
      <Navbar></Navbar>
      <Routes>
      <Route path="/" element={<Fragment></Fragment>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/about" element={<AboutUs></AboutUs>}/>
        <Route path="/courses" element={<CoursesPage></CoursesPage>}/>
        <Route path="/contact" element={<ContactUs></ContactUs>}/>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer></Footer>
    </Fragment>
  );
}

export default App;
