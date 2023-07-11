//import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./views/Login/SignupPage";
import LoginPage from "./views/Login/LoginPage"

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
