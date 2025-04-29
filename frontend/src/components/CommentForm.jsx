import React, { useState } from "react";
import axios from "axios";

const CommentForm = ({ postId, onCommentAdded }) => {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      alert("Please enter a comment");
      return;
    }

    setIsSubmitting(true);
    try {
      // Send comment to API
      const response = await axios.post("http://localhost:3000/api/comments", {
        postId,
        commentText,
      });

      // Clear form
      setCommentText("");

      // Call the callback function with the new comment data
      if (response.data) {
        onCommentAdded(response.data);
      }
    } catch (error) {
      console.error("Error adding comment", error);
      alert("Failed to save comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      <div className="mb-3">
        <label htmlFor={`commentText-${postId}`} className="form-label">
          Add Comment
        </label>
        <textarea
          className="form-control"
          id={`commentText-${postId}`}
          rows="2"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          disabled={isSubmitting}
        ></textarea>
      </div>
      <button
        type="submit"
        className="btn btn-secondary"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Posting..." : "Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
