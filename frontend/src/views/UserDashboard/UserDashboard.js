/* import './UserDashboard.css'; */
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../components/Loader/Loader";

function UserDashboard() {
    const [pending, setPending] = useState(false)
    const location = useLocation();
    const data = location.state;
    const userData = data.data.user;
    const navigate = useNavigate();
    const loaderFunction = () => {
        if (userData.role === "user") {
            setTimeout(() => {
                navigate("/mylearnplace")
            }, 1500)
            return (<Loader userData={userData}></Loader>)
        }
        if (userData.role === "admin") {
            setTimeout(() => {
                setPending(true)
                navigate("/admin")
            }, 1500)
            return (<Loader userData={userData}></Loader>)
        }
    };

    if (pending === false) {
        return loaderFunction();
    };

    
}
export default UserDashboard;
