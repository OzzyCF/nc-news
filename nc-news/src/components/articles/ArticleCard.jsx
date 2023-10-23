import React from "react";
import { Link } from "react-router-dom";
import { TbArrowBadgeUpFilled } from "react-icons/tb";

function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <img
        src={article.article_img_url}
        alt={article.title}
        className="article-image"
      />
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <div className="article-meta">
        <span className="author">
          By {article.author} <br />
        </span>
        <span>
          date published: {new Date(article.created_at).toLocaleDateString()}
        </span>

        <span> | Comments: {article.comment_count}</span>
      </div>

      <div className="vote-count">
        <span className="vote-count-icon">
          <TbArrowBadgeUpFilled /> Votes
        </span>
        {article.votes}
      </div>

      <Link to={`/articles/${article.id}`}>
        <button>Read More</button>
      </Link>
    </div>
  );
}

export default ArticleCard;
