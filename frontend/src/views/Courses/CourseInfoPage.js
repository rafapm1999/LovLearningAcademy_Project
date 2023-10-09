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
  let userData = props.userData;
  const navigate = useNavigate();
  const [courseExisting, setCourseExisting] = useState("");
  /* const [getNewCourse, setGetNewCourse] = useState([]) */
  const [visible, setVisible] = useState(false);

  const fetchWantCourse = async () => {
    try {
      // Obtener los datos existentes del servidor
      const response = await fetch(`http://localhost:8000/auth/getuser/${userData._id}`);
      let existingData = await response.json();

      // Verificar si existingData.courses es un array o está ausente
      if (!Array.isArray(existingData.data.courses)) {
        existingData.data.courses = []; // Inicializar como un array vacío si no existe o no es un array
      }

      // Verificar si el curso ya existe en el "user-dashboard"
      const courseExist = existingData.data.courses.some((course) => {
        console.log('Id de course');

        console.log(course._id);

        console.log('Id de courseData');

        console.log(courseData.data._id);
        return course._id === courseData.data._id;
      });
      setCourseExisting(courseExist)

      console.log(courseExist);
      if (courseExist === true) {
        console.log("El curso ya existe en tu dashboard.");
      } else if (courseExist === false) {
        console.log("Puedes agregar el curso al dashboard.");
        // Combina los cursos existentes con los nuevos cursos
        existingData.data.courses = [...existingData.data.courses, ...Array(courseData.data)];
        const patchTheCourse = async () => {
          try {
            const patchResponse = await fetch(`http://localhost:8000/auth/${userData._id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                courses: existingData.data.courses,
              }),
            });

            const data = await patchResponse.json();

            if (patchResponse.ok) {
              console.log("Has entrado en patchResponse");
              props.newUserData(data.data)
              userData = props.userData;
              console.log(userData);
            };
          } catch (error) {

          }
        }
        return patchTheCourse();

      };

    } catch (error) {
      console.log(error);
    }
  };

  //Función para cuando damos al boton de back
  const handleBack = () => {
    navigate("/courses")
  }
  //Función para cuando queremos el curso
  const getTheCourse = () => {
    setVisible(!visible);
    if (userData != "" || userData != null) {
      console.log('Has entrado en userData != "" || userData != null');
      fetchWantCourse();
    };
  };

  //Función para cuando cerramos el modal
  const handleClose = () => {
    setVisible(!visible);
  }

  console.log(userData);
  return (
    <div>
      {ReactDOM.createPortal(
        <CourseModal visible={visible} data={courseData.data} onClose={handleClose} userData={userData} logged={props.onLogin} courseExists={courseExisting} />,
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
          <div className={classes["level-hopurs-container"]}>
            <p>Level</p>
            <p>{courseData.data.level === undefined ? "Level not specificated" : courseData.data.level}</p>
            <p>Quantity Hours</p>
            <p>{courseData.data.quantityHours === undefined ? "Quantity Hours not specificated" : courseData.data.quantityHours}</p>
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
