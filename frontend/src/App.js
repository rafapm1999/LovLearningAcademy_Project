//import './App.css';
/* import {Route, Routes} from "react-router-dom"; */
import { Route, Routes } from "react-router-dom";
import LoginPage from "./views/Login/LoginPage";

function App() {

  return (
  <Routes> 
     <Route path="/" element={<LoginPage />} />
  </Routes>
  );
}

export default App;
