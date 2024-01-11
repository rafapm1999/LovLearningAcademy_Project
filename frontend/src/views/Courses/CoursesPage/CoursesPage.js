import classes from "./CoursesPage.module.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import CourseModal from "../../Modal/CourseModal/CourseModal";
import Loader from "../../../components/Loader/Loader";

function CoursesPage() {
  //Obtención del token de autenticidad y guardado mediante useState
  const [token, setToken] = useState(localStorage.getItem("token"));

  // UseState para usarlo con el modal
  const [visible, setVisible] = useState(false);

  //Creamos la constante courses con useState para que parte de un array vacío
  const [courses, setCourses] = useState([]);

  //Creamos una constante pending para usarla como "semaforo" con un loader
  const [pending, setPending] = useState(false);

  // Variables y logica para el bucador
  const [coursesCopy, setCoursesCopy] = useState([]);
  const inputRef = useRef("");
  const [wordSearch, setWordSearch] = useState("");



  //Para navegar entre componentes
  const navigate = useNavigate();

  //Funcion para loader
  const loaderFunction = () => {
    return (<Loader pending={pending}></Loader>)
  };

  //Con esta funcion hacemos un fetch (GET) de todos los cursos de nuestra base de datos
  const fetchCourses = async (skip) => {
    try {
      //`http://localhost:8000/courses/all-courses/${currentPage}`
      const response = await fetch(
        `http://localhost:8000/courses/all-courses`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setCourses(Array(data.data));
        setCoursesCopy(Array(data.data));
        setPending(true);
      }
    } catch (error) {
      navigate(`/error-page`, { state: error });
    }
  };

  //Con esta función hacemos un fetch (GET) para cuando clickamos sobre un curso concreto
  const getCourse = async (slug) => {
    try {
      const response = await fetch(`http://localhost:8000/courses/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        if (token) {
          console.log({id: data.data[0]._id});
          navigate(`/campus/courses/${data.data[0].slug}`, { state: {course: data.data[0], id: data.data[0]._id} })
        }
      }
    } catch (error) {
      console.log("Estas aqui");
      console.log(error);

      navigate(`/error-page`, { state: error });
    }
  };
  //Usamos useEffect para hacer un fetch de todos los cursos cuando se carga el componente CoursesPage
  useEffect(() => {
    fetchCourses(currentPage);
  }, [pending]);

  //Esta función nos genera el fetch del elemento concreto que hemos clickado gracias a que recibe su id
  const onHandlerClick = (slug) => {
    if (!token) {
      setVisible(!visible);
    } else {
      getCourse(slug);
    }
  };

  //Funcion para cuando se hace el submit cal pulsar el boton search
  const handleSearch = (e) => {
    e.preventDefault()
    const filteredCourses = courses[0].filter(course =>
      course.title.toLowerCase().includes(wordSearch.toLowerCase())
    );
    setCourses(Array(filteredCourses))
  };

  //Funcion para hacer un scroll top
  const scrollTop = (e) => {
    window.scrollTo({
      top: 0,
      behavior: `${e}`, // Opcional, para tener una animación suave
    });
  };

  //Función para cuando cerramos el modal
  const handleClose = () => {
    setVisible(!visible);
  };

  //Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const coursePerPage = 9;

  //Renderizado del componente
  if (pending === false) {
    return loaderFunction();
  } else if (pending === true && courses[0].length !== 0) {

    //Calculo para skip = (valorPaginaQueMandas - 1) * Limit -----> skip = (currentPage - 1) * limit = 5
    //Creación de la paginación del contenido de la tabla
    const indexOfLastCourse = currentPage * coursePerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursePerPage;
    const currentCourses = courses[0].slice(indexOfFirstCourse, indexOfLastCourse);
    const totalPages = Math.ceil(courses[0].length / coursePerPage);
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    return (
      <div>
        {/* Modal */}
        {ReactDOM.createPortal(
          <CourseModal visible={visible} onClose={handleClose} logged={token} />,
          document.querySelector("#modal")
        )}

        {/* Component */}
        <div className={`${classes["coursesPage-root"]} ${visible && classes["blur"]}`}>
          <div className={classes.title}>
            <h1>Courses</h1>
          </div>
          <div className={classes.search}>
            <form onSubmit={handleSearch}>
              <input
                ref={inputRef}
                type="text"
                name="search"
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
                    onHandlerClick(course.slug);
                    scrollTop("auto");
                  }}
                  className={`${classes["coursesPage-container"]} ${classes[`${course.level.toLowerCase()}`]}`}
                  key={i}
                >
                  <div className={classes["coursesPage-info"]}>
                    <h3>{course.title}</h3>
                    <img className={classes["image"]} src={require(`../../../../public/uploads/${course.image}`)} alt={`Foto curso ${course.title || "Sin titulo"}`} width={"150"}></img>
                    <p>{course.shortDescription}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination component */}
          <div className={classes["pagination-main"]}>
            <div className={classes["pagination-container"]}>
              <div className={classes["pagination-info"]}>
                <button onClick={() => {
                  paginate(currentPage === 1 ? currentPage : currentPage - 1)
                  if (currentPage !== 1 ) {
                    fetchCourses(currentPage)
                  }
                  console.log(currentPage);
                  scrollTop("smooth");
                }}> <span>&#5176;</span> Back </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => {
                  paginate(currentPage === totalPages ? currentPage : currentPage + 1)
                  if (currentPage !== totalPages ) {
                    fetchCourses(currentPage)
                  }
                  scrollTop("smooth");
                }}> Next <span>&#5171;</span></button>
              </div>
            </div>
          </div>
        </div>
        <div className={`${visible && classes["modal-main"]}`}></div>
      </div>
    );
  } else if (courses[0].length === 0) {

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
  };

};

export default CoursesPage;
