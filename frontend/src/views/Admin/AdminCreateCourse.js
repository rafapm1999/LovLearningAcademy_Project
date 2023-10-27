import classes from './AdminCreateCourse.module.css';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function AdminCreateCourse(props) {
    const navigate = useNavigate();
    const titleRef = useRef("");
    const imageRef = useRef("");
    const levelRef = useRef("");
    const hoursRef = useRef("");
    const courseInfoRef = useRef("");

    const fetchCreateCourse = async () => {
        console.log(titleRef.current.value);
        console.log(courseInfoRef.current.value);
        console.log(imageRef.current.value);
        try {
            const response = await fetch(
                `http://localhost:8000/courses/create-course`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: titleRef.current.value,
                        info: courseInfoRef.current.value,
                        image: imageRef.current.value,
                        level: levelRef.current.value,
                        quantityHours: hoursRef.current.value,
                    }),
                }
            );
            const data = await response.json();
            console.log(data.data);
            if (response.ok) {
                console.log("HA SALIDO BIEN!!!");
            }

        } catch (error) {
            console.log("Error de algo");
            console.log(error);
            navigate(`/error-page`, { state: error });
        }
    };

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        fetchCreateCourse();
        navigate(`/bbdd-courses`);
    }
    const handlerBack = () => {
        navigate(`/bbdd-courses`);
    }
    return (
        <div className={`${classes["main-container"]} ${props.visible && classes["blur"]} ${props.openProfile && classes["blur"]}`}>
            <div>
                <h1>Create new course</h1>
            </div>
            <div className={classes["back-button-container"]}>
                <button className={classes["back-button"]} onClick={handlerBack}>BACK</button>
            </div>
            <div className={classes["info-container"]}>
                <form onSubmit={handleSubmitEdit} encType="multipart/form-data">
                    <div className={classes["title"]}>
                        <div>
                            <p>Title</p>
                            <input
                                ref={titleRef}
                                type="text"
                                name="courseTitle"
                                id="title"
                                placeholder="Course Title"
                                required
                            />
                        </div>
                    </div>
                    <div className={classes["image"]}>
                        <div>
                            <p>Image</p>
                            <input type="file" /* id="fileID" */ name="file" accept="image/*" ref={imageRef} required />
                        </div>
                    </div>
                    <div className={classes["level-hours-section"]}>
                        <div className={classes["level"]}>
                            <p>Level</p>
                            <select name="select" ref={levelRef}>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                        <div className={classes["hours"]}>
                            <p>Quantity Hours</p>
                            <div>
                                <input
                                    ref={hoursRef}
                                    type="number"
                                    name="quntyHours"
                                    id="quntyHours"
                                    required
                                />
                                <span> Hours</span>
                            </div>
                        </div>
                    </div>
                    <div className={classes["description"]}>
                        <p>Description</p>
                        <textarea
                            ref={courseInfoRef}
                            name="courseInfo"
                            id="info"
                            maxLength="300"
                            rows={10}
                            cols={60}
                            placeholder='Course Description'
                            required
                        ></textarea>
                    </div>
                    <div className={`${classes["save-button"]} ${classes["submit-button"]}`}>
                        <button type="submit">
                            <span>SAVE</span>
                        </button>
                    </div>
                </form>
            </div>
            <div className={`${props.visible && classes["modal-main"]} ${props.openProfile && classes["modal-main"]}`}></div>
        </div>
    )
}

export default AdminCreateCourse;
