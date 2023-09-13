/* import './UserDashboard.css'; */
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function UserDashboard(props) {
    const location = useLocation();
    const userData = location.state;
   /*  console.log(data); */

    if (userData !== "") {
        props.onUserInfo(userData.data.user);
    }
    console.log(userData.data.user);

    return (
        <Fragment>
            <h1>Hello {/* {userData.data.user.name} */}</h1>
        </Fragment>
    );
}

export default UserDashboard;
