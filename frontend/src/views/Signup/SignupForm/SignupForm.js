import classes from "./SignupForm.module.css";
import { useRef } from "react";

function SignupForm(props) {
  const userNameRef = useRef("");
  const userLastNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const rewritePasswordRef = useRef("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const signupData = {
      name: userNameRef.current.value,
      lastName: userLastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      rewritePassword: rewritePasswordRef.current.value,
    };
    props.onLogin(signupData);
  };
  return (
    <>

      <div className={`${classes["form-root"]} ${props.visible && classes["blur"]}`}>
        <div className={classes["login-img"]}></div>
        <div className={`${classes["form-main"]} `}>
          <div className={classes.title}>
            <h4>Create new account now</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={classes["form-info"]}>
              <input
                ref={userNameRef}
                type="text"
                name="userNameData"
                id="userNameDataSignup"
                placeholder="Name"
              />
            </div>
            <div className={classes["form-info"]}>
              <input
                ref={userLastNameRef}
                type="text"
                name="lastName"
                id="userLastNameSignup"
                placeholder="Lastname"
              />
            </div>
            <div className={classes["form-info"]}>
              <input
                ref={emailRef}
                type="email"
                name="userEmail"
                id="userEmailSignup"
                placeholder="Email"
              />
            </div>
            <div className={classes["form-info"]}>
              <input
                ref={passwordRef}
                type="password"
                name="password"
                id="userPasswordSignup"
                placeholder="Password"
              />
            </div>
            <div className={classes["form-info"]}>
              <input
                ref={rewritePasswordRef}
                type="password"
                name="rewritePassword"
                id="userRewritePasswordSignup"
                placeholder="Rewrite the password"
              />
            </div>
            <div
              className={`${classes["form-info"]} ${classes["submit-button"]}`}
            >
              <button type="submit">
                <span>Signup</span>
              </button>
            </div>
          </form>
          <div className={classes["form-links"]}>
            <span>Already have an account? Login it </span>
            <a href="/login">Login</a>
          </div>
        </div>
        <div className={props.visible && classes["modal-main"]}></div>
      </div>
    </>
  );
}

export default SignupForm;
