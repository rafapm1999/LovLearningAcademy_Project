import classes from './AdminEditCourse.module.css';
import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useState } from 'react';
import { generateSlug } from '../../../components/Utils';


function AdminEditCourse() {
    const [token, setToken] = useState(localStorage.getItem("token").replaceAll('"', ""))
    const navigate = useNavigate();
    const location = useLocation();
    let courseData = "";
    if (location.state !== null) {
        courseData = location.state;
    }

    const subjectTitleRef = useRef("");
    const videoUrlRef = useRef("");

    const fetchEditCourse = async (id) => {
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
                        subject: "hola",
                    }),
                }
            );
            const data = await response.json();
            if (response.ok) {
                
            }

        } catch (error) {
            console.log("Error de algo");
            console.log(error);
            navigate(`/error-page`, { state: error });
        }
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        let id = courseData._id;
        fetchEditCourse(id);
    }

    return (
        <div>
            <form onSubmit={handleSubmitEdit}>
                <div>
                    <input
                        type='text'
                        ref={subjectTitleRef}
                        name="subjectTitle"
                        id="subjectTitle"
                        placeholder='Title'
                    />
                     <input
                        type='text'
                        ref={videoUrlRef}
                        name="subjectTitle"
                        id="subjectTitle"
                        placeholder='Title'
                    />
                   <iframe width="560" height="315" src="https://www.youtube.com/embed/wGxDfSWC4Ww" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>

            </form>
        </div>
    );
}

export default AdminEditCourse;
