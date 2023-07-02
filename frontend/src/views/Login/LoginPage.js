import Login from "./LoginForm";
import "./LoginPage.module.css";
import Modal from "../Modal/Modal";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateEmail, validatePassword } from "../../utils/validate";

function LoginPage() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    loggedIn: false,
    name: "",
    lastName: "",
    email: "",
    password: "",
    loginHeader: "",
    loginMessage: "",
  });
  const handleVisibility = async (loginData) => {
    if (
      loginData &&
      validateEmail(loginData.email) &&
      validatePassword(loginData.password)
    ) {
      try {
        const response = await fetch("http://localhost:8000/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: loginData.name,
            lastName: loginData.lastName,
            email: loginData.email,
            password: loginData.password,
          }),
        });
        const fetchData = await response.json();
        console.log("Guardo respuesta");
        console.log(fetchData);
        if (response.ok) {
          setLoginInfo({
            loggedIn: true,
            email: loginData.email,
            password: "*********",
            rememberMe: loginData.rememberMe,
            loginHeader: "Login Successfully",
            loginMessage: "You are a new user!",
          });
          setVisible(!visible);
          setTimeout(() => {
            navigate("/profile");
          }, 3000);
        }
      } catch (error) {}
    } else {
      console.log("algo salió mal");
    }
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Modal visible={visible} data={loginInfo} />,
        document.querySelector("#modal")
      )}
      <h3>Formulario</h3>
      <Login onLogin={handleVisibility}></Login>
    </>
  );
}

export default LoginPage;
