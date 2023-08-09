import { Fragment } from 'react';
import classes from './Navbar.module.css';
import{Link}from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function UserNavbar(props) {
    const navigate = useNavigate();
    //provisional
    const unlogged = () => {
        navigate("/home");
        console.log("has dado click");
        props.onLogin(false);
    } 
  return (
    <Fragment>
    <div className={classes["navbar-main"]}>
      <div className={classes["navbar-logo"]}><Link className={classes.logo} to="/user-dashboard">LovLearning Academy</Link></div>
      <div className={classes["navbar-links"]}>
        <div className={classes.links}>
          <Link className={classes.link} to="/courses"><span>Courses</span></Link>
          <Link className={classes.link} to="/mycourses"><span>MyLearnplace</span></Link>
          <Link className={classes.link} to="/community"><span>Community</span></Link>
        </div>
      </div>
      <div className={classes["navbar-button"]}>
        <button onClick={unlogged} className={classes.profile}> X </button>
        {/* <Link onClick={unlogged} to="/profile" >x</Link> */}
      </div>
    </div>
    </Fragment>
  );
}

export default UserNavbar;
