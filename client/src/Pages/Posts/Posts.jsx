import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config.json";
import axios from "axios";
import "./Posts.css";

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get(config.apiUrl);
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (post) => {
    setPosts(posts.filter((p) => p._id !== post._id));
    alert("Delete Success");
    await axios.delete(`${config.apiUrl}/${post._id}`);
  };

  return (
    <div className="posts">
      <div className="container">
        <button
          onClick={() => navigate("/post/new")}
          className="newbtn"
        >
          New Post
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Food</th>
              <th>Recipes</th>
              
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td id="titles"> {post.title} </td>
                <td> {post.content} </td>
                <td>
                  <img src={post.imageUrl} alt="Post" className="post-image" />
                </td>
                <td>
                  <button
                    onClick={() => navigate(`/post/${post._id}`)}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(post)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Posts;
