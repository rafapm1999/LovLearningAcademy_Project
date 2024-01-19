import { Fragment, useState } from 'react';
import classes from './AdminNavbar.module.css';
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
//Importamos FontAwesomeIcon para usarlo en el footer
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket, faUser
} from "@fortawesome/free-solid-svg-icons";
import AdminPage from '../../../views/Admin/AdminDashPage/AdminDashPage';

function AdminNavbar(props) {
  const navigate = useNavigate();
  const unlogged = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("rememberMe");
    navigate("/");
  }
  /* const closeAll = () => {
    if (props.openedProfile === true) {
      return props.closeProfile();
    }
      
  }  */
  /* const handlerClick = () => {
    navigate("/admin/admin-page")
  } */
  const handlerClose = () => {
  /*  return props.closeProfile; */
  }
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <AdminPage visible={props.visible} data={props.userData} onClose={handlerClose()}/>,
        document.querySelector("#modal")
      )}
      <div className={classes["navbar-main"]}>
        <div className={classes["navbar-logo"]}><p className={classes.logo}>LovLearning Academy</p></div>
        <div className={classes["navbar-links"]}>
          <div className={classes.links}>
          <NavLink className={classes.link} /* onClick={closeAll} */ to={{pathname:'/admin/bbdd-members',
            state: {}}} ><span>All Members</span></NavLink>
            <NavLink className={classes.link} /* onClick={closeAll} */ to={{pathname:'/admin/bbdd-courses',
            state: {}}} ><span>All courses</span></NavLink>
          </div>
        </div>
        <div className={classes["navbar-button"]}>
          {/* <button onClick={() => {navigate("/admin/admin-page")}} className={classes.profile}><span><FontAwesomeIcon icon={faUser} /></span></button> */}
          <button onClick={unlogged} className={classes.logout}> Log out <span><FontAwesomeIcon icon={faArrowRightFromBracket} /></span></button>
        </div>
      </div>
    </Fragment>
  );
}

export default AdminNavbar;