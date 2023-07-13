//import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./views/Login/SignupPage";
import LoginPage from "./views/Login/LoginPage"
import Navbar from "./components/Navbar/Navbar"
import HomePage from "./views/Home/HomePage";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
      <Route path="/" element={<></>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/about" element={<></>}/>
        <Route path="/blog" element={<></>}/>
        <Route path="/contact" element={<></>}/>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
