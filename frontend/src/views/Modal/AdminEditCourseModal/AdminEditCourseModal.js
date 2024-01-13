import classes from './AdminEditCourseModal.module.css';
import { useRef, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { generateURL } from '../../../components/Utils';

function AdminEditCourseModal(props) {
    const [token, setToken] = useState(localStorage.getItem("token").replaceAll('"', ""))
    const navigate = useNavigate();
    const themeTitleRef = useRef("");
    const themeVideoUrlRef = useRef("");
    const themeDescriptionRef = useRef("");

    const fetchEditCourse = async (id, newData) => {

        try {
            const response = await fetch(
                `http://localhost:8000/courses/edit/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                    body: JSON.stringify({
                        subject: newData,
                    }),
                }
            );
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                props.onClose();
                props.newData(data.data.slug);
                props.onPending(true);
            }

        } catch (error) {
            console.log("Error de algo");
            console.log(error);
            navigate(`/error-page`, { state: error });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newData = {
            title: themeTitleRef.current.value,
            url: generateURL(`${themeVideoUrlRef.current.value}`),
            description: themeDescriptionRef.current.value,
        }
        console.log(newData);
        let id = props.courseData._id;
        fetchEditCourse(id, newData);
    };

    console.log(props.editThemeData);
    if (props.editThemeData === "") {
        console.log("Has entrado en props.editThemeData === ''");
        return (
            <div>
                <div className={classes["modal-main"]}>
                    <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
                        <div className={classes["type-edit"]}>
                            <div className={`${classes["md-content"]}`}>
                                <div className={classes["info-container"]}>
                                    <form onSubmit={handleSubmit}>

                                        <input
                                            type='text'
                                            ref={themeTitleRef}
                                            name="themeTitle"
                                            id="themeTitleForm"
                                            placeholder='Title'
                                            required
                                        />
                                        <input
                                            type='text'
                                            ref={themeVideoUrlRef}
                                            name="themeVideoUrl"
                                            id="themeVideoUrlForm"
                                            placeholder='URL video'
                                            required
                                        />
                                        <input
                                            type='text'
                                            ref={themeDescriptionRef}
                                            name="themeDescription"
                                            id="themeDescriptionForm"
                                            placeholder='Description'
                                            required
                                        />
                                        <button type='submit'>Save</button>

                                    </form>
                                    <button type='button' onClick={() => { props.onClose() }} className={classes["md-close"]}><span>X</span></button>
                                </div>
                            </div>
                        </div>
                        <div className={classes["md-overlay"]} />
                    </div>
                </div>
            </div >
        );
    } else if ( props.editThemeData !== "" ) {
        console.log('Has entrado en props.editThemeData !== ""');
        
        let editThemeData = props.editThemeData;
        return (
            <div>
                <div className={classes["modal-main"]}>
                    <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
                        <div className={classes["type-edit"]}>
                            <div className={`${classes["md-content"]}`}>
                                <div className={classes["info-container"]}>
                                    <form onSubmit={handleSubmit}>
                                        <input
                                            type='text'
                                            ref={themeTitleRef}
                                            name="editThemeTitle"
                                            id="editThemeTitleForm"
                                            defaultValue={editThemeData.title}
                                            placeholder={editThemeData.title}
                                            required
                                        />
                                        <input
                                            type='text'
                                            ref={themeVideoUrlRef}
                                            name="editThemeVideoUrl"
                                            id="editThemeVideoUrlForm"
                                            defaultValue={editThemeData.url}
                                            placeholder={editThemeData.url}
                                            required
                                        />
                                        <input
                                            type='text'
                                            ref={themeDescriptionRef}
                                            name="editThemeDescription"
                                            id="editThemeDescriptionForm"
                                            defaultValue={editThemeData.description}
                                            placeholder={editThemeData.description}
                                            required
                                        />
                                        <button type='submit'>Save</button>

                                    </form>
                                    <button type='button' onClick={() => { props.onClose() }} className={classes["md-close"]}><span>X</span></button>
                                </div>
                            </div>
                        </div>
                        <div className={classes["md-overlay"]} />
                    </div>
                </div>
            </div >
        );

    }


}

export default AdminEditCourseModal;

