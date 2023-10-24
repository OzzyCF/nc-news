import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ArticleContext from "../../contexts/ArticleContext";

function Navbar() {
  const { refetch } = useContext(ArticleContext);

  return (
    <div className="navbar">
      <Link to="/" onClick={refetch}>
        Home
      </Link>
      <Link to="/topics" onClick={refetch}>
        Topics
      </Link>
      <Link to="/users/username" onClick={refetch}>
        Profile
      </Link>
    </div>
  );
}

export default Navbar;
