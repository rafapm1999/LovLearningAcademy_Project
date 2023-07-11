import classes from "./SignupForm.module.css";
import { useRef } from "react";

function SignupForm(props) {
  const userNameRef = useRef("");
  const userLastNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const rememberMeRef = useRef("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const signupData = {
      name: userNameRef.current.value,
      lastName: userLastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      rememberMe: rememberMeRef.current.checked,
    };
    props.onLogin(signupData);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    props.onRegister(true);
  };

  return (
    <>
      <div className={classes["form-root"]}>
        <div className={classes["form-main"]}>
          <form onSubmit={handleSubmit}>
            <h4 className={classes.title}>Create new account now</h4>
            <div className={classes["form-info"]}>
              {/* <label htmlFor="userName">Name </label> */}
              <input
                ref={userNameRef}
                type="text"
                name="name"
                id="userName"
                placeholder="Name"
              />
            </div>
            <div className={classes["form-info"]}>
              {/* <label htmlFor="userLastName">Lastname </label> */}
              <input
                ref={userLastNameRef}
                type="text"
                name="lastName"
                id="userLastName"
                placeholder="Lastname"
              />
            </div>
            <div className={classes["form-info"]}>
              {/* <label htmlFor="email">Email </label> */}
              <input
                ref={emailRef}
                type="email"
                name="email"
                id="userEmail"
                placeholder="Email"
              />
            </div>
            <div className={classes["form-info"]}>
              {/* <label htmlFor="userPassword">Password </label> */}
              <input
                ref={passwordRef}
                type="password"
                name="password"
                id="userPassword"
                placeholder="Password"
              />
            </div>
            <div className={`${classes["form-info"]} ${classes["remember"]}`}>
              <input
                ref={rememberMeRef}
                type="checkbox"
                name="checkbox"
                id="rememberMe"
              />
              <label htmlFor="rememberMe">
                <span>Remember my details</span>
              </label>
            </div>
            <div
              className={`${classes["form-info"]} ${classes["submit-button"]}`}
            >
              <button type="submit">
                <span>Signup!</span>
              </button>
            </div>
          </form>
          <form onSubmit={handleLogin}>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
