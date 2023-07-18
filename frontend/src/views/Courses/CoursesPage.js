import classes from "./CoursesPage.module.css";
import data from "../../mockedDB/data.json";

function CoursesPage() {
  return (
    <div>
      <h1>Courses</h1>
      <div className={classes["grid-parent"]}>
        {data.map((course, i) => {
          return (
            <div className={classes["grid-container"]}>
              <h3>{course.title}</h3>
              <img src={course.image} alt={`Foto curso ${course.id}`}></img>
              <p>{course.info}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CoursesPage;
