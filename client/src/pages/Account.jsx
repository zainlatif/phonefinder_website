// src/pages/Account.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const Account = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      // Fetch user info with favorites
      axios.get(`http://localhost:5000/api/users/${parsed.email}`)
        .then(async (res) => {
          setName(res.data.name || '');
          setAddress(res.data.address || '');
          setPhone(res.data.phone || '');
          // Fetch favorite products
          if (res.data.favorites && res.data.favorites.length > 0) {
            const favProducts = await Promise.all(
              res.data.favorites.map(id =>
                axios.get(`http://localhost:5000/api/products/${id}`).then(r => r.data)
              )
            );
            setFavorites(favProducts);
          } else {
            setFavorites([]);
          }
        })
        .catch(err => console.error('Error fetching user info:', err));
    }
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/update/${user.email}`, {
        name,
        address,
        phone
      });
      alert('Profile updated!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Error updating profile.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/delete/${user.email}`);
      localStorage.removeItem("user");
      alert("Account deleted.");
      window.location.href = "/signup";
    } catch (err) {
      console.error('Error deleting account:', err);
      alert("Error deleting account.");
    }
  };

  const handleRemoveFavorite = async (productId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/users/unfavorite/${user.email}`,
        { productId }
      );
      setFavorites(favorites.filter(fav => fav._id !== productId));
    } catch (err) {
      alert('Error removing favorite');
    }
  };

  if (!user) return <p>Please login to view your account.</p>;

  return (
    <div>
      <h2>Account Page</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <input type="text" placeholder="Name" value={name}
             onChange={(e) => setName(e.target.value)} /><br />
      <input type="text" placeholder="Address" value={address}
             onChange={(e) => setAddress(e.target.value)} /><br />
      <input type="text" placeholder="Phone" value={phone}
             onChange={(e) => setPhone(e.target.value)} /><br />
      <button onClick={handleUpdate}>Update Profile</button>
      <br />
      <button onClick={handleDelete} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}>Delete Account</button>

      <h3>Favorite Products</h3>
      {favorites.length === 0 ? (
        <p>No favorite products.</p>
      ) : (
        <ul>
          {favorites.map(product => (
            <li key={product._id}>
              <strong>{product.title}</strong> - {product.description} - Rs. {product.price}
              <button
                style={{ marginLeft: 10, color: 'red' }}
                onClick={() => handleRemoveFavorite(product._id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Account;
