import classes from "./CoursesPage.module.css";
import { useEffect, useState } from "react";
/* import data from "../../mockedDB/data.json"; */
/* import { useNavigate } from "react-router-dom"; */

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:8000/courses/all-courses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCourses(data.value)
      }
    } catch (error) {
      console.log('Error de algo'); 
    }
  };
  const onHandlerClick = (id) => {
    console.log(`Log del curso ${id}`);
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <div className={classes["coursesPage-root"]}>
      <h1>Courses</h1>
      <div className={classes["coursesPage-main"]}>
        {courses.map((course, i) => {
          return (
            <div
              onClick={() => {
                onHandlerClick(course.id);
              }}
              className={classes["coursesPage-container"]}
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
