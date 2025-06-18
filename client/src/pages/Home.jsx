// Home.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  maxWidth: '200px',
  width: '200px',
  minHeight: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  cursor: 'pointer'
};

const imageStyle = {
  width: '100%',
  height: '180px',
  objectFit: 'contain',
  borderRadius: '6px 6px 0 0',
  marginBottom: '8px'
};

const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
  marginTop: '24px'
};

const thtdStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'left'
};

const Home = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);

  // Parse search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get('search') || '');
  }, [location.search]);

  // Fetch product list once
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  // Fetch comments when a product is selected
  useEffect(() => {
    if (selected) {
      setLoadingComments(true);
      axios
        .get(`http://localhost:5000/api/products/${selected._id}/comments`)
        .then((res) => setComments(res.data))
        .catch(() => setComments([]))
        .finally(() => setLoadingComments(false));
    }
  }, [selected]);

  const handleCardClick = (product) => setSelected(product);
  const handleBack = () => setSelected(null);

  const addToFav = async (productId) => {
    if (!user) {
      alert('Please log in first');
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/users/favorite/${user.email}`,
        { productId }
      );
      alert('Added to favourites 🎉');
    } catch (err) {
      console.error('Add-fav error:', err);
      alert('Could not add favourite');
    }
  };

  const handleAddComment = async () => {
    if (!user) {
      alert('Please login to comment');
      return;
    }
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:5000/api/products/${selected._id}/comments`,
        { user: user.email, text: newComment }
      );
      setComments(res.data);
      setNewComment('');
    } catch (err) {
      alert('Error adding comment');
    }
  };

  const getSpecRows = (longDescription) => {
    if (!longDescription) return [];
    const specs = longDescription.split(',').map((s) => s.split(':'));
    while (specs.length < 25) specs.push(['', '']);
    return specs.slice(0, 25);
  };

  // Filter products by search term (case-insensitive, matches title or description)
  const filteredProducts = searchTerm
    ? products.filter(
        (p) =>
          p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  return (
    <div>
      <h2>Products</h2>

      {selected ? (
        <div>
          <button onClick={handleBack} style={{ marginBottom: '16px' }}>
            ← Back
          </button>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thtdStyle}>Specification</th>
                <th style={thtdStyle}>Value</th>
                <th style={thtdStyle}>Extra</th>
              </tr>
            </thead>
            <tbody>
              {selected.specs && selected.specs.map((row, idx) => (
                <tr key={idx}>
                  <td style={thtdStyle}>{row.spec}</td>
                  <td style={thtdStyle}>{row.value}</td>
                  <td style={thtdStyle}>{row.extra}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: 32 }}>
            <h3>Reviews & Comments</h3>
            {loadingComments ? (
              <p>Loading comments...</p>
            ) : comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              <ul>
                {comments.map((c, idx) => (
                  <li key={c._id || idx}>
                    <b>{c.user}:</b> {c.text}
                    <span style={{ color: '#888', fontSize: '0.9em' }}>
                      {new Date(c.date).toLocaleString()}
                    </span>
                    {user?.role === 'admin' && (
                      <button
                        style={{ marginLeft: 10, color: 'red' }}
                        onClick={async () => {
                          await axios.delete(
                            `http://localhost:5000/api/products/${selected._id}/comments/${c._id}`
                          );
                          setComments(comments.filter(com => com._id !== c._id));
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {user && (
              <div style={{ marginTop: 12 }}>
                <textarea
                  rows={2}
                  style={{ width: '100%' }}
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleAddComment} style={{ marginTop: 4 }}>
                  Add Comment
                </button>
              </div>
            )}
          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              style={cardStyle}
              onClick={() => handleCardClick(product)}
            >
              {product.image && (
                <img src={product.image} alt={product.title} style={imageStyle} />
              )}

              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Rs.&nbsp;{product.price}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToFav(product._id);
                }}
                style={{ marginTop: 'auto' }}
              >
                ❤️ Favourite
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
