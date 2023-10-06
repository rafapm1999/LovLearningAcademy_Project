import './Loader.css';

function Loader(props) {
    if (props.userData !== undefined) {
        return (
            <div className="main-container">
                <div className="loader-section">
                    <h1>Hello {props.userData.name}!</h1>
                    <div className="loader"></div>
                    <h2>LovLearning Academy</h2>
                </div>
            </div>
        )

    } else {
        return (
            <div className="main-container">
                <div className="loader-section">
                    <h1>The best web site to learn</h1>
                    <div className="loader"></div>
                    <h2>LovLearning Academy</h2>
                </div>
            </div>
        )

    }
}

export default Loader;
