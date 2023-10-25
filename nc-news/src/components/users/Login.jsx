import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom"; // <-- Import this

function Login() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate(); // <-- Use the hook here

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get("https://backend-news-api-ozzycf.onrender.com/api/users")
      .then((response) => {
        const users = response.data.users;
        const user = users.find((user) => user.username === username);
        if (user) {
          setUser(user);
          setError(null);
          navigate("/"); // <-- Navigate to the main page upon successful login
        } else {
          setError("Invalid username. Please try again.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch users. Please try again.");
      });
  };

  return (
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
    </div>
  );
}

export default Login;
