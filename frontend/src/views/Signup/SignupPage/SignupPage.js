import Signup from "../SignupForm/SignupForm";
/* import classes from "./SignupPage.module.css"; */
import Modal from "../../Modal/Modal/Modal";
import ReactDOM from "react-dom";
/* import { useNavigate } from "react-router-dom"; */
import { useState } from "react";
import { validateEmail, validatePassword } from "../../../utils/validate";

function SignupPage() {
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
  const handleVisibility = async (signupData) => {
    if (
      //Si el email es valido y el password cumple los requisitos entonces hacemos fetch (POST)
      signupData &&
      validateEmail(signupData.email) &&
      validatePassword(signupData.password)
      && signupData.password === signupData.rewritePassword
    ) {
      try {
        const response = await fetch("http://localhost:8000/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: signupData.name,
            lastName: signupData.lastName,
            email: signupData.email,
            password: signupData.password,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setLoginInfo({
            loggedIn: true,
            loginHeader: "User created!",
            loginMessage: "Login to confirm your access",
          });
          setVisible(!visible);
        }
      } catch (error) {
        setLoginInfo({
          loggedIn: false,
          email: signupData.email,
          password: "*********",
          loginHeader: "Signup went wrong.",
          loginMessage: "Try again",
        });
      }
    } else if (
      !signupData ||
      !validateEmail(signupData.email) ||
      !validatePassword(signupData.password) ||
      signupData.name === "" ||
      signupData.lastName === ""
    ) {
      setLoginInfo({
        loggedIn: false,
        name: signupData.name === "" ? "Name is required." : signupData.name,
        lastName:
          signupData.lastName === ""
            ? "Lastname is required."
            : signupData.lastName,
        email: signupData.email === "" ? "Email is required." : signupData.email,
        password:
          signupData.password === ""
            ? "Password is required."
            : "Your password is not secure. Make more strong.",
        loginHeader: "Ups... something went wrong.",
        loginMessage: "Try again",
      });
      setVisible(!visible);
    } else if (signupData.password !== signupData.rewritePassword) {
      setLoginInfo({
        loggedIn: false,
        name: signupData.name === "" ? "Name is required." : signupData.name,
        lastName:
          signupData.lastName === ""
            ? "Lastname is required."
            : signupData.lastName,
        email: signupData.email === "" ? "Email is required." : signupData.email,
        password:
          signupData.password === ""
            ? "Password is required."
            : "Those passwords must to be the same.",
        loginHeader: "Ups... something went wrong.",
        loginMessage: "Try again",
      });
      setVisible(!visible);
    };
  }
  return (
    <>
      {ReactDOM.createPortal(
        <Modal visible={visible} onLogin={handleVisibility} data={loginInfo} />,
        document.querySelector("#modal")
      )}
      <Signup onLogin={handleVisibility} visible={visible}></Signup>
    </>
  );
}

export default SignupPage;
