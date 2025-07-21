import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../App.css";
import "./Review.css";

const REVIEWS_PER_PAGE = 5;

const Review = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchReviews = async () => {
    const res = await axios.get("http://localhost:5000/api/reviews");
    setReviews(res.data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!title || !paragraph) return;
    if (editId) {
      await axios.put(`http://localhost:5000/api/reviews/${editId}`, { title, paragraph, image, link });
    } else {
      await axios.post("http://localhost:5000/api/reviews", { title, paragraph, image, link });
    }
    setTitle("");
    setParagraph("");
    setImage("");
    setLink("");
    setEditId(null);
    fetchReviews();
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setTitle(item.title);
    setParagraph(item.paragraph);
    setImage(item.image || "");
    setLink(item.link || "");
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/reviews/${id}`);
    fetchReviews();
  };

  // Pagination logic
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const paginatedReviews = reviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="review-container">
      <h2 className="review-main-title">Admin Reviews</h2>
      {user?.role === "admin" && (
        <div className="review-admin-form">
          <h3>{editId ? "Edit Review" : "Add Review"}</h3>
          <input
            className="review-input"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="review-textarea"
            placeholder="Paragraph"
            value={paragraph}
            onChange={e => setParagraph(e.target.value)}
            rows={4}
          />
          <input
            className="review-input"
            placeholder="Image URL (optional)"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
          <input
            className="review-input"
            placeholder="YouTube Link (optional)"
            value={link}
            onChange={e => setLink(e.target.value)}
          />
          <button className="news-btn" onClick={handleAddOrUpdate}>
            {editId ? "Update" : "Add"}
          </button>
          {editId && (
            <button
              className="news-btn news-btn-cancel"
              onClick={() => { setEditId(null); setTitle(""); setParagraph(""); setImage(""); setLink(""); }}
            >
              Cancel
            </button>
          )}
        </div>
      )}
      <div>
        {paginatedReviews.length === 0 ? (
          <p className="review-empty">No reviews yet.</p>
        ) : (
          paginatedReviews.map(item => (
            <div key={item._id} className="review-card">
              {item.image && (
                <img src={item.image} alt={item.title} className="review-img" />
              )}
              <h3 className="review-title">{item.title}</h3>
              <p className="review-paragraph">{item.paragraph}</p>
              {item.link && (
                <div className="review-link-wrap">
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="review-link">
                    Watch on YouTube
                  </a>
                </div>
              )}
              {user?.role === "admin" && (
                <div className="review-actions">
                  <button className="news-btn" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="news-btn news-btn-delete" onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              )}
            </div>
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

export default Review;