//Importamos Fragment para no usar <></> 
import { Fragment, useState } from 'react';
import classes from './Navbar.module.css';
//Importamos Link de react-roouter-dom para los botones del Navbar
import { NavLink } from "react-router-dom";
import { takeRole } from '../../Utils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser
} from "@fortawesome/free-solid-svg-icons";


function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  if (!token) {
    return (
      <Fragment>
        <div className={classes["navbar-main"]}>
          <div className={classes["navbar-logo"]}><NavLink className={classes.logo} to="/">LovLearning Academy</NavLink></div>
          <div className={classes["navbar-links"]}>
            <div className={classes.links}>
              <NavLink className={classes.link} to="/courses"><span>Courses</span></NavLink>
              {!token ? "" : <NavLink className={classes.link} to="/campus/mylearnplace"><span>MyLearnplace</span></NavLink>}
              {!token ? <NavLink className={classes.link} to="/about"><span>About</span></NavLink> : ""}
              {!token ? <NavLink className={classes.link} to="/contact"><span>Contact us</span></NavLink> : ""}
            </div>
          </div>
          <div className={classes["navbar-button"]}>
            {<NavLink className={classes.link} to="/login">Get Started</NavLink>}
          </div>
        </div>
      </Fragment>
    )

  } else if (takeRole(token) === "user") {
    return (
      <Fragment>
        <div className={classes["navbar-main"]}>
          <div className={classes["navbar-logo"]}><NavLink className={classes.logo} to="/">LovLearning Academy</NavLink></div>
          <div className={classes["navbar-links"]}>
            <div className={classes.links}>
              <NavLink className={classes.link} to="/campus/courses"><span>Courses</span></NavLink>
              {!token ? "" : <NavLink className={classes.link} to="/campus/mylearnplace"><span>MyLearnplace</span></NavLink>}
              {!token ? <NavLink className={classes.link} to="/about"><span>About</span></NavLink> : ""}
              {!token ? <NavLink className={classes.link} to="/contact"><span>Contact us</span></NavLink> : ""}
            </div>
          </div>
          <div className={classes["navbar-button"]}>
            {!token ? <NavLink className={classes.link} to="/login">Get Started</NavLink> : <NavLink className={classes.link} to="/campus/profile"><span><FontAwesomeIcon icon={faUser} /></span></NavLink>}
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
              <NavLink className={classes.link} /* onClick={closeAll} */ to={{
                pathname: '/admin/bbdd-members',
                state: {}
              }} ><span>All Members</span></NavLink>
              <NavLink className={classes.link} /* onClick={closeAll} */ to={{
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
