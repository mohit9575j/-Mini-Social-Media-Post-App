import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PostList from "./components/PostList";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <div className="container mt-4">
        <h1 className="text-center mb-4">Social Media Post</h1>
        <PostList />
      </div>
    </div>
  );
}

export default App;
