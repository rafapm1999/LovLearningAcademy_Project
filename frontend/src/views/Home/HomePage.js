import { Fragment } from "react";
import classes from "./HomePage.module.css";
import { useState, useEffect } from 'react';

function HomePage() {
  //Carrusel para palabras clave del h1
    const words = ['community', 'people', 'members', 'courses'];
    const [index, setIndex] = useState(0);
    
    useEffect(() => {
      const interval = setInterval(() => {
        // Cambiar el índice para mostrar la siguiente palabra en el array
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
      }, 8000); // 5000 milisegundos = 5 segundos
  
      // Limpiar el intervalo cuando el componente se desmonte para evitar fugas de memoria
      return () => clearInterval(interval);
    }, []);
  
  return (
    <Fragment>
      <div
        className={`${classes["homePage-main"]}`}
      >
        <div className={classes["homePage-title"]}>
          <h1>
            Learn new skills with an awesome <span>{words[index]}</span>
          </h1>
        </div>
        <div className={`${classes["homePage-info"]}`}>
          <div className={classes["info-container"]}>
            <h3>
              All kind of <span>courses</span> for all kinds of <span>people</span>
            </h3>
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
        <div className={classes.icons}></div>
      </div>
    </Fragment>
  );
}

export default HomePage;
