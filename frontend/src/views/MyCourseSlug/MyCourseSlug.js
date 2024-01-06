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
            <img src={require(`../../../public/uploads/${courseData.image}`)} alt={`Foto curso ${courseData.id}`} width={"200"}></img>
            
        </div>
    );
}

export default MyCourseSlug;
