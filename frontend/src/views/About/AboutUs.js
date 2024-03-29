import classes from "./AboutUs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBrain, faTrophy, faGraduationCap} from "@fortawesome/free-solid-svg-icons"
function AboutUs() {
  return (
    <div>
      <div className={classes.title}>
        <h1>About us</h1>
      </div>
      <div className={classes["main-container"]}>
        <div className={classes["container-1"]}>
          <div className={classes["container-info-1"]}>
            <div className={classes["bg-photo-1"]}></div>
            <div className={classes["info-section-1"]}>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos
                dolore neque autem nam dignissimos ut tempore temporibus
                laboriosam. Beatae nisi aspernatur consectetur. Aliquam voluptate
                ut laborum deserunt eveniet consequuntur blanditiis ex illo
                ratione quo dolor architecto, quis placeat sapiente quia, iusto
                non numquam molestiae inventore animi magnam suscipit obcaecati
                unde.
              </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos
                dolore neque autem nam dignissimos ut tempore temporibus
                laboriosam. Beatae nisi aspernatur consectetur. Aliquam voluptate
                ut laborum deserunt eveniet consequuntur blanditiis ex illo
                ratione quo dolor architecto, quis placeat sapiente quia, iusto
                non numquam molestiae inventore animi magnam suscipit obcaecati
                unde.
              </p>
            </div>
          </div>
          <div className={classes["container-info-2"]}>
            <div className={classes["info-section-2"]}>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos
                dolore neque autem nam dignissimos ut tempore temporibus
                laboriosam. Beatae nisi aspernatur consectetur. Aliquam voluptate
                ut laborum deserunt eveniet consequuntur blanditiis ex illo
                ratione quo dolor architecto, quis placeat sapiente quia, iusto
                non numquam molestiae inventore animi magnam suscipit obcaecati
                unde.
              </p>
              <div className={classes.icons}>
                <span><FontAwesomeIcon icon={faBrain} size="2xl" /></span>
                <span><FontAwesomeIcon icon={faTrophy} size="2xl" /></span>
                <span><FontAwesomeIcon icon={faGraduationCap} size="2xl" /></span>
              </div>
              
            </div>
            <div className={classes["bg-photo-2"]}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
