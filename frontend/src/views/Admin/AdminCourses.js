import classes from './AdminCourses.module.css';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
//Importamos FontAwesomeIcon para usarlo en el footer
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye, faPenToSquare, faTrashCan
} from "@fortawesome/free-regular-svg-icons";


function AdminCourses() {
  const [courses, setCourses] = useState([])
  const [coursesCopy, setCoursesCopy] = useState([]);
  const [pending, setPending] = useState(false);
  //Creamos un useState para la palabra buscada
  const [wordSearch, setWordSearch] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursePerPage = 6;

  console.log("Has entrado en admincourses");
  const loaderFunction = () => {
    setTimeout(() => {
      setPending(true)
    }, 1500)
    return (<Loader></Loader>)
  };

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
          setCoursesCopy(Array(data.data))
        }
      } catch (error) {
        console.log("Error de algo");
        navigate(`/error-page`, { state: error });
      }
    };
    console.log(courses);
  };

  useEffect(() => {
    fetchCourses();
  }, []);


  const onHandlerClick = (courseID, clickType) => {
    console.log(courseID);
    console.log(clickType);

  };

  //Funcion para cuando se hace el submit cal pulsar el boton search
  const handleSearch = (e) => {
    e.preventDefault()
    const filteredCourses = courses[0].filter(course =>
      course.title.toLowerCase().includes(wordSearch.toLowerCase())
    );
    setCourses(Array(filteredCourses))
    console.log(filteredCourses);
  }

  if (pending === false) {
    console.log("pending === false");
    return loaderFunction();
  }

  if (pending === true && courses[0].length !== 0) {
    console.log(wordSearch);
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
              placeholder="Search the course..."
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
        <div className={classes["data-message"]}>
          <p>The total number of courses in LovLearning Academy is {courses[0].length}</p>
        </div>

        <div className={classes["table-container"]}>
          <table className={classes["coursesPage-main-table"]}>
            <tr>
              <th>Order</th>
              <th>Title</th>
              <th>ID</th>
              <th>Info</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
            <tbody>
              {currentCourses.map((course, i) => {
                return (
                  <tr className={classes["coursesPage-info"]} key={i}>
                    <td>{course.id}</td>
                    <td>{course.title}</td>
                    <td>{course._id}</td>
                    <td onClick={() => { onHandlerClick(course._id, "INFO") }} className={classes["info-button"]}><FontAwesomeIcon onClick={() => { onHandlerClick(course._id, "INFO") }} icon={faEye} size='xl' /></td>
                    <td onClick={() => { onHandlerClick(course._id, "EDIT") }} className={classes["edit-button"]}><FontAwesomeIcon onClick={() => { onHandlerClick(course._id, "EDIT") }} icon={faPenToSquare} size='xl' /></td>
                    <td onClick={() => { onHandlerClick(course._id, "REMOVE") }} className={classes["remove-button"]}><FontAwesomeIcon onClick={() => { onHandlerClick(course._id, "REMOVE") }} icon={faTrashCan} size='xl' /></td>
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

export default AdminCourses;
