import classes from "./LearnPlace.module.css";
import { useState } from "react";
/* import { useLocation } from "react-router-dom"; */

function LearnPlace(props) {
  let user = props.userData;
  console.log(user);
  let courses = user.courses;
  console.log(user);
  console.log(courses);
  
  //Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const coursePerPage = 3;
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
  
  const onHandlerClick = () => { };
  return (
    <div className={classes["main-container"]}>
      <h1 className={classes.title}>MyLearnplace</h1>
      <div className={classes["user-info-container"]}>
        <p className={classes["user-info"]}>Happy to see you {user.name}, you have {courses.length} {""}
          courses waiting for you!</p>
      </div>
      <div className={classes["coursesLearnPage-main"]}>
        {currentCourses.map((course, i) => {
          return (
            <div
              onClick={() => {
                onHandlerClick(course._id);
              }}
              className={classes["coursesLearnPage-container"]}
              key={course.id}
            >
              <div className={classes["coursesLearnPage-info"]}>
                <h3>{course.title}</h3>
                <img src={course.image} alt={`Foto curso ${course.id}`}></img>
                <p>{course.info}</p>
              </div>
            </div>
          );
        })}
      </div>
      {/* Pagination component */}
      <div className={classes["pagination-main"]}>
        <div className={classes["pagination-container"]}>
          <div className={classes["pagination-info"]}>
            <button onClick={() => paginate(currentPage === 1 ? currentPage : currentPage - 1)}> <span>&#5176;</span> Back </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => paginate(currentPage === totalPages ? currentPage : currentPage + 1)}> Next <span>&#5171;</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnPlace;
