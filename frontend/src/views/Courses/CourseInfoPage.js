import "./CourseInfoPage.module.css";
import { useLocation } from "react-router-dom";

function CourseInfoPage() {
  const location = useLocation();
  const courseData = location.state;
  console.log(courseData.data.title);
  return (
    <div>
      <div>
        <h1>{courseData.data.title}</h1>
      </div>
      <div>
        <img src={courseData.data.image} alt="" />
      </div>
      <div>
        <p>{courseData.data.info}</p>
      </div>
    </div>
  );
}

export default CourseInfoPage;
