import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getApiUrl } from "../config/api";
import "./NewsDetail.css";

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

  if (!news) return <div className="news-detail-container">Loading...</div>;

  return (
    <div className="news-detail-container">
      <button className="news-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2 className="news-detail-title">{news.title}</h2>
      <div className="news-date">{new Date(news.date).toLocaleDateString()}</div>
      {news.image && (
        <img src={news.image} alt={news.title} className="news-detail-img" />
      )}
      <div className="news-detail-content">{news.content}</div>
    </div>
  );
};

export default NewsDetail;