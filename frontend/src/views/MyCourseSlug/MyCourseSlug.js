//import './MyCourseSlug.css';
import { useLocation, useNavigate } from "react-router-dom";
import { takeID } from "../../components/Utils";

function MyCourseSlug() {
    const location = useLocation();
    let courseData = location.state;
    const token = localStorage.getItem("token")
    const id = takeID(token)
    const navigate = useNavigate()
    if (!token ) {
        navigate("/")
    }
    return (
        <div>
            <h1>{courseData.title}</h1>
            
        </div>
    );
}

export default MyCourseSlug;
