import classes from './LearnPlace.module.css';
import { useLocation } from 'react-router-dom';

function LearnPlace(props) {
  const user = props.userData;
  const courses = user.data.user.courses;
  /* console.log(user); */
  /* console.log(typeof(Array(courses))); */
  
  
  return (
    <div>
        <h1>MyLearnplace</h1>
        <div className={classes["main-container"]}>
          <h3>Happy to see you {user.data.user.name}, you have {courses.length} course waiting for you!</h3>

        </div>
    </div>
  );
}

export default LearnPlace;
