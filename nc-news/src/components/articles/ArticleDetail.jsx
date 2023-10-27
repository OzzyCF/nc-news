import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentCard from "./CommentCard";
import { toast } from "react-toastify";
import { UserContext } from "../../contexts/UserContext";

function ArticleDetail() {
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { article_id: articleIdFromUrl } = useParams();
  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [hasVoted, setHasVoted] = useState(
    user ? localStorage.getItem(`${user.username}_${articleIdFromUrl}`) : null
  );

  const handleVote = (increment) => {
    if (hasVoted) {
      toast.error("You've already voted on this article.");
      return;
    }

    const updatedVotes = article.votes + increment;
    setArticle({ ...article, votes: updatedVotes });

    axios
      .patch(
        `https://backend-news-api-ozzycf.onrender.com/api/articles/${articleIdFromUrl}`,
        { inc_votes: increment }
      )
      .then(toast.success("Thank you for your vote"))
      .catch((error) => {
        console.error(error);
        setArticle({ ...article, votes: article.votes });
        toast.error("Failed to update the vote. Please try again.");
      });

    localStorage.setItem(`${user.username}_${articleIdFromUrl}`, "voted");
    setHasVoted("voted");
  };

  const handleCommentDelete = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.comment_id !== commentId)
    );
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }
    const currentArticleId =
      articleIdFromUrl || sessionStorage.getItem("lastVisitedArticleId");

    if (!currentArticleId) {
      console.error("No article ID found.");
      toast.error("Error submitting the comment.");
      return;
    }

    setIsSubmitting(true);

    axios
      .post(
        `https://backend-news-api-ozzycf.onrender.com/api/articles/${currentArticleId}/comments`,
        { username: user.username, body: newComment }
      )
      .then((response) => {
        setComments((prevComments) => [response.data.comment, ...prevComments]);
        setIsSubmitting(false);
        setNewComment("");
        toast.success("Comment added successfully.");
      })
      .catch((error) => {
        console.error("Error adding the comment:", error);
        setIsSubmitting(false);
        toast.error("Failed to add the comment. Please try again.");
      });
  };

  useEffect(() => {
    if (articleIdFromUrl) {
      sessionStorage.setItem("lastVisitedArticleId", articleIdFromUrl);
    }
    const currentArticleId =
      articleIdFromUrl || sessionStorage.getItem("lastVisitedArticleId");

    if (user) {
      const voteStatus = localStorage.getItem(
        `${user.username}_${articleIdFromUrl}`
      );
      setHasVoted(voteStatus);
    }

    if (!currentArticleId) {
      console.error("No article ID found.");
      return;
    }

    axios
      .get(
        `https://backend-news-api-ozzycf.onrender.com/api/articles/${currentArticleId}`
      )
      .then((response) => {
        setArticle(response.data.article);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the article:", error);
        setError("Article not found or failed to load.");
        setIsLoading(false);
      });

    axios
      .get(
        `https://backend-news-api-ozzycf.onrender.com/api/articles/${currentArticleId}/comments`
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
  }, [articleIdFromUrl]);

  if (isLoading) return <p>Loading article...</p>;
  if (error) return <p>{error}</p>;
  if (!article) return <p>Article not available.</p>;

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
        {!hasVoted && (
          <>
            <button onClick={() => handleVote(1)}>👍 Upvote</button>
            <button onClick={() => handleVote(-1)}>👎 Downvote</button>
          </>
        )}
      </div>

      <div className="comments-box">
        {comments.map((comment) => (
          <CommentCard
            key={comment.comment_id}
            comment={comment}
            onDelete={handleCommentDelete}
          />
        ))}
      </div>

      {!user && (
        <p id="comment-login-prompt">
          Please login if you would like to leave a comment.
        </p>
      )}
      {user && (
        <div className="add-comment-section">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment here..."
          />
          <button onClick={handleCommentSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Add Comment"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ArticleDetail;
