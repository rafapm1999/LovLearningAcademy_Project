import classes from './AdminCourseModal.module.css';
import { useRef } from 'react';

function AdminCourseModal(props) {
    const titleRef = useRef("");
    const imageRef = useRef("");
    const levelRef = useRef("");
    const hoursRef = useRef("");
    const courseInfoRef = useRef("");
    const titleRemoveRef = useRef("");

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
                                        <div>
                                            <p> Nº: {props.courseData.id}</p>
                                            <p>{props.courseData.title}</p>
                                            <p> ID: {props.courseData._id}</p>
                                        </div>
                                        <div>
                                            <img src={props.courseData.image} alt={`Photo of the course ${props.courseData.title}`} width={50} height={50} />
                                        </div>
                                    </div>

                                    <div className={classes["course-data"]}>
                                        <p>Level: {props.courseData.level === undefined ? "No hay dificultad" : props.courseData.level}</p>
                                        <p> QntyHours: {props.courseData.quantityHours === undefined ? "No hay tiempo total" : props.courseData.quantityHours}</p>
                                    </div>
                                    <div className={classes["course-info"]}>
                                        <p className={classes["course-info-title"]}>Course Description</p>
                                        <p>{props.courseData.info}</p>
                                    </div>
                                    <button onClick={props.onClose} className={classes["md-close"]}><span>X</span></button>
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
            console.log('Fetch Edit course');

        }
        return (
            <div>
                <div className={classes["modal-main"]}>
                    <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
                        <div className={classes["type-edit"]}>
                            <div className={`${classes["md-content"]}`}>
                                <div className={classes["form-container"]}>
                                    <form id="editCourseForm" onSubmit={handleSubmitEdit}>
                                        <div className={classes["form-info"]}>
                                            <label for="title">{props.courseData.title}</label>
                                            <input
                                                ref={titleRef}
                                                type="text"
                                                name="courseTitle"
                                                id="title"
                                                placeholder={props.courseData.title}
                                            />
                                        </div>
                                        <div className={classes["form-info"]}>
                                            <img src={props.courseData.image} alt={`Photo of the course ${props.courseData.title}`} width={50} height={50} />
                                            <div>
                                                <label for="courseImage">Course Image</label>
                                                <input type="file" id="courseImage" name="image" accept="image/png, image/jpeg" ref={imageRef} />
                                            </div>

                                        </div>
                                        <div className={classes["form-info"]}>
                                            <select name="select" ref={levelRef}>
                                                <option value="originalLevel" selected>{props.courseData.level === undefined ? "Level not exist" : props.courseData.level}</option>
                                                {props.courseData.level === "Easy" ? "" : <option value="Easy">Easy</option>}
                                                {props.courseData.level === "Medium" ? "" : <option value="Medium">Medium</option>}
                                                {props.courseData.level === "Hard" ? "" : <option value="Hard">Hard</option>}
                                            </select>
                                        </div>
                                        <div className={classes["form-info"]}>
                                            <label for="quntyHours">Quantity Hours</label>
                                            <input
                                                ref={hoursRef}
                                                type="number"
                                                name="email"
                                                id="quntyHours"
                                                placeholder={props.courseData.quantityHours}
                                            />
                                            <span>Hours</span>
                                        </div>
                                        <div className={classes["form-info"]}>
                                            <label for="info">Course Info</label>
                                            <textarea
                                                ref={courseInfoRef}
                                                name="courseInfo"
                                                id="info"
                                                placeholder="What do you tell to us?"
                                                maxlength="50"
                                            ></textarea>
                                        </div>
                                        <div className={`${classes["form-info"]} ${classes["submit-button"]}`}>
                                            <button type="submit">
                                                <span>Save</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <button onClick={props.onClose} className={classes["md-close"]}><span>X</span></button>
                            </div>
                        </div>
                        <div className={classes["md-overlay"]} />
                    </div>
                </div>
            </div>
        );
    } else if (props.clickType === "REMOVE") {
        const handleSubmitRemove = (e) => {
            e.preventDefault();
            if (props.courseData.title === titleRemoveRef.current.value) {
                console.log('Fetch para remove the course');
            }
        }
        return (
            <div>
                <div className={classes["modal-main"]}>
                    <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
                        <div className={classes["type-remove"]}>
                            <div className={`${classes["md-content"]}`}>
                                <div className={classes["form-container"]}>
                                    <form id="editCourseForm" onSubmit={handleSubmitRemove}>
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
                                            <button type="submit">
                                                <span>REMOVE</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <button onClick={props.onClose} className={classes["md-close"]}><span>X</span></button>
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
