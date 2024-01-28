import classes from './AdminCourseModal.module.css';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { generateSlug } from '../../../components/Utils';

function AdminCourseModal(props) {
    const [token, setToken] = useState(localStorage.getItem("token").replaceAll('"', ""))
    const navigate = useNavigate();
    const [fileImage, setFileImage] = useState()
    const titleRef = useRef("");
    const imageRef = useRef("");
    const levelRef = useRef("");
    const hoursRef = useRef("");
    const visibleRef = useRef("");
    const shortDescriptionRef = useRef("");
    const courseInfoRef = useRef("");
    const titleRemoveRef = useRef("");
    let courseData = props.courseData;

    const fetchEditCourseData = async (id) => {
        console.log(id);
        console.log(courseData);
        console.log(fileImage);
        console.log(courseData.image);
        const formData = new FormData();
        formData.append('file', fileImage);
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
                        title: titleRef.current.value === "" ? courseData.title : titleRef.current.value,
                        slug: titleRef.current.value === "" ? courseData.slug : generateSlug(titleRef.current.value),
                        shortDescription: shortDescriptionRef.current.value === "" ? courseData.shortDescription : shortDescriptionRef.current.value,
                        info: courseInfoRef.current.value === "" ? courseData.info : courseInfoRef.current.value,
                        image: imageRef.current.value === "" ? courseData.image : fileImage.name,
                        level: levelRef.current.value === "" ? courseData.level : levelRef.current.value,
                        visible: visibleRef.current.value === "" ? courseData.visible : visibleRef.current.value,
                        quantityHours: hoursRef.current.value === "" ? courseData.quantityHours : hoursRef.current.value,
                    }),
                }
            );
            const data = await response.json();
            if (response.ok) {
                return (props.onPending());
            }

        } catch (error) {
            console.log("Error de algo");
            console.log(error);
            navigate(`/error-page`, { state: error });
        }
        try {
            if (imageRef.current.value !== "") {
                const response = await fetch(
                    `http://localhost:8000/courses/save-image`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": token,
                        },
                        body: formData,
                        mode: "no-cors",

                    }
                );
                const data = await response.json();
                /*          console.log(data.data); */
                if (response.ok) {
                    /*      console.log("Has guardado la imagen"); */
                }
            }


        } catch (error) {
            console.log("Save no funciona");
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
                        "auth-token": token,
                    },
                }
            );
            const data = await response.json();
            console.log(data.data);
            if (response.ok) {
                props.onPending()
            }
        } catch (error) {
            console.log("Error de algo");
            console.log(error);
            navigate(`/error-page`, { state: error });
        }
    }
    const handleFileChange = (e) => {
        setFileImage(e.target.files[0])
    }
    const handlerClose = (e) => {
        /*        console.log('Has entrado en handlerClose'); */
        if (e === "REMOVE" && titleRemoveRef.current.value === props.courseData.title) {
            props.onClose();
            props.onPending();
            /*         console.log("Son iguales"); */
        } else if (e === "closeClick") {
            props.onClose();
            props.onPending();
        }
    }


    if (props.clickType === "INFO") {
        const onPreviewClick = (slug, courseData) => {
            console.log(slug);
            navigate(`/admin/preview/${slug}`, { state: courseData });
        }

        return (
            <>
                <div className={classes["modal-main"]}>
                    <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
                        <div className={classes["type-info"]}>
                            <div className={`${classes["md-content"]}`}>
                                <div className={classes["info-container"]}>
                                    <div className={classes["course-header"]}>
                                        <div className={classes["info-title"]}>
                                            <p className={classes["course-title"]}>{courseData.title}</p>
                                            <p> ID: {courseData._id}</p>
                                        </div>
                                        <div>
                                            <img src={require(`../../../../public/uploads/${courseData.image}`)} alt={`Photo of the course ${courseData.title}`} width={100} />
                                        </div>
                                    </div>

                                    <div className={classes["course-data"]}>
                                        <div>
                                            <p>Level</p>
                                            <p>{courseData.level === undefined ? "No hay dificultad" : courseData.level}</p>
                                        </div>
                                        <div>
                                            <p>Quantity Hours</p>
                                            <p>{courseData.quantityHours === undefined ? "No hay tiempo total" : courseData.quantityHours}</p>
                                        </div>
                                    </div>
                                    <div className={`${classes["preview-button"]} ${classes["submit-button"]}`}>
                                        <button onClick={() => { onPreviewClick(courseData.slug, courseData) }}>Preview</button>
                                    </div>
                                    <button onClick={() => { handlerClose("closeClick") }} className={classes["md-close"]}><span>X</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes["md-overlay"]} />
                </div>
            </>
        );
    } else if (props.clickType === "EDIT") {
        /*  console.log(props.courseData.level); */
        const handleSubmitEdit = (e) => {
            e.preventDefault();
            let id = courseData._id;
            /*  console.log('Fetch Edit course'); */
            fetchEditCourseData(id);
            handlerClose();
        }
        const onChangeFunction = () => {

        }
        courseData = props.courseData;
        return (
            <div>
                <div className={classes["modal-main"]}>
                    <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
                        <div className={classes["type-edit"]}>
                            <div className={`${classes["md-content"]}`}>
                                <div className={classes["info-container"]}>
                                    <form onSubmit={handleSubmitEdit} encType="multipart/form-data">
                                        <div className={classes["edit-title"]}>
                                            <div>
                                                <p>Title</p>
                                                <input
                                                    ref={titleRef}
                                                    type="text"
                                                    name="courseTitle"
                                                    id="title"
                                                    placeholder={courseData.title}
                                                />
                                            </div>
                                        </div>
                                        <div className={classes["edit-image"]}>
                                            <div>
                                                <p>Course Image</p>
                                                <img src={require(`../../../../public/uploads/${courseData.image}`)} alt={`Photo of the course ${courseData.title}`} width={50} />
                                            </div>
                                            <div>
                                                <input type="file" id="file" name="file" accept="image/*" ref={imageRef} onChange={handleFileChange} />
                                            </div>
                                        </div>
                                        <div className={classes["level-hours-section"]}>
                                            <div className={classes["edit-level"]}>
                                                <p> Level</p>
                                                <select name="select" id="select" ref={levelRef}>
                                                    {courseData.level === undefined ? <option value="Level not exist">Level not exist</option> : courseData.level}
                                                    {courseData.level === "Easy" ? "" : <option id="easy" name="easy" value="Easy">Easy</option>}
                                                    {courseData.level === "Medium" ? "" : <option id="medium" name="medium" value="Medium">Medium</option>}
                                                    {courseData.level === "Hard" ? "" : <option id="hard" name="hard" value="Hard">Hard</option>}
                                                </select>
                                            </div>
                                            <div className={classes["edit-hours"]}>
                                                <p>Quantity Hours</p>
                                                <input
                                                    ref={hoursRef}
                                                    type="number"
                                                    name="quntyHours"
                                                    id="quntyHours"
                                                    placeholder={courseData.quantityHours}
                                                />
                                                <span> Hours</span>
                                            </div>
                                            <div className={classes["edit-visible"]}>
                                                <p>Visibility</p>
                                                {console.log(courseData.visible)}
                                                <select name="visible" id="visible" ref={visibleRef}>
                                                    <option id="default" name="default" value={courseData.visible}>{courseData.visible ? "Visible" : "Hidden"}</option>
                                                    {courseData.visible === false ? "" : <option id="ocult" name="ocult" value={false}>Hidden</option>}
                                                    {courseData.visible === true ? "" : <option id="visible" name="visible" value={true}>Visible</option>}
                                                </select>
                                            </div>
                                        </div>
                                        <div className={classes["edit-short-description"]}>
                                            <p>Short Description</p>
                                            <div className={classes["actual-short-description"]}>
                                                <textarea
                                                    ref={courseInfoRef}
                                                    name="newInfo"
                                                    id="newInfo"
                                                    placeholder={courseData.shortDescription}
                                                    rows={5}
                                                    cols={40}
                                                    onChange={onChangeFunction}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className={classes["edit-description"]}>
                                            <p>Course Description</p>
                                            <div className={classes["new-description"]}>
                                                <textarea
                                                    ref={courseInfoRef}
                                                    name="newInfo"
                                                    id="newInfo"
                                                    placeholder={courseData.info}
                                                    rows={10}
                                                    cols={55}
                                                    onChange={onChangeFunction}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className={`${classes["save-button"]} ${classes["submit-button"]}`}>
                                            <button type="submit">
                                                <span>Save</span>
                                            </button>
                                            <button onClick={() => { navigate(`/admin/edit/${courseData._id}`, { state: courseData.slug }) }}>Edit Themes</button>
                                        </div>
                                    </form>
                                    <button onClick={() => { handlerClose("closeClick") }} className={classes["md-close"]}><span>X</span></button>
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
            e.preventDefault();
            const courseTitle = titleRemoveRef.current.value;
            /* console.log(props.courseData.title);
            console.log(courseTitle); */
            if (courseData.title === courseTitle) {
                /*  console.log('Fetch para remove the course'); */
                let id = courseData._id;
                /*  console.log('Fetch Remove course'); */
                fetchRemoveCourse(id);
                handlerClose("REMOVE");
            } else {
                /*     console.log('Titulo e input no son iguales'); */
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
                                            <p>{courseData.title}</p>
                                            <input
                                                ref={titleRemoveRef}
                                                type="text"
                                                name="courseTitleRemove"
                                                id="titleRemove"
                                                placeholder={"Copy / Paste or write the title"}
                                            />
                                        </div>
                                        <div className={`${classes["remove-button"]} ${classes["submit-button"]}`}>
                                            <button type="submit" onClick={() => { handlerClose("REMOVE") }}>
                                                <span>Remove</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <button onClick={() => { handlerClose("closeClick") }} className={classes["md-close"]}><span>X</span></button>
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
