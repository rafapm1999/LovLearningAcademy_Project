import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import HomePage from "./pages/HomePage/HomePage";
import UserPage from "./pages/UserPage/UserPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import LoaderPage from "./views/LoaderPage/LoaderPage"

function App() {
  return (
    
    <Routes>
        <Route path="/*" element={<HomePage></HomePage>} />
        <Route path="/loader-page" element={<LoaderPage/>} />
        <Route path="/user/*" element={<AuthProvider><UserPage></UserPage></AuthProvider>} />
        <Route path="/admin/*" element={<AuthProvider><AdminPage></AdminPage></AuthProvider>} />
    </Routes>
  );
}
export default App;