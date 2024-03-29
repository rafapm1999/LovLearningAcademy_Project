import { Fragment, useState } from 'react';
import classes from './AdminNavbar.module.css';
import { NavLink } from "react-router-dom";

//Importamos FontAwesomeIcon para usarlo en el footer
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket, faBars, faXmark
} from "@fortawesome/free-solid-svg-icons";

function AdminNavbar() {
  const [visible, setVisible] = useState(false)
  const unlogged = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("rememberMe");
    // navigate("/");
    window.location.href="/login";
  }
  const onHandlerClick = () => {
    setVisible(!visible)
  }
  return (
    <Fragment>
      <div className={classes["navbar-main"]}>
        <div className={classes["navbar-logo"]}>
          <p className={classes.logo}>LovLearning Academy</p>
        </div>
        <div className={classes["navbar-links"]}>
          <div className={classes.links}>
            <NavLink className={classes.link} to={{
              pathname: '/admin/bbdd-members',
              state: {}
            }} ><span>All Members</span></NavLink>
            <NavLink className={classes.link} to={{
              pathname: '/admin/bbdd-courses',
              state: {}
            }} ><span>All courses</span></NavLink>
          </div>
        </div>
        <div className={classes["navbar-button"]}>
          <button onClick={unlogged} className={classes.logout}> Log out <span><FontAwesomeIcon icon={faArrowRightFromBracket} /></span></button>
        </div>
        <button className={classes["display-button"]} onClick={onHandlerClick} ><FontAwesomeIcon icon={visible === false ? faBars : faXmark} size='xl'></FontAwesomeIcon></button>
        <div className={classes["display-section"]}>
          <div className={`${visible === true ? classes["display-section-list"] : classes["hidden"]}`}>
            <div className={`${visible === true ? classes["display-section-list-links"] : classes["hidden"]}`}>
              <NavLink className={classes["list-link"]} onClick={onHandlerClick} to={{
                pathname: '/admin/bbdd-members',
                state: {}
              }}>All Members</NavLink>
              <NavLink className={classes["list-link"]} onClick={onHandlerClick} to={{
                pathname: '/admin/bbdd-courses',
                state: {}
              }}>All courses</NavLink>
              <NavLink className={classes["list-link"]} onClick={unlogged} to={{
                pathname: '/',
                state: {}
              }}>Log out <span><FontAwesomeIcon icon={faArrowRightFromBracket} /></span></NavLink>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AdminNavbar;