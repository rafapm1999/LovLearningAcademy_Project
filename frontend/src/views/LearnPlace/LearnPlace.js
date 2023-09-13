import classes from "./LearnPlace.module.css";
import { useLocation } from "react-router-dom";

function LearnPlace(props) {
  let user = props.userData;
  console.log(user);
  let courses = user.courses;
   console.log(user); 
   console.log(courses); 
  const onHandlerClick = () => {};

  return (
    <div>
      <h1>MyLearnplace</h1>
      <div className={classes["main-container"]}>
        <h3>
          Happy to see you {user.name}, you have {courses.length}
          course waiting for you!
        </h3>
      </div>
      <div className={classes["coursesPage-main"]}>
        <h3>My courses</h3>
        {courses.map((course, i) => {
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

export default LearnPlace;
