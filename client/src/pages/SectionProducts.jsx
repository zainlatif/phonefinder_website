import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import Banner from "../components/Banner";
import axios from "axios";
import ProductDetails from "../components/ProductDetails";

const sectionConfig = {
  above70: {
    title: "Mobile phones Price in Pakistan > 70,000 Rs.",
    filter: (p) => p.price > 70000,
  },
  "50to70": {
    title: "Mobile phones Price in Pakistan 50,000 - 70,000 Rs.",
    filter: (p) => p.price > 50000 && p.price <= 70000,
  },
  "35to50": {
    title: "Mobile Prices Between 35,000 and 50,000 Rs.",
    filter: (p) => p.price > 35000 && p.price <= 50000,
  },
  "25to35": {
    title: "Mobile Prices Between 25,000 and 35,000 Rs.",
    filter: (p) => p.price > 25000 && p.price <= 35000,
  },
  below25: {
    title: "Mobile Prices Below 25,000 Rs.",
    filter: (p) => p.price <= 25000,
  },
};

const SectionProducts = () => {
  const { sectionKey } = useParams();
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const config = sectionConfig[sectionKey];

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => setProducts([]));
  }, []);

  if (!config) return <div>Invalid section.</div>;

  const filtered = products.filter(config.filter);

  return (
    <div>
      <Banner />
      <h2>{config.title}</h2>
      {selected ? (
        <ProductDetails product={selected} onBack={() => setSelected(null)} />
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {filtered.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filtered.map((product) => (
              <Card
                key={product._id}
                product={product}
                onClick={() => setSelected(product)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SectionProducts;