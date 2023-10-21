/* import './LoaderPage.css'; */
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../components/Loader/Loader";
/* import { useEffect } from "react"; */

function LoaderPage(props) {
    const [pending, setPending] = useState(false)
    const [adminRole, setAdminRole] = useState(false)
    const location = useLocation();
    const data = location.state;
    const userData = data.data.user;
    const navigate = useNavigate();
    const closeAll = () => {
        if (props.openedProfile !== false) {
          return props.closeProfile();
        }
    }
    const loaderFunction = () => {
        if (userData.role === "user") { 
            setTimeout(() => {
                navigate("/mylearnplace")
            }, 1500)
            return (<Loader userData={userData}></Loader>)
        }
        if (userData.role === "admin") {
            closeAll();
            setTimeout(() => {
                setPending(true);
                setAdminRole(true)
                navigate("/bbdd-members")
            }, 1500)
            return (<Loader userData={userData} adminRole={adminRole}></Loader>)
        }
    };

    if (pending === false) {
        return loaderFunction();
    };


}
export default LoaderPage;
