//Importamos Fragment para no usar <></> 
import { Fragment, useState } from 'react';
import classes from './Navbar.module.css';
//Importamos Link de react-roouter-dom para los botones del Navbar
import { NavLink, useNavigate } from "react-router-dom";
import { takeRole, takeID } from '../../Utils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faBars, faXmark
} from "@fortawesome/free-solid-svg-icons";
import UserNavbar from '../UserNavbar/UserNavbar';
import { useEffect } from 'react';


function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate();
  const onHandlerClick = () => {
    setVisible(!visible)
  }
  
    if ((!token) || (token === undefined) || (token === null)) {
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
                <NavLink className={classes["list-link"]} onClick={onHandlerClick} to={{
                  pathname: '/courses',
                  state: {}
                }}>Courses Store</NavLink>
                <NavLink className={classes["list-link"]} onClick={onHandlerClick} to={{
                  pathname: '/about',
                  state: {}
                }}>About</NavLink>
                <NavLink className={classes["list-link"]} onClick={onHandlerClick} to={{
                  pathname: '/contact',
                  state: {}
                }}>Contact Us</NavLink>
                <NavLink className={classes["list-link"]} onClick={onHandlerClick} to={{
                  pathname: '/login',
                  state: {}
                }}>Get Started</NavLink>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )

  } else if (token) {
      return (
        <UserNavbar></UserNavbar>
      )
    } 
  }


export default Navbar;
