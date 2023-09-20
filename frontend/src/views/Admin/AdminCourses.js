import classes from './AdminCourses.module.css';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

function AdminCourses() {
  const [courses, setCourses] = useState([])
  const [coursesCopy, setCoursesCopy] = useState([]);
  const [pending, setPending] = useState(false);
  //Creamos un useState para la palabra buscada
  const [wordSearch, setWordSearch] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef("");
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


  const onHandlerClick = () => { };

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
        <div className={classes["coursesPage-main"]}>
          {courses[0].map((course, i) => {
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
