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

function AdminCourses(props) {
  const [token, setToken] = useState(localStorage.getItem("token").replaceAll('"', ""))
  const [adminRole, setAdminRole] = useState(false)
  const [courses, setCourses] = useState([])
  const [coursesCopy, setCoursesCopy] = useState([]);
  const [courseID, setCourseID] = useState("")
  const [courseData, setCourseData] = useState([])
  const [clickAction, setClickAction] = useState("")
  const [pending, setPending] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  //Creamos un useState para la palabra buscada
  const [wordSearch, setWordSearch] = useState("");
  const inputRef = useRef("");
  //Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const coursePerPage = 6;

  const loaderFunction = () => {
    setTimeout(() => {
      setPending(true)
      setAdminRole(!adminRole)
    }, 1500)
    return (<Loader adminRole={adminRole}></Loader>)
  };



  const fetchCourses = async (e) => {
    if (pending === false || e === "RESET") {
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
          setCoursesCopy(Array(data.data))
          setPending(false)
        }
      } catch (error) {
        console.log(error);
        navigate(`/error-page`, { state: error });
      }
    };

  };

  const fetchTheCourse = async (id) => {

    try {
      const response = await fetch(`http://localhost:8000/courses/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCourseData(data.data)
        console.log("Has entrado fetchTheCourse en response.ok");
        console.log(data.data);
      } else {
        console.log("Has entrado fetchTheCourse en !response.ok");
      }
    } catch {

    }
  };

  useEffect(() => {
    fetchCourses();

    //Reunion del 16/11
    /* if (pending === false) {
      console.log('HAS ENTRADO EN EL TRY');

      try {
        const response = fetch(
          "http://localhost:8000/courses/all-courses",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.json();
        console.log(data);
        if (response.ok) {
          setCourses(Array(data.data));
          setCoursesCopy(Array(data.data))
          setPending(false)
        }
      } catch (error) {
        console.log("Error de algo");
        //navigate(`/error-page`, { state: error });
      }
    }; */
  }, []);

  //Función para cuando hacemos click
  const onHandlerClick = (courseId, clickType) => {
    setCourseID(courseId);
    setClickAction(clickType);
    /* fetchTheCourse(courseId); */
    setTimeout(() => {
      setVisible(!visible)
    },)
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
    console.log('Has entrado en handlerPending');

    setTimeout(() => {
      fetchCourses("RESET");
    },);
    setTimeout(() => {
      handleClose();
    }, 100);
  };
  //Funcion para crear nuevo curso 
  const createCourse = () => {
    navigate("/admin/create-course")
  }

  //Cuando se ha editado algun curso
  const handlerChange = () => {
    return props.makeChanges(true)
  }

  if (pending === false) {
    console.log("pending === false");
    return loaderFunction();
  }

  if (pending === true && courses[0].length !== 0) {
    //Creación de la paginación del contenido de la tabla
    const indexOfLastUser = currentPage * coursePerPage;
    const indexOfFirstUser = indexOfLastUser - coursePerPage;
    const currentCourses = courses[0].slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(courses[0].length / coursePerPage);
    const paginate = (pageNumber) => {
      /*  console.log("Has dado click");
       console.log(currentCourses); */
      setCurrentPage(pageNumber);
    };
    /* console.log('userdata');
    console.log(props.userData);
    console.log(courses);
    console.log(props.openProfile); */
    return (
      <>
        {ReactDOM.createPortal(
          <AdminCourseModal courseId={courseID} courseData={courseData} clickType={clickAction} visible={visible} onClose={handleClose} onPending={handlerPending} onChange={handlerChange} />,
          document.querySelector("#modal")
        )}
        <div className={`${classes["coursesPage-root"]} ${visible && classes["blur"]} ${props.openProfile && classes["blur"]}`}>
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
                        fetchTheCourse(course._id)
                        setTimeout(() => {
                          onHandlerClick(course._id, "INFO")
                        }, 50)
                      }} className={classes["info-button"]}><FontAwesomeIcon onClick={() => {
                        fetchTheCourse(course._id)
                        setTimeout(() => {
                          onHandlerClick(course._id, "INFO")
                        }, 50)
                      }} icon={faEye} size='xl' /></td>
                      <td onClick={() => {
                        fetchTheCourse(course._id)
                        setTimeout(() => {
                          onHandlerClick(course._id, "EDIT")
                        }, 50)
                      }} className={classes["edit-button"]}><FontAwesomeIcon onClick={() => {
                        fetchTheCourse(course._id)
                        setTimeout(() => {
                          onHandlerClick(course._id, "EDIT")
                        }, 50)
                      }} icon={faPenToSquare} size='xl' /></td>
                      <td onClick={() => {
                        fetchTheCourse(course._id)
                        setTimeout(() => {
                          onHandlerClick(course._id, "REMOVE")
                        }, 50)
                      }} className={classes["remove-button"]}><FontAwesomeIcon onClick={() => {
                        fetchTheCourse(course._id)
                        setTimeout(() => {
                          onHandlerClick(course._id, "REMOVE")
                        }, 50)
                      }} icon={faTrashCan} size='xl' /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
          <div className={`${visible && classes["modal-main"]} ${props.openProfile && classes["modal-main"]}`}></div>
        </div>
      </>
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
        <div className={classes["create-button-container"]}>
          <button className={classes["create-button"]} onClick={createCourse}>Create new course<span></span></button>
        </div>
        <div> <p>No existe ningun curso</p></div>
      </div>
    )
  }
}

export default AdminCourses;
