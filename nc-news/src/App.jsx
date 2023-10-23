import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ArticleList from "./components/articles/ArticleList";
import ArticleDetail from "./components/articles/ArticleDetail";
import TopicList from "./components/topics/TopicList";
import UserProfile from "./components/users/UserProfile";
import Header from "./components/common/Header";
import Navbar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import "./app.css";

// Placeholder Navbar component

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/articles/:article_id" element={<ArticleDetail />} />
            <Route path="/topics" element={<TopicList />} />
            <Route path="/users/:username" element={<UserProfile />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
