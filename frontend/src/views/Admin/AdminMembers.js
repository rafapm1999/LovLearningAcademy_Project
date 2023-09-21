import classes from './AdminMembers.module.css';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

function AdminMembers() {
  const [pending, setPending] = useState(false);
  const [users, setUsers] = useState([])
  const [usersCopy, setUsersCopy] = useState([]);
  const [wordSearch, setWordSearch] = useState("");
  const inputRef = useRef("");
  const navigate = useNavigate();

  const loaderFunction = () => {
    setTimeout(() => {
      setPending(true)
    }, 1500)
    return (<Loader></Loader>)
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

  //Funcion para cuando se hace el submit cal pulsar el boton search
  const handleSearch = (e) => {
    e.preventDefault()
    const filteredUsers = users[0].filter(user =>
      user.title.toLowerCase().includes(wordSearch.toLowerCase())
    );
    setUsers(Array(filteredUsers))
    console.log(filteredUsers);
  }

  if (pending === false) {
    console.log("pending === false");
    return loaderFunction();
  }
  if (pending === true && users[0].length !== 0) {
    console.log(wordSearch);
    return (
      <div className={classes["coursesPage-root"]}>
        <div className={classes.title}>
          <h1>Users</h1>
        </div>
        <div className={classes.search}>
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
        </div>
        <div className={classes["usersPage-main"]}>
          {users[0].map((user, i) => {
            return (
              <div
                onClick={() => {
                  onHandlerClick(user._id);
                }}
                className={classes["usersPage-container"]}
                key={user.id}
              >
                <div className={classes["usersPage-info"]}>
                  <p>{user.name}</p>
                  <p>{user.lastName}</p>
                  <p>{user.email}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
}

export default AdminMembers;
