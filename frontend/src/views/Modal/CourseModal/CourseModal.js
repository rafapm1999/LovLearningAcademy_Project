import classes from './CourseModal.module.css';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function CourseModal(props) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();
    const onLogin = () => {
        navigate("/login");
    }
    const onNavigate = () => {
        navigate("/campus/mycourses");
    }

    if (token && props.courseExists === false) {

        //Si tiene token y no tiene el curso renderiza este codigo
        return (
            <Fragment>
                <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
                    <div className={`${classes["md-content"]}`}>
                        <div className={classes["info-container"]}>
                            <p>{`Congrats! The ${props.data.title} course is now in My Courses. Enjoy it!`}</p>
                            <button onClick={onNavigate} className={classes["md-loggin"]}><span>Start it now!</span></button>
                            <button onClick={props.onClose} className={classes["md-close"]}><span>X</span></button>
                        </div>
                    </div>
                </div>
                <div className={classes["md-overlay"]} />
            </Fragment>
        );
    } else if (token && props.courseExists === true) {

        //Si tiene token y ya tiene el curso renderiza este codigo
        return (
            <Fragment>
                <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
                    <div className={`${classes["md-content"]}`}>
                        <div className={classes["info-container"]}>
                            <p>{`The ${props.data.title} course is already in your My Courses. Go there and let start to learn!`}</p>
                            <button onClick={onNavigate} className={classes["md-loggin"]}><span>Go to My Courses</span></button>
                            <button onClick={props.onClose} className={classes["md-close"]}><span>X</span></button>
                        </div>
                    </div>
                </div>
                <div className={classes["md-overlay"]} />
            </Fragment>
        );
    }
    if (!token) {

        //Si no hay token renderiza este codigo
        return (
            <Fragment>
                <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
                    <div className={`${classes["md-content"]}`}>
                        <div className={classes["info-container"]}>
                            <p>{`If you want to done the course you must to login.`}</p>
                            <button onClick={onLogin} className={classes["md-loggin"]}><span>Login</span></button>
                            <button onClick={props.onClose} className={classes["md-close"]}><span>X</span></button>
                        </div>
                    </div>
                </div>
                <div className={classes["md-overlay"]} />
            </Fragment>
        );
    }

}

export default CourseModal;
