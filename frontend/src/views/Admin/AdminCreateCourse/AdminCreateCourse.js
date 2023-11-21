import classes from './AdminCreateCourse.module.css';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

function AdminCreateCourse(props) {
    const [token, setToken] = useState(localStorage.getItem("token").replaceAll('"', ""))
    const [fileImage, setFileImage] = useState()
    const navigate = useNavigate();
    const titleRef = useRef();
    const imageRef = useRef();
    const levelRef = useRef();
    const hoursRef = useRef();
    const courseInfoRef = useRef();
 
    console.log(typeof "");
    const fetchCreateCourse = async () => {
        console.log(typeof imageRef);
        console.log(imageRef.current.value);

        console.log(titleRef.current.value);
        console.log(courseInfoRef.current.value);
        console.log(fileImage);
        //
        const formData = new FormData();
        formData.append('file', fileImage);
    
        try {
            const response = await fetch(
                `http://localhost:8000/courses/create-course`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                    body: JSON.stringify({
                        title: titleRef.current.value,
                        info: courseInfoRef.current.value,
                        image: fileImage.name,
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
        try {
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
            console.log(data.data);
            if (response.ok) {
                console.log("Has guardado la imagen");
            }

        } catch (error) {
            console.log("Save no funciona");
            console.log(error);
            navigate(`/error-page`, { state: error });
        }
    };


    const handleFileChange = (e) => {
        setFileImage(e.target.files[0])
    }
    const handleSubmitEdit = (e) => {
        e.preventDefault();
        fetchCreateCourse();
        navigate(`/admin/bbdd-courses`);
    }
    const handlerBack = () => {
        navigate(`/admin/bbdd-courses`);
    }
    return (
        <div className={`${classes["main-container"]} ${props.visible && classes["blur"]} ${props.openProfile && classes["blur"]}`}>
            <div>
                <h1>Create new course</h1>
            </div>
            <div className={classes["back-button-container"]}>
                <button className={classes["back-button"]} onClick={handlerBack}>Back</button>
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
                            <input type="file" id="file" name="file" accept="image/*" ref={imageRef} onChange={handleFileChange} required />
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
                            <span>Save</span>
                        </button>
                    </div>
                </form>
            </div>
            <div className={`${props.visible && classes["modal-main"]} ${props.openProfile && classes["modal-main"]}`}></div>
        </div>
    )
}

export default AdminCreateCourse;
