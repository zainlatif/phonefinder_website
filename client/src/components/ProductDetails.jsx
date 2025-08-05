import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "./ProductDetails.css";

const ProductDetails = ({ product, onBack }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setLoadingComments(true);
      axios
        .get(`http://localhost:5000/api/products/${product._id}/comments`)
        .then((res) => setComments(res.data))
        .catch(() => setComments([]))
        .finally(() => setLoadingComments(false));

      // Check if product is in user's favorites
      if (user) {
        axios
          .get(`http://localhost:5000/api/users/${user.email}`)
          .then((res) => {
            setIsFav(res.data.favorites?.includes(product._id));
          })
          .catch(() => setIsFav(false));
      } else {
        setIsFav(false);
      }
    }
  }, [product, user]);

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

  const handleAddFav = async () => {
    if (!user) {
      alert("Please log in first");
      return;
    }
    setFavLoading(true);
    try {
      await axios.post(
        `http://localhost:5000/api/users/favorite/${user.email}`,
        { productId: product._id }
      );
      setIsFav(true);
    } catch (err) {
      alert("Error updating favorite status");
    }
    setFavLoading(false);
  };

  const handleRemoveFav = async () => {
    if (!user) {
      alert("Please log in first");
      return;
    }
    setFavLoading(true);
    try {
      await axios.post(
        `http://localhost:5000/api/users/unfavorite/${user.email}`,
        { productId: product._id }
      );
      setIsFav(false);
    } catch (err) {
      alert("Error updating favorite status");
    }
    setFavLoading(false);
  };

  return (
    <div className="product-details-container">
      <div className="product-details-back-row">
        {onBack && (
          <button onClick={onBack} className="product-details-back-btn">
            ← Back
          </button>
        )}
      </div>

      {/* Product Images */}
      <div className="product-details-images">
        {product.image && (
          <img src={product.image} alt={product.title} className="product-details-img" />
        )}
        {product.image2 && (
          <img src={product.image2} alt={product.title + " 2"} className="product-details-img" />
        )}
      </div>

      {/* Title and Description */}
      <h2 className="product-details-title">{product.title}</h2>
      <p className="product-details-desc">{product.description}</p>

      {/* Favorite Button */}
      <div className="product-details-fav-row">
        <button
          onClick={isFav ? handleRemoveFav : handleAddFav}
          disabled={favLoading}
          className={`product-details-fav-btn${isFav ? " fav" : ""}`}
        >
          {favLoading
            ? "Loading..."
            : isFav
            ? "Remove from Favorites"
            : "Add to Favorites"}
        </button>
      </div>

      {/* Specs Table */}
      <div className="product-details-table-wrap">
        <table className="product-details-table">
          <thead>
            <tr>
              <th>Specification</th>
              <th>Value</th>
              <th>Extra</th>
            </tr>
          </thead>
          <tbody>
            {product.specs &&
              product.specs.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.spec}</td>
                  <td>{row.value}</td>
                  <td>{row.extra}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Comments Section */}
      <div className="product-details-comments">
        <h3>Reviews & Comments</h3>
        {loadingComments ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul className="product-details-comments-list">
            {comments.map((c) => (
              <div key={c._id} className="comment-item">
                <span>
                  {c.user}: {c.text}
                </span>
                {(user?.email === c.user || user?.role === "admin") && (
                  <button
                    onClick={async () => {
                      await axios.delete(
                        `http://localhost:5000/api/products/${product._id}/comments/${c._id}`,
                        {
                          data: { userEmail: user.email, isAdmin: user.role === "admin" }
                        }
                      );
                      // Refresh comments after delete
                      const res = await axios.get(
                        `http://localhost:5000/api/products/${product._id}/comments`
                      );
                      setComments(res.data);
                    }}
                    className="comment-delete-btn"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </ul>
        )}
        {user && (
          <div className="product-details-add-comment">
            <textarea
              rows={2}
              className="product-details-comment-textarea"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={handleAddComment}
              className="product-details-comment-add-btn"
            >
              Add Comment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;