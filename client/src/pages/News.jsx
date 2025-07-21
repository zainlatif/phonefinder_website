import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import "../App.css";
import "./News.css";

const NEWS_PER_PAGE = 5;

const News = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Pagination logic
  const totalPages = Math.ceil(news.length / NEWS_PER_PAGE);
  const paginatedNews = news.slice(
    (currentPage - 1) * NEWS_PER_PAGE,
    currentPage * NEWS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="news-container">
      <h2 className="news-main-title">Latest News</h2>
      {user?.role === "admin" && (
        <div className="news-admin-form">
          <h3>{editId ? "Edit News" : "Add News"}</h3>
          <input
            className="news-input"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="news-textarea"
            placeholder="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={4}
          />
          <input
            className="news-input"
            placeholder="Image URL (optional)"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
          <button className="news-btn" onClick={handleAddOrUpdate}>
            {editId ? "Update" : "Add"}
          </button>
          {editId && (
            <button
              className="news-btn news-btn-cancel"
              onClick={() => { setEditId(null); setTitle(""); setContent(""); setImage(""); }}
            >
              Cancel
            </button>
          )}
        </div>
      )}
      <div>
        {paginatedNews.length === 0 ? (
          <p className="news-empty">No news yet.</p>
        ) : (
          paginatedNews.map(item => (
            <NewsCard
              key={item._id}
              news={item}
              onClick={() => navigate(`/news/${item._id}`)}
              isAdmin={user?.role === "admin"}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="news-pagination">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              className={`news-page-btn${currentPage === idx + 1 ? " active" : ""}`}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;