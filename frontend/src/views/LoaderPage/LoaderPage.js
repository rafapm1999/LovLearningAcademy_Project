import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { takeRole, takeID } from '../../components/Utils';
import Loader from "../../components/Loader/Loader";

function LoaderPage() {
    const [token, setToken] = useState(localStorage.getItem("token").replaceAll('"', ""))
    const role = takeRole(token);
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const userData = data;

    if (role === "user" && token) {
        navigate("/user/mycourses")
    } else if (role === "admin" && token) {
        navigate("/admin/bbdd-members", { state: userData })
    } else if (role === "" && !token) {
        navigate("/")
    }
}
export default LoaderPage;
