import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = (props) =>  {
    const [token, setToken] = useState (localStorage.getItem("token"));

    if(token){
        if((token===undefined)||(token===null)){
            localStorage.removeItem("token");
        }
        else{
            //fetch
        }
    }

    return (
        <AuthContext.Provider value={{ token, setToken }}>
          {props.children}
        </AuthContext.Provider>
      );
}