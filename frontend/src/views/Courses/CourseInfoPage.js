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

      // Combina los cursos existentes con los nuevos cursos
      existingData.data.courses = [...existingData.data.courses, ...Array(courseData.data)];

      // Realizar el PATCH con los datos combinados
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
        console.log(data);
        console.log(data);
        props.newUserData(data.data)
        userData = props.userData;
        console.log(userData);
      };
    } catch (error) {
      console.log(error);
    }
  };
  //En reserva hasta que valide el funcionamiento del nuevo codigo
  /*  try {
     const response = await fetch(
       `http://localhost:8000/auth/${userData.data.user._id}`,
       {
         method: "PATCH",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           courses: courseData.data,
         }),
       }
     );
     const data = await response.json();
     if (response.ok) {
       console.log(data);
       
     }
   } catch (error) {
     console.log("Error de algo");
   }
 } */
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
        <CourseModal visible={visible} data={courseData.data} onClose={handleClose} userData={userData} logged={props.onLogin} />,
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
