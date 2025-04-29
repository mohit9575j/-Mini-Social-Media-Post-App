import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentForm from "./CommentForm";
import PostForm from "./PostForm";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts and their comments from the API
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await axios.get("http://localhost:3000/api/posts");
      setPosts(result.data);

      // Fetch comments for each post
      const commentsPromises = result.data.map((post) =>
        fetchCommentsForPost(post.id)
      );
      await Promise.all(commentsPromises);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts", error);
      setError("Failed to load posts. Please try again later.");
      setLoading(false);
    }
  };

  // Fetch comments for a specific post
  const fetchCommentsForPost = async (postId) => {
    try {
      const result = await axios.get(
        `http://localhost:3000/api/comments/${postId}`
      );
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: result.data,
      }));
      return result.data;
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}`, error);
      return [];
    }
  };

  // Use useEffect to fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle when a new post is added
  const handlePostAdded = (newPost) => {
    // Update the state with the new post
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    // Initialize empty comments array for this post
    setComments((prevComments) => ({
      ...prevComments,
      [newPost.id]: [],
    }));
  };

  // Handle when a new comment is added
  const handleCommentAdded = async (newComment) => {
    const postId = newComment.postId;

    // First update the UI
    setComments((prevComments) => {
      const postComments = prevComments[postId] || [];
      return {
        ...prevComments,
        [postId]: [...postComments, newComment],
      };
    });

    // Then fetch all comments for this post to ensure we have the latest data
    await fetchCommentsForPost(postId);
  };

  if (loading && posts.length === 0) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  if (error && posts.length === 0) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <PostForm onPostAdded={handlePostAdded} />

      {posts.length === 0 ? (
        <div className="text-center my-5">
          <p>No posts yet. Create your first post above!</p>
        </div>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <div key={post.id} className="col-md-my-3">
              <div className="card h-100">
                <img
                  src={post.imageUrl}
                  className="card-img-top post-image"
                  alt="Post Image"
                  height="200"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=Image+Not+Found";
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{post.description}</h5>

                  {/* Display comments for this post */}
                  <div className="comments-container mb-3 flex-grow-1">
                    <h6>Comments ({comments[post.id]?.length || 0}):</h6>
                    {!comments[post.id] ? (
                      <p className="text-muted">Loading comments...</p>
                    ) : comments[post.id].length === 0 ? (
                      <p className="text-muted">No comments yet</p>
                    ) : (
                      <ul className="list-group">
                        {comments[post.id].map((comment) => (
                          <li key={comment.id} className="list-group-item py-1">
                            {comment.commentText}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <CommentForm
                    postId={post.id}
                    onCommentAdded={handleCommentAdded}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
