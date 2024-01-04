import { useState, useEffect } from 'react';
import classes from './UserNavbar.module.css';
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { takeRole, takeID } from '../../Utils';
//Importamos FontAwesomeIcon para usarlo en el footer
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket, faUser, faBars, faXmark
} from "@fortawesome/free-solid-svg-icons";


function UserNavbar() {
  const token = localStorage.getItem("token");
  /* const role = takeRole(); */
  const id = takeID();
  let takeCourse = [];
  const navigate = useNavigate();
  let [visible, setVisible] = useState(true)
  const [user, setUser] = useState({})
  const [courses, setCourses] = useState([])
  const [coursesSlug, setCoursesSlug] = useState([])
  const [courseClick, setCourseClick] = useState(false)

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
        console.log(data.data);
        console.log(data.data.courses);
        setUser(data.data);
        setCoursesSlug(data.data.courses)
      } else {
        console.log("ko");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser(id);
  }, [])
  const getCourse = async (slug) => {
    try {
      const response = await fetch(`http://localhost:8000/courses/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      /* let newCourse = data.data[0]; */
      takeCourse = [data.data[0]];
      if (response.ok) {
        console.log(takeCourse);
        setCourses(prevCourses => [...prevCourses, data.data[0]]);
      }
    } catch (error) {
      console.log("Estas aqui");
      console.log(error);

    }
  };
  const getUserCourses = (coursesSlug) => {
    setCourses([]);
    console.log(coursesSlug);
    coursesSlug.forEach((slug) => {
      console.log(slug);
      return (getCourse(slug))
    })
  }

  console.log(user);
  console.log(courses);
  const unlogged = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("rememberMe");
    navigate(`/`);
  }
  /* const onProfileClick = () => {
    navigate("/campus/profile")
  } */
  const onMyCoursesClick = () => {

    console.log(coursesSlug);
    setCourseClick(true)
    getUserCourses(coursesSlug);
    
      console.log(courses);
      navigate(`/campus/mycourses`, { state: courses });
   

  }
  const onToDoListClick = () => {

  }
  const onHandlerClick = () => {
    setVisible(!visible);
  }

  return (
    <>
      <div className={classes["navbar-main"]}>
        <div className={`${visible && classes["hidden"]}`}>
          <div className={classes["main-container"]}>
            <div className={classes["left-section"]}>
              <div className={classes["left-section-links"]}>
                <span className={classes["section-button"]}></span>
                <div className={classes["left-section-links"]}>
                  <NavLink className={classes["list-link"]} to={{
                    pathname: '/campus/profile',
                    state: {}
                  }}>Profile</NavLink>

                  <NavLink className={classes["list-link"]} onClick={ onMyCoursesClick }>My Courses</NavLink>
                  <NavLink className={classes["list-link"]} to="*">ToDoList</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes["navbar-logo"]}>
          <button className={classes["display-button"]} onClick={onHandlerClick} ><FontAwesomeIcon icon={visible === true ? faBars : faXmark} size='xl'></FontAwesomeIcon></button>
          <NavLink className={classes.logo} to={{
            pathname: '/',
            state: {}
          }}
          >
            <span>LovLearning Academy</span>
          </NavLink>
        </div>
        <div className={classes["navbar-links"]}>
          <div className={classes.links}>
            <NavLink className={classes.link} to={{
              pathname: '/campus/courses',
              state: {}
            }} ><span>Courses</span></NavLink>
            <NavLink className={classes.link} to={{
              pathname: '/campus/mylearnplace',
              state: { id }
            }} ><span>MyLearnplace</span></NavLink>
            {/* <Link className={classes.link} to="/community" ><span>Community</span></Link> */}
          </div>
        </div>
        <div className={classes["navbar-button"]}>
          <button onClick={() => { navigate("/campus/profile", { state: id }) }} className={classes.profile}><span><FontAwesomeIcon icon={faUser} /></span></button>
          <button onClick={unlogged} className={classes.logout}> Log out <span><FontAwesomeIcon icon={faArrowRightFromBracket} /></span> </button>

        </div>
      </div>
    </>
  );
}

export default UserNavbar;
