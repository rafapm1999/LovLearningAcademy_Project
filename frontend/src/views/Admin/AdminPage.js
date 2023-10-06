import classes from './AdminPage.module.css';
import Loader from '../../components/Loader/Loader';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPage(props) {
  console.log(props.userD);

  return (
    <div>
      <div className={classes["info-container"]}>
        <p>Name {props.userData.name}</p>
        <p>Last Name{props.userData.lastName}</p>
        <p> Email {props.userData.email}</p>
        <p>Registered at {props.userData.registerAt.slice(0,10)}</p>
        <div className={classes["button-container"]}>
          <button >Mesagges</button>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
