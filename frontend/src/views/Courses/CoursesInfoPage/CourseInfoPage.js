import classes from "./CourseInfoPage.module.css";
//Importamos useNavigate para navegar por rutas y useLocation para guardar los datos del curso seleccionado y enviarlo al modal
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import ReactDOM from "react-dom";
import CourseModal from "../../Modal/CourseModal/CourseModal";
import { takeID } from "../../../components/Utils";

function CourseInfoPage() {
  //Mirar fallo del token
  const [token, setToken] = useState(localStorage.getItem("token").replaceAll('"', ""));
  //Creamos la contante location y usamos useLocation para guardar la info actual 
  const location = useLocation();
  //Guardamos en la constante courseData la información del curso seleccionado
  let courseData = location.state;

  let userId = takeID(token);
  const navigate = useNavigate();
  const [courseExisting, setCourseExisting] = useState([]);
  const [courseRepeat, setCourseRepeat] = useState("")
  /* const [getNewCourse, setGetNewCourse] = useState([]) */
  const [visible, setVisible] = useState(false);

  const fetchWantCourse = async () => {
    try {
      // Obtener los datos existentes del servidor
      const response = await fetch(`http://localhost:8000/auth/getuser/${userId}`);
      let existingData = await response.json();

      console.log(existingData);
      console.log(courseData.data);
      console.log(userId);
      console.log(token)
      console.log(existingData.data.courses);

      // Verificar si existingData.courses es un array o está ausente
      if (!Array.isArray(existingData.data.courses)) {
        existingData.data.courses = []; // Inicializar como un array vacío si no existe o no es un array
      }

      // Verificar si el curso ya existe en el "user-dashboard"
      const courseExist = existingData.data.courses.some((course) => {

        return course._id === courseData.data._id;
      });
      setCourseRepeat(courseExist);
      console.log(courseExist);

      if (response.ok && courseExist === false) {
        existingData.data.courses = [...existingData.data.courses, ...Array(courseData.data)];
        const patchTheCourse = async (id) => {
          console.log(courseExisting);
          try {
            const patchResponse = await fetch(`http://localhost:8000/auth/${id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "auth-token": token,
              },
              body: JSON.stringify({
                courses: existingData.data.courses,
              }),
            });

            const data = await patchResponse.json();

            if (patchResponse.ok) {
              console.log(data);
            };
          } catch (error) {
            console.log(error);
          }
        }
        /*  existingData.data.courses = [...existingData.data.courses,...Array(courseData.data)]; */
        setCourseExisting(courseData.data)
        return patchTheCourse(userId);
      } else if (response.ok && courseExist === true) {

      }
    } catch (error) {
      console.log(error);
    }
  };



  //Función para cuando damos al boton de back
  const handleBack = () => {
    if (token) {
      navigate(`/user/courses`)
    } else if (!token) {
      navigate(`/courses`)
    }
  }
  //Función para cuando queremos el curso
  const getTheCourse = () => {
    setVisible(!visible);
    if (token) {
      console.log("entras en getthecourse if token");
      fetchWantCourse();
    };
  };

  //Función para cuando cerramos el modal
  const handleClose = () => {
    setVisible(!visible);
  }


  return (
    <div>
      {ReactDOM.createPortal(
        <CourseModal visible={visible} data={courseData.data} onClose={handleClose} userId={userId} logged={token} courseExists={courseRepeat} />,
        document.querySelector("#modal")
      )}
      <div className={classes["courseInfoPage-main"]}>
        <div className={classes["course-title"]}>
          <h1>{courseData.data.title}</h1>
        </div>
        <div className={classes["course-image"]}>
          <img src={require(`../../../../public/uploads/${courseData.data.image}`)} alt={`Photo of the course ${courseData.data.title}`} width={"1000"} />
        </div>
        <div className={classes["courseInfoPage-info"]}>
          <div className={classes["course-description"]}>
            <p>{courseData.data.info}</p>
          </div>
          <div className={classes["level-hours-container"]}>
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
