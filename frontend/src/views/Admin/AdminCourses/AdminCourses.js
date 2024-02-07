import classes from './AdminCourses.module.css';
import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
//Importamos FontAwesomeIcon para usarlo en INFO, EDIT y REMOVE
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye, faPenToSquare, faTrashCan
} from "@fortawesome/free-regular-svg-icons";
import AdminCourseModal from '../../Modal/AdminCourseModal/AdminCourseModal';

function AdminCourses() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [adminRole, setAdminRole] = useState(false)
  const [courses, setCourses] = useState([])
  const [coursesCopy, setCoursesCopy] = useState([]);
  const [courseID, setCourseID] = useState("")
  const [courseData, setCourseData] = useState("")
  const [clickAction, setClickAction] = useState("")
  const [pending, setPending] = useState(true);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  //Creamos un useState para la palabra buscada
  const [wordSearch, setWordSearch] = useState("");
  const inputRef = useRef("");
  //Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const coursePerPage = 6;

  const loaderFunction = () => {
    return (<Loader></Loader>)
  };



  const fetchCourses = async (e) => {
    if (pending === true || e === "RESET") {
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
          setCoursesCopy(Array(data.data))
          setPending(false)
        }
      } catch (error) {
        navigate(`/error-page`, { state: error });
      }
    };

  };

  const fetchTheCourse = async (slug) => {
    try {
      const response = await fetch(`http://localhost:8000/courses/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCourseData(data.data)
        setTimeout(() => {
          setVisible(!visible)
        }, 100)
      } else {

      }
    } catch(error) {

    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  //Función para cuando hacemos click
  const onHandlerClick = (courseId, clickType) => {
    setCourseID(courseId);
    setClickAction(clickType);
  };
  //Función para cuando cerramos el modal
  const handleClose = () => {
    setVisible(false);
  }
  //Funcion para cuando se hace el submit cal pulsar el boton search
  const handleSearch = (e) => {
    e.preventDefault()
    const filteredCourses = courses[0].filter(course =>
      course.title.toLowerCase().includes(wordSearch.toLowerCase())
    );
    setCourses(Array(filteredCourses))
  }
  //Funcion para cambiar el estado de pending
  const handlerPending = () => {
    setTimeout(() => {
      fetchCourses("RESET");
    },);
    setPending(true)
    handleClose();
  };

  //Funcion para crear nuevo curso 
  const createCourse = () => {
    navigate("/admin/create-course")
  }

  if (pending === true) {
    return loaderFunction();
  }

  if (pending === false && courses[0].length !== 0) {
    //Creación de la paginación del contenido de la tabla
    const indexOfLastUser = currentPage * coursePerPage;
    const indexOfFirstUser = indexOfLastUser - coursePerPage;
    const currentCourses = courses[0].slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(courses[0].length / coursePerPage);
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    return (
      <>
        {/* Modal */}
        {ReactDOM.createPortal(
          <AdminCourseModal courseId={courseID} courseData={courseData[0]} clickType={clickAction} visible={visible} onClose={handleClose} onPending={handlerPending} />,
          document.querySelector("#modal")
        )}
        {/* Component */}
        <div className={`${classes["coursesPage-root"]} ${visible && classes["blur"]}`}>
          <div className={classes.title}>
            <h1>Courses</h1>
          </div>
          <div className={classes["data-message"]}>
            <p>The total number of courses in LovLearning Academy is {courses[0].length}</p>
          </div>
          <div className={classes["create-button-container"]}>
            <button className={classes["create-button"]} onClick={createCourse}>Create new course<span></span></button>
          </div>
          <div className={classes["table-container"]}>
            <table className={classes["coursesPage-main-table"]}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>ID</th>
                  <th>Info</th>
                  <th>Edit</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {currentCourses.map((course, i) => {
                  return (
                    <tr className={classes["coursesPage-info"]} key={i}>
                      <td>{course.title}</td>
                      <td>{course._id}</td>
                      <td onClick={() => {
                        fetchTheCourse(course.slug)
                        setTimeout(() => {
                          onHandlerClick(course._id, "INFO")
                        }, 50)
                      }} className={classes["info-button"]}><FontAwesomeIcon onClick={() => {
                        fetchTheCourse(course.slug)
                        setTimeout(() => {
                          onHandlerClick(course._id, "INFO")
                        }, 50)
                      }} icon={faEye} size='xl' /></td>
                      <td onClick={() => {
                        fetchTheCourse(course.slug)
                        setTimeout(() => {
                          onHandlerClick(course._id, "EDIT")
                        }, 50)
                      }} className={classes["edit-button"]}><FontAwesomeIcon onClick={() => {
                        fetchTheCourse(course.slug)
                        setTimeout(() => {
                          onHandlerClick(course._id, "EDIT")
                        }, 50)
                      }} icon={faPenToSquare} size='xl' /></td>
                      <td onClick={() => {
                        fetchTheCourse(course.slug)
                        setTimeout(() => {
                          onHandlerClick(course._id, "REMOVE")
                        }, 50)
                      }} className={classes["remove-button"]}><FontAwesomeIcon onClick={() => {
                        fetchTheCourse(course.slug)
                        setTimeout(() => {
                          onHandlerClick(course._id, "REMOVE")
                        }, 50)
                      }} icon={faTrashCan} size='xl' /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <table className={classes["coursesPage-main-table-mobile"]}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Info</th>
                  <th>Edit</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {currentCourses.map((course, i) => {
                  return (
                    <tr className={classes["coursesPage-info"]} key={i}>
                      <td>{course.title}</td>
                      <td onClick={() => {
                        fetchTheCourse(course.slug)
                        setTimeout(() => {
                          onHandlerClick(course._id, "INFO")
                        }, 50)
                      }} className={classes["info-button"]}><FontAwesomeIcon onClick={() => {
                        fetchTheCourse(course.slug)
                        setTimeout(() => {
                          onHandlerClick(course._id, "INFO")
                        }, 50)
                      }} icon={faEye} size='xl' /></td>
                      <td onClick={() => {
                        fetchTheCourse(course.slug)
                        setTimeout(() => {
                          onHandlerClick(course._id, "EDIT")
                        }, 50)
                      }} className={classes["edit-button"]}><FontAwesomeIcon onClick={() => {
                        fetchTheCourse(course.slug)
                        setTimeout(() => {
                          onHandlerClick(course._id, "EDIT")
                        }, 50)
                      }} icon={faPenToSquare} size='xl' /></td>
                      <td onClick={() => {
                        fetchTheCourse(course.slug)
                        setTimeout(() => {
                          onHandlerClick(course._id, "REMOVE")
                        }, 50)
                      }} className={classes["remove-button"]}><FontAwesomeIcon onClick={() => {
                        fetchTheCourse(course.slug)
                        setTimeout(() => {
                          onHandlerClick(course._id, "REMOVE")
                        }, 50)
                      }} icon={faTrashCan} size='xl' /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
            <div className={`${visible && classes["modal-main"]}`}></div>
          </div>
        </div>
      </>
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
        <div className={classes["create-button-container"]}>
          <button className={classes["create-button"]} onClick={createCourse}>Create new course<span></span></button>
        </div>
        <div> <p>No existe ningun curso</p></div>
      </div>
    )
  }
}

export default AdminCourses;
