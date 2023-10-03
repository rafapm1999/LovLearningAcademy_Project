import classes from "./LearnPlace.module.css";
/* import { useLocation } from "react-router-dom"; */

function LearnPlace(props) {
  let user = props.userData;
  console.log(user);
  let courses = user.courses;
  console.log(user);
  console.log(courses);
  const onHandlerClick = () => { };
  return (
    <div className={classes["main-container"]}>
      <h1 className={classes.title}>MyLearnplace</h1>
      <div className={classes["user-info-container"]}>
        <p className={classes["user-info"]}>Happy to see you {user.name}, you have {courses.length} {""}
          courses waiting for you!</p>
      </div>
      <div className={classes["coursesLearnPage-main"]}>
        {courses.map((course, i) => {
          return (
            <div
              onClick={() => {
                onHandlerClick(course._id);
              }}
              className={classes["coursesLearnPage-container"]}
              key={course.id}
            >
              <div className={classes["coursesLearnPage-info"]}>
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
