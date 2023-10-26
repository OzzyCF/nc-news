import React, { useContext } from "react";
import { timeSince } from "../../utils/timeUtils";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

function CommentCard({ comment, onDelete }) {
  const { user } = useContext(UserContext);

  const handleDelete = () => {
    axios
      .delete(
        `https://backend-news-api-ozzycf.onrender.com/api/comments/${comment.comment_id}`
      )
      .then(() => {
        onDelete(comment.comment_id);
      })
      .catch((error) => {
        console.error("Error deleting the comment:", error);
        toast.error("Failed to delete the comment. Please try again.");
      });
  };

  return (
    <div className="comment-bubble">
      <p>
        <strong>Author:</strong> {comment.author}
      </p>
      <p>{comment.body}</p>
      <p>Posted: {timeSince(comment.created_at)}</p>
      <p>Votes: {comment.votes}</p>
      {user && user.username === comment.author && (
        <button className="comment-delete" onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
}

export default CommentCard;
