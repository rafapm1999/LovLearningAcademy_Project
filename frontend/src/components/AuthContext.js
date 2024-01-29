import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      if ((token === undefined) || (token === null)) {
        localStorage.removeItem("token");
      }
      else {
        fetch(`http://localhost:8000/user/verifyToken`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if ((data.code === 401) || (data.result === "ko")) {
              localStorage.removeItem("token");
            }
            else {
              localStorage.setItem("token", localStorage.getItem("token"));
            }
          }).catch((error) => {
            localStorage.removeItem("token");

          });
      }
    } else {
      localStorage.removeItem("token");
    }

  }, [token]);

  if ((!token) || (token === undefined) || (token === null)) { return <Navigate to="/" replace /> };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  );
}