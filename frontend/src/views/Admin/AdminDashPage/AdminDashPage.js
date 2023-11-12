import classes from './AdminDashPage.module.css';
import Loader from '../../../components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { takeID } from '../../../components/Utils';

function AdminDashPage(props) {
  const token = localStorage.getItem("token").replaceAll('"', "");
  const userId = takeID(token);
  const [data, setUserData] = useState({})

  const getUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/auth/getuser/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setUserData(data.data)
      }
    } catch (error) {
      console.log('fALLO');

    }
  }

  useEffect(() => {
    getUser(userId)
  }, [])

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

export default AdminDashPage;
