import classes from './AdminMembers.module.css';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";

function AdminMembers(props) {
  const token = localStorage.getItem("token").replaceAll('"', ""); 
  const [pending, setPending] = useState(true);
  const [users, setUsers] = useState([])
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const loaderFunction = () => {
    return (<Loader></Loader>)
  };

  const allUsers = async () => {
    if (pending === true) {
      try {
        const response = await fetch(
          "http://localhost:8000/auth/alluser",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setUsers(Array(data.data));
          setPending(false)

        }
      } catch (error) {
        console.log("Error de algo");
        navigate(`/error-page`, { state: error });
      }
    }
  };

  useEffect(() => {
    allUsers();
  }, []);

  if (pending === true) {
    return loaderFunction();
  }
  if (pending === false && users[0].length !== 0) {

    //Creación de la paginación del contenido de la tabla
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users[0].slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users[0].length / usersPerPage);
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    return (

      /* Component */
      <div className={`${classes["usersPage-root"]} ${props.visible && classes["blur"]} ${props.openProfile && classes["blur"]}`}>
        <div className={classes.title}>
          <h1>Users</h1>
        </div>
        <div className={classes["data-message"]}>
          <p>The total number of registered users in LovLearning Academy is {users[0].length}</p>
        </div>
        <div className={classes["table-container"]}>
          <table className={classes["usersPage-main-table"]}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Courses</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, i) => {
                return (
                  <tr className={classes["usersPage-info"]} key={i}>
                    <td>{user.name}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.courses.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination component */}
        <div className={classes["pagination-main"]}>
          <div className={classes["pagination-container"]}>
            <div className={classes["pagination-info"]}>

              <button onClick={() => paginate(currentPage === 1 ? currentPage : currentPage - 1)}> <span>&#5176;</span> Back </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={() => paginate(currentPage === totalPages ? currentPage : currentPage + 1)}> Next <span>&#5171;</span></button>

            </div>
          </div>
        </div>
        <div className={`${props.visible && classes["modal-main"]} ${props.openProfile && classes["modal-main"]}`}></div>
      </div>
    );
  };
}

export default AdminMembers;
