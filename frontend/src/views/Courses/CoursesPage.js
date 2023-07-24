import classes from "./CoursesPage.module.css";
import data from "../../mockedDB/data.json";
import {useNavigate} from "react-router-dom";
 
function CoursesPage() {
  const onHandlerClick = (id) => {
    console.log(`Log del curso ${id}`);
    
  }
  return (
    <div className={classes["coursesPage-root"]}>
      <h1>Courses</h1>
      <div className={classes["coursesPage-main"]}>
        {data.map((course, i) => {
          return (
            <div onClick={() => {onHandlerClick(course.id)}} className={classes["coursesPage-container"]}>
              <div className={classes["coursesPage-info"]}>
                <h3>{course.title}</h3>
                <img src={course.image} alt={`Foto curso ${course.id}`}></img>
                <p>{course.info}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CoursesPage;
