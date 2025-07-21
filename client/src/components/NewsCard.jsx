import "./NewsCard.css";

const NewsCard = ({ news, onClick, isAdmin, onEdit, onDelete }) => (
  <div className="news-card" onClick={onClick} style={{ cursor: "pointer" }}>
    {news.image && (
      <img src={news.image} alt={news.title} className="news-img" />
    )}
    <h3 className="news-title">{news.title}</h3>
    <p className="news-content">
      {news.content.length > 180
        ? news.content.slice(0, 180) + "..."
        : news.content}
    </p>
    <div className="news-date">
      {new Date(news.date).toLocaleDateString()}
    </div>
    {isAdmin && (
      <div className="news-actions" onClick={e => e.stopPropagation()}>
        <button className="news-btn" onClick={() => onEdit(news)}>Edit</button>
        <button className="news-btn news-btn-delete" onClick={() => onDelete(news._id)}>Delete</button>
      </div>
    )}
  </div>
);

export default NewsCard;