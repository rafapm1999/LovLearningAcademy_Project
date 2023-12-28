import classes from './SideBar.module.css';
import {useNavigate} from "react-router-dom";
import { useState } from 'react';

function SideBar() {
  const [token, setToken] = useState(localStorage.getItem("token").replaceAll('"', ""))
  const navigate = useNavigate()
  const onProfileClick = () => {
    navigate("/user/profile")
  }
  const onMyCoursesClick = () => {
    
  }
  const onToDoListClick = () => {
    
  }
  return (
    <div className={classes["main-container"]}>
        <div className={classes["left-section"]}>
          <div className={classes["links"]}>
            <span className={classes["section-button"]}></span>
            <ul>
              <li className={classes["list-link"]} onClick={onProfileClick}>Profile</li>
              <li className={classes["list-link"]}>My Courses</li>
              <li className={classes["list-link"]}>ToDoList</li>
            </ul>
          </div>
        </div>
      </div>
  );
}

export default SideBar;
