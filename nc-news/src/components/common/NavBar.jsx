import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ArticleContext from "../../contexts/ArticleContext";
import { UserContext } from "../../contexts/UserContext";

function Navbar() {
  const { refetch } = useContext(ArticleContext);
  const { user, logout } = useContext(UserContext); // logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // home page after logout
  };

  return (
    <div className="navbar">
      <Link to="/" onClick={refetch}>
        Home
      </Link>
      <Link to="/topics" onClick={refetch}>
        Topics
      </Link>
      {user && (
        <>
          <Link to={`/users/${user.username}`} onClick={refetch}>
            Profile
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      <div className="user-login">
        {user ? (
          <p>Welcome, {user.username}!</p>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
