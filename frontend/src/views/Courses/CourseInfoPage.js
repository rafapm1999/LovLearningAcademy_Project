import classes from "./CourseInfoPage.module.css";
import { useLocation } from "react-router-dom";

function CourseInfoPage() {
  const location = useLocation();
  const courseData = location.state;
  console.log(courseData);
  
  console.log(courseData.data.title);
  return (
    <div>
      <div className={classes["courseInfoPage-main"]}>
        <div className={classes["course-title"]}>
          <h1>{courseData.data.title}</h1>
        </div>
        <div className={classes["course-image"]}>
          <img src={courseData.data.image} alt="" />
        </div>
        <div className={classes["course-description"]}>
          <p>{courseData.data.info}</p>
        </div>
        <div className={classes.buttons}>
          <button className={classes.backButton}>Back</button>
          <button className={classes.wantButton}>I want it!</button>
        </div>
      </div>
    </div>
  );
}

export default CourseInfoPage;
