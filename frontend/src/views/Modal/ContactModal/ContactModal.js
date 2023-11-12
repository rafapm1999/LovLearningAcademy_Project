import classes from './ContactModal.module.css';
import { Fragment } from 'react';

function ContactModal(props) {
    return (
        <Fragment>
            <div className={`${classes["md-modal"]} ${classes["md-effect-1"]} ${props.visible && classes["md-show"]}`}>
                <div className={`${classes["md-content"]} ${props.data.sending ? classes.success : classes.danger}`}>
                    <div>
                        <p>{props.data.message}</p>
                        <button onClick={props.onClose} className={classes["md-close"]}>Close</button>
                    </div>
                </div>
            </div>
            <div className={classes["md-overlay"]} />
        </Fragment>
    );
}

export default ContactModal;
