import React, { useContext } from "react";
import ArticleContext from "../../contexts/ArticleContext";
import ArticleCard from "./ArticleCard";

function ArticleList() {
  const { articles, isLoading } = useContext(ArticleContext);

  if (isLoading) return <p>Loading articles...</p>;

  const sortedArticles = [...articles].sort((a, b) => b.votes - a.votes);
  const topArticle = sortedArticles[0];
  const otherArticles = sortedArticles.slice(1);

  return (
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
  );
}

export default ArticleList;
