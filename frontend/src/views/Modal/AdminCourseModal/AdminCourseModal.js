import classes from './AdminCourseModal.module.css';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function AdminCourseModal(props) {
    const navigate = useNavigate();
    const titleRef = useRef("");
    const imageRef = useRef("");
    const levelRef = useRef("");
    const hoursRef = useRef("");
    const courseInfoRef = useRef("");
    const titleRemoveRef = useRef("");

    const fetchEditCourse = async (id) => {
        console.log(titleRef.current.value);
        console.log(courseInfoRef.current.value);
        try {
            const response = await fetch(
                `http://localhost:8000/courses/edit/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: titleRef.current.value === "" ? props.courseData.title : titleRef.current.value,
                        info: courseInfoRef.current.value === "" ? props.courseData.info : courseInfoRef.current.value,
                        image: imageRef.current.value === "" ? props.courseData.image : imageRef.current.value,
                        level: levelRef.current.value === "" ? props.courseData.level : levelRef.current.value,
                        quantityHours: hoursRef.current.value === "" ? props.courseData.quantityHours : hoursRef.current.value,
                    }),
                }
            );
            const data = await response.json();
            console.log(data.data);
            if (response.ok) {
                console.log("HA SALIDO BIEN!!!");
                return (props.onPending);
            }

        } catch (error) {
            console.log("Error de algo");
            console.log(error);
            navigate(`/error-page`, { state: error });
        }
    };

    const fetchRemoveCourse = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:8000/courses/delete/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            console.log(data.data);
            if (response.ok) {
                console.log("HA BORRADO EL CURSO BIEN!!!");
                return (handlerClose());
            }
        } catch (error) {
            console.log("Error de algo");
            console.log(error);
            navigate(`/error-page`, { state: error });
        }
        console.log('Hola');

    }

    const handlerClose = (e) => {
        console.log('Has entrado en handlerClose');

        return e === "INFO" || e === "EDIT" || e === "REMOVE" ? props.onClose : props.onPending;
    }






    if (props.clickType === "INFO") {
        console.log(props.courseData.quantityHours);
        return (
            <>
                <div className={classes["modal-main"]}>
                    <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
                        <div className={classes["type-info"]}>
                            <div className={`${classes["md-content"]}`}>
                                <div className={classes["info-container"]}>
                                    <div className={classes["course-header"]}>
                                        <div className={classes["info-title"]}>
                                            {/* <p> Nº: {props.courseData.id}</p> */}
                                            <p className={classes["course-title"]}>{props.courseData.title}</p>
                                            <p> ID: {props.courseData._id}</p>
                                        </div>
                                        <div>
                                            <img src={props.courseData.image} alt={`Photo of the course ${props.courseData.title}`} width={50} height={50} />
                                        </div>
                                    </div>

                                    <div className={classes["course-data"]}>
                                        <div>
                                            <p>Level</p>
                                            <p>{props.courseData.level === undefined ? "No hay dificultad" : props.courseData.level}</p>
                                        </div>
                                        <div>
                                            <p>Quantity Hours</p>
                                            <p>{props.courseData.quantityHours === undefined ? "No hay tiempo total" : props.courseData.quantityHours}</p>
                                        </div>
                                    </div>
                                    <div className={classes["course-info"]}>
                                        <p className={classes["course-info-title"]}>Course Description</p>
                                        <p>{props.courseData.info}</p>
                                    </div>
                                    <button onClick={handlerClose("INFO")} className={classes["md-close"]}><span>X</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes["md-overlay"]} />
                </div>
            </>
        );
    } else if (props.clickType === "EDIT") {
        console.log(props.courseData.level);
        const handleSubmitEdit = (e) => {
            e.preventDefault();
            let id = props.courseData._id;
            console.log('Fetch Edit course');
            fetchEditCourse(id);
            props.onChange();
            handlerClose();
        }
        return (
            <div>
                <div className={classes["modal-main"]}>
                    <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
                        <div className={classes["type-edit"]}>
                            <div className={`${classes["md-content"]}`}>
                                <div className={classes["info-container"]}>
                                    <form onSubmit={handleSubmitEdit}>
                                        <div className={classes["edit-title"]}>
                                            <div>
                                                <p> Actual Title</p>
                                                <p>{props.courseData.title}</p>
                                            </div>
                                            <div>
                                                <p> New Title</p>
                                                <input
                                                    ref={titleRef}
                                                    type="text"
                                                    name="courseTitle"
                                                    id="title"
                                                    placeholder={props.courseData.title}
                                                />
                                            </div>
                                        </div>
                                        <div className={classes["edit-image"]}>
                                            <div>
                                                <p>Course Image</p>
                                                <img src={props.courseData.image} alt={`Photo of the course ${props.courseData.title}`} width={50} height={50} />
                                            </div>
                                            <div>
                                                <input type="file" id="courseImage" name="image" accept="image/png, image/jpeg" ref={imageRef} />
                                            </div>
                                        </div>
                                        <div className={classes["level-hours-section"]}>
                                            <div className={classes["edit-level"]}>
                                                <p> Level</p>
                                                <select name="select" ref={levelRef}>
                                                    <option value="Level not exist" selected>{props.courseData.level === undefined ? "Level not exist" : props.courseData.level}</option>
                                                    {props.courseData.level === "Easy" ? "" : <option value="Easy">Easy</option>}
                                                    {props.courseData.level === "Medium" ? "" : <option value="Medium">Medium</option>}
                                                    {props.courseData.level === "Hard" ? "" : <option value="Hard">Hard</option>}
                                                </select>
                                            </div>
                                            <div className={classes["edit-hours"]}>
                                                <p>Quantity Hours</p>
                                                <input
                                                    ref={hoursRef}
                                                    type="number"
                                                    name="email"
                                                    id="quntyHours"
                                                    placeholder={props.courseData.quantityHours}
                                                />
                                                <span> Hours</span>
                                            </div>
                                        </div>
                                        <div className={classes["edit-description"]}>
                                            <p>Course Description</p>
                                            <div className={classes["actual-description"]}>
                                                <p>Actual Description</p>
                                                <textarea
                                                    ref={courseInfoRef}
                                                    name="courseInfo"
                                                    id="info"
                                                    value={props.courseData.info}
                                                    maxlength="50"
                                                    rows={5}
                                                    cols={40}
                                                ></textarea>
                                            </div>
                                            <div className={classes["new-description"]}>
                                                <p>New Description</p>
                                                <textarea
                                                    ref={courseInfoRef}
                                                    name="courseInfo"
                                                    id="info"
                                                    placeholder={props.courseData.info}
                                                    maxlength="50"
                                                    rows={5}
                                                    cols={40}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className={`${classes["save-button"]} ${classes["submit-button"]}`}>
                                            <button type="submit" onClick={handlerClose()}>
                                                <span>SAVE</span>
                                            </button>
                                        </div>
                                    </form>
                                    <button onClick={handlerClose("EDIT")} className={classes["md-close"]}><span>X</span></button>
                                </div>
                            </div>
                        </div>
                        <div className={classes["md-overlay"]} />
                    </div>
                </div>
            </div >
        );
    } else if (props.clickType === "REMOVE") {
        const handleSubmitRemove = (e) => {


            const courseTitle = titleRemoveRef.current.value;
            e.preventDefault();
            console.log(props.courseData.title);
            console.log(courseTitle);
            if (props.courseData.title === courseTitle) {
                console.log('Fetch para remove the course');
                let id = props.courseData._id;
                console.log('Fetch Remove course');
                fetchRemoveCourse(id);
                props.onChange();
                handlerClose("REMOVE");
            } else {
                console.log('Titulo e input no son iguales');
            }
        }
        return (
            <div>
                <div className={classes["modal-main"]}>
                    <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
                        <div className={classes["type-remove"]}>
                            <div className={`${classes["md-content"]}`}>
                                <div className={classes["form-container"]}>
                                    <form onSubmit={handleSubmitRemove}>
                                        <div className={classes["remove-header"]}>
                                            <p className={classes["warning"]}>WARNING</p>
                                            <p>This action has not return!</p>
                                            <p>{"You must to put the same title (with capital and normal letters)"}</p>
                                        </div>
                                        <div className={classes["remove-form"]}>
                                            <p>{props.courseData.title}</p>
                                            <input
                                                ref={titleRemoveRef}
                                                type="text"
                                                name="courseTitleRemove"
                                                id="titleRemove"
                                                placeholder={"Copy / Paste or write the title"}
                                            />
                                        </div>
                                        <div className={`${classes["remove-button"]} ${classes["submit-button"]}`}>
                                            <button type="submit" onClick={handlerClose()}>
                                                <span>REMOVE</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <button onClick={handlerClose("REMOVE")} className={classes["md-close"]}><span>X</span></button>
                            </div>
                        </div>
                        <div className={classes["md-overlay"]} />
                    </div>
                </div>
            </div>

        );
    }

}

export default AdminCourseModal;
