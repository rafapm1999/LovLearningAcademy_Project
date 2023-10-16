import { Fragment, useState } from 'react';
import classes from './Navbar.module.css';
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
//Importamos FontAwesomeIcon para usarlo en el footer
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket, faUser
} from "@fortawesome/free-solid-svg-icons";
import AdminPage from '../../views/Admin/AdminPage';

function AdminNavbar(props) {
  const navigate = useNavigate();
  const unlogged = () => {
    props.onLogin(false);
    closeAll();
    navigate("/home");
    console.log("has dado click");
    props.logout();
  }
  const closeAll = () => {
    if (props.openedProfile === true) {
      return props.closeProfile();
    }
      
  } 
  const handlerClick = () => {
    return props.openProfile;
  }
  const handlerClose = () => {
   return props.closeProfile;
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
            <Link onClick={closeAll} className={classes.link} to="/bbdd-members"><span>All Members</span></Link>
            <Link onClick={closeAll} className={classes.link} to="/bbdd-courses"><span>All courses</span></Link>
          </div>
        </div>
        <div className={classes["navbar-button"]}>
          <button onClick={handlerClick()} className={classes.profile}><span><FontAwesomeIcon icon={faUser} /></span></button>
          <button onClick={unlogged} className={classes.logout}> Log out <span><FontAwesomeIcon icon={faArrowRightFromBracket} /></span></button>
        </div>
      </div>
    </Fragment>
  );
}

export default AdminNavbar;