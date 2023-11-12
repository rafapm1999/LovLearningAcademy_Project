import classes from "./LoginForm.module.css";
import { Fragment, useRef, useState } from "react";

function LoginForm(props) {
  //Creamos constantes de referencia para el formulario de login
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const rememberMeRef = useRef(false)
  //Esta función se ejecuta cuando se envia el formulario
  const handleSubmit = (e) => {
    //Evitamos la recarga por defecto del form
    e.preventDefault();
    //loginData guardara la información introducida en el form con current.value
    const loginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      rememberMe: rememberMeRef.current.checked,
    };
    //Enviamos por props a LoginPage la información recibida
    props.onLogin(loginData);
  };
  //Esta función hace que si la info esta vacía se guarde como true, y sino como false
  const handleInputChange = (e) => {
    let loginInfoChange = {
      email: emailRef.current.value === "" ? true : false,
      password: passwordRef.current.value === "" ? true : false,
    };
    props.onLogin(loginInfoChange);
  };

  return (
    <Fragment>
      <div className={classes["form-root"]}>
        <div className={classes["login-img"]}></div>
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                className={
                  props.onEmptyInfo.password === false && classes.danger
                }
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
    </Fragment>
  );

}

export default LoginForm;
