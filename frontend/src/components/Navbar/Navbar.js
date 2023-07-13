import classes from './Navbar.module.css';
import{Link}from "react-router-dom";

function Navbar() {
  return (
    <>
    <div className={classes["navbar-main"]}>
      <div className={classes["navbar-logo"]}><Link className={classes.link} to="/">LOGO</Link></div>
      <div className={classes["navbar-links"]}>
        <div className={classes.links}>
          <Link className={classes.link} to="/home">Home</Link>
          <Link className={classes.link} to="/about">About</Link>
          <Link className={classes.link} to="/blog">Blog</Link>
          <Link className={classes.link} to="/contact">Contact us</Link>
        </div>
      </div>
      <div className={classes["navbar-button"]}>
        <Link className={classes.link} to="/login">Login</Link>
      </div>
    </div>
    </>
  );
}

export default Navbar;
