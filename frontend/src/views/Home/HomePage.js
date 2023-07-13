import classes from './HomePage.module.css';

function HomePage() {
  return (
    <>
    <div className={`${classes["homePage-main"]} ${classes["homePage-images"]}`}>
        <div className={classes["homePage-title"]}>
            <h1>Make incredible things, with an awesome community </h1>
        </div>
        <div className={`${classes["homePage-info"]}`}>
            <div  className={classes["info-container"]}>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, corporis?</p>
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
            <div className={classes["footer-info"]}></div>
        </div>


    </div>
    </>
  );
}

export default HomePage;
