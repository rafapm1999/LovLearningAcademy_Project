import classes from "./CoursesPage.module.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
// import { Route, Routes } from "react-router-dom";
// import CourseInfoPage from "./CourseInfoPage";

function CoursesPage() {
  //Creamos la constante courses con useState para que parte de un array vacío
  const [courses, setCourses] = useState([]);
  //Creamos una constante pending para usarla con un loader
  const [pending, setPending] = useState(false);
  const [coursesCopy, setCoursesCopy] = useState([]);
  const inputRef = useRef("");
  //Creamos un useState para la palabra buscada
  const [wordSearch, setWordSearch] = useState("");
  //Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const coursePerPage = 9;
  const navigate = useNavigate();
  const loaderFunction = () => {
    setTimeout(() => {
      setPending(true)
    }, 1500)
    return (<Loader></Loader>)
  };


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
        console.log(data);
        if (response.ok) {
          setCourses(Array(data.data));
          setCoursesCopy(Array(data.data));
        }
      } catch (error) {
        console.log("Error de algo");
        navigate(`/error-page`, { state: error });
      }
    }
  };
  console.log(pending);
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
        //Si la respuesta es buena navegamos a la ruta definida, guardando los datos devueltos por el fetch en el state para usarlos posteriormente con useLocation
        navigate(`/course/${data.title}`, { state: data })
      }
    } catch (error) {
      console.log("Algo ha fallado con el curso");
      navigate(`/error-page`, { state: error });
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
  console.log(courses);
  //Funcion para cuando se hace el submit cal pulsar el boton search
  const handleSearch = (e) => {
    e.preventDefault()
    const filteredCourses = courses[0].filter(course =>
      course.title.toLowerCase().includes(wordSearch.toLowerCase())
    );
    setCourses(Array(filteredCourses))
    console.log(filteredCourses);
  }

  /* Revisar esta parte y poner un loader para usarlo en !pending */
  /* if (!Array.isArray(courses)) {

    <h1>Hola Mundo</h1>


  } */
  if (pending === false) {
    return loaderFunction();
  }

  if (pending === true && courses[0].length !== 0) {
     //Creación de la paginación del contenido de la tabla
     const indexOfLastUser = currentPage * coursePerPage;
     const indexOfFirstUser = indexOfLastUser - coursePerPage;
     const currentCourses = courses[0].slice(indexOfFirstUser, indexOfLastUser);
     const totalPages = Math.ceil(courses[0].length / coursePerPage);
     const paginate = (pageNumber) => {
       console.log("Has dado click");
       console.log(currentCourses);
       setCurrentPage(pageNumber);
     };
    return (
      <div className={classes["coursesPage-root"]}>
        <div className={classes.title}>
          <h1>Courses</h1>
        </div>
        <div className={classes.search}>
          <form onSubmit={handleSearch}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search your course"
              value={wordSearch}
              onChange={e => {
                setWordSearch(e.target.value)
                const filteredCourses = courses[0].filter(course =>
                  course.title.toLowerCase().includes(wordSearch.toLowerCase())
                );
                setCourses(Array(filteredCourses))
                if (e.target.value === "") {
                  setCourses(coursesCopy)
                }
              }}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div className={classes["coursesPage-main"]}>
          {currentCourses.map((course, i) => {
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
        {/* Pagination component */}
        <div className={classes["pagination-main"]}>
            <div className={classes["pagination-container"]}>
              <div className={classes["pagination-info"]}>
                <button onClick={() => paginate(currentPage === 1 ? currentPage : currentPage - 1)}> <span>&#5176;</span> Back </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => paginate(currentPage === totalPages ? currentPage : currentPage + 1)}> Next <span>&#5171;</span></button>
              </div>
            </div>
          </div>
      </div>
    );
  } else if (courses[0].length === 0) {
    console.log("Hasta entrado en courses[0].length === 0")
    return (
      <div className={classes["coursesPage-root"]}>
        <div className={classes.title}>
          <h1>Courses</h1>
        </div>
        <div className={classes.search}>
          <form onSubmit={handleSearch}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search your course"
              value={wordSearch}
              onChange={e => {
                setWordSearch(e.target.value)
                const filteredCourses = courses[0].filter(course =>
                  course.title.toLowerCase().includes(wordSearch.toLowerCase())
                );
                setCourses(Array(filteredCourses))
                if (e.target.value === "") {
                  setCourses(coursesCopy)
                }
              }}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div> <p>No existe ningun curso</p></div>
      </div>
    )
  }

}

export default CoursesPage;
