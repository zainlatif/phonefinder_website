import "./ReviewCard.css";

const ReviewCard = ({ review, onClick, isAdmin, onEdit, onDelete }) => (
  <div className="review-card" onClick={onClick} style={{ cursor: "pointer" }}>
    {review.image && (
      <img src={review.image} alt={review.title} className="review-img" />
    )}
    <h3 className="review-title">{review.title}</h3>
    <p className="review-paragraph">
      {review.paragraph.length > 180
        ? review.paragraph.slice(0, 180) + "..."
        : review.paragraph}
    </p>
    {review.link && (
      <div className="review-link-wrap">
        <a
          href={review.link}
          target="_blank"
          rel="noopener noreferrer"
          className="review-link"
          onClick={e => e.stopPropagation()}
        >
          Watch on YouTube
        </a>
      </div>
    )}
    {isAdmin && (
      <div className="review-actions" onClick={e => e.stopPropagation()}>
        <button className="news-btn" onClick={() => onEdit(review)}>Edit</button>
        <button className="news-btn news-btn-delete" onClick={() => onDelete(review._id)}>Delete</button>
      </div>
    )}
  </div>
);

export default ReviewCard;