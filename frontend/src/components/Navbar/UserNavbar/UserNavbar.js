import { Fragment, useState } from 'react';
import classes from './UserNavbar.module.css';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {takeRole, takeID}  from '../../Utils';
//Importamos FontAwesomeIcon para usarlo en el footer
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket, faUser
} from "@fortawesome/free-solid-svg-icons";

function UserNavbar() {
  const token = localStorage.getItem("token");
  const role = takeRole();
  const id = takeID();
  console.log(role);
  console.log(id);
  
  const navigate = useNavigate();
  const unlogged = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("rememberMe");
    navigate(`/`);
  }
 
  return (
    <Fragment>
      <div className={classes["navbar-main"]}>
        <div className={classes["navbar-logo"]}><NavLink className={classes.logo} to={{pathname:'/',
            state: {}}} ><span>LovLearning Academy</span></NavLink></div>
        <div className={classes["navbar-links"]}>
          <div className={classes.links}>
            <NavLink className={classes.link} to={{pathname:'/courses',
            state: {}}} ><span>Courses</span></NavLink>
          <NavLink className={classes.link} to={{pathname:'/user/mylearnplace',
            state: {id}}} ><span>MyLearnplace</span></NavLink>
          {/* <Link className={classes.link} to="/community" ><span>Community</span></Link> */}
        </div>
      </div>
      <div className={classes["navbar-button"]}>
        <button onClick={() => { navigate("/user/profile", {state: id})}} className={classes.profile}><span><FontAwesomeIcon icon={faUser} /></span></button>
        <button onClick={unlogged} className={classes.logout}> Log out <span><FontAwesomeIcon icon={faArrowRightFromBracket} /></span> </button>

      </div>
    </div>
    </Fragment >
  );
}

export default UserNavbar;
