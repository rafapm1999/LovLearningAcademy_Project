import classes from './CourseComplete.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import { takeID } from "../../components/Utils";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChartBar, faXmarkCircle
} from "@fortawesome/free-regular-svg-icons";
import Loader from "../../components/Loader/Loader"


function CourseComplete() {
    const location = useLocation();
    let courseData = location.state;
    const token = localStorage.getItem("token")
    const [visible, setVisible] = useState(false)
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
    const onCloseLeftSection = () => {
        setVisible(false)
    }

    const onOpenLeftSection = () => {
        setVisible(true)
    }

    useEffect(() => {
        scrollTop("auto")
    }, [])

    return (
        <div className={classes["courseComplete-main"]}>
            <section className={`${classes["courseComplete-leftSection"]} ${visible === false && classes["close"]}`}>
                <div className={`${classes["left-section"]}`}>
                    <ul className={classes["data-list"]}>
                        <div className={classes["close-list-button-container"]}>
                            <button onClick={onCloseLeftSection} className={classes["close-list-button"]}><FontAwesomeIcon icon={faXmarkCircle} size='xl' /></button>
                        </div>
                        {courseData.subject !== "" ? courseData.subject.map((content, key) => {
                            return (
                                <li key={key}>
                                    <a name="Tema" className={classes["info-list"]}>{content.themeTitle}</a>
                                </li>
                            )
                        }) :
                            <li className={classes["info-list"]}>Themes not enables yet</li>
                        }
                    </ul>
                </div>
            </section>
            <div className={classes["list-button-section"]}>
                <button onClick={onOpenLeftSection} className={`${classes["list-button"]} ${visible === true && classes["hidden"]}`}><FontAwesomeIcon icon={faChartBar} size='xl' /></button>
            </div>
            <div className={classes["courseComplete-container"]}>
                <div className={classes["courseComplete-container-info"]}>
                    <div className={classes["back-button-container"]}>
                        <button className={classes["back-button"]} onClick={onBackClick}>Back</button>
                    </div>
                    <div className={classes["courseComplete-header"]}>
                        <div className={classes["courseComplete-header-img"]}>
                            <img src={require(`../../../public/uploads/${courseData.image}`)} alt={`Foto curso ${courseData.id}`} width={"400"}></img>
                        </div>
                        <div className={classes["courseComplete-header-title"]}>
                            <h1>{courseData.title}</h1>
                            <h3>{courseData.shortDescription}</h3>
                        </div>
                    </div>
                    <div className={classes["courseComplete-course-info"]}>
                        {courseData.subject !== "" ? courseData.subject.map((content, key) => {
                            return (
                                <section id={content._id} key={key} className={classes["courseComplete-course-info-container"]}>
                                    <div className={classes["courseComplete-course-info-title"]}>
                                        <h3 >{content.themeTitle}</h3>
                                    </div>
                                    <div className={classes["courseComplete-course-info-video"]}>
                                        <iframe className={classes["course-video"]} width="1120" height="630" src={content.themeUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    </div>
                                    <div className={classes["courseComplete-course-info-description"]}>
                                        <p>{content.themeDescription}</p>
                                    </div>
                                </section>
                            )
                        }) :
                            <div className={classes["courseComplete-noThemes"]}>
                                <h3 >Ups... Themes not enables yet!</h3>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseComplete;
