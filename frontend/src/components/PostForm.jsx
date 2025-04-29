import React, { useState } from "react";
import axios from "axios";

const PostForm = ({ onPostAdded }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl || !description) {
      alert("Please fill out all fields");
      return;
    }

    try {
      // Send the new post to the API
      const response = await axios.post("http://localhost:3000/api/posts", {
        imageUrl,
        description,
      });

      // Clear the form
      setImageUrl("");
      setDescription("");

      // Pass the new post data to the parent component to update the UI
      onPostAdded(response.data);
    } catch (error) {
      console.error("Error creating post", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="card my-4">
      <div className="card-body">
        <h5 className="card-title">Create a Post</h5>
        <form onSubmit={handlePostSubmit}>
          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">
              Image URL
            </label>
            <input
              type="text"
              className="form-control"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
