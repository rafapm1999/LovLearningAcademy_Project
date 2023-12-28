import classes from "./LearnPlace.module.css";
import Loader from "../../components/Loader/Loader";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { takeID } from "../../components/Utils";

function LearnPlace() {
  const location = useLocation();
  const data = location.state;
  const token = localStorage.getItem("token")
  const id = takeID(token)
  const [user, setUser] = useState({})
  const [courses, setCourses] = useState([])
  const [pending, setPending] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coursePerPage = 3;
  const loaderFunction = () => {
    setTimeout(() => {
      setPending(true)
    }, 1500)
    return (<Loader pending={pending}></Loader>)
  };
  let takeCourse = [];

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
        console.log(data);
        setUser(data.data);
        getUserCourses(data.data);
      } else {
        console.log("ko");
      }
    } catch (error) {
      console.log(error);
    }
  }
  const getCourse = async (slug) => {
    try {
      const response = await fetch(`http://localhost:8000/courses/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      let newCourse = data.data[0];
      takeCourse = [data.data[0]];
      if (response.ok) {
        console.log(takeCourse);
        setCourses(prevCourses => [...prevCourses, data.data[0]]);

      }
    } catch (error) {
      console.log("Estas aqui");
      console.log(error);

    }
  };
  const getUserCourses = (userData) => {
    console.log(userData);
    userData.courses.forEach((course) => {
      console.log(course);
      return (getCourse(course))
    })
  }

  useEffect(() => {
    getUser(id)
  }, [])

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
  if (pending === false) {
    return loaderFunction();
  }
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
   /*  return (
      






      // <div className={classes["main-container"]}>
      //   <h1 className={classes.title}>MyLearnplace</h1>
      //   <div className={classes["user-info-container"]}>
      //     <p className={classes["user-info"]}>Happy to see you {user.name}, you have {courses.length} {""}
      //       courses waiting for you!</p>
      //   </div>
      //   <div className={classes["coursesLearnPage-main"]}>
      //     {currentCourses.map((course, i) => {
      //       return (
      //         <div
      //           onClick={() => {
      //             onHandlerClick(course._id);
      //           }}
      //           className={classes["coursesLearnPage-container"]}
      //           key={i}
      //         >
      //           <div className={classes["coursesLearnPage-info"]}>
      //             <h3>{course.title}</h3>
      //             <img src={require(`../../../public/uploads/${course.image}`)} alt={`Foto curso ${course.id}`} width={"150"}></img>
      //             <p>{course.shortDescription}</p>
      //           </div>
      //         </div>
      //       );
      //     })}
      //   </div>
      //   {/* Pagination component 
      //   <div className={classes["pagination-main"]}>
      //     <div className={classes["pagination-container"]}>
      //       <div className={classes["pagination-info"]}>
      //         <button onClick={() => paginate(currentPage === 1 ? currentPage : currentPage - 1)}> <span>&#5176;</span> Back </button>
      //         <span>Page {currentPage} of {totalPages}</span>
      //         <button onClick={() => paginate(currentPage === totalPages ? currentPage : currentPage + 1)}> Next <span>&#5171;</span></button>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    ); */
  }

}

export default LearnPlace;
