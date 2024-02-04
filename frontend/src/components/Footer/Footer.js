import classes from './Footer.module.css';
import { Link } from "react-router-dom"

function Footer() {
  return (
    <div className={classes["footer-root"]}>
      <div className={classes["footer-sections-main"]}>
        <section className={classes["socials-section"]}>
          <h4 className={classes["title"]}>Socials</h4>
          <ul>
            <li className={classes["list"]}>
              <a className={classes["link"]} href='https://github.com/rafapm1999' target='_blank'>Github</a>
            </li>
            <li className={classes["list"]}>
              <a className={classes["link"]} href='https://www.linkedin.com/in/rafael-portillo-morales/' target='_blank'>Linkedin</a>
            </li>
          </ul>
        </section>
        <section className={classes["contact-section"]}>
          <h4 className={classes["title"]}>Send a message</h4>
          <ul>
            <li className={classes["list"]}><Link className={classes["link"]} to="/contact">Contact Us</Link></li>
          </ul>
        </section>
        <section className={classes["about-section"]}>
          <h4 className={classes["title"]}>Our Info</h4>
          <ul>
            <li className={classes["list"]}><Link className={classes["link"]} to="/about">About Us</Link></li>
          </ul>
        </section>

      </div>
      <div className={classes["footer-data-main"]}>
        <h4 className={classes["title"]}>{"Creating and programming by rafaCode()"}</h4>
      </div>
    </div>
  );
}

export default Footer;
