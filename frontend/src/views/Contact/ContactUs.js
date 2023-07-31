import classes from "./ContactUs.module.css";
import { useRef, useState, Fragment } from "react";
import ReactDOM from "react-dom";
import ContactModal from "../Modal/ContactModal";


function ContactUs() {
  const nameRef = useRef("");
  const lastNameRef = useRef("");
  const emailRef = useRef("");
  const userCommentRef = useRef("");
  const [commentInfo, setCommentInfo] = useState({
    sending: false,
    message: "",
  })
  const [visible, setVisible] = useState(false);
  const handleClose = () => {
    const CommentForm = document.querySelector("#commentForm");
    CommentForm.reset();
    setVisible(!visible);
  }
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
      const fetchData = await response.json();
      if (response.ok) {
        console.log('Send Comment Successfully');

        setCommentInfo({
          sending: true,
          message: "Comment sending successfully!",
        })
        setVisible(!visible)
      }
    } catch (error) {
      console.log('Send Comment Failed');
      setCommentInfo("Comment sending Failed... try again.")
    }
  };
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ContactModal data={commentInfo} visible={visible} onClose={handleClose}/>,
        document.querySelector("#modal"))};

      <div className="contactUs-root">
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
    </Fragment>
  );
}

export default ContactUs;
