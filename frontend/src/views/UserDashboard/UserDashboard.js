/* import './UserDashboard.css'; */
import { Fragment } from "react";
import { useLocation } from "react-router-dom";

function UserDashboard(props) {
    const location = useLocation();
    const data = location.state;
    props.userInfo(data);
    return (
        <Fragment>

        </Fragment>
    );
}

export default UserDashboard;
