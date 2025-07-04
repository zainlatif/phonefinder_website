// src/components/Card.jsx
import React from "react";
import "./Card.css";

const Card = ({ product, onClick }) => (
  <div className="card" onClick={onClick}>
    {product.image && (
      <img src={product.image} alt={product.title} className="card-image" />
    )}
    <h3 className="card-title">{product.title}</h3>
    <p className="card-desc">{product.description}</p>
    <p className="card-price">Rs.&nbsp;{product.price}</p>
  </div>
);

export default Card;
