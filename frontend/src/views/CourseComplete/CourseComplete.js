//import './CourseComplete.css';
import { useLocation, useNavigate } from "react-router-dom";
import { takeID } from "../../components/Utils";

function CourseComplete() {
    const location = useLocation();
    let courseData = location.state;
    const token = localStorage.getItem("token")
    const id = takeID(token)
    const navigate = useNavigate()
    if (!token ) {
        navigate("/")
    }
    //Funcion para cuando clickamos en el boton back
    const onBackClick = () => {
        navigate(-1)
    }
    return (
        <div>
            <section>
                <ul>
                    {}
                </ul>
            </section>
            <div>
                <h1>{courseData.title}</h1>
                <img src={require(`../../../public/uploads/${courseData.image}`)} alt={`Foto curso ${courseData.id}`} width={"200"}></img>
                <button onClick={onBackClick}>Back</button>
            </div>
            <div>
                <button>Info</button>
            </div>

            
        </div>
    );
}

export default CourseComplete;
