import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getApiUrl } from "../config/api";

const ReviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await axios.get(getApiUrl(`/api/reviews/${id}`));
        setReview(res.data);
      } catch (err) {
        setReview(null);
        console.error("Error fetching review detail:", err);
      }
    };

    fetchReview();
  }, [id]);

  if (!review) {
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
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{review.title}</h2>

          {review.image && (
            <img
              src={review.image}
              alt={review.title}
              className="my-6 h-72 w-full rounded-2xl object-cover sm:h-80"
            />
          )}

          <div className="text-base leading-8 text-slate-700 sm:text-lg">
            {review.paragraph}
          </div>

          {review.link && (
            <div className="mt-6">
              <a
                href={review.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
              >
                Watch on YouTube
                <ExternalLink size={16} />
              </a>
            </div>
          )}
        </div>
      </article>
    </main>
  );
};

export default ReviewDetail;