import classes from "./ContactUs.module.css";
import { useRef } from "react";

function ContactUs() {
  const nameRef = useRef("");
  const lastNameRef = useRef("");
  const emailRef = useRef("");
  const userCommentRef = useRef("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const contactData = {
      name: nameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      userComment: userCommentRef.current.value,
    };
  };
  return (
    <div className="contactUs-root">
      <div className={classes.title}>
        <h1>Contact Us</h1>
      </div>
      <form onSubmit={handleSubmit}>
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
            maxlength="50"
          ></textarea>
        </div>
        <div className={`${classes["form-info"]} ${classes["submit-button"]}`}>
          <button type="submit">
            <span>Send</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactUs;
