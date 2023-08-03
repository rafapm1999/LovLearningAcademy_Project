import classes from "./CoursesPage.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import CourseInfoPage from "./CourseInfoPage";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({});
  const [pending, setPending] = useState(false);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

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
        const response = await fetch(`http://localhost:8000/courses/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          console.log(data);
          setCourse(data);
          setClick(true);
          navigate(`/course/${data.data.title}`, {state: data})
        }
      } catch (error) {
        console.log("Algo ha fallado con el curso");
      }
    
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const onHandlerClick = (id) => {
    console.log(`Log del curso ${id}`);
    getCourse(id);    
  };

  if (!Array.isArray(courses)) {
    return (
      <div>
        <h1>Cargando...</h1>
      </div>
    );
  }
  if (!pending) {
    return <h1></h1>;
  }
  return (
    <div className={classes["coursesPage-root"]}>
      <div className={classes.title}>
        <h1>Courses</h1>
      </div>
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
