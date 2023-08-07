import classes from './CourseModal.module.css';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

function CourseModal(props) {
    const navigate = useNavigate();
    const onLogin = () => {
        navigate("/login");
    }
    return (
        <Fragment>
            <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
                <div className={`${classes["md-content"]}`}>
                    <div className={classes["info-container"]}>
                        <p>{`If you want to done the ${props.data.title} course you must to loggin.`}</p>
                        <button onClick={onLogin} className={classes["md-loggin"]}><span>Loggin</span></button>
                        <button onClick={props.onClose} className={classes["md-close"]}><span>X</span></button>
                    </div>
                </div>
            </div>
            <div className={classes["md-overlay"]} />
        </Fragment>
    );
}

export default CourseModal;
