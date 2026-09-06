import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import "./ReviewDetail.css";

const ReviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/reviews/${id}`)
      .then(res => setReview(res.data))
      .catch(() => setReview(null));
  }, [id]);

  if (!review) return <div className="review-detail-container">Loading...</div>;

  return (
    <div className="review-detail-container">
      <button className="news-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2 className="review-detail-title">{review.title}</h2>
      {review.image && (
        <img src={review.image} alt={review.title} className="review-detail-img" />
      )}
      <div className="review-detail-paragraph">{review.paragraph}</div>
      {review.link && (
        <div className="review-link-wrap" style={{ marginTop: 16 }}>
          <a
            href={review.link}
            target="_blank"
            rel="noopener noreferrer"
            className="review-link"
          >
            Watch on YouTube
          </a>
        </div>
      )}
    </div>
  );
};

export default ReviewDetail;