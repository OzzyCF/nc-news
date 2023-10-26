import React, { useState, useEffect } from "react";
import { Link, useParams, Outlet } from "react-router-dom";
import axios from "axios";
import TopicArticleList from "./TopicArticleList";

function TopicList() {
  const [topics, setTopics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { topic_slug } = useParams();

  useEffect(() => {
    axios
      .get("https://backend-news-api-ozzycf.onrender.com/api/topics")
      .then((response) => {
        setTopics(response.data.topics);
        setIsLoading(false);
        if (
          topic_slug &&
          !response.data.topics.some((topic) => topic.slug === topic_slug)
        ) {
          setError("404: Topic not found.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch topics.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading topics...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Topics</h2>
      <div className="topics-button-container">
        {topics.map((topic) => (
          <Link
            to={`${topic.slug}`}
            key={topic.slug}
            className={`topic-button ${
              topic_slug === topic.slug ? "active" : "inactive"
            }`}
            title={topic.description}
          >
            {topic.slug}
          </Link>
        ))}
      </div>

      <Outlet />
    </div>
  );
}

export default TopicList;
