import classes from "./CoursesPage.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Route, Routes } from "react-router-dom";
// import CourseInfoPage from "./CourseInfoPage";

function CoursesPage() {
  //Creamos la constante courses con useState para que parte de un array vacío
  const [courses, setCourses] = useState([]);
  //Creamos una constante pending para usarla con un loader
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  // const [click, setClick] = useState(false);
  /* const [course, setCourse] = useState({}); */

  //Con esta funcion hacemos un fetch (GET) de todos los cursos de nuestra base de datos
  const fetchCourses = async () => {
    if (pending === false) {
      try {
        const response = await fetch(
          "http://localhost:8000/courses/all-courses",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log(data);
          setCourses(Array(data));
          setPending(true);
        }
      } catch (error) {
        console.log("Error de algo");
      }
    }
  };
  //Con esta función hacemos un fetch (GET) para cuando clickamos sobre un curso concreto
  const getCourse = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:8000/courses/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        /* setCourse(data); */
        /* setClick(true); */
        //Si la respuesta es buena navegamos a la ruta definida, guardando los datos devueltos por el fetch en el state para usarlos posteriormente con useLocation
        navigate(`/course/${data.data.title}`, { state: data })
      }
    } catch (error) {
      console.log("Algo ha fallado con el curso");
    }

  };
  //Usamos useEffect para hacer un fetch de todos los cursos cuando se carga el componente CoursesPage
  useEffect(() => {
    fetchCourses();
  }, []);
  //Esta función nos genera el fetch del elemento concreto que hemos clickado gracias a que recibe su id
  const onHandlerClick = (id) => {
    console.log(`Log del curso ${id}`);
    getCourse(id);
  };
  /* Revisar esta parte y poner un loader para usarlo en !pending */
  if (!Array.isArray(courses)) {
    return (
      <div>
        <h1>Cargando...</h1>
      </div>
    );
  }
  if (!pending) {
    return <h1></h1>;
  }

  return (
    <div className={classes["coursesPage-root"]}>
      <div className={classes.title}>
        <h1>Courses</h1>
      </div>
      <div className={classes["coursesPage-main"]}>
        {courses[0].data.map((course, i) => {
          return (
            <div
              onClick={() => {
                onHandlerClick(course._id);
              }}
              className={classes["coursesPage-container"]}
              key={course.id}
            >
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
