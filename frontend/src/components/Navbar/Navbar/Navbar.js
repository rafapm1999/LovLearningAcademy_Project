//Importamos Fragment para no usar <></> 
import { Fragment, useState } from 'react';
import classes from './Navbar.module.css';
//Importamos Link de react-roouter-dom para los botones del Navbar
import { NavLink, useNavigate } from "react-router-dom";
import { takeRole, takeID } from '../../Utils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser, faBars, faXmark
} from "@fortawesome/free-solid-svg-icons";


function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate();
  const unlogged = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("rememberMe");
    navigate(`/`);
  }

  const onHandlerClick = () => {
    setVisible(!visible)
  }
  if (!token) {
    return (
      <Fragment>
        <div className={classes["navbar-main"]}>
          <div className={classes["navbar-logo"]}><NavLink className={classes.logo} to="/">LovLearning Academy</NavLink></div>
          <div className={classes["navbar-links"]}>
            <div className={classes.links}>
              <NavLink className={classes.link} to="/courses"><span>Courses</span></NavLink>
              <NavLink className={classes.link} to="/about"><span>About</span></NavLink>
              <NavLink className={classes.link} to="/contact"><span>Contact us</span></NavLink>
            </div>
          </div>
          <div className={classes["navbar-button"]}>
            {<NavLink className={classes.link} to="/login">Get Started</NavLink>}
          </div>

            <button className={classes["display-button"]} onClick={onHandlerClick} ><FontAwesomeIcon icon={visible === false ? faBars : faXmark} size='xl'></FontAwesomeIcon></button>
            <div className={classes["display-section"]}>
              <div className={`${visible === true ? classes["display-section-list"] : classes["hidden"]}`}>
                <div className={`${visible === true ? classes["display-section-list-links"] : classes["hidden"]}`}>
                  <NavLink className={classes["list-link"]} to={{
                    pathname: '/courses',
                    state: {}
                  }}>Courses Store</NavLink>
                  <NavLink className={classes["list-link"]} to={{
                    pathname: '/about',
                    state: {}
                  }}>About</NavLink>
                  <NavLink className={classes["list-link"]} to={{
                    pathname: '/contact',
                    state: {}
                  }}>Contact Us</NavLink>
                  <NavLink className={classes["list-link"]} to={{
                    pathname: '/login',
                    state: {}
                  }}>Get Started</NavLink>
                </div>
              </div>
            </div>


          </div>
      </Fragment>
    )

  } else if (takeRole(token) === "user") {
    const id = takeID(token);
    return (
      <Fragment>
        <div className={classes["navbar-main"]}>
          <div className={classes["navbar-logo"]}><NavLink className={classes.logo} to="/">LovLearning Academy</NavLink></div>
          <div className={classes["navbar-links"]}>
            <div className={classes.links}>
              <NavLink className={classes.link} to="/campus/courses"><span>Courses Store</span></NavLink>
              <NavLink className={classes.link} to="/campus/mycourses"><span>My Courses</span></NavLink>
            </div>
          </div>
          <div className={classes["navbar-button"]}>
            <button onClick={() => { navigate("/campus/profile", { state: id }) }} className={classes.profile}><span><FontAwesomeIcon icon={faUser} /></span></button>
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
                </div>
              </div>
            </div>
        </div>
      </Fragment>
    )
  } else if (takeRole(token) === "admin") {
    return (
      <Fragment>
        <div className={classes["navbar-main"]}>
          <div className={classes["navbar-logo"]}><NavLink className={classes.logo} to="/">LovLearning Academy</NavLink></div>
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
            {!token ? <NavLink className={classes.link} to="/login">Get Started</NavLink> : <NavLink className={classes.link} to="/user/profile"><span><FontAwesomeIcon icon={faUser} /></span></NavLink>}
          </div>
        </div>
      </Fragment>
    );
  }

}

export default Navbar;
