import classes from './AdminCourseModal.module.css';

function AdminCourseModal(props) {

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
                                        <p className={classes["course-info-title"]}>Course Info</p>
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
        return (
            <>
                <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
                    <div className={classes["type-edit"]}>
                        <div className={`${classes["md-content"]}`}>
                            <div className={classes["info-container"]}>
                                <p>{props.courseId}</p>
                                <p>{props.clickType}</p>
                                <button onClick={props.onClose} className={classes["md-close"]}><span>X</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes["md-overlay"]} />
            </>
        );
    } else if (props.clickType === "REMOVE") {
        return (
            <>
                <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
                    <div className={classes["type-remove"]}>
                        <div className={`${classes["md-content"]}`}>
                            <div className={classes["info-container"]}>
                                <p>{props.courseId}</p>
                                <p>{props.clickType}</p>
                                <button onClick={props.onClose} className={classes["md-close"]}><span>X</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes["md-overlay"]} />
            </>
        );
    }

}

export default AdminCourseModal;
