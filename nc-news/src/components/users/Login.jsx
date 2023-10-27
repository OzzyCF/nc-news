import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://backend-news-api-ozzycf.onrender.com/api/users")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch users. Please try again.");
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = users.find((user) => user.username === username);
    if (user) {
      setUser(user);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/");
    } else {
      setError("Invalid username. Please try again.");
    }
  };

  return (
    <div className="wrapper">
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
        <div className="user-list">
          <h3>Available Users:</h3>
          <ul>
            {users.map((user) => (
              <li key={user.username}>{user.username}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;
