import classes from './CourseModal.module.css';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

function CourseModal(props) {
    let userData = props.userData;
    const navigate = useNavigate();
    const onLogin = () => {
        navigate("/login");
    }
    const onNavigate = () => {
        navigate("/mylearnplace");
    }
    if (props.logged === true ) {
        console.log(props.userData);
       return(
       <Fragment>
            <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
                <div className={`${classes["md-content"]}`}>
                    <div className={classes["info-container"]}>
                        <p>{`Congrats! The ${props.data.title} course is now in MyLearnplace. Enjoy it!`}</p>
                        <button onClick={onNavigate} className={classes["md-loggin"]}><span>Start it now!</span></button>
                        <button onClick={props.onClose} className={classes["md-close"]}><span>X</span></button>
                    </div>
                </div>
            </div>
            <div className={classes["md-overlay"]} />
        </Fragment>
        );
    } else if (props.logged === false) {
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

}

export default CourseModal;
