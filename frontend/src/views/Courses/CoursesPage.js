import classes from "./CoursesPage.module.css";
import { useEffect, useState } from "react";
/* import data from "../../mockedDB/data.json"; */
/* import { useNavigate } from "react-router-dom"; */

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [pending, setPending] = useState(false);

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
          console.log(data);
          setCourses(Array(data));
          setPending(true);
        }
      } catch (error) {
        console.log("Error de algo");
      }
    }
  };

  const getCourse = async (id) => {
    console.log(id);
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
      console.log(data.data);
      if (response.ok) {
      console.log(data);
      }
    } catch (error) {
      console.log("Algo ha fallado");
    }
    
  };









  useEffect(() => {
    fetchCourses();
  }, []);

  const onHandlerClick = (id) => {
    console.log(`Log del curso ${id}`);
    getCourse(id);
  };

  /*   console.log(courses); */
  if (!Array.isArray(courses)) {
    return (
      <div>
        <h1>Cargando...</h1>
      </div>
    );
  }
  if (!pending) {
    return <h1>Somenthing went wrong</h1>;
  }
  return (
    <div className={classes["coursesPage-root"]}>
      <h1>Courses</h1>
      <div className={classes["coursesPage-main"]}>
        {courses[0].data.map((course, i) => {
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
}

export default CoursesPage;
