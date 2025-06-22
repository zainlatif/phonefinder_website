import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const News = () => {
  const { user } = useAuth();
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchNews = async () => {
    const res = await axios.get("http://localhost:5000/api/news");
    setNews(res.data);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!title || !content) return;
    if (editId) {
      await axios.put(`http://localhost:5000/api/news/${editId}`, { title, content, image });
    } else {
      await axios.post("http://localhost:5000/api/news", { title, content, image });
    }
    setTitle("");
    setContent("");
    setImage("");
    setEditId(null);
    fetchNews();
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setTitle(item.title);
    setContent(item.content);
    setImage(item.image || "");
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/news/${id}`);
    fetchNews();
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <h2>Latest News</h2>
      {user?.role === "admin" && (
        <div style={{ marginBottom: 32, background: "#fafafa", padding: 16, borderRadius: 8 }}>
          <h3>{editId ? "Edit News" : "Add News"}</h3>
          <input
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={4}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <input
            placeholder="Image URL (optional)"
            value={image}
            onChange={e => setImage(e.target.value)}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <button onClick={handleAddOrUpdate} style={{ marginRight: 8 }}>
            {editId ? "Update" : "Add"}
          </button>
          {editId && (
            <button onClick={() => { setEditId(null); setTitle(""); setContent(""); setImage(""); }}>
              Cancel
            </button>
          )}
        </div>
      )}
      <div>
        {news.length === 0 ? (
          <p>No news yet.</p>
        ) : (
          news.map(item => (
            <div key={item._id} style={{ border: "1px solid #ddd", borderRadius: 8, marginBottom: 24, padding: 16, background: "#fff" }}>
              {item.image && (
                <img src={item.image} alt={item.title} style={{ width: 220, maxHeight: 140, objectFit: "cover", borderRadius: 8, marginBottom: 8 }} />
              )}
              <h3 style={{ margin: "8px 0" }}>{item.title}</h3>
              <p style={{ color: "#444" }}>{item.content}</p>
              <div style={{ color: "#888", fontSize: 13, marginBottom: 8 }}>
                {new Date(item.date).toLocaleDateString()}
              </div>
              {user?.role === "admin" && (
                <div>
                  <button onClick={() => handleEdit(item)} style={{ marginRight: 8 }}>Edit</button>
                  <button onClick={() => handleDelete(item._id)} style={{ color: "red" }}>Delete</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default News;