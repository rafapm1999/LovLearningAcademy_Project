import { createContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { takeRole } from "../components/Utils"

export const AuthContext = createContext();

export const AuthProviderAdmin = (props) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const tokenRole = takeRole(token);
    const navigate = useNavigate();

    useEffect(() => {
        if (token && tokenRole !== "admin") {
            localStorage.setItem("token", localStorage.getItem("token"));
            navigate(`/unauthorized`)
        } else if (token && tokenRole === "admin") {
            if ((token === undefined) || (token === null)) {
                localStorage.removeItem("token");
            } else {
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
   
    if (!token) return <Navigate to="/" replace />;


    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {props.children}
        </AuthContext.Provider>
    );
}