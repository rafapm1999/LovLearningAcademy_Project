import classes from './Profile.module.css';
import { useState } from 'react';
//Importamos FontAwesomeIcon para usarlo en INFO, EDIT y REMOVE
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan
} from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from 'react-router-dom';

function Profile(props) {
  let data = props.userData;
  let courses = props.userData.courses
  const navigate = useNavigate();

  //Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const coursePerPage = 6;

  //Creación de la paginación del contenido de la tabla
  const indexOfLastUser = currentPage * coursePerPage;
  const indexOfFirstUser = indexOfLastUser - coursePerPage;
  const currentCourses = courses.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(courses.length / coursePerPage);
  const paginate = (pageNumber) => {
    console.log("Has dado click");
    console.log(currentCourses);
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
        console.log(data.data);
        props.newUserData(data.data.user);
        navigate("/loader-page", { state: data })
      };
    } catch (error) {

    }
  }

  // 
  const onHandlerClick = (userID, courseID) => {
    fetchRemoveCourse(userID, courseID)
  };



  return (
    <div className={classes["main-profile"]}>
      <div className={classes["user-info"]}>
        <div className={classes["user-info-container"]}>
          <h2 className={classes.title}>My details</h2>
          <div className={classes["user-info-details"]}>
            <h3>Hello {data.name} {data.lastName}</h3>
            <h3>Your email is {data.email}</h3>
            <h3>You have {data.courses.length} courses in your MyLearnplace</h3>
          </div>
        </div>
      </div>
      <div className={classes["main-table"]}>
        <h2 className={classes.title}>My courses</h2>
        {
          courses.length !== 0 ?
            <div className={classes["table-container"]}>
              <table className={classes["coursesPage-main-table"]}>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Level</th>
                    <th>Total Hours</th>
                    <th>Image</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCourses.map((course, i) => {
                    return (
                      <tr className={classes["coursesPage-info"]} key={i}>
                        <td>{course.title}</td>
                        <td>{course.level === undefined ? "Not specificated" : course.level}</td>
                        <td>{course.quantityHours === undefined ? "Not specificated" : course.quantityHours}</td>
                        <td><img src={course.image} alt={`Photo of course ${course.title}`} /></td>
                        <td onClick={() => { onHandlerClick(props.userData._id, course._id) }} className={classes["remove-button"]}><FontAwesomeIcon onClick={() => { onHandlerClick(props.userData._id, course._id) }} icon={faTrashCan} size='xl' /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div> :
            <h1>You don't have any course yet!</h1>
        }
      </div>
      {/* Pagination component */}
      {
        courses.length !== 0 ?
          <div className={classes["pagination-main"]}>
            <div className={classes["pagination-container"]}>
              <div className={classes["pagination-info"]}>
                <button onClick={() => paginate(currentPage === 1 ? currentPage : currentPage - 1)}> <span>&#5176;</span> Back </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => paginate(currentPage === totalPages ? currentPage : currentPage + 1)}> Next <span>&#5171;</span></button>
              </div>
            </div>
          </div> :
          ""
      }
    </div>
  );
}

export default Profile;
