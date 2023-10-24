import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ArticleList from "./components/articles/ArticleList";
import ArticleDetail from "./components/articles/ArticleDetail";
import TopicList from "./components/topics/TopicList";
import UserProfile from "./components/users/UserProfile";
import Header from "./components/common/Header";
import Navbar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import ArticleContext, { ArticleProvider } from "./contexts/ArticleContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";

function App() {
  return (
    <Router>
      <ArticleProvider>
        <div className="wrapper">
          <ToastContainer />
          <header className="header">
            <div className="content">
              <Header />
            </div>
          </header>

          <nav className="navbar">
            <div className="content">
              <Navbar />
            </div>
          </nav>

          <main className="main-content">
            <div className="content">
              <Routes>
                <Route path="/" element={<ArticleList />} />
                <Route
                  path="/articles/:article_id"
                  element={<ArticleDetail />}
                />
                <Route path="/topics" element={<TopicList />} />
                <Route path="/users/:username" element={<UserProfile />} />
              </Routes>
            </div>
          </main>

          <footer className="footer">
            <div className="content">
              <Footer />
            </div>
          </footer>
        </div>
      </ArticleProvider>
    </Router>
  );
}

export default App;
