import classes from "./LearnPlace.module.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { takeID } from "../../components/Utils";

function LearnPlace() {
  const location = useLocation();
  const data = location.state;
  const token = localStorage.getItem("token")
  const id = takeID(token)
  console.log(data);

  const [user, setUser] = useState({})
  const [courses, setCourses] = useState([])
  const [refreshCourses, setRefreshCourses] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const coursePerPage = 3;

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
        console.log('cONSIGUES LLEGAR A RESPONSE.OK');

        setCourses(data.data.courses);
        setUser(data.data)

      }
    } catch (error) {
      console.log('fALLO');

    }
  }

  useEffect(() => {
    getUser(id)
  }, [])


  //Creacion de una funcion fetch para actualizar los cursos
  const fetchCoursesChanges = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/courses/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log('Hacemos logs de fetchcourseschanges');
        return setRefreshCourses(...data.data);
      }

    } catch (error) {

    }
  }

  //Creacion de una funcion fetch para envias los datos editados de los cursos a la bbdd del usuario especifico
  /* const patchTheCourse = async () => {
    console.log(refreshCourses);
    console.log(courses.length);
    console.log(refreshCourses.length);
 */
  /*  courses = refreshCourses; */
  /*  try {
     const patchResponse = await fetch(`http://localhost:8000/auth/${user._id}`, {
       method: "PATCH",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         courses: courses,
       }),
     });

     const data = await patchResponse.json();

     if (patchResponse.ok) {
       console.log("Has entrado en patchResponse");
     };
   } catch (error) {

   }

 } */
  /*   const refreshUserCourses = () => {
      const promises = user.courses.map((course) => {
        console.log('SIGUES EN PROMISES');
        console.log(refreshCourses);
        // Hace un fetch para obtener el curso actualizado que el usuario ya tiene
        fetchCoursesChanges(course._id);
        courses = [refreshCourses]
      }); */

  // Utiliza Promise.all para esperar a que todas las promesas se completen
  /*     Promise.all(promises)
        .then(() => {
          console.log('HAS PASADO A .ALL');
          console.log(refreshCourses);
          console.log(courses);
  
          // Todas las promesas se han completado
          patchTheCourse();
        })
        .catch((error) => {
          // Maneja los errores si alguna de las promesas falla
          console.error('Error:', error);
        });
    }; */

  //Funcion para modificar los datos de los cursos del ususario
  /* const refreshUserCourses = () => {

    user.courses.map((course) => {
      Hace un fetch para obtener el curso actualizado que el usuario ya tiene 
      fetchCoursesChanges(course._id)
    }
    )
    patchTheCourse();
  } */



  /*   if () {
      return refreshUserCourses();
    }
   */



  const onHandlerClick = () => { };
 
    console.log(courses);
    console.log(user);

    //Paginación
    //Creación de la paginación del contenido de la tabla
    const indexOfLastUser = currentPage * coursePerPage;
    const indexOfFirstUser = indexOfLastUser - coursePerPage;
    const currentCourses = courses.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(courses.length / coursePerPage);
    const paginate = (pageNumber) => {
      console.log("Has dado click");
      console.log(currentCourses);
      setCurrentPage(pageNumber);
    };

    if (courses.length === 0) {
      console.log('hAS ENTRADO');
      
      return (
        <div className={classes["main-container"]}>
          <h1 className={classes.title}>MyLearnplace</h1>
          <div className={classes["user-info-container"]}>

            <div className={classes["details-info-title"]}>
              <p>Hello {user.name}, you don't have any course in your MyLearnplace!</p>
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
    } else {
      console.log('hAS ENTRADO A ELSE');
      return (
        <div className={classes["main-container"]}>
          <h1 className={classes.title}>MyLearnplace</h1>
          <div className={classes["user-info-container"]}>
            <p className={classes["user-info"]}>Happy to see you {user.name}, you have {courses.length} {""}
              courses waiting for you!</p>
          </div>
          <div className={classes["coursesLearnPage-main"]}>
            {currentCourses.map((course, i) => {
              return (
                <div
                  onClick={() => {
                    onHandlerClick(course._id);
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
    }

}

export default LearnPlace;
