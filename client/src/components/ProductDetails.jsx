import axios from "axios";
import { useState, useEffect } from "react";
import { ArrowLeft, Heart, LoaderCircle, MessageCircle, Send, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getApiUrl } from "../config/api";

const ProductDetails = ({ product, onBack }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setLoadingComments(true);
      axios
        .get(getApiUrl(`/api/products/${product._id}/comments`))
        .then((res) => setComments(res.data))
        .catch(() => setComments([]))
        .finally(() => setLoadingComments(false));

      // Check if product is in user's favorites
      if (user) {
        axios
          .get(getApiUrl(`/api/users/${user.email}`))
          .then((res) => {
            setIsFav(res.data.favorites?.includes(product._id));
          })
          .catch(() => setIsFav(false));
      } else {
        setIsFav(false);
      }
    }
  }, [product, user]);

  const handleAddComment = async () => {
    if (!user) {
      alert("Please login to comment");
      return;
    }
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        getApiUrl(`/api/products/${product._id}/comments`),
        { user: user.email, text: newComment }
      );
      setComments(res.data);
      setNewComment("");
    } catch {
      alert("Error adding comment");
    }
  };

  const handleAddFav = async () => {
    if (!user) {
      alert("Please log in first");
      return;
    }
    setFavLoading(true);
    try {
      await axios.post(
        getApiUrl(`/api/users/favorite/${user.email}`),
        { productId: product._id }
      );
      setIsFav(true);
    } catch {
      alert("Error updating favorite status");
    }
    setFavLoading(false);
  };

  const handleRemoveFav = async () => {
    if (!user) {
      alert("Please log in first");
      return;
    }
    setFavLoading(true);
    try {
      await axios.post(
        getApiUrl(`/api/users/unfavorite/${user.email}`),
        { productId: product._id }
      );
      setIsFav(false);
    } catch {
      alert("Error updating favorite status");
    }
    setFavLoading(false);
  };

  return (
    <main className="min-h-[60vh] bg-slate-50/60 px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
        )}
        </div>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
            <div className="grid grid-cols-2 gap-4 self-start">
              {[product.image, product.image2].filter(Boolean).map((image, index) => (
                <div key={`${image}-${index}`} className="flex min-h-64 items-center justify-center rounded-xl bg-slate-50 p-6 sm:min-h-80">
                  <img src={image} alt={`${product.title}${index ? " 2" : ""}`} className="max-h-72 w-full object-contain" />
                </div>
              ))}
              {!product.image && !product.image2 && (
                <div className="col-span-2 flex min-h-64 items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-400">
                  No product image available
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-600">Product details</p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{product.title}</h1>
              <p className="mt-4 text-base leading-7 text-slate-600">{product.description || "Explore the specifications and details of this phone."}</p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <span className="text-2xl font-bold text-orange-600">Rs. {product.price}</span>
                <button
                  type="button"
                  onClick={isFav ? handleRemoveFav : handleAddFav}
                  disabled={favLoading}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${isFav ? "bg-rose-600 hover:bg-rose-700" : "bg-orange-600 hover:bg-orange-700"}`}
                >
                  {favLoading ? <LoaderCircle className="size-4 animate-spin" /> : <Heart className="size-4" fill={isFav ? "currentColor" : "none"} />}
                  {favLoading ? "Updating..." : isFav ? "Remove favorite" : "Add to favorites"}
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 p-5 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">Specifications</h2>
            {product.specs?.length ? (
              <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full min-w-[34rem] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Specification</th>
                      <th className="px-4 py-3 font-semibold">Value</th>
                      <th className="px-4 py-3 font-semibold">Extra</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {product.specs.map((row, idx) => (
                      <tr key={idx} className="text-slate-700">
                        <td className="px-4 py-3 font-medium">{row.spec}</td>
                        <td className="px-4 py-3">{row.value}</td>
                        <td className="px-4 py-3">{row.extra || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-500">No specifications available.</p>
            )}
          </div>

          <div className="border-t border-slate-200 p-5 sm:p-8">
            <div className="flex items-center gap-2">
              <MessageCircle className="size-5 text-orange-600" />
              <h2 className="text-xl font-bold text-slate-900">Reviews & Comments</h2>
            </div>
            {loadingComments ? (
              <div className="mt-6 flex items-center gap-2 text-sm text-slate-500"><LoaderCircle className="size-4 animate-spin" /> Loading comments...</div>
            ) : comments.length === 0 ? (
              <p className="mt-5 text-sm text-slate-500">No comments yet.</p>
            ) : (
              <div className="mt-5 space-y-3">
                {comments.map((comment) => (
                  <div key={comment._id} className="flex items-start justify-between gap-4 rounded-xl bg-slate-50 p-4">
                    <p className="text-sm leading-6 text-slate-700"><span className="font-semibold text-slate-900">{comment.user}</span>: {comment.text}</p>
                    {(user?.email === comment.user || user?.role === "admin") && (
                      <button
                        type="button"
                        aria-label="Delete comment"
                        onClick={async () => {
                          await axios.delete(getApiUrl(`/api/products/${product._id}/comments/${comment._id}`), { data: { userEmail: user.email, isAdmin: user.role === "admin" } });
                          const res = await axios.get(getApiUrl(`/api/products/${product._id}/comments`));
                          setComments(res.data);
                        }}
                        className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
            {user && (
              <div className="mt-6 flex flex-col gap-3">
                <textarea
                  rows={3}
                  className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="button" onClick={handleAddComment} className="inline-flex items-center gap-2 self-end rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2">
                  <Send className="size-4" />
                  Add comment
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;