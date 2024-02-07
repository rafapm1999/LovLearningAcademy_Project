import { useState, useEffect } from 'react';
import classes from './UserNavbar.module.css';
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { takeRole, takeID } from '../../Utils';
//Importamos FontAwesomeIcon para usarlo en el footer
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket, faUser, faBars, faXmark, faEnvelope
} from "@fortawesome/free-solid-svg-icons";


function UserNavbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  let [visible, setVisible] = useState(false)


  const unlogged = () => {
    localStorage.removeItem("token");
    // navigate(`/login`);
    window.location.href="/login";
  }
  const onHandlerClick = () => {
    setVisible(!visible);
  }

  return (
    <>
      <div className={classes["navbar-main"]}>
        <div className={classes["navbar-logo"]}>
          <NavLink className={classes.logo} to={{
            pathname: '/',
            state: {}
          }}
          >
            <span>LovLearning Academy</span>
          </NavLink>
        </div>
        <div className={classes["navbar-links"]}>
          <div className={classes.links}>
            <NavLink className={classes.link} to={{
              pathname: '/campus/courses',
              state: {}
            }} ><span>Course Store</span></NavLink>
          </div>
          <div className={classes.links}>
            <NavLink className={classes.link} to={{
              pathname: '/campus/mycourses',
              state: {}
            }} ><span>My Courses</span></NavLink>
          </div>
        </div>

        <div className={classes["navbar-button"]}>
          <button onClick={() => { navigate("/campus/profile", {}) }} className={classes.profile}><span><FontAwesomeIcon icon={faUser} /></span></button>
          <button onClick={unlogged} className={classes.logout}> Log out <span><FontAwesomeIcon icon={faArrowRightFromBracket} /></span> </button>
        </div>
        <button className={classes["display-button"]} onClick={onHandlerClick} ><FontAwesomeIcon icon={visible === false ? faBars : faXmark} size='xl'></FontAwesomeIcon></button>
        <div className={classes["display-section"]}>
          <div className={`${visible ? classes["display-section-list"] : classes["hidden"]}`}>
            <div className={`${visible ? classes["display-section-list-links"] : classes["hidden"]}`}>
              <NavLink className={classes["list-link"]} onClick={onHandlerClick} to={{
                pathname: '/campus/courses',
                state: {}
              }}>Courses Store</NavLink>
              <NavLink className={classes["list-link"]} onClick={onHandlerClick} to={{
                pathname: '/campus/mycourses',
                state: {}
              }}>My Courses</NavLink>
              <NavLink className={classes["list-link"]} onClick={onHandlerClick} to={{
                pathname: '/campus/profile',
                state: {}
              }}>Profile</NavLink>
              <NavLink className={classes["list-link"]} onClick={unlogged} to={{
                pathname: '/login',
                state: {}
              }}>Log out <span><FontAwesomeIcon icon={faArrowRightFromBracket} /></span></NavLink>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default UserNavbar;
