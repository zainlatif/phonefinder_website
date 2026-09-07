// src/components/Card.jsx
import React from "react";

const Card = ({ product, onClick }) => (
  <button type="button" className="group flex h-full min-h-56 w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" onClick={onClick}>
    {product.image && (
      <div className="flex h-36 items-center justify-center bg-slate-50 p-4">
        <img src={product.image} alt={product.title} className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105" />
      </div>
    )}
    <div className="flex flex-1 flex-col p-4">
      <h3 className="line-clamp-2 min-h-10 text-sm font-semibold text-slate-900">{product.title}</h3>
      <p className="mt-2 line-clamp-2 min-h-8 text-xs leading-4 text-slate-500">{product.description || "View product details"}</p>
      <p className="mt-auto pt-4 text-base font-bold text-orange-600">Rs. {product.price}</p>
    </div>
  </button>
);

export default Card;
