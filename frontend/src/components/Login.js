import "./Login.module.css";

function Login() {
  return (
    <>
      <div>
        <h4>Signup</h4>
        <form action="">
          <div>
            <label htmlFor="userName">Name</label>
            <input type="text" name="name" id="userName"/>
          </div>
          <div>
            <label htmlFor="userLastName">Lastname</label>
            <input type="text" name="lastName" id="userLastName"/>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="userEmail"
              name="email"
              id="userEmail"
              placeholder="Introduce your email adress"
            />
          </div>
          <div>
            <label htmlFor="userPassword">Password</label>
            <input type="password" name="password" id="userPassword" placeholder="***********" />
          </div>
          <div><button type="submit">Register</button></div>
        </form>
      </div>
    </>
  );
}

export default Login;
