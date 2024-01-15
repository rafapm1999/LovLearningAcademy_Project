import Login from "../LoginForm/LoginForm";
import { takeRole } from "../../../components/Utils";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { validateEmail, validatePassword } from "../../../utils/validate";
import { LocalStorage } from "../../../services/LocalStorage.service";

function LoginPage() {
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

  //Fetch para el envio del formulario login
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
        if (response.ok) {
          if (data.status === 'ko') {
            alert('Error, datos incorrectos');
          }
          else if (data.status === 'ok') {
            LocalStorage.setItem("token", data.token);
            document.cookie = `email=${data.data.email}; expires=5 Nov 2027 00:00:00 UTC; domain=localhost; path=/;`;
            if (takeRole(data.token)==="user") {
              navigate(`/campus/mycourses`, { replace: true });
            } else if (takeRole(data.token)==="admin") {
              navigate(`/admin/bbdd-members`, { replace: true });
            } 
          }
        }
        //Revisar este codigo porque va relacionado con lo de border red si la info es incorrecta 
        if (!response.ok) {
          alert('Error, datos incorrectos');
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
      setLoginInfo({
        email: loginData.email === false,
        password: loginData.password === false,
      });
    }
  };
  return (
    <Fragment>
      <Login
        onLogin={handleSubmitForm}
        onEmptyInfo={loginInfo}
      ></Login>
    </Fragment>
  );
}

export default LoginPage;
