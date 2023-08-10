/* import './UserDashboard.css'; */
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function UserDashboard(props) {
    const location = useLocation();
    const data = location.state;
   /*  console.log(data); */

    if (data !== "") {
        props.onUserInfo(data);
    }
    

    return (
        <Fragment>

        </Fragment>
    );
}

export default UserDashboard;
