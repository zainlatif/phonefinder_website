import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import Banner from "../components/Banner";
import axios from "axios";
import ProductDetails from "../components/ProductDetails";
import "./SectionProducts.css";

const sectionConfig = {
  above70: {
    title: "Mobile phones Price in Pakistan > 70,000",
    filter: (p) => p.price > 70000,
  },
  "50to70": {
    title: "Mobile Prices Between 50,000 - 70,000",
    filter: (p) => p.price > 50000 && p.price <= 70000,
  },
  "35to50": {
    title: "Mobile Prices Between 35,000 and 50,000",
    filter: (p) => p.price > 35000 && p.price <= 50000,
  },
  "25to35": {
    title: "Mobile Prices Between 25,000 and 35,000",
    filter: (p) => p.price > 25000 && p.price <= 35000,
  },
  below25: {
    title: "Mobile Prices Below 25,000",
    filter: (p) => p.price <= 25000,
  },
};

const SectionProducts = () => {
  const { sectionKey } = useParams();
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 32;

  const config = sectionConfig[sectionKey];

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]));
  }, []);

  if (!config) return <div>Invalid section.</div>;

  const filtered = products.filter(config.filter);
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="section-products-container1">
      <Banner />
      <div className="section-products-container2">
        <h2 className="section-products-title">{config.title}</h2>

        {selected ? (
          <ProductDetails product={selected} onBack={() => setSelected(null)} />
        ) : (
          <>
            <div className="section-products-list">
              {paginated.length === 0 ? (
                <p className="section-products-empty">No products found.</p>
              ) : (
                paginated.map((product) => (
                  <Card
                    key={product._id}
                    product={product}
                    onClick={() => setSelected(product)}
                  />
                ))
              )}
            </div>

            {/* Pagination Buttons */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="pagination-button"
                >
                  Previous
                </button>
                <span className="pagination-info">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="pagination-button"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SectionProducts;
