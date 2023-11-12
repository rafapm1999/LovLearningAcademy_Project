import { Fragment } from 'react';
import classes from './Modal.module.css';
import { useNavigate } from 'react-router-dom';


function Modal(props) {
  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/login")
  }
  
  if (props.data.loggedIn === false) {
    return (
      <Fragment>
        <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
          <div className={`${classes["md-content"]} ${props.data.loggedIn ? classes.success : classes.danger}`}>
            <h3>{props.data.loginHeader}</h3>
            <div>
              <p>{props.data.loginMessage}</p>
              <ul>
                <li>{props.data.name}</li>
                <li>{props.data.lastName}</li>
                <li>{props.data.email}</li>
                <li>{props.data.password}</li>
              </ul>
              <button onClick={props.onLogin} className={classes["md-button"]}>Close</button>
            </div>
          </div>
        </div>
        <div className={classes["md-overlay"]} />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
          <div className={`${classes["md-content"]} ${props.data.loggedIn ? classes.success : classes.danger}`}>
            <h3>{props.data.loginHeader}</h3>
            <div className={classes["info-container"]}>
              <p>{props.data.loginMessage}</p>
              <button onClick={goLogin} className={classes["md-button"]}>Login</button>
            </div>

          </div>
        </div>
        <div className={classes["md-overlay"]} />
      </Fragment>
    );
  }
}

export default Modal;
