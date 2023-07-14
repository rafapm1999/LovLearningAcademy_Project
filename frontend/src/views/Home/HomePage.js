import classes from './HomePage.module.css';

function HomePage() {
  return (
    <>
    <div className={`${classes["homePage-main"]} ${classes["homePage-images"]}`}>
        <div className={classes["homePage-title"]}>
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, vero? </h1>
        </div>
        <div className={`${classes["homePage-info"]}`}>
            <div  className={classes["info-container"]}>
                <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, corporis?</h3>
                <ul className={classes.list}>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                </ul>
            </div>
        </div>
        <div className={classes.images}></div>
        <div className={classes["homePage-footer"]}>
            <div className={classes.icons}>
            </div>
        </div>
    </div>
    <div className={classes["homePage-details-1"]}>
        <div className={classes["container-1"]}></div>
    </div>
    <div className={classes["homePage-details-2"]}></div>
    <div className={classes["homePage-details-3"]}></div>
    <div className={classes["homePage-details-4"]}></div>

    <div className={classes["footer-info"]}></div>
    </>
  );
}

export default HomePage;
