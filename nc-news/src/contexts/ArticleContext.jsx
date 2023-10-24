import React, { useState, useEffect } from "react";
import axios from "axios";

const ArticleContext = React.createContext();

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  return (
    <ArticleContext.Provider value={{ articles, isLoading }}>
      {children}
    </ArticleContext.Provider>
  );
};

export default ArticleContext;
