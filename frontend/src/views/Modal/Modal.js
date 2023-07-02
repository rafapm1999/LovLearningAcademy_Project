import classes from "./Modal.module.css";
import { useNavigate } from "react-router-dom";

function Modal(props) {
  return (
    <>
      <div className={classes["modal-effect"]}>
        <div className={classes["modal-content"]}>
          <h3>{props.data.loginHeader}</h3>
          <div>
            <p>{props.data.loginMessage}</p>
            <ul>
              <li>Email: {props.data.email}</li>
            </ul>
            <button >Close</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
