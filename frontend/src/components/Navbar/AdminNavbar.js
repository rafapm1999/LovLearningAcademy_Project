import { Fragment, useState } from 'react';
import classes from './Navbar.module.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
//Importamos FontAwesomeIcon para usarlo en el footer
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket, faUser
} from "@fortawesome/free-solid-svg-icons";

function AdminNavbar(props) {
  const navigate = useNavigate();
  const unlogged = () => {
    props.onLogin(false);
    navigate("/home");
    console.log("has dado click");
    props.logout();
  }
  return (
    <Fragment>
      <div className={classes["navbar-main"]}>
        <div className={classes["navbar-logo"]}><Link className={classes.logo} to="/admin">LovLearning Academy</Link></div>
        <div className={classes["navbar-links"]}>
          <div className={classes.links}>
            <Link className={classes.link} to="/bbdd-members"><span>All Members</span></Link>
            <Link className={classes.link} to="/bbdd-courses"><span>All courses</span></Link>
          </div>
        </div>
        <div className={classes["navbar-button"]}>
          
          <button onClick={() => {navigate("/admin")}} className={classes.profile}><span><FontAwesomeIcon icon={faUser}/></span></button>
          <button onClick={unlogged} className={classes.logout}> Log out <span><FontAwesomeIcon icon={faArrowRightFromBracket}/></span></button>
        </div>
      </div>
    </Fragment>
  );
}

export default AdminNavbar;