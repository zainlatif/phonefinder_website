import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import Banner from "../components/Banner";
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
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 32;

  const config = sectionConfig[sectionKey];

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    setCurrentPage(1); // reset to page 1 when section changes
  }, [sectionKey]);

  if (!config) return <div>Invalid section.</div>;

  const filtered = products.filter(config.filter);
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={currentPage === i + 1 ? "active" : ""}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
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
