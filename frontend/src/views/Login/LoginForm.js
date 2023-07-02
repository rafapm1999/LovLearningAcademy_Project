import "./LoginForm.module.css";
import { useRef } from "react";

function LoginForm(props) {
  const userNameRef = useRef("");
  const userLastNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const rememberMeRef = useRef("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      name: userNameRef.current.value,
      lastName: userLastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      rememberMe: rememberMeRef.current.checked,
    };
    props.onLogin(loginData);
  };

  return (
    <>
      <div>
        <h4>Signup</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName">Name: </label>
            <input ref={userNameRef} type="text" name="name" id="userName" />
          </div>
          <div>
            <label htmlFor="userLastName">Lastname: </label>
            <input
              ref={userLastNameRef}
              type="text"
              name="lastName"
              id="userLastName"
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              id="userEmail"
              placeholder="Introduce your email adress"
            />
          </div>
          <div>
            <label htmlFor="userPassword">Password: </label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              id="userPassword"
              placeholder="***********"
            />
          </div>
          <div>
            <label htmlFor="rememberMe">Remember</label>
            <input
              ref={rememberMeRef}
              type="checkbox"
              name="checkbox"
              id="rememberMe"
            />
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
