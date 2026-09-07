import React from "react";

const brands = [
  "Samsung", "Infinix", "Oppo", "Xiaomi", "Vivo", "Tecno", "Realme", "Itel"
];

const BrandNav = ({ selectedBrand, onSelect }) => (
  <div className="mb-2 flex flex-wrap items-center justify-center gap-3 border-b border-slate-200 bg-white px-3 py-3 sm:gap-6 sm:px-5">
    {brands.map((brand) => (
      <button
        key={brand}
        type="button"
        className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold tracking-wide transition-all duration-200 sm:text-base ${
          selectedBrand === brand
            ? "border border-orange-500 bg-orange-500 text-white shadow-sm"
            : "border border-transparent text-slate-600 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
        }`}
        onClick={() => onSelect(brand)}
      >
        {brand}
      </button>
    ))}
  </div>
);

export default BrandNav;