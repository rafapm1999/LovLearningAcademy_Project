import classes from "./ContactUs.module.css";
//Hacemos importacion de los elementos de react useRef, useState, Fragment
import { useRef, useState, Fragment } from "react";
//Importamos ReactDOM para usarlo en el momento de la alerta de nuestro modal
import ReactDOM from "react-dom";
//Importamos el Modal para Contact 
import ContactModal from "../Modal/ContactModal";

function ContactUs() {
  //Creamos referencias para usarlas en el formulario con useRef
  const nameRef = useRef("");
  const lastNameRef = useRef("");
  const emailRef = useRef("");
  const userCommentRef = useRef("");
  //Creamos una contante con useState para pasar informacion al modal
  const [commentInfo, setCommentInfo] = useState({
    sending: false,
    message: "",
  })
  //Usamos una contante booleana creada con useState para hacer aparecer o desaparecer al modal
  const [visible, setVisible] = useState(false);
  //Con esta función reseteamos el formulario una vez enviada la informacion, y cuando el usuario cierre el modal
  const handleClose = () => {
    const CommentForm = document.querySelector("#commentForm");
    CommentForm.reset();
    setVisible(!visible);
  }
  //Con esta funcion realizamos el fetch (POST) a la base de datos con la informacion redactada en el formulario 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactData = {
      name: nameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      userComment: userCommentRef.current.value,
    }
    try {
      const response = await fetch("http://localhost:8000/contact/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: contactData.name,
          lastName: contactData.lastName,
          email: contactData.email,
          userComment: contactData.userComment,
        }),
      });
      //Con esta funcion según el resultado del fetch realizado modificaremos el contenido de nuestro modal, dependiendo de si response.ok o no
      const fetchData = await response.json();
      if (response.ok) {
        

        setCommentInfo({
          sending: true,
          message: "Comment sending successfully!",
        })
        setVisible(!visible)
      }
    } catch (error) {
      
      setCommentInfo("Comment sending Failed... try again.")
    }
  };
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ContactModal data={commentInfo} visible={visible} onClose={handleClose} />,
        document.querySelector("#modal"))}

      <div className={classes["contactUs-root"]}>
        <div className={classes.title}>
          <h1>Contact Us</h1>
        </div>
        <form id="commentForm" onSubmit={handleSubmit}>
          <div className={classes["form-info"]}>
            <input
              ref={nameRef}
              type="text"
              name="name"
              id="userName"
              placeholder="Name"
            />
          </div>
          <div className={classes["form-info"]}>
            <input
              ref={lastNameRef}
              type="text"
              name="lastName"
              id="userLastName"
              placeholder="Lastname"
            />
          </div>
          <div className={classes["form-info"]}>
            <input
              ref={emailRef}
              type="email"
              name="email"
              id="userEmail"
              placeholder="Email"
            />
          </div>
          <div className={classes["form-info"]}>
            <textarea
              ref={userCommentRef}
              name="userComment"
              id="userCommentText"
              placeholder="What do you tell to us?"
              maxLength="50"
            ></textarea>
          </div>
          <div className={`${classes["form-info"]} ${classes["submit-button"]}`}>
            <button type="submit">
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default ContactUs;
