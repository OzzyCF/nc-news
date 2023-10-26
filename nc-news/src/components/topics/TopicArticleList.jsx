import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArticleCard from "../articles/ArticleCard";

function TopicArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic_slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://backend-news-api-ozzycf.onrender.com/api/articles?topic=${topic_slug}`
      )
      .then((response) => {
        setArticles(response.data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load articles for topic:", error);
        setIsLoading(false);
      });
  }, [topic_slug]);

  if (isLoading) return <p>Loading articles...</p>;

  return (
    <div>
      <h2>Articles for {topic_slug}</h2>
      <div className="article-list">
        {articles.length === 0 ? (
          <p>No articles found for this topic.</p>
        ) : (
          articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))
        )}
      </div>
    </div>
  );
}

export default TopicArticleList;
