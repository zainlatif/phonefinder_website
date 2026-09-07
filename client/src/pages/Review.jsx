import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";
import ReviewCard from "../components/ReviewCard";
import { getApiUrl, getArrayResponse } from "../config/api";

const REVIEWS_PER_PAGE = 5;

const Review = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    try {
      const res = await axios.get(getApiUrl("/api/reviews"));
      setReviews(getArrayResponse(res.data, "/api/reviews"));
      setError("");
    } catch (err) {
      setReviews([]);
      setError("Reviews could not be loaded. Check the API configuration.");
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!title || !paragraph) return;
    if (editId) {
      await axios.put(getApiUrl(`/api/reviews/${editId}`), { title, paragraph, image, link });
    } else {
      await axios.post(getApiUrl("/api/reviews"), { title, paragraph, image, link });
    }
    setTitle("");
    setParagraph("");
    setImage("");
    setLink("");
    setEditId(null);
    fetchReviews();
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setTitle(item.title);
    setParagraph(item.paragraph);
    setImage(item.image || "");
    setLink(item.link || "");
  };

  const handleDelete = async (id) => {
    await axios.delete(getApiUrl(`/api/reviews/${id}`));
    fetchReviews();
  };

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const paginatedReviews = reviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">PhoneFinder</p>
        <h2 className="text-3xl font-black tracking-tight text-slate-900">Latest Reviews</h2>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
          {error}
        </div>
      )}

      {user?.role === "admin" && (
        <section className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-6">
          <h3 className="mb-4 text-xl font-bold text-slate-900">
            {editId ? "Edit Review" : "Add Review"}
          </h3>

          <div className="grid gap-4">
            <input
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <textarea
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              placeholder="Paragraph"
              value={paragraph}
              onChange={e => setParagraph(e.target.value)}
              rows={4}
            />
            <input
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              placeholder="Image URL (optional)"
              value={image}
              onChange={e => setImage(e.target.value)}
            />
            <input
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              placeholder="YouTube Link (optional)"
              value={link}
              onChange={e => setLink(e.target.value)}
            />

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleAddOrUpdate}
                className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
              >
                <Plus size={16} />
                {editId ? "Update" : "Add"}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setTitle("");
                    setParagraph("");
                    setImage("");
                    setLink("");
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
                >
                  <X size={16} />
                  Cancel
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      <div className="space-y-6">
        {paginatedReviews.length === 0 ? (
          <p className="py-12 text-center text-base text-slate-500">No reviews yet.</p>
        ) : (
          paginatedReviews.map(item => (
            <ReviewCard
              key={item._id}
              review={item}
              onClick={() => navigate(`/reviews/${item._id}`)}
              isAdmin={user?.role === "admin"}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              type="button"
              className={[
                "rounded-lg border px-3 py-2 text-sm font-semibold transition",
                currentPage === idx + 1
                  ? "border-orange-600 bg-orange-600 text-white shadow-sm"
                  : "border-slate-300 bg-white text-slate-700 hover:border-orange-300 hover:text-orange-700",
              ].join(" ")}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </main>
  );
};

export default Review;