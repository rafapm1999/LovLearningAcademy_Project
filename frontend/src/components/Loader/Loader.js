import './Loader.css';
import { takeID, takeRole } from '../Utils';
import { useState } from 'react';

function Loader(props) {
   /*  const [token, setToken] = useState(localStorage.getItem("token"))
    const role = takeRole(token);
    const id = takeID(token); */
   
        return (
            <div className="main-container">
                <div className="loader-section">
                    <h1>The best web site to learn</h1>
                    <div className="loader"></div>
                    <h2>LovLearning Academy</h2>
                </div>
            </div>
        )

  /*   if (id !== "") {
        return (
            <div className="main-container">
                <div className="loader-section">
                    <h1>Hello {}!</h1>
                    <div className="loader"></div>
                    <h2>LovLearning Academy</h2>
                </div>
            </div>
        )
    }  else if (takeRole(token) === "admin" ) {
        return (
            <div className="main-container">
                <div className="loader-section">
                    <h1>Preparing all the info...</h1>
                    <div className="loader"></div>
                    <h2>LovLearning Academy</h2>
                </div>
            </div>
        )
    } */
}

export default Loader;
