import classes from "./CourseInfoPage.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import ReactDOM from "react-dom";
import CourseModal from "../Modal/CourseModal";

function CourseInfoPage() {
  const location = useLocation();
  const courseData = location.state;
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const handleBack = () => {
    navigate("/courses")
  }
  const getTheCourse = () => {
    setVisible(!visible);
  }
  const handleClose = () => {
    setVisible(!visible);
  }
  
  console.log(courseData.data.title);
  return (
    <div>
       {ReactDOM.createPortal(
        <CourseModal visible={visible} data={courseData.data} onClose={handleClose} />,
        document.querySelector("#modal")
      )}
        <div className={classes["courseInfoPage-main"]}>
          <div className={classes["course-title"]}>
            <h1>{courseData.data.title}</h1>
          </div>
          <div className={classes["courseInfoPage-info"]}>
            <div className={classes["course-description"]}>
              <p>{courseData.data.info}</p>
            </div>
            <div className={classes["course-image"]}>
              <img src={courseData.data.image} alt={`Photo of the course ${courseData.data.title}`} />
            </div>
          </div>
          <div className={classes.buttons}>
            <button onClick={handleBack} className={classes.backButton}>Back</button>
            <button  onClick={getTheCourse} className={classes.wantButton}>I want it</button>
          </div>
        </div>
    </div>
  );
}

export default CourseInfoPage;
