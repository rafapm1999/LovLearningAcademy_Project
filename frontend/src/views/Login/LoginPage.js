import Login from "./LoginForm";
import classes from "./LoginPage.module.css";
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
    if ( //Si el email es valido y el password cumple los requisitos entonces hacemos fetch (POST)
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
      } catch (error) {
        setLoginInfo({
          loggedIn: false,
          email: loginData.email,
          password: "*********",
          loginHeader: "Signup went wrong.",
          loginMessage: "Try again",
        })
      }
    } else if (!loginData ||
      !validateEmail(loginData.email)||
      !validatePassword(loginData.password)||
      loginData.name === "" ||
      loginData.lastName === ""){
        setLoginInfo({
          loggedIn: false,
          name: loginData.name === "" ? "Name is required." : loginData.name,
          lastName: loginData.lastName === "" ? "Lastname is required." : loginData.lastName,
          email: loginData.email === "" ? "Email is required." : loginData.email,
          password: loginData.password === "" ? "Password is required." : "Your password is not secure. Make more strong.",
          rememberMe: loginData.rememberMe,
          loginHeader: "Ups... something went wrong.",
          loginMessage: "Try again",
        })
        setVisible(!visible);
    }
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Modal visible={visible} onLogin={handleVisibility} data={loginInfo} />,
        document.querySelector("#modal")
      )}
      <h3>Formulario</h3>
      <Login onLogin={handleVisibility}></Login>
    </>
  );
}

export default LoginPage;


