import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import ArticleContext from "../../contexts/ArticleContext";
import ArticleCard from "./ArticleCard";
import SwitchButton from "../common/SwitchButton";

function ArticleList() {
  const { articles, isLoading } = useContext(ArticleContext);
  const [sortMethod, setSortMethod] = useState("date");
  const [isAscending, setIsAscending] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const method = searchParams.get("sort_by") || "date";
    const order = searchParams.get("order") === "asc";
    setSortMethod(method);
    setIsAscending(order);
  }, [searchParams]);

  if (isLoading) return <p>Loading articles...</p>;

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

  const topArticle = sortedArticles[0];
  const otherArticles = sortedArticles.slice(1);

  return (
    <div>
      <div className="sorting-controls">
        <h5>Sort by: </h5>
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
          <div className="switch-label">Comment Count</div>
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

      <div className="article-list">
        <ArticleCard
          key={topArticle.title}
          article={topArticle}
          className="top-article"
        />

        {otherArticles.map((article) => (
          <ArticleCard key={article.title} article={article} />
        ))}
      </div>
    </div>
  );
}

export default ArticleList;
