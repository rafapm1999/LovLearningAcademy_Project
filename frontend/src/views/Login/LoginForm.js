import "./LoginForm.module.css";
import {useRef} from "react";

function LoginForm() {
  const userName = useRef("");
  const userLastName = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      "name": userName.current.value,
      "lastName": userLastName.current.value,
      "email": emailRef.current.value,
      "password": passwordRef.current.value,
    }
  }
    
  return (
    <>
      <div>
        <h4>Signup</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName">Name</label>
            <input ref={userName} type="text" name="name" id="userName"/>
          </div>
          <div>
            <label htmlFor="userLastName">Lastname</label>
            <input ref={userLastName} type="text" name="lastName" id="userLastName"/>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input ref={emailRef} type="userEmail"
              name="email"
              id="userEmail"
              placeholder="Introduce your email adress"
            />
          </div>
          <div>
            <label htmlFor="userPassword">Password</label>
            <input ref={passwordRef} type="password" name="password" id="userPassword" placeholder="***********" />
          </div>
          <div><button type="submit">Register</button></div>
        </form>
      </div>
    </>
  );
};
/* try {
  const response = await fetch ("http://localhost:8000/auth/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    //"auth-token": localStorage.getItem("token"),
  },
  body: JSON.stringify(userData),
});
const data = await response.json();
if (data.status === 409) {
  console.log("ya esta registrado");
}
console.log(data);

} catch (error) {
  
}

} */

export default LoginForm;

