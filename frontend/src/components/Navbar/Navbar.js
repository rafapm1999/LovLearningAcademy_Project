import { Fragment } from 'react';
import classes from './Navbar.module.css';
import{Link}from "react-router-dom";

function Navbar() {
  return (
    <Fragment>
    <div className={classes["navbar-main"]}>
      <div className={classes["navbar-logo"]}><Link className={classes.logo} to="/home">LovLearning Academy</Link></div>
      <div className={classes["navbar-links"]}>
        <div className={classes.links}>
          <Link className={classes.link} to="/home"><span>Home</span></Link>
          <Link className={classes.link} to="/about"><span>About</span></Link>
          <Link className={classes.link} to="/courses"><span>Courses</span></Link>
          <Link className={classes.link} to="/contact"><span>Contact us</span></Link>
        </div>
      </div>
      <div className={classes["navbar-button"]}>
        <Link className={classes.link} to="/login">Login</Link>
      </div>
    </div>
    </Fragment>
  );
}

export default Navbar;
