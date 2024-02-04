import classes from "./MyCourses.module.css";
import Loader from "../../components/Loader/Loader";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { takeID } from "../../components/Utils";

function MyCourses() {
  //Obtención del token de autenticidad y guardado mediante useState
  const [token, setToken] = useState(localStorage.getItem("token"));
  let id = "";
  //Sacamos el id del token recibido mediente localStorage
  if (token) {
    id = takeID(token)
  }
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [courses, setCourses] = useState([])
  const [coursesSlug, setCoursesSlug] = useState([]);
  const [pending, setPending] = useState(true);
  let takeCourse = [];

  //Variables para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const coursePerPage = 6;

  const loaderFunction = () => {
    if (coursesSlug.length === courses.length) {
      console.log(coursesSlug.length);
      console.log(courses.length);
      console.log(courses);
      setTimeout(() => {
        setPending(false)
      })
    }
    return (<Loader></Loader>)
  };

  const getUserCourse = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:8000/courses/mycourses/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      takeCourse = [data.data];
      if (response.ok) {
        console.log("GETCOURSE");
        console.log(pending);
        setCourses(prevCourses => [...prevCourses, data.data]);
      }
    } catch (error) {
      console.log("Estas aqui");
      console.log(error);
    }
  };

  const getUserCourses = (userCourses) => {
    let cont = 0;
    userCourses.forEach((id) => {
      getUserCourse(id)
      cont++
    })
    if (cont === userCourses.length) {
      setPending(false)
    }

  }

  const getUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/auth/getuser/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUser(data.data);
        setCoursesSlug(data.data.courses)
        getUserCourses(data.data.courses)
      } else {
        console.log("ko");
      }
    } catch (error) {
      console.log(error);
    }
  }



  const onHandlerClick = (course) => {
    let slug = course.slug;
    navigate(`/campus/mycourses/${slug}`, { state: course })
  };

  //Funcion para hacer un scroll top
  const scrollTop = (e) => {
    window.scrollTo({
      top: 0,
      behavior: `${e}`,
    });
  }

  scrollTop("smooth")

  useEffect(() => {
    getUser(id)
  }, [])

  //Paginación
  //Creación de la paginación del contenido de la tabla
  const indexOfLastUser = currentPage * coursePerPage;
  const indexOfFirstUser = indexOfLastUser - coursePerPage;

  // Función de comparación para ordenar primero los cursos con visible: true
  const compareCourses = (a, b) => {
    if (a.visible === b.visible) {
      return 0; // Mantener el orden actual si ambos tienen el mismo valor de visible
    }
    return a.visible ? -1 : 1; // Poner primero los cursos con visible: true
  };

  const currentCourses = courses
  .sort(compareCourses) // Aplicar la función de comparación
  .slice(indexOfFirstUser, indexOfLastUser);
 /*  const currentCourses = courses.slice(indexOfFirstUser, indexOfLastUser).sort((a) => {
    if (a.visible === true) {
      console.log(a.visible);
      return 1
    }
  }); */
  const totalPages = Math.ceil(courses.length / coursePerPage);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (pending === true) {
    return loaderFunction();
  } else if (pending === false && courses.length === 0) {

    return (
      /* Component */
      <div className={classes["main-container"]}>
        <h1 className={classes.title}>My courses</h1>
        <div className={classes["user-info-container"]}>

          <div className={classes["details-info-title"]}>
            <p>Hello {user.name}, you don't have any course yet!</p>
            <p>If you want to start to learn with the best courses you'll imagine...</p>
            <p>Follow the next steps!</p>
          </div>
        </div>
        <div className={classes["details-info-container"]} >
          <div className={classes["steps"]}>
            <ul>
              <li className={classes["list-items"]}>Click in <span>Courses</span></li>
              <li className={classes["list-items"]}><span></span>Choose the course you like the most and click it<span></span></li>
              <li className={classes["list-items"]}>Press the <span>I want it!</span> button</li>
              <li className={classes["list-items"]}>And start to learn it!</li>
            </ul>
          </div>
        </div>
      </div>
    )
  } else if (pending === false && courses.length !== 0) {
    console.log(courses);
    return (

      /* Component */
      <div className={classes["main-container"]}>
        <h1 className={classes.title}>My courses</h1>
        <div className={classes["user-info-container"]}>
          <p className={classes["user-info"]}>Happy to see you {user.name}, you have {courses.length} {""}
            courses!</p>
        </div>
        <div className={classes["coursesLearnPage-main"]}>
          {currentCourses.map((course, i) => {
            if (course.visible === true) {
              return (
                <div
                  onClick={() => {
                    onHandlerClick(course);
                  }}
                  className={classes["coursesLearnPage-container"]}
                  key={i}
                >
                  <div className={classes["coursesLearnPage-info"]}>
                    <h3>{course.title}</h3>
                    <img src={require(`../../../public/uploads/${course.image}`)} alt={`Foto curso ${course.id}`} width={"150"}></img>
                    <p>{course.shortDescription}</p>
                  </div>
                </div>
              );
            } else if (course.visible === false) {
              return (
                <div
                  onClick={() => {
                    alert("Our administrators are currently editing and improving the course content. Sorry for the disturbances")
                  }}
                  className={`${classes["coursesLearnPage-container"]} ${classes["maintenace-bg"]}`}
                  key={i}
                >
                  <div className={classes["coursesLearnPage-info"]}>
                    <h3>{course.title}</h3>
                    <h3 className={classes.maintenance}>This course is currently under maintenance</h3>
                    <img src={require(`../../../public/uploads/${course.image}`)} alt={`Foto curso ${course.id}`} width={"150"}></img>
                    <p>{course.shortDescription}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>

        {/*         Pagination component  */}
        <div className={classes["pagination-main"]}>
          <div className={classes["pagination-container"]}>
            <div className={classes["pagination-info"]}>
              <button onClick={() => {
                scrollTop("smooth");
                paginate(currentPage === 1 ? currentPage : currentPage - 1)
              }}> <span>&#5176;</span> Back </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={() => {
                scrollTop("smooth");
                paginate(currentPage === totalPages ? currentPage : currentPage + 1)
              }}> Next <span>&#5171;</span></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyCourses;
