import classes from "./CoursesPage.module.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import CourseModal from "../../Modal/CourseModal/CourseModal";
import Loader from "../../../components/Loader/Loader";

function CoursesPage() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [visible, setVisible] = useState(false);
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
    return (<Loader pending={pending}></Loader>)
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

        if (response.ok) {
          setCourses(Array(data.data));
          setCoursesCopy(Array(data.data));
        }
      } catch (error) {

        navigate(`/error-page`, { state: error });
      }
    }
  };

  //Con esta función hacemos un fetch (GET) para cuando clickamos sobre un curso concreto
  const getCourse = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/courses/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        let courseTitle = data.data.title;
        let title = courseTitle.toLowerCase().replace(" ", "-");
        console.log(title);

        if (token) {
          navigate(`/user/courses/${title}`, { state: data })
        } else if (!token) {
          // navigate(`/course/${title}`, { state: data })
        }
        //Si la respuesta es buena navegamos a la ruta definida, guardando los datos devueltos por el fetch en el state para usarlos posteriormente con useLocation
      }
    } catch (error) {
      navigate(`/error-page`, { state: error });
    }
  };
  //Usamos useEffect para hacer un fetch de todos los cursos cuando se carga el componente CoursesPage
  useEffect(() => {
    fetchCourses();
  }, []);

  //Esta función nos genera el fetch del elemento concreto que hemos clickado gracias a que recibe su id
  const onHandlerClick = (id) => {
    if (!token) {
      setVisible(!visible);
    } else {
      getCourse(id);
    }

  };

  //Funcion para cuando se hace el submit cal pulsar el boton search
  const handleSearch = (e) => {
    e.preventDefault()
    const filteredCourses = courses[0].filter(course =>
      course.title.toLowerCase().includes(wordSearch.toLowerCase())
    );
    setCourses(Array(filteredCourses))

  }

  //Funcion para hacer un scroll top
  const scrollTop = (e) => {
    window.scrollTo({
      top: 0,
      behavior: `${e}`, // Opcional, para tener una animación suave
    });
  }

  //Función para cuando cerramos el modal
  const handleClose = () => {
    setVisible(!visible);
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

      setCurrentPage(pageNumber);
    };
    return (

      <div>
        {ReactDOM.createPortal(
          <CourseModal visible={visible} /* data={courseData.data} */ onClose={handleClose} /* userId={userId} */ logged={token} /* courseExists={courseRepeat} */ />,
          document.querySelector("#modal")
        )}
        <div className={`${classes["coursesPage-root"]} ${visible && classes["blur"]}`}>
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
                    scrollTop("auto");
                  }}
                  className={classes["coursesPage-container"]}
                  key={i}
                >
                  <div className={classes["coursesPage-info"]}>
                    <h3>{course.title}</h3>
                    <img className={classes["image"]} src={require(`../../../../public/uploads/${course.image}`)} alt={`Foto curso ${course.title || "Sin titulo"}`} width={"150"}></img>
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
                <button onClick={() => {
                  paginate(currentPage === 1 ? currentPage : currentPage - 1)
                  scrollTop("smooth");
                }}> <span>&#5176;</span> Back </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => {
                  paginate(currentPage === totalPages ? currentPage : currentPage + 1)
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
  }

}

export default CoursesPage;
