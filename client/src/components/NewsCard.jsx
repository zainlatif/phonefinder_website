import { CalendarDays, Pencil, Trash2 } from "lucide-react";

const NewsCard = ({ news, onClick, isAdmin, onEdit, onDelete }) => (
  <article
    className="flex cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-[0_18px_35px_rgba(15,23,42,0.08)]"
    onClick={onClick}
  >
    {news.image && (
      <img
        src={news.image}
        alt={news.title}
        className="mb-4 h-48 w-full rounded-xl object-cover"
      />
    )}

    <div className="flex flex-1 flex-col">
      <h3 className="mb-3 text-lg font-bold leading-snug text-slate-900">
        {news.title}
      </h3>

      <p className="mb-4 text-sm leading-6 text-slate-600">
        {news.content.length > 180
          ? news.content.slice(0, 180) + "..."
          : news.content}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3 pt-2 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays size={14} className="text-orange-500" />
          {new Date(news.date).toLocaleDateString()}
        </span>
      </div>
    </div>

    {isAdmin && (
      <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => onEdit(news)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700"
        >
          <Pencil size={14} />
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(news._id)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2.5 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    )}
  </article>
);

export default NewsCard;