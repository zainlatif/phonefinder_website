import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";
import NewsCard from "../components/NewsCard";
import { getApiUrl, getArrayResponse } from "../config/api";

const NEWS_PER_PAGE = 5;

const News = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");

  const fetchNews = async () => {
    try {
      const res = await axios.get(getApiUrl("/api/news"));
      setNews(getArrayResponse(res.data, "/api/news"));
      setError("");
    } catch (err) {
      setNews([]);
      setError("News could not be loaded. Check the API configuration.");
      console.error("Error fetching news:", err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!title || !content) return;
    if (editId) {
      await axios.put(getApiUrl(`/api/news/${editId}`), { title, content, image });
    } else {
      await axios.post(getApiUrl("/api/news"), { title, content, image });
    }
    setTitle("");
    setContent("");
    setImage("");
    setEditId(null);
    fetchNews();
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setTitle(item.title);
    setContent(item.content);
    setImage(item.image || "");
  };

  const handleDelete = async (id) => {
    await axios.delete(getApiUrl(`/api/news/${id}`));
    fetchNews();
  };

  const totalPages = Math.ceil(news.length / NEWS_PER_PAGE);
  const paginatedNews = news.slice(
    (currentPage - 1) * NEWS_PER_PAGE,
    currentPage * NEWS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">PhoneFinder</p>
        <h2 className="text-3xl font-black tracking-tight text-slate-900">Latest News</h2>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
          {error}
        </div>
      )}

      {user?.role === "admin" && (
        <section className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-6">
          <h3 className="mb-4 text-xl font-bold text-slate-900">
            {editId ? "Edit News" : "Add News"}
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
              placeholder="Content"
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={4}
            />
            <input
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              placeholder="Image URL (optional)"
              value={image}
              onChange={e => setImage(e.target.value)}
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
                    setContent("");
                    setImage("");
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
        {paginatedNews.length === 0 ? (
          <p className="py-12 text-center text-base text-slate-500">No news yet.</p>
        ) : (
          paginatedNews.map(item => (
            <NewsCard
              key={item._id}
              news={item}
              onClick={() => navigate(`/news/${item._id}`)}
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

export default News;