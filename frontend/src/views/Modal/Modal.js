import classes from "./Modal.css";

function Modal() {
  return (
    <>
      <div className={classes["modal-effect"]}>
        <div className={classes["modal-content"]}>
          <h3></h3>
          <div>
            <p></p>
            <ul>
              <li></li>
            </ul>
            <button>Close</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
