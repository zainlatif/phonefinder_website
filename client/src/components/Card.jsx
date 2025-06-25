// src/components/Card.jsx
import React from "react";

const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "5px",
  marginBottom: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  maxWidth: "110px",
  width: "110px",
  minHeight: "200px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  background: "#fafafa"
};

const imageStyle = {
  width: "100%",
  height: "120px", // increased image height
  objectFit: "contain",
  borderRadius: "6px 6px 0 0",
  marginBottom: "4px" // reduced margin
};

const Card = ({ product, onClick, onFav }) => (
  <div style={cardStyle} onClick={onClick}>
    {product.image && (
      <img src={product.image} alt={product.title} style={imageStyle} />
    )}
    <h3 style={{ fontSize: "0.98rem", margin: "4px 0" }}>{product.title}</h3>
    <p style={{ fontSize: "0.91rem", margin: "2px 0", minHeight: "32px" }}>{product.description}</p>
    <p style={{ fontWeight: "bold", color: "#2d2d2d", margin: "2px 0" }}>Rs.&nbsp;{product.price}</p>
    {onFav && (
      <button
        onClick={e => {
          e.stopPropagation();
          onFav(product._id);
        }}
        style={{ marginTop: "2px" }}
      >
        ❤️ Favourite
      </button>
    )}
  </div>
);

export default Card;
