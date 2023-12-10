import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { takeRole, takeID } from '../../components/Utils';
import Loader from "../../components/Loader/Loader";

function LoaderPage() {
    const [token, setToken] = useState(localStorage.getItem("token").replaceAll('"', ""))
    const role = takeRole(token);
    const id = takeID(token);

    const [pending, setPending] = useState(false);
    const [adminRole, setAdminRole] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    console.log(data);

    const userData = data;

    const loaderFunction = () => {
        if (role === "user") {
            setTimeout(() => {
                navigate("/user/mylearnplace")
            }, 1500)
            return (<Loader userData={userData}></Loader>)
        }
        if (role === "admin") {
            setTimeout(() => {
                navigate("/admin/bbdd-members", { state: userData })
            }, 1500)
            return (<Loader userData={userData} adminRole={adminRole}></Loader>)
        }
    };

    if (pending === false) {
        return loaderFunction();
    };


}
export default LoaderPage;
