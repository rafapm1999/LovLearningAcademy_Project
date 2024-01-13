import classes from './CourseComplete.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import { takeID } from "../../components/Utils";
import { useEffect } from 'react';

function CourseComplete() {
    const location = useLocation();
    let courseData = location.state;
    const token = localStorage.getItem("token")
    const id = takeID(token)
    const navigate = useNavigate()
    if (!token) {
        navigate("/")
    }
    //Funcion para cuando clickamos en el boton back
    const onBackClick = () => {
        navigate(-1)
    }

    //Funcion para hacer un scroll top
    const scrollTop = (e) => {
        window.scrollTo({
            top: 0,
            behavior: `${e}`,
        });
    }

    useEffect(() => {
        scrollTop("smooth")
    },[])

    return (
        <div>
            <section>
                <ul>
                    { }
                </ul>
            </section>
            <div>
                <div className={classes["back-button-container"]}>
                    <button className={classes["back-button"]} onClick={onBackClick}>Back</button>
                </div>
                <div >
                    <img src={require(`../../../public/uploads/${courseData.image}`)} alt={`Foto curso ${courseData.id}`} width={"400"}></img>
                </div>
                <div>
                    <h1>{courseData.title}</h1>
                    <h3>{courseData.shortDescription}</h3>
                </div>

                {courseData.subject !== "" ? Array(courseData.subject).map((content, key) => {
                    return (
                        <div key={1} >
                            <h3>{content.title}</h3>
                            <iframe width="560" height="315" src={courseData.subject.url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            <p>{content.description}</p>
                        </div>
                    )
                }) :
                    <h3>Themes not enables yet</h3>
                }
            </div>
        </div>
    );
}

export default CourseComplete;
