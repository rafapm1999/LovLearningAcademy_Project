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
    const [editThemeData, setEditThemeData] = useState("")
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
        setEditThemeData("")
        setVisible(false);
    };

    const handlerPending = (e) => {
        setPending(e);
    }

    const onNewThemeClick = () => {
        setEditThemeData("")
        setVisible(!visible);
    }

    const loaderFunction = () => {
        return (<Loader></Loader>)
    };

    const onEditTheme = (e) => {
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
                    <AdminEditCourseModal courseData={courseData} editThemeData={editThemeData} newData={handlerNewData} onPending={handlerPending} onClose={handlerClose} visible={visible} />,
                    document.querySelector("#modal")
                )}
                <div className={`${classes["courseInfoPage-main"]} ${visible && classes["blur"]}`}>
                    <button type='button' onClick={() => {
                        navigate(-1)
                    }}>Back</button>
                    <div>
                        <h1>{courseData.title}</h1>
                        <h2>Themes</h2>
                    </div>
                    <div>
                        <button type='button' onClick={onNewThemeClick}>New theme</button>
                    </div>
                    <div>
                        {courseData.subject !== "" ? courseData.subject.map((content, key) => {
                            return (
                                <div key={1} >
                                    <button onClick={() => {onEditTheme(content)}}>Edit</button>
                                    <h3>{content.themeTitle}</h3>
                                    <iframe width="560" height="315" src={content.themeUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    <p>{content.themeDescription}</p>
                                </div>
                            )
                        }) :
                        ""
                        }
                    </div>
                    <div className={`${visible && classes["modal-main"]}`}></div>
                </div>
            </>
        );
    }
}

export default AdminEditCourse;
