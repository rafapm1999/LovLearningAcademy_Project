import classes from './Modal.module.css';

function Modal(props) {
  return (
    <>
      <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
        <div className={`${classes["md-content"]} ${props.data.loggedIn ? classes.success : classes.danger}`}>
          <h3>{props.data.loginHeader}</h3>
          <div>
            <p>{props.data.loginMessage}</p>
            <ul>
              <li>Name: {props.data.name}</li>
              <li>Lastname: {props.data.lastName}</li>
              <li>Email: {props.data.email}</li>
              <li>Password: {props.data.password}</li>
            </ul>
            <button onClick={props.onLogin} className={classes["md-close"]}>Close</button>
          </div>
        </div>
      </div>
      <div className={classes["md-overlay"]}/>
    </>
  );
}

export default Modal;
