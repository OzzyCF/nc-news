import React from "react";
import { Link } from "react-router-dom";
import { TbArrowBadgeUpFilled } from "react-icons/tb";

function ArticleCard({ article, className }) {
  return (
    <div className={`article-card ${className || ""}`}>
      <Link to={`/articles/${article.article_id}`}>
        <img
          src={article.article_img_url}
          alt={article.title}
          className="article-image"
        />
        <h4>{article.title}</h4>
        <p>{article.description}</p>
        <div className="article-meta">
          <span>Comments: {article.comment_count}</span>
          <div className="vote-count">
            <span className="vote-count-icon">
              <TbArrowBadgeUpFilled /> Votes
            </span>
            {article.votes}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ArticleCard;
