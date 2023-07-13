import classes from "./LoginForm.module.css";
import { useRef } from "react";

function LoginForm(props) {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    props.onLogin(loginData);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    props.onSignup(true);
  };
  const handleChange = () => {
    const loginInfoChange = {
      email: emailRef.current.value === "" ? true : false,
      password: passwordRef.current.value === "" ? true : false,
    };
    props.onLogin(loginInfoChange);
  };

  return (
    <>
      <div className={classes["form-root"]}>
        <div className={classes["form-main"]}>
          <div className={classes.title}>
            <h4>Login now!</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={classes["form-info"]}>
              <input
                ref={emailRef}
                type="email"
                name="email"
                id="userEmail"
                aria-label="Email"
                placeholder="Email"
                onChange={handleChange}
                className={props.onEmptyInfo.email === false && classes.danger}
              />
            </div>
            <div className={classes["form-info"]}>
              <input
                ref={passwordRef}
                type="password"
                name="password"
                id="userPassword"
                placeholder="Password"
                onChange={handleChange}
                className={
                  props.onEmptyInfo.password === false && classes.danger
                }
              />
            </div>
            <div
              className={`${classes["form-info"]} ${classes["submit-button"]}`}
            >
              <button type="submit">
                <span>Login!</span>
              </button>
            </div>
          </form>
          <div className={classes["form-links"]}>
            <span>Don't have an account? Create one </span>
            <a href="/signup">Signup</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
