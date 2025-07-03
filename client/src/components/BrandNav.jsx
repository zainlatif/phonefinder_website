import React from "react";

const brands = [
  "Samsung", "Infinix", "Oppo", "Xiaomi", "Vivo", "Tecno", "Realme", "Itel"
];

const BrandNav = ({ selectedBrand, onSelect }) => (
  <div className="brand-nav">
    {brands.map((brand) => (
      <button
        key={brand}
        className={`brand-btn${selectedBrand === brand ? " active" : ""}`}
        onClick={() => onSelect(brand)}
      >
        {brand}
      </button>
    ))}
  </div>
);

export default BrandNav;