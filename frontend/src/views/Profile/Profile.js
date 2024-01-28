import classes from './Profile.module.css';
import { useState, useEffect } from 'react';
import { takeID } from "../../components/Utils";
//Importamos FontAwesomeIcon para usarlo en INFO, EDIT y REMOVE
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan
} from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from 'react-router-dom';

function Profile(props) {
  const token = localStorage.getItem("token").replaceAll('"', "")
  const id = takeID(token)

  const [user, setUser] = useState({})
  const [courses, setCourses] = useState([])
  const navigate = useNavigate();

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
        /*  console.log(data); */

        setCourses(data.data.courses);
        setUser(data.data)

      }
    } catch (error) {
      console.log('fALLO');

    }
  }

  useEffect(() => {
    getUser(id)
  }, [])


  //Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const coursePerPage = 6;

  //Creación de la paginación del contenido de la tabla
  const indexOfLastUser = currentPage * coursePerPage;
  const indexOfFirstUser = indexOfLastUser - coursePerPage;
  const currentCourses = courses.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(courses.length / coursePerPage);
  const paginate = (pageNumber) => {
    /*     console.log("Has dado click");
        console.log(currentCourses); */
    setCurrentPage(pageNumber);
  };
  //Fetch para eliminar el course seleccionado
  const fetchRemoveCourse = async (userID, courseID) => {
    try {
      const response = await fetch(`http://localhost:8000/auth/deleteusercourse/${userID}/${courseID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        /*  console.log(data.data); */
        navigate("/loader-page", { state: data })
      };
    } catch (error) {

    }
  }

  // 
  const onHandlerClick = (userID, courseID) => {
    /*  console.log(userID);
     console.log(courseID); */
    fetchRemoveCourse(userID, courseID)
  };

  /*   console.log(user.courses); */

  return (
    <div className={classes["main-profile"]}>
      <div className={classes["user-info"]}>
        <div className={classes["user-info-container"]}>
          <h2 className={classes.title}></h2>
          <div className={classes["user-info-details"]}>
            <h3>User Details</h3>
            <h3 className={classes["user-info-details-title"]}>Email</h3>
            <h3 className={classes["user-info-details-data"]}>Your email is {user.email}</h3>
            <h3 className={classes["user-info-details-title"]}>Name</h3>
            <h3 className={classes["user-info-details-data"]}>{user.name}</h3>
            <h3 className={classes["user-info-details-title"]}>LastName</h3>
            <h3 className={classes["user-info-details-data"]}>{user.lastName}</h3>
            <h3 className={classes["user-info-details-title"]}>Courses</h3>
            <h3 className={classes["user-info-details-data"]}>You have {courses.length} courses in your MyLearnplace</h3>
            <h3 className={classes["user-info-details-title"]}>Certificates</h3>
            <h3 className={classes["user-info-details-data"]}>You don't have certificates yet</h3>
          </div>
        </div>
        <div className={classes["user-info-img"]}>
        </div>
      </div>
    </div>
  );
}

export default Profile;
