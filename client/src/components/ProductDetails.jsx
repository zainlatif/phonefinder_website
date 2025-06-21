import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const tableStyle = {
  borderCollapse: "collapse",
  width: "100%",
  marginTop: "24px",
};

const thtdStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "left",
};

const ProductDetails = ({ product, onBack }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    if (product) {
      setLoadingComments(true);
      axios
        .get(`http://localhost:5000/api/products/${product._id}/comments`)
        .then((res) => setComments(res.data))
        .catch(() => setComments([]))
        .finally(() => setLoadingComments(false));
    }
  }, [product]);

  const handleAddComment = async () => {
    if (!user) {
      alert("Please login to comment");
      return;
    }
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:5000/api/products/${product._id}/comments`,
        { user: user.email, text: newComment }
      );
      setComments(res.data);
      setNewComment("");
    } catch (err) {
      alert("Error adding comment");
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 24 }}>
      {onBack && (
        <button onClick={onBack} style={{ marginBottom: "16px" }}>
          ← Back
        </button>
      )}

      {/* Product Image */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 24,
          display: "flex",
          justifyContent: "center",
          gap: 24,
        }}
      >
        {product.image && (
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "220px",
              height: "220px",
              objectFit: "contain",
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              background: "#fff",
            }}
          />
        )}
        {product.image2 && (
          <img
            src={product.image2}
            alt={product.title + " 2"}
            style={{
              width: "220px",
              height: "220px",
              objectFit: "contain",
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              background: "#fff",
            }}
          />
        )}
      </div>

      {/* Title and Description */}
      <h2 style={{ margin: "0 0 8px 0", textAlign: "center" }}>
        {product.title}
      </h2>
      <p
        style={{
          margin: "0 0 18px 0",
          textAlign: "center",
          color: "#444",
        }}
      >
        {product.description}
      </p>

      {/* Specs Table */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thtdStyle}>Specification</th>
            <th style={thtdStyle}>Value</th>
            <th style={thtdStyle}>Extra</th>
          </tr>
        </thead>
        <tbody>
          {product.specs &&
            product.specs.map((row, idx) => (
              <tr key={idx}>
                <td style={thtdStyle}>{row.spec}</td>
                <td style={thtdStyle}>{row.value}</td>
                <td style={thtdStyle}>{row.extra}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Comments Section */}
      <div style={{ marginTop: 32 }}>
        <h3>Reviews & Comments</h3>
        {loadingComments ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul>
            {comments.map((c, idx) => (
              <li key={c._id || idx}>
                <b>{c.user}:</b> {c.text}
                <span style={{ color: "#888", fontSize: "0.9em" }}>
                  {new Date(c.date).toLocaleString()}
                </span>
                {user?.role === "admin" && (
                  <button
                    style={{ marginLeft: 10, color: "red" }}
                    onClick={async () => {
                      await axios.delete(
                        `http://localhost:5000/api/products/${product._id}/comments/${c._id}`
                      );
                      setComments(comments.filter((com) => com._id !== c._id));
                    }}
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
        {user && (
          <div style={{ marginTop: 12 }}>
            <textarea
              rows={2}
              style={{ width: "100%" }}
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment} style={{ marginTop: 4 }}>
              Add Comment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;