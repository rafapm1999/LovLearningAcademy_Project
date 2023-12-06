//Importamos Fragment para no usar <></> 
import { Fragment, useState } from 'react';
import classes from './Navbar.module.css';
//Importamos Link de react-roouter-dom para los botones del Navbar
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser
} from "@fortawesome/free-solid-svg-icons";


function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  if (token) {

  } else { }
  return (
    <Fragment>
      <div className={classes["navbar-main"]}>
        <div className={classes["navbar-logo"]}><Link className={classes.logo} to="/">LovLearning Academy</Link></div>
        <div className={classes["navbar-links"]}>
          <div className={classes.links}>
            <Link className={classes.link} to="/courses"><span>Courses</span></Link>
            {!token ? "" : <Link className={classes.link} to="/user/mylearnplace"><span>MyLearnplace</span></Link>}
            {!token ? <Link className={classes.link} to="/about"><span>About</span></Link> : ""}
            {!token ? <Link className={classes.link} to="/contact"><span>Contact us</span></Link> : ""}
          </div>
        </div>
        <div className={classes["navbar-button"]}>
          {!token ? <Link className={classes.link} to="/login">Get Started</Link> : <Link className={classes.link} to="/user/profile"><span><FontAwesomeIcon icon={faUser} /></span></Link>}
        </div>
      </div>
    </Fragment>
  );
}

export default Navbar;
