import classes from './CourseModal.module.css';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function CourseModal(props) {
    const [token, setToken] = useState (localStorage.getItem("token"));
    const navigate = useNavigate();
    const onLogin = () => {
        navigate("/login");
    }
    const onNavigate = () => {
        navigate("/campus/mylearnplace");
    }
    console.log(props.courseExists);
    if (token && props.courseExists === false) {
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
    } else if (token && props.courseExists === true){
        return(
            <Fragment>
                 <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
                     <div className={`${classes["md-content"]}`}>
                         <div className={classes["info-container"]}>
                             <p>{`The ${props.data.title} course is already in your MyLearnplace. Go there and let start to learn!`}</p>
                             <button onClick={onNavigate} className={classes["md-loggin"]}><span>Go to MyLearnplace</span></button>
                             <button onClick={props.onClose} className={classes["md-close"]}><span>X</span></button>
                         </div>
                     </div>
                 </div>
                 <div className={classes["md-overlay"]} />
             </Fragment>
             );
    }
    if (!token) {
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
