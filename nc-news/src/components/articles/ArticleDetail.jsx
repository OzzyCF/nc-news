import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ArticleDetail() {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://backend-news-api-ozzycf.onrender.com/api/articles/${article_id}`
      )
      .then((response) => {
        setArticle(response.data.article);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the article:", error);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading article...</p>;

  return (
    <div className="article-detail">
      <h2>{article.title}</h2>
      <img src={article.article_img_url} alt={article.title} />
      <p>
        <span>By: </span> {article.author}
      </p>
      <article className="article-body">{article.body}</article>
      <div className="article-detail-footer">
        <p>Published on: {new Date(article.created_at).toLocaleDateString()}</p>
        <p>Topic: {article.topic}</p>
        <p>Votes: {article.votes}</p>
        <p>Comments: {article.comment_count}</p>
      </div>
    </div>
  );
}

export default ArticleDetail;
