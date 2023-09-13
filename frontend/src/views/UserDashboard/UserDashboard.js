/* import './UserDashboard.css'; */
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function UserDashboard(props) {
    const location = useLocation();
    const data = location.state;
    const userData = data.data.user;
    const navigate = useNavigate();
    const handlerAdmin = () => {
        navigate("/admin")
    }

    if (userData !== "") {
        props.onUserInfo(userData);
    }

    console.log(data);
    
    console.log(userData);

    if (userData.role === "admin") {
        return (
        <Fragment>
            <h1>Hello {userData.name}</h1>
            <button onClick={handlerAdmin}>Go admin page</button>
        </Fragment>
        );
    } else {
        return (
            <Fragment>
                <h1>Hello {userData.name}</h1>
            </Fragment>
        );
    }
}

export default UserDashboard;
