import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentCard from "./CommentCard";
import { toast } from "react-toastify";

function ArticleDetail() {
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();
  const [showComments, setShowComments] = useState(false);

  const handleVote = (increment) => {
    const updatedVotes = article.votes + increment;
    setArticle({ ...article, votes: updatedVotes }); // Optimistic update
    axios
      .patch(
        `https://backend-news-api-ozzycf.onrender.com/api/articles/${article_id}`,
        { inc_votes: increment }
      )
      .catch((error) => {
        console.error(error);
        setArticle({ ...article, votes: article.votes }); // Revert on error
        toast.error("Failed to update the vote. Please try again.");
      });
  };

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
    axios
      .get(
        `https://backend-news-api-ozzycf.onrender.com/api/articles/${article_id}/comments`
      )
      .then((response) => {
        const sortedComments = response.data.comments.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setComments(sortedComments);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the comments:", error);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading || !article) return <p>Loading article...</p>;

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
        <button onClick={() => handleVote(1)}>👍 Upvote</button>
        <button onClick={() => handleVote(-1)}>👎 Downvote</button>
      </div>
      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>
      {showComments && (
        <div className="comments-box">
          {comments.map((comment) => (
            <CommentCard key={comment.comment_id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ArticleDetail;
