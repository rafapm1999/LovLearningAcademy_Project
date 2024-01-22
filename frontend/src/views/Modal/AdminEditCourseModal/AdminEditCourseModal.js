import classes from './AdminEditCourseModal.module.css';
import { useRef, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { generateURL, uniqueId } from '../../../components/Utils';

function AdminEditCourseModal(props) {
    const [token, setToken] = useState(localStorage.getItem("token").replaceAll('"', ""))
    const navigate = useNavigate();
    const themeTitleRef = useRef("");
    const themeVideoUrlRef = useRef("");
    const themeDescriptionRef = useRef("");
    let courseData = props.courseData;
    const fetchEditCourse = async (id, newData) => {
        let newDataCourse = []
        console.log(newData);
        try {
            // Obtener la información actual del curso
            const currentCourseResponse = await fetch(`http://localhost:8000/courses/edit/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
            });

            if (!currentCourseResponse.ok) {
                throw new Error("Error al obtener la información del curso");
            }

            const currentCourseData = await currentCourseResponse.json();

            // Verificar si ya hay información en el campo subject
            if (currentCourseData.data[0].subject && Array.isArray(currentCourseData.data[0].subject)) {
                // Acumular la información anterior con newData.subject
                newDataCourse = [...currentCourseData.data[0].subject, ...newData]
            }

            console.log(newDataCourse);

            try {  // Realizar la solicitud PATCH con newData actualizado

                console.log(newDataCourse);
                const patchResponse = await fetch(`http://localhost:8000/courses/edit/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                    body: JSON.stringify({
                        subject: newDataCourse
                    }),
                });

                if (!patchResponse.ok) {
                    throw new Error("Error al actualizar el curso");
                }

                const updatedCourseData = await patchResponse.json();
                console.log(updatedCourseData);

                // Resto de tu lógica después de actualizar el curso...

                props.onClose();
                props.newData(updatedCourseData.data.slug);
                props.onPending(true);
            }
            catch (error) {
                console.error("Error en fetchEditCourse:", error);
                navigate(`/error-page`, { state: error });
            }
        } catch (error) {
            console.error("Error en fetchEditCourse:", error);
            navigate(`/error-page`, { state: error });
        }
    };

    const fetchEditingCourseTheme = async (id, newData) => {
        try {  // Realizar la solicitud PATCH con newData actualizado

            const patchResponse = await fetch(`http://localhost:8000/courses/edit/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
                body: JSON.stringify({
                    subject: newData
                }),
            });

            if (!patchResponse.ok) {
                throw new Error("Error al actualizar el curso");
            }

            const updatedCourseData = await patchResponse.json();
            console.log(updatedCourseData);

            // Resto de tu lógica después de actualizar el curso...

            props.onClose();
            props.newData(updatedCourseData.data.slug);
            props.onPending(true);
        }
        catch (error) {
            console.error("Error en fetchEditCourse:", error);
            navigate(`/error-page`, { state: error });
        }
    }

    const handleSubmitCreate = (e) => {
        e.preventDefault();
        let newData = [{
            _id: uniqueId(),
            themeTitle: themeTitleRef.current.value,
            themeUrl: generateURL(`${themeVideoUrlRef.current.value}`),
            themeDescription: themeDescriptionRef.current.value,
        }]
        console.log(newData);
        let id = props.courseData._id;
        fetchEditCourse(id, newData);
    };
    const handleSubmitEdit = (e) => {
        e.preventDefault();
        console.log(courseData);
        console.log(props.editThemeCourseData)
        console.log(props.editThemeCourseData._id);
        let originalCourse = courseData.subject
        let finalCourse = [];
        let cont = 0;
        courseData.subject.some((course) => {
            cont++
            if (course._id === props.editThemeCourseData._id) {
                originalCourse.splice(cont - 1, 1, {
                    _id: props.editThemeCourseData._id,
                    themeTitle: themeTitleRef.current.value,
                    themeUrl: generateURL(`${themeVideoUrlRef.current.value}`),
                    themeDescription: themeDescriptionRef.current.value,
                })
            }
        });
        finalCourse = originalCourse;
        console.log(finalCourse);
        fetchEditingCourseTheme(courseData._id, finalCourse)

    }
    const handleSubmitRemove = (e) => {
        e.preventDefault();
        console.log(courseData);
        console.log(props.editThemeCourseData)
        console.log(props.editThemeCourseData._id);
        let originalCourse = courseData.subject
        let finalCourse = [];
        let cont = 0;
        courseData.subject.some((course) => {
            cont++
            if (course._id === props.editThemeCourseData._id) {
                originalCourse.splice(cont - 1, 1)
            }
        });
        finalCourse = originalCourse;
        console.log(finalCourse);
        fetchEditingCourseTheme(courseData._id, finalCourse)

    }

    console.log(props.editThemeData);
    if (props.editThemeData === false) {
        console.log("Has entrado en props.editThemeData === ''");
        return (
            <div>
                <div className={classes["modal-main"]}>
                    <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
                        <div className={classes["type-edit"]}>
                            <div className={`${classes["md-content"]}`}>
                                <div className={classes["info-container"]}>
                                    <form onSubmit={handleSubmitCreate}>
                                        <input
                                            className={classes["info-container-input"]}
                                            type='text'
                                            ref={themeTitleRef}
                                            name="themeTitle"
                                            id="themeTitleForm"
                                            defaultValue={""}
                                            placeholder='Title'
                                            required
                                        />
                                        <input
                                            className={classes["info-container-input"]}
                                            type='text'
                                            ref={themeVideoUrlRef}
                                            name="themeVideoUrl"
                                            id="themeVideoUrlForm"
                                            defaultValue={""}
                                            placeholder='URL video'
                                            required
                                        />
                                        <input
                                            className={classes["info-container-input"]}
                                            type='text'
                                            ref={themeDescriptionRef}
                                            name="themeDescription"
                                            id="themeDescriptionForm"
                                            defaultValue={""}
                                            placeholder='Description'
                                            required
                                        />
                                        <button className={classes["save-button"]} type='submit'>Save</button>

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
    } else if (props.editThemeData === true) {
        console.log('Has entrado en props.editThemeData !== ""');

        let editThemeData = props.editThemeCourseData;
        return (
            <div>
                <div className={classes["modal-main"]}>
                    <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
                        <div className={classes["type-edit"]}>
                            <div className={`${classes["md-content"]}`}>
                                <div className={classes["info-container"]}>
                                    <form onSubmit={handleSubmitEdit}>
                                        <input
                                            className={classes["info-container-input"]}
                                            type='text'
                                            ref={themeTitleRef}
                                            name="editThemeTitle"
                                            id="editThemeTitleForm"
                                            defaultValue={editThemeData.themeTitle}
                                            placeholder={editThemeData.title}
                                            required
                                        />
                                        <input
                                            className={classes["info-container-input"]}
                                            type='text'
                                            ref={themeVideoUrlRef}
                                            name="editThemeVideoUrl"
                                            id="editThemeVideoUrlForm"
                                            defaultValue={editThemeData.themeUrl}
                                            placeholder={editThemeData.url}
                                            required
                                        />
                                        <input
                                            className={classes["info-container-input"]}
                                            type='text'
                                            ref={themeDescriptionRef}
                                            name="editThemeDescription"
                                            id="editThemeDescriptionForm"
                                            defaultValue={editThemeData.themeDescription}
                                            placeholder={editThemeData.description}
                                            required
                                        />
                                        <div className={classes["button-section"]}>
                                            <button className={classes["save-button"]} type='submit'>Save</button>
                                            <button className={classes["remove-button"]} type='button' onClick={handleSubmitRemove}>Remove</button>
                                        </div>
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
    } else if (courseData.subject[0] === null || courseData.subject[0] === undefined ) {
        return( <h2>Don't have any themes yet.</h2>)
           
         
    }


}

export default AdminEditCourseModal;

