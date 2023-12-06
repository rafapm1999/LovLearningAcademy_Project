import { Fragment } from "react";
import classes from "./Home.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Home() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  //Carrusel para palabras clave del h1
  const words = ["community", "people", "members", "courses"];
  const carrouselImages = ["carrousel-1.jpg", "carrousel-2.jpg"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!token) {
      const interval = setInterval(() => {
        // Cambiar el índice para mostrar la siguiente palabra en el array
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
      }, 8000);
      // Limpiar el intervalo cuando el componente se desmonte para evitar fugas de memoria
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        // Cambiar el índice para mostrar la siguiente palabra en el array
        setIndex((prevIndex) => (prevIndex + 1) % carrouselImages.length);
      }, 8000);
      return () => clearInterval(interval);
    }

    // Limpiar el intervalo cuando el componente se desmonte para evitar fugas de memoria

  }, []);
  if (token) {
    return (
      <Fragment>
        <div className={`${classes["homePage-main"]}`}>
          <div className={`${classes["homePage-main-header"]}`}>
            <div className={`${classes["homePage-main-header"]}`}>
              <div>
                <img src={require(`../../assets/${carrouselImages[index]}`)} alt={`Foto curso ${carrouselImages[index]}`} width={700} />
              </div>
            </div>
            <div className={`${classes["homePage-main-side"]}`}>
              <div className={`${classes["homePage-main-leftside"]}`}>
              </div>
              <div className={`${classes["homePage-main-centerside"]}`}>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div className={`${classes["homePage-main"]}`}>
          <div className={classes["homePage-title"]}>
            <h1>
              Learn new skills with an awesome <span>{words[index]}</span>
            </h1>
          </div>
          <div className={`${classes["homePage-info"]}`}>
            <div className={classes["info-container"]}>
              <h3>
                The favorite place for<span>learning lovers</span>
              </h3>
            </div>
          </div>
        </div>
        <div className={classes["CoursesCarrousel"]}>
        </div>
        <div className={classes["homePage-details"]}>
          <div className={classes["container-1"]}>
            <div className={classes["image-container-1"]}></div>
          </div>
          <div className={classes["container-2"]}>
            <section className={classes["info-section-1"]}>
              <div className={classes["img-section-1"]}></div>
              <div className={classes["details-section-1"]}>
                <Link className={classes.link} to="/login">
                  <h3>
                    Be a <span>student</span>
                  </h3>
                </Link>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
              </div>
            </section>
            <section className={classes["info-section-2"]}>
              <div className={classes["details-section-2"]}>
                <Link className={classes.link} to="/contact">
                  <h3>
                    Ask us a <span>question</span>
                  </h3>
                </Link>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
              </div>
              <div className={classes["img-section-2"]}></div>
            </section>
          </div>
        </div>


        <div className={classes["homePage-footer"]}>
          <div className={classes.icons}></div>
        </div>
      </Fragment>
    );
  }
}

export default Home;
