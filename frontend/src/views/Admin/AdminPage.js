import classes from '../Modal/ProfileModal.module.css';
import Loader from '../../components/Loader/Loader';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPage(props) {
  const data = props.data;
  const handlerClose = () => {
    return props.onClose;
  }

  return (
    <>
      <div className={classes["modal-main"]}>
        <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
          <div className={classes["type-info"]}>
            <div className={`${classes["md-content"]}`}>
              <div className={classes["info-container"]}>
                <p>Admin Profile</p>
                <p>Name: {data.name}</p>
                <p>Last Name: {data.lastName}</p>
                <p>Email: {data.email}</p>
                <p>Role: {data.role}</p>
                <button onClick={handlerClose()} className={classes["md-close"]}><span>X</span></button>
              </div>
            </div>
          </div>
        </div>
        <div className={classes["md-overlay"]} />
      </div>
    </>
  );
}

export default AdminPage;
