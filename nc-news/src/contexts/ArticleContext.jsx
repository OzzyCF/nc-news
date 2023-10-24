import React, { useState, useEffect } from "react";
import axios from "axios";

const ArticleContext = React.createContext();

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArticles = () => {
    setIsLoading(true);
    axios
      .get("https://backend-news-api-ozzycf.onrender.com/api/articles")
      .then((response) => {
        setArticles(response.data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setIsLoading(false);
      });
  };

  useEffect(fetchArticles, []);

  const updateArticleVotes = (article_id, deltaVotes) => {
    setArticles((prevArticles) => {
      return prevArticles.map((article) => {
        if (article.article_id === article_id) {
          return { ...article, votes: article.votes + deltaVotes };
        }
        return article;
      });
    });
  };

  return (
    <ArticleContext.Provider
      value={{
        articles,
        isLoading,
        updateArticleVotes,
        refetch: fetchArticles,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export default ArticleContext;
