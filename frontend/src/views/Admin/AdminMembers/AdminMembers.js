import classes from './AdminMembers.module.css';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";

function AdminMembers(props) {
  const token = localStorage.getItem("token").replaceAll('"', ""); 
  const [pending, setPending] = useState(false);
  const [adminRole, setAdminRole] = useState(false)
  const [users, setUsers] = useState([])
  const [usersCopy, setUsersCopy] = useState([]);
  const [wordSearch, setWordSearch] = useState("");
  const inputRef = useRef("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const loaderFunction = () => {
    setTimeout(() => {
      setPending(true)
      setAdminRole(!adminRole)
    }, 1500)
    return (<Loader pending={pending} adminRole={adminRole}></Loader>)
  };

  const allUsers = async () => {
    if (pending === false) {
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
        console.log(data);
        if (response.ok) {
          setUsers(Array(data.data));
          setUsersCopy(Array(data.data))

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




  const onHandlerClick = () => { };

  //Funcion para cuando se hace el submit al pulsar el boton search
  const handleSearch = (e) => {
    e.preventDefault()
    const filteredUsers = users[0].filter(user =>
      user.name.toLowerCase().includes(wordSearch.toLowerCase())
    );
    setUsers(Array(filteredUsers))
    console.log(filteredUsers);
  }

  if (pending === false) {
    console.log("pending === false");
    return loaderFunction();
  }
  if (pending === true && users[0].length !== 0) {
    //Creación de la paginación del contenido de la tabla
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users[0].slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users[0].length / usersPerPage);
    const paginate = (pageNumber) => {
      console.log("Has dado click");
      console.log(currentUsers);
      setCurrentPage(pageNumber);
    };
    console.log(wordSearch);
    console.log('console.log(Math.ceil(users.length / usersPerPage));');

    console.log(Math.ceil(users[0].length / usersPerPage));
    return (
      <div className={`${classes["usersPage-root"]} ${props.visible && classes["blur"]} ${props.openProfile && classes["blur"]}`}>
        <div className={classes.title}>
          <h1>Users</h1>
        </div>
        {/* <div className={classes.search}>
          <form onSubmit={handleSearch}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search the user..."
              value={wordSearch}
              onChange={e => {
                setWordSearch(e.target.value)
                const filteredUsers = users[0].filter(user =>
                  user.title.toLowerCase().includes(wordSearch.toLowerCase())
                );
                setUsers(Array(filteredUsers))
                if (e.target.value === "") {
                  setUsers(usersCopy)
                }
              }}
            />
            <button type="submit">Search</button>
          </form>
        </div> */}
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
