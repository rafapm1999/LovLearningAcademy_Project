import classes from './AdminEditCourse.module.css';
import ReactDOM from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import AdminEditCourseModal from '../../Modal/AdminEditCourseModal/AdminEditCourseModal';
import Loader from "../../../components/Loader/Loader";

function AdminEditCourse() {
    const [token, setToken] = useState(localStorage.getItem("token").replaceAll('"', ""))
    const navigate = useNavigate();
    const location = useLocation();
    const [pending, setPending] = useState(true);
    const [visible, setVisible] = useState(false);
    const [courseData, setCourseData] = useState("");
    const [editThemeData, setEditThemeData] = useState(false)
    const [editThemeCourseData, setEditCourseThemeData] = useState(false)
    let courseSlug = "";
    let newDataInfo = "";

    const fetchTheCourse = async (slug) => {
        console.log(slug);
        try {
            const response = await fetch(`http://localhost:8000/courses/${slug}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (response.ok) {
                console.log("FetchTheCourse");
                console.log(data.data);
                setCourseData(data.data[0])
                setPending(false)

            } else {
                console.log("Has entrado fetchTheCourse en !response.ok");
            }
        } catch {

        }
    };

    if (location.state !== null && token && newDataInfo === "") {
        console.log('COges la info de location.state');
        courseSlug = location.state;
        console.log(courseSlug);
    } else if (location.state === null || location.state === undefined && token) {
        navigate(-1);
    }

    const handlerNewData = (e) => {
        fetchTheCourse(e)
    }

    const handlerClose = () => {
        setEditThemeData(false)
        setVisible(false);
    };

    const handlerPending = (e) => {
        setPending(e);
    }

    const onNewThemeClick = () => {
        setEditThemeData(false)
        setVisible(!visible);
    }

    const loaderFunction = () => {
        return (<Loader></Loader>)
    };

    const onEditTheme = (info, e) => {
        setEditCourseThemeData(info)
        console.log("Has clickado");
        setEditThemeData(e)
        setVisible(!visible)
    }

    useEffect(() => {
        fetchTheCourse(courseSlug)
    }, [])

    if (pending === true) {
        return loaderFunction();
    } else if (pending === false) {
        console.log('COurseData para renderizar');

        console.log(courseData.subject);
        return (
            <>
                {ReactDOM.createPortal(
                    <AdminEditCourseModal courseData={courseData} editThemeData={editThemeData} editThemeCourseData={editThemeCourseData} newData={handlerNewData} onPending={handlerPending} onClose={handlerClose} visible={visible} />,
                    document.querySelector("#modal")
                )}
                <div className={classes["back-button-container"]}>
                    <button className={classes["back-button"]} type='button' onClick={() => {
                        navigate(-1)
                    }}>Back</button>
                </div>
                <div className={`${classes["courseInfoPage-main"]} ${visible && classes["blur"]}`}>

                    <div className={classes["courseInfoPage-main-header"]}>
                        <div className={classes["courseInfoPage-header-img"]}>
                            <img src={require(`../../../../public/uploads/${courseData.image}`)} alt={`Foto curso ${courseData.id}`} width={"400"}></img>
                        </div>
                        <div className={classes["courseInfoPage-header-title"]}>
                            <h1>{courseData.title}</h1>
                            <h2>Themes</h2>
                        </div>
                    </div>
                    <div>
                        <button className={classes["newTheme-button"]} type='button' onClick={onNewThemeClick}>New theme</button>
                    </div>
                    <div className={classes["courseTheme-target-main"]}>
                        {courseData.subject.length !== 0 ? courseData.subject.map((content, key) => {
                            return (
                                <div className={classes["courseTheme-target-container"]} key={1} >
                                    <div className={classes["courseTheme-target-container-button"]}>
                                        <button onClick={() => { onEditTheme(content, true) }}>Edit</button>
                                    </div>
                                    <h3>{content.themeTitle}</h3>
                                    <iframe className={classes["courseTheme-course-info-video"]} width="560" height="315" src={content.themeUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    <p>{content.themeDescription}</p>
                                </div>
                            )
                        }) :
                        <div className={classes["courseComplete-noThemes"]}>
                        <h3 >Ups... Themes not enables yet!</h3>
                    </div>
                    }
                    </div>
                    <div className={`${visible && classes["modal-main"]}`}></div>
                </div>
            </>
        );
    }
}

export default AdminEditCourse;
