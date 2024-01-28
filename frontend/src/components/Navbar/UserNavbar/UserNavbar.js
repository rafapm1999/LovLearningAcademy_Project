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
  /* const role = takeRole(); */
  const id = takeID(token);
  const navigate = useNavigate();
  let [visible, setVisible] = useState(false)
  
  if (!token) {
    navigate("/")
  }

  const unlogged = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("rememberMe");
    navigate(`/`);
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
              state: { id }
            }} ><span>My Courses</span></NavLink>
          </div>
        </div>

        <div className={classes["navbar-button"]}>
          {/* <button onClick={() => { navigate("/campus/messages", { state: id }) }} className={classes.profile}><span><FontAwesomeIcon icon={faEnvelope} /></span></button> */}
          <button onClick={() => { navigate("/campus/profile", { state: id }) }} className={classes.profile}><span><FontAwesomeIcon icon={faUser} /></span></button>
          <button onClick={unlogged} className={classes.logout}> Log out <span><FontAwesomeIcon icon={faArrowRightFromBracket} /></span> </button>
        </div>
        <button className={classes["display-button"]} onClick={onHandlerClick} ><FontAwesomeIcon icon={visible === false ? faBars : faXmark} size='xl'></FontAwesomeIcon></button>
            <div className={classes["display-section"]}>
              <div className={`${visible ? classes["display-section-list"] : classes["hidden"]}`}>
                <div className={`${visible ? classes["display-section-list-links"] : classes["hidden"]}`}>
                  <NavLink className={classes["list-link"]} to={{
                    pathname: '/campus/courses',
                    state: {}
                  }}>Courses Store</NavLink>
                  <NavLink className={classes["list-link"]} to={{
                    pathname: '/campus/mycourses',
                    state: {}
                  }}>My Courses</NavLink>
                  <NavLink className={classes["list-link"]} to={{
                    pathname: '/campus/profile',
                    state: {}
                  }}>Profile</NavLink>
                  <Link onClick={unlogged} className={classes["list-link"]}> Log out <span><FontAwesomeIcon icon={faArrowRightFromBracket} /></span> </Link>
                </div>
              </div>
            </div>
      </div >
    </>
  );
}

export default UserNavbar;
