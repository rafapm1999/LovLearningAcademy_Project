import classes from "./CourseInfoPage.module.css";
//Importamos useNavigate para navegar por rutas y useLocation para guardar los datos del curso seleccionado y enviarlo al modal
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import ReactDOM from "react-dom";
import CourseModal from "../Modal/CourseModal";

function CourseInfoPage(props) {
  //Creamos la contante location y usamos useLocation para guardar la info actual 
  const location = useLocation();
  //Guardamos en la constante courseData la información del curso seleccionado
  const courseData = location.state;
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  //Función para cuando damos al boton de back
  const handleBack = () => {
    navigate("/courses")
  }
  //Función para cuando queremos el curso
  const getTheCourse = () => {
    setVisible(!visible);
  }
  //Función para cuando cerramos el modal
  const handleClose = () => {
    setVisible(!visible);
  }

  console.log(courseData.data.title);
  return (
    <div>
      {ReactDOM.createPortal(
        <CourseModal visible={visible} data={courseData.data} onClose={handleClose} userData={props.userData} logged={props.onLogin} />,
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
          <button onClick={getTheCourse} className={classes.wantButton}>I want it</button>
        </div>
      </div>
    </div>
  );
}

export default CourseInfoPage;
