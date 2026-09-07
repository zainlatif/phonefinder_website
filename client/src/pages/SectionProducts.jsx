import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import Banner from "../components/Banner";
import ProductDetails from "../components/ProductDetails";
import { getApiUrl, getArrayResponse } from "../config/api";

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
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 32;

  const config = sectionConfig[sectionKey];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(getApiUrl("/api/products"));
        setProducts(getArrayResponse(res.data, "/api/products"));
        setError("");
      } catch (err) {
        setProducts([]);
        setError("Products could not be loaded. Check the API configuration.");
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // reset to page 1 when section changes
  }, [sectionKey]);

  if (!config) return <main className="p-8 text-center text-slate-600">Invalid section.</main>;

  const filtered = products.filter(config.filter);
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <main className="min-h-screen bg-slate-50/60">
      <Banner />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{config.title}</h1>
        {error && <p className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">{error}</p>}

        {selected ? (
          <ProductDetails product={selected} onBack={() => setSelected(null)} />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {paginated.length === 0 ? (
                <p className="col-span-full rounded-xl bg-white px-4 py-10 text-center text-sm text-slate-500">No products found.</p>
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
              <div className="mt-8 flex flex-wrap justify-center gap-2 pb-8">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-orange-200 bg-white px-3 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${currentPage === i + 1 ? "border-orange-600 bg-orange-600 text-white" : "border-orange-200 bg-white text-orange-600 hover:bg-orange-50"}`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-orange-200 bg-white px-3 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default SectionProducts;
