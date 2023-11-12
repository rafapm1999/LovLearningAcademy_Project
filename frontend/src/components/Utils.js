import {jwtDecode} from "jwt-decode";

//Funcion para verificar el Token
export function verifyToken() {

  let token = localStorage.getItem("token");
  if((token!==null)||(token!==undefined))
  {
    fetch(``, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 401 || data.result === "ko") {
          localStorage.removeItem("token");
          window.location.href="/admin/login";
        }
      })
      .catch((error) => {
        localStorage.removeItem("token");
        window.location.href="/admin/login";
      });
  }
  else{
    window.location.href="/admin/login";
  }
}

//Funcion para obtener role del usuario
export function takeRole(){
  const token = localStorage.getItem("token");
  let role ='';
  if((token!==null)||(token!==undefined)){
    const decoded = jwtDecode(token);
    role = decoded.role;
  }
  return role;
}

//Funcion para obtener role del usuario
export function takeID(){
  const token = localStorage.getItem("token");
  let id ='';
  if((token!==null)||(token!==undefined)){
    const decoded = jwtDecode(token);
    id = decoded.id;
  }
  return id;
}