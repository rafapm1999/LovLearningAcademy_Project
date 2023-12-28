import classes from "./CourseInfoPage.module.css";
//Importamos useNavigate para navegar por rutas y useLocation para guardar los datos del curso seleccionado y enviarlo al modal
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import ReactDOM from "react-dom";
import CourseModal from "../../Modal/CourseModal/CourseModal";
import { takeID } from "../../../components/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faInfinity, faTrophy, faMobileScreen, faLayerGroup } from "@fortawesome/free-solid-svg-icons"

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
      console.log(courseData);
      console.log(userId);
      console.log(token)
      console.log(existingData.data.courses);

      // Verificar si existingData.courses es un array o está ausente
      if (!Array.isArray(existingData.data.courses)) {
        existingData.data.courses = []; // Inicializar como un array vacío si no existe o no es un array
      }

      // Verificar si el curso ya existe en el "user-dashboard"
      const courseExist = existingData.data.courses.some((course) => {
        console.log(course);
        console.log(courseData.slug);
        return course === courseData.slug;
      });
      setCourseRepeat(courseExist);
      console.log(courseExist);

      if (response.ok && courseExist === false) {
        console.log(courseData.slug);
        existingData.data.courses = [...existingData.data.courses, ...Array(courseData.slug)];
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
       console.log("el curso ya existe");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Funcion para hacer un scroll top
  const scrollTop = (e) => {
    window.scrollTo({
      top: 0,
      behavior: `${e}`, // Opcional, para tener una animación suave
    });
  }

  //Función para cuando damos al boton de back
  const handleBack = () => {
    if (token) {
      navigate(`/campus/courses`)
      scrollTop("smooth");
    } else if (!token) {
      navigate(`/courses`)
      scrollTop("smooth");
    }
  }
  //Función para cuando queremos el curso
  const getTheCourse = () => {
    setVisible(!visible);
    if (token) {
      console.log("entras en getthecourse if token");
      fetchWantCourse();
      scrollTop("smooth");
    };
  };

  //Función para cuando cerramos el modal
  const handleClose = () => {
    setVisible(!visible);
    scrollTop("smooth");
  }

    

  return (
    <div>
      {ReactDOM.createPortal(
        <CourseModal visible={visible} data={courseData} onClose={handleClose} userId={userId} logged={token} courseExists={courseRepeat} />,
        document.querySelector("#modal")
      )}
      <div className={`${classes["courseInfoPage-main"]} ${visible && classes["blur"]}`}>
        <div className={classes["course-title"]}>
          <h1>{courseData.title}</h1>
        </div>
        <div div className={classes["main-content"]}>
          <div className={classes["content"]}>
            <div className={classes["course-image"]}>
              <img src={require(`../../../../public/uploads/${courseData.image}`)} alt={`Photo of the course ${courseData.title}`} width={"850"} height={"450"} />
            </div>
            <div className={classes["course-details"]}>
              <h3>This course includes:</h3>
              <div className={classes["course-details-list"]}>
                <ul /* className={classes["course-details-list-ul"]} */>
                  <li><span><FontAwesomeIcon icon={faCirclePlay} size="xl" /></span> <p>{courseData.quantityHours === undefined ? "Quantity Hours not specificated" : `${courseData.quantityHours} hours of video content on demand`}</p></li>
                  <li><span><FontAwesomeIcon icon={faLayerGroup} size="xl" /></span> <p>{courseData.level === undefined ? "Level not specificated" : `${courseData.level} lessons level`}</p></li>
                  <li><span><FontAwesomeIcon icon={faInfinity} size="xl" /></span><p>Lifetime Access</p></li>
                  <li><span><FontAwesomeIcon icon={faMobileScreen} size="xl" /></span><p>Access on mobile devices and TV</p></li>
                  <li><span><FontAwesomeIcon icon={faTrophy} size="xl" /></span><p>Certificate of completion</p></li>
                </ul>

                {/* <div className={classes["level"]}>
                  <p>Level</p>
                  <p>{courseData.data.level === undefined ? "Level not specificated" : courseData.data.level}</p>
                </div>
                <div className={classes["quantyHours"]}>
                  <p>Quantity Hours</p>
                  <p>{courseData.data.quantityHours === undefined ? "Quantity Hours not specificated" : courseData.data.quantityHours}</p>
                </div> */}
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
}

export default CourseInfoPage;
