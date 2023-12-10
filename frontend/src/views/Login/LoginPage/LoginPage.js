import Login from "../LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { validateEmail, validatePassword } from "../../../utils/validate";
import { LocalStorage } from "../../../services/LocalStorage.service";

function LoginPage(props) {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    rememberMe: "",
  });

  //Funcion para hacer un scroll top
  const scrollTop = (e) => {
    window.scrollTo({
      top: 0,
      behavior: `${e}`, // Opcional, para tener una animación suave
    });
  }
  useEffect(() => {
    scrollTop("auto")
  })

  const handleSubmitForm = async (loginData) => {
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
        rememberMe: loginData.rememberMe,
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
        console.log(data);

        if (response.ok) {
          console.log(data);
          if (data.status === 'ko') {
            alert('Error, datos incorrecto');
          }
          else {
            LocalStorage.setItem("token", data.token);
            LocalStorage.setItem("email", data.data.email);
            LocalStorage.setItem("role", data.data.role);
            LocalStorage.setItem("rememberMe", loginData.rememberMe);
            document.cookie = `email=${data.data.email}; expires=5 Nov 2023 00:00:00 UTC; domain=localhost; path=/;`;
              navigate(`/loader-page`, { replace: true });
            

          }
          /* if (loginData.rememberMe) {
            LocalStorage.setItem("email", loginData.email);
            LocalStorage.setItem("rememberMe", loginData.rememberMe);
            
            //document.cookie('recuedame', 'true', '/', '2023-10-27 00:00:00') ---> GUARDar info durante un tiempo en cookies
          } */

          //Usamos setTimeout para navegar a /user-dashboard usando state para guardar el data que nos devulve el fetch
          /* setTimeout(() => {
            navigate("/loader-page", {state: data});
          }, 100); */
        }
        //Revisar este codigo porque va relacionado con lo de border red si la info es incorrecta 
        if (!response.ok) {
          alert('Error, datos incorrecto');
          setLoginInfo({
            email: loginData.email = false,
            password: loginData.password = false,
          });
        }
      } catch (error) {
        alert(`Error: ${error}`);
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
        <Modal visible={visible} onLogin={handleSubmitForm} data={loginInfo} />,
        document.querySelector("#modal")
      )} */}
      <Login
        onLogin={handleSubmitForm}
        onEmptyInfo={loginInfo}
      ></Login>
    </Fragment>
  );
}

export default LoginPage;
