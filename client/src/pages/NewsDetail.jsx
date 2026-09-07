import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { getApiUrl } from "../config/api";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(getApiUrl(`/api/news/${id}`));
        setNews(res.data);
      } catch (err) {
        setNews(null);
        console.error("Error fetching news detail:", err);
      }
    };

    fetchNews();
  }, [id]);

  if (!news) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center text-slate-500">
        Loading...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
        <div className="p-5 sm:p-8">
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
            <CalendarDays size={14} />
            {new Date(news.date).toLocaleDateString()}
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{news.title}</h2>

          {news.image && (
            <img
              src={news.image}
              alt={news.title}
              className="my-6 h-72 w-full rounded-2xl object-cover sm:h-80"
            />
          )}

          <div className="text-base leading-8 text-slate-700 sm:text-lg">{news.content}</div>
        </div>
      </article>
    </main>
  );
};

export default NewsDetail;