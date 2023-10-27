import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";

import ArticleContext from "../../contexts/ArticleContext";
import ArticleCard from "./ArticleCard";
import { InfinitySpin } from "react-loader-spinner";

function ArticleList() {
  const { articles, isLoading } = useContext(ArticleContext);
  const [sortMethod, setSortMethod] = useState("date");
  const [isAscending, setIsAscending] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(8);

  useEffect(() => {
    const method = searchParams.get("sort_by") || "date";
    const order = searchParams.get("order") === "asc";
    setSortMethod(method);
    setIsAscending(order);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
        <InfinitySpin width={200} color="#c40000" />
      </div>
    );
  }

  const sortedArticles = [...articles].sort((a, b) => {
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

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = sortedArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="wrapper">
      <div className="article-list">
        {currentArticles.map((article) => (
          <ArticleCard key={article.title} article={article} />
        ))}
      </div>
      <Pagination
        articlesPerPage={articlesPerPage}
        totalArticles={articles.length}
        paginate={paginate}
      />
    </div>
  );
}

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

export default ArticleList;
