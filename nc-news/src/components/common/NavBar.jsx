import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useSearchParams } from "react-router-dom"; // Included useSearchParams
import ArticleContext from "../../contexts/ArticleContext";
import { UserContext } from "../../contexts/UserContext";

import { SortingContext } from "../../contexts/SortingContext";
import SwitchButton from "../common/SwitchButton";

function Navbar() {
  const { refetch } = useContext(ArticleContext);
  const { user, setUser, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const { sortMethod, setSortMethod, isAscending, setIsAscending } =
    useContext(SortingContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="nav-buttons">
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
      <div className="sorting-controls">
        <h6>Sort by: </h6>
        <div className="switch-container">
          <SwitchButton
            onChange={() => {
              setSortMethod("date");
              setSearchParams({
                sort_by: "date",
                order: isAscending ? "asc" : "desc",
              });
            }}
            checked={sortMethod === "date"}
          />
          <div className="switch-label">Date</div>
        </div>
        <div className="switch-container">
          <SwitchButton
            onChange={() => {
              setSortMethod("comment_count");
              setSearchParams({
                sort_by: "comment_count",
                order: isAscending ? "asc" : "desc",
              });
            }}
            checked={sortMethod === "comment_count"}
          />
          <div className="switch-label">Comments</div>
        </div>
        <div className="switch-container">
          <SwitchButton
            onChange={() => {
              setSortMethod("votes");
              setSearchParams({
                sort_by: "votes",
                order: isAscending ? "asc" : "desc",
              });
            }}
            checked={sortMethod === "votes"}
          />
          <div className="switch-label">Votes</div>
        </div>
        <div className="switch-container">
          <SwitchButton
            onChange={() => {
              setIsAscending((prev) => !prev);
              setSearchParams({
                sort_by: sortMethod,
                order: !isAscending ? "asc" : "desc",
              });
            }}
            checked={isAscending}
          />
          <div className="switch-label">Ascending</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
