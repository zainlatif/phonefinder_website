// Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight, LoaderCircle, PackageOpen } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import ProductDetails from "../components/ProductDetails";
import BrandNav from "../components/BrandNav";
import { getApiUrl, getArrayResponse } from "../config/api";

const getSectionProducts = (products, min, max = Infinity) =>
  (Array.isArray(products) ? products : []).filter(
    (p) => p.price > min && p.price <= max
  );

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
          ? getApiUrl(`/api/products?search=${encodeURIComponent(
            searchTerm
          )}`)
          : getApiUrl("/api/products");
        const res = await axios.get(url);
        setProducts(getArrayResponse(res.data, "/api/products"));
        setError("");
      } catch (err) {
        setProducts([]);
        setError("Products could not be loaded. Check the API configuration.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchTerm]);

  const handleCardClick = (product) => setSelected(product);
  const handleBack = () => setSelected(null);

  // Filter products by search term (case-insensitive, matches title or description)
  const filteredProducts = searchTerm
    ? products.filter(
      (p) =>
        p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : products;

  // Filter by brand if selected
  const brandFilteredProducts = selectedBrand
    ? filteredProducts.filter(
      (p) =>
        p.title &&
        p.title.toLowerCase().startsWith(selectedBrand.toLowerCase())
    )
    : filteredProducts;

  // Section logic (use filteredProducts if you have search, else products)
  const above70 = getSectionProducts(brandFilteredProducts, 70000);
  const between50and70 = getSectionProducts(
    brandFilteredProducts,
    50000,
    70000
  );
  const between35and50 = getSectionProducts(
    brandFilteredProducts,
    35000,
    50000
  );
  const between25and35 = getSectionProducts(
    brandFilteredProducts,
    25000,
    35000
  );
  const below25 = brandFilteredProducts.filter((p) => p.price <= 25000);

  // Helper to render a section with "More" button
  const renderSection = (title, prods, sectionKey) => (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">{title}</h2>
        {prods.length > 7 && (
          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-orange-600 transition-colors hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            onClick={() => navigate(`/section/${sectionKey}`)}
          >
            View all
            <ArrowRight className="size-4" />
          </button>
        )}
      </div>
      {prods.length === 0 ? (
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-6 text-sm text-slate-500">
          <PackageOpen className="size-5 text-slate-400" />
          No phones found in this price range.
        </div>
      ) : (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {prods.slice(0, 9).map((product) => (
          <button
            key={product._id}
            type="button"
            onClick={() => handleCardClick(product)}
            className="group overflow-hidden rounded-xl border border-slate-200 bg-white text-left transition duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <div className="flex h-36 items-center justify-center bg-slate-50 p-3 sm:h-44 sm:p-5">
              {product.image ? (
                <img src={product.image} alt={product.title} className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105" />
              ) : (
                <PackageOpen className="size-9 text-slate-300" />
              )}
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="line-clamp-2 min-h-10 text-sm font-semibold text-slate-900 sm:text-base">{product.title}</h3>
              <p className="mt-1 line-clamp-2 min-h-8 text-xs leading-4 text-slate-500">{product.description || "View phone details"}</p>
              <p className="mt-3 text-sm font-bold text-orange-600 sm:text-base">Rs. {product.price}</p>
            </div>
          </button>
        ))}
      </div>
      )}
    </section>
  );

  return (
    <main className="min-h-screen bg-slate-50/60">
      <Banner />
      <BrandNav selectedBrand={selectedBrand} onSelect={setSelectedBrand} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {error && <p className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">{error}</p>}
        {loading ? (
          <div className="flex min-h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white">
            <LoaderCircle className="size-8 animate-spin text-orange-500" aria-label="Loading products" />
          </div>
        ) : (
          selected ? (
            <ProductDetails product={selected} onBack={handleBack} />
          ) : (
            <>
              {renderSection(
                "Mobile phones Price in Pakistan > 70,000 Rs.",
                above70,
                "above70"
              )}
              {renderSection(
                "Mobile phones Price in Pakistan 50,000 - 70,000 Rs.",
                between50and70,
                "50to70"
              )}
              {renderSection(
                "Mobile Prices Between 35,000 and 50,000 Rs.",
                between35and50,
                "35to50"
              )}
              {renderSection(
                "Mobile Prices Between 25,000 and 35,000 Rs.",
                between25and35,
                "25to35"
              )}
              {renderSection(
                "Mobile Prices Below 25,000 Rs.",
                below25,
                "below25"
              )}
            </>
          )
        )}
      </div>
    </main>
  );
};

export default Home;
