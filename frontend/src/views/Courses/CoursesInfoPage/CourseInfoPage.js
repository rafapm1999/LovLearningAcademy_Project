import classes from "./CourseInfoPage.module.css";
import Loader from "../../../components/Loader/Loader";
//Importamos useNavigate para navegar por rutas y useLocation para guardar los datos del curso seleccionado y enviarlo al modal
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CourseModal from "../../Modal/CourseModal/CourseModal";
import { takeID } from "../../../components/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faInfinity, faTrophy, faMobileScreen, faLayerGroup, faTruckMedical } from "@fortawesome/free-solid-svg-icons"

function CourseInfoPage() {
  //Creamos la contante location y usamos useLocation para guardar la info procediente del componente anterior 
  const location = useLocation();

  //Obtención del token de autenticidad y guardado mediante useState
  const [token, setToken] = useState(localStorage.getItem("token").replaceAll('"', ""));

  //Sacamos el id del token recibido y la guardamos en la variable userId
  let userId = takeID(token);

  //Creamos una constante pending para usarla como "semaforo" con un loader
  const [pending, setPending] = useState(false)
  const navigate = useNavigate();

  let courseData = [];

  //Guardamos en la constante courseData la información del curso seleccionado obtenido en el componente anterior
  if (location.state !== null) {
    courseData = location.state.course;
  }

  //Variables para funcionamiento de la logica
  const [courseExisting, setCourseExisting] = useState([]);
  const [courseRepeat, setCourseRepeat] = useState("")
  const [visible, setVisible] = useState(false);

  //Fetch para cuando queremos añadir un curso
  const fetchWantCourse = async () => {
    try {
      // Obtener los datos existentes del usuario
      const response = await fetch(`http://localhost:8000/auth/getuser/${userId}`);
      let existingData = await response.json();

      // Verificar si existingData.courses es un array o está ausente
      if (!Array.isArray(existingData.data.courses)) {
        existingData.data.courses = []; // Inicializar como un array vacío si no existe o no es un array
      }

      // Verificar si el curso ya existe en el "user-dashboard"
      const courseExist = existingData.data.courses.some((course) => {
        return course === courseData._id;
      });
      setCourseRepeat(courseExist);

      //Realizamos el patch para actualizar la lista de cursos obtenidos por el ususario
      if (response.ok && courseExist === false) {
        existingData.data.courses = [...existingData.data.courses, ...Array(courseData._id)];
        const patchTheCourse = async (id) => {
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
            await patchResponse.json();
          } catch (error) {
            console.log(error);
          }
        }
        setCourseExisting(courseData.data)
        return patchTheCourse(userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Funcion para hacer un scroll top
  const scrollTop = (e) => {
    window.scrollTo({
      top: 0,
      behavior: `${e}`,
    });
  }

  //Función para cuando damos al boton de back
  const handleBack = () => {
    if (token) {
      navigate(-1)
      scrollTop("smooth");
    } else if (!token) {
      navigate(-1)
      scrollTop("smooth");
    }
  }

  //Función para cuando queremos el curso
  const getTheCourse = () => {
    setVisible(!visible);
    if (token) {
      fetchWantCourse();
      scrollTop("smooth");
    } else if (!token) {
      alert("You must to loggin.")
    }
  };

  //Función para cuando cerramos el modal
  const handleClose = () => {
    setVisible(!visible);
    scrollTop("smooth");
  }

  //Funcion para cuando clickamos el boton back
  const navigateBack = () => {
    setTimeout(() => {
      return navigate(-1)
    })
    return (<Loader></Loader>)
  }

  //Este codigo hay que revisarlo para que la info respete los espacios y los enters
  /*  /*   let infoCourse = courseData.info.split('\n'); 
   let infoCourse = courseData.info.split('\n').map((salto) => {
     return salto + <br />
   }); */

  /* let cont = 1; */

  if (location.state === null || location.state === undefined) {
    return navigateBack()
  } else {

    return (
      <div>

        {/* Modal */}
        {ReactDOM.createPortal(
          <CourseModal visible={visible} data={courseData} onClose={handleClose} userId={userId} logged={token} courseExists={courseRepeat} />,
          document.querySelector("#modal")
        )}

        {/* Component */}
        <div className={`${classes["courseInfoPage-main"]} ${visible && classes["blur"]}`}>
          <div className={classes["course-title"]}>
            <h1>{courseData !== null ? courseData.title : ""}</h1>
          </div>
          <div className={classes["main-content"]}>
            <div className={classes["content"]}>
              <div className={classes["course-image"]}>
                <img src={require(`../../../../public/uploads/${courseData !== null ? courseData.image : ""}`)} alt={`Photo of the course ${courseData !== null ? courseData.title : ""}`}/>
              </div>
              <div className={classes["course-details"]}>
                <h3>This course includes:</h3>
                <div className={classes["course-details-list"]}>
                  <ul>
                    <li><span><FontAwesomeIcon icon={faCirclePlay} size="xl" /></span> <p>{courseData.quantityHours === undefined ? "Quantity Hours not specificated" : `${courseData.quantityHours} hours of video content on demand`}</p></li>
                    <li><span><FontAwesomeIcon icon={faLayerGroup} size="xl" /></span> <p>{courseData.level === undefined ? "Level not specificated" : `${courseData.level} lessons level`}</p></li>
                    <li><span><FontAwesomeIcon icon={faInfinity} size="xl" /></span><p>Lifetime Access</p></li>
                    <li><span><FontAwesomeIcon icon={faMobileScreen} size="xl" /></span><p>Access on mobile devices and TV</p></li>
                    <li><span><FontAwesomeIcon icon={faTrophy} size="xl" /></span><p>Certificate of completion</p></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className={classes["main-details"]}>
            <div className={classes["courseInfoPage-info"]}>
              <div className={classes["course-description-info"]}>
                <h2>Description</h2>
                <p>{courseData.info}</p>
              </div>
            </div>

          </div>
          <div className={classes.buttons}>
            <button onClick={handleBack} className={classes.backButton}>Back</button>
            <button onClick={getTheCourse} className={classes.wantButton}>I want it</button>
          </div>
          <div className={`${visible && classes["modal-main"]}`}></div>
        </div>
      </div>
    );
  };
};

export default CourseInfoPage;
