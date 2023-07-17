import { Fragment } from 'react';
import classes from './HomePage.module.css';

function HomePage() {
    //Intento de carrusel de palabras para community
    const handlerWords = () => {
        const wordsArray = [
            "community", "people", "members", "group"
        ]
        wordsArray.find((word) => {
            return(word === 1)
        })
    }
  return (
    <Fragment>
    <div className={`${classes["homePage-main"]} ${classes["homePage-images"]}`}>
        <div className={classes["homePage-title"]}>
            <h1>Learn new skills with an awesome <span>{handlerWords()}</span></h1>
        </div>
        <div className={`${classes["homePage-info"]}`}>
            <div  className={classes["info-container"]}>
                <h3>All kinds of <span>courses</span> for all kinds of <span>people</span></h3>
                <ul className={classes.list}>
                    <li>Students</li>
                    <li>Employees</li>
                    <li>Unemployed</li>
                    <li>Get started!</li>
                </ul>
            </div>
        </div>

    </div>
    <div className={classes["homePage-details-1"]}>
        <div className={classes["container-1"]}></div>
    </div>
    <div className={classes["homePage-details-2"]}></div>
    <div className={classes["homePage-details-3"]}></div>
    <div className={classes["homePage-details-4"]}></div>

    <div className={classes["homePage-footer"]}>
            <div className={classes.icons}>
            </div>
        </div>
    </Fragment>
  );
}

export default HomePage;
