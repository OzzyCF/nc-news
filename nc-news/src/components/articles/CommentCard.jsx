import React from "react";
import { timeSince } from "../../utils/timeUtils";

function CommentCard({ comment }) {
  const daysAgo = Math.ceil(
    (new Date() - new Date(comment.created_at)) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="comment-bubble">
      <p>
        <strong>Author:</strong> {comment.author}
      </p>
      <p>{comment.body}</p>
      <p>Posted: {timeSince(comment.created_at)}</p>
      <p>Votes: {comment.votes}</p>
    </div>
  );
}

export default CommentCard;
