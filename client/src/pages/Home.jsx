// Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import Banner from "../components/Banner";
import Card from "../components/Card";

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

const getSectionProducts = (products, min, max = Infinity) =>
  products.filter((p) => p.price > min && p.price <= max);

const Home = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);

  // Parse search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("search") || "");
  }, [location.search]);

  // Fetch products from backend, filtered by searchTerm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = searchTerm
          ? `http://localhost:5000/api/products?search=${encodeURIComponent(searchTerm)}`
          : "http://localhost:5000/api/products";
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [searchTerm]);

  // Fetch comments when a product is selected
  useEffect(() => {
    if (selected) {
      setLoadingComments(true);
      axios
        .get(`http://localhost:5000/api/products/${selected._id}/comments`)
        .then((res) => setComments(res.data))
        .catch(() => setComments([]))
        .finally(() => setLoadingComments(false));
    }
  }, [selected]);

  const handleCardClick = (product) => setSelected(product);
  const handleBack = () => setSelected(null);

  const addToFav = async (productId) => {
    if (!user) {
      alert("Please log in first");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/users/favorite/${user.email}`,
        { productId }
      );
      alert("Added to favourites 🎉");
    } catch (err) {
      console.error("Add-fav error:", err);
      alert("Could not add favourite");
    }
  };

  const handleAddComment = async () => {
    if (!user) {
      alert("Please login to comment");
      return;
    }
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:5000/api/products/${selected._id}/comments`,
        { user: user.email, text: newComment }
      );
      setComments(res.data);
      setNewComment("");
    } catch (err) {
      alert("Error adding comment");
    }
  };

  const getSpecRows = (longDescription) => {
    if (!longDescription) return [];
    const specs = longDescription.split(",").map((s) => s.split(":"));
    while (specs.length < 25) specs.push(["", ""]);
    return specs.slice(0, 25);
  };

  // Filter products by search term (case-insensitive, matches title or description)
  const filteredProducts = searchTerm
    ? products.filter(
        (p) =>
          p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  // Sort products by creation (assuming _id is incremental)
  const sortedProducts = [...products].sort((a, b) => (a._id < b._id ? 1 : -1));

  // Section products
  const latestProducts = sortedProducts.slice(0, 8);
  const above70 = getSectionProducts(products, 70000);
  const between50and70 = getSectionProducts(products, 50000, 70000);
  const between35and50 = getSectionProducts(products, 35000, 50000);
  const between25and35 = getSectionProducts(products, 25000, 35000);
  const below25 = filteredProducts.filter((p) => p.price <= 25000);

  // Helper to render a section
  const renderSection = (title, prods) => (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ color: "#e74c3c", marginBottom: 8 }}>{title}</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {prods.length === 0 ? (
          <p>No products found.</p>
        ) : (
          prods.map((product) => (
            <Card
              key={product._id}
              product={product}
              onClick={() => handleCardClick(product)}
              onFav={addToFav}
            />
          ))
        )}
      </div>
    </div>
  );

  return (
    <div>
      <Banner />
      <h2>Products</h2>
      {selected ? (
        <div>
          <button onClick={handleBack} style={{ marginBottom: "16px" }}>
            ← Back
          </button>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thtdStyle}>Specification</th>
                <th style={thtdStyle}>Value</th>
                <th style={thtdStyle}>Extra</th>
              </tr>
            </thead>
            <tbody>
              {selected.specs &&
                selected.specs.map((row, idx) => (
                  <tr key={idx}>
                    <td style={thtdStyle}>{row.spec}</td>
                    <td style={thtdStyle}>{row.value}</td>
                    <td style={thtdStyle}>{row.extra}</td>
                  </tr>
                ))}
            </tbody>
          </table>

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
                            `http://localhost:5000/api/products/${selected._id}/comments/${c._id}`
                          );
                          setComments(
                            comments.filter((com) => com._id !== c._id)
                          );
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
      ) : (
        <>
          {renderSection(
            "Mobile phones Price in Pakistan > 70,000 Rs.",
            above70
          )}
          {renderSection(
            "Mobile phones Price in Pakistan 50,000 - 70,000 Rs.",
            between50and70
          )}
          {renderSection(
            "Mobile Prices Between 35,000 and 50,000 Rs.",
            between35and50
          )}
          {renderSection(
            "Mobile Prices Between 25,000 and 35,000 Rs.",
            between25and35
          )}
          {renderSection(
            "Mobile Prices Below 25,000 Rs.",
            below25
          )}
        </>
      )}
    </div>
  );
};

export default Home;
