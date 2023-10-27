import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArticleCard from "../articles/ArticleCard";
import { InfinitySpin } from "react-loader-spinner";
import { SortingContext } from "../../contexts/SortingContext";

function TopicArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic_slug } = useParams();
  const [error, setError] = useState(null);
  const { sortMethod, isAscending } = useContext(SortingContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(8); // Adjust this value as needed

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://backend-news-api-ozzycf.onrender.com/api/articles?topic=${topic_slug}`
      )
      .then((response) => {
        const fetchedArticles = response.data.articles;

        const sortedArticles = [...fetchedArticles].sort((a, b) => {
          let diff;
          switch (sortMethod) {
            case "votes":
              diff = b.votes - a.votes;
              break;
            case "comment_count":
              diff = b.comment_count - a.comment_count;
              break;
            case "date":
              diff = new Date(b.date) - new Date(a.date);
              break;
            default:
              diff = 0;
          }

          return isAscending ? diff : -diff;
        });

        // Set the sorted articles to the state
        setArticles(sortedArticles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load articles for topic:", error);
        setError("Failed to load articles for this topic.");
        setIsLoading(false);
      });
  }, [topic_slug, sortMethod, isAscending]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
        <InfinitySpin width={200} color="#c40000" />
      </div>
    );
  }
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Articles for {topic_slug}</h2>
      <div className="article-list">
        {currentArticles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
      <Pagination
        articlesPerPage={articlesPerPage}
        totalArticles={articles.length}
        paginate={setCurrentPage}
      />
    </div>
  );

  function Pagination({ articlesPerPage, totalArticles, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
      pageNumbers.push(i);
    }

    const handlePageClick = (pageNumber, event) => {
      event.preventDefault();
      paginate(pageNumber);
    };

    return (
      <div className="pagination">
        {pageNumbers.map((number) => (
          <span
            key={number}
            onClick={(e) => handlePageClick(number, e)}
            className="page-number"
          >
            {number}
          </span>
        ))}
      </div>
    );
  }
}

export default TopicArticleList;
