import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Review = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [editId, setEditId] = useState(null);

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

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <h2>Admin Reviews</h2>
      {user?.role === "admin" && (
        <div style={{ marginBottom: 32, background: "#fafafa", padding: 16, borderRadius: 8 }}>
          <h3>{editId ? "Edit Review" : "Add Review"}</h3>
          <input
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <textarea
            placeholder="Paragraph"
            value={paragraph}
            onChange={e => setParagraph(e.target.value)}
            rows={4}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <input
            placeholder="Image URL (optional)"
            value={image}
            onChange={e => setImage(e.target.value)}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <input
            placeholder="YouTube Link (optional)"
            value={link}
            onChange={e => setLink(e.target.value)}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <button onClick={handleAddOrUpdate} style={{ marginRight: 8 }}>
            {editId ? "Update" : "Add"}
          </button>
          {editId && (
            <button onClick={() => { setEditId(null); setTitle(""); setParagraph(""); setImage(""); setLink(""); }}>
              Cancel
            </button>
          )}
        </div>
      )}
      <div>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map(item => (
            <div key={item._id} style={{ border: "1px solid #ddd", borderRadius: 8, marginBottom: 24, padding: 16, background: "#fff" }}>
              {item.image && (
                <img src={item.image} alt={item.title} style={{ width: 220, maxHeight: 140, objectFit: "cover", borderRadius: 8, marginBottom: 8 }} />
              )}
              <h3 style={{ margin: "8px 0" }}>{item.title}</h3>
              <p style={{ color: "#444" }}>{item.paragraph}</p>
              {item.link && (
                <div style={{ margin: "8px 0" }}>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: "#e74c3c", fontWeight: 500 }}>
                    Watch on YouTube
                  </a>
                </div>
              )}
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

export default Review;