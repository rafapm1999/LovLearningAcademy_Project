import classes from "./SignupForm.module.css";
import { Fragment, useRef } from "react";

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
    <Fragment>
      <div className={classes["form-root"]}>
        <div className={classes["login-img"]}></div>
        <div className={classes["form-main"]}>
          <div className={classes.title}>
            <h4>Create new account now</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={classes["form-info"]}>
              <input
                ref={userNameRef}
                type="text"
                name="name"
                id="userName"
                placeholder="Name"
              />
            </div>
            <div className={classes["form-info"]}>
              <input
                ref={userLastNameRef}
                type="text"
                name="lastName"
                id="userLastName"
                placeholder="Lastname"
              />
            </div>
            <div className={classes["form-info"]}>
              <input
                ref={emailRef}
                type="email"
                name="email"
                id="userEmail"
                placeholder="Email"
              />
            </div>
            <div className={classes["form-info"]}>
              <input
                ref={passwordRef}
                type="password"
                name="password"
                id="userPassword"
                placeholder="Password"
              />
            </div>
            <div className={`${classes["form-info"]} ${classes["remember"]}`}>
              <div className={classes.checkbox}>
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
            </div>
            <div
              className={`${classes["form-info"]} ${classes["submit-button"]}`}
            >
              <button type="submit">
                <span>Signup!</span>
              </button>
            </div>
          </form>
          <div className={classes["form-links"]}>
            <span>Already have an account? Login it </span>
            <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SignupForm;
