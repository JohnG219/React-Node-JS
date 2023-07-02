import config from "../../config.json";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Post.css";
import { useParams, useNavigate } from "react-router-dom";

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      const { data } = await axios.get(`${config.apiUrl}/${id}`);
      setPost(data);
    };
    fetchPost();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id === "new") {
      await axios.post(config.apiUrl, post);
      alert("New post create successfully!");
    } else {
      await axios.put(`${config.apiUrl}/${id}`, post);
      alert("Post updated successfully!");
    }
    navigate("/");
  };

  return (
    <div className="post__wrapper">
      <div className="container2">
        <form className="post">
          <input
            type="text"
            placeholder="Food"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Recipes"
            name="content"
            value={post.content}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Image URL"
            name="imageUrl"
            value={post.imageUrl}
            onChange={handleChange}
          />
          <button onClick={handleSubmit} className="btn btn-primary">
            {id === "new" ? "Post" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
