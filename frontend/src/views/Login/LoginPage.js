import Login from "./LoginForm";
/* import classes from "./LoginPage.module.css"; */
import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { validateEmail, validatePassword } from "../../utils/validate";

function LoginPage(props) {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  /* const [visible, setVisible] = useState(false); */
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  //Este codigo esta en desuso 
  /* if (login === true) {
    setTimeout(() => {
      navigate("/signup");
    }, 100);
  } */

  const handleVisibility = async (loginData) => {
    if (
      //Si el email es valido y el password cumple los requisitos entonces hacemos fetch (POST)
      loginData &&
      validateEmail(loginData.email) &&
      validatePassword(loginData.password)
    ) {
      //Guardamos la info validada en una constante usando useState
      setLoginInfo({
        email: loginData.email,
        password: loginData.password,
      });
      //Realizamos el fetch 
      try {
        const response = await fetch("http://localhost:8000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginData.email,
            password: loginData.password,
          }),
        });
        const data = await response.json();
        console.log("Guardo respuesta");
        console.log(data);
        if (response.ok) {
          //SI la respuesta del fetch es correcta enviamos por props que estamos logeados (true)
          props.onLogin(true);
          props.newUserData(data.data.user)
          //Usamos setTimeout para navegar a /user-dashboard usando state para guardar el data que nos devulve el fetch
          setTimeout(() => {
            navigate("/loader-page", {state: data});
          }, 100);
        }
        //Revisar este codigo porque va relacionado con lo de border red si la info es incorrecta 
        if (!response.ok){
          setLoginInfo({
            email: loginData.email = false,
            password: loginData.password = false,
          });
        }
      } catch (error) {
        
      }
      //Este apartado es creado para abarcar la opcion de que no haya info enviada, que no sea valido el email o que el password no sea valido
    } else if (
      !loginData ||
      !validateEmail(loginData.email) ||
      !validatePassword(loginData.password)
    ) {
      /* setLoginInfo({
        email: loginData.email === false,
        password: loginData.password === false,
      }); */
    }
  };

  return (
    <Fragment>
      {/* {ReactDOM.createPortal(
        <Modal visible={visible} onLogin={handleVisibility} data={loginInfo} />,
        document.querySelector("#modal")
      )} */}
      <Login
        onLogin={handleVisibility}
        /* onSignup={setLogin} */
        onEmptyInfo={loginInfo}
      ></Login>
    </Fragment>
  );
}

export default LoginPage;
