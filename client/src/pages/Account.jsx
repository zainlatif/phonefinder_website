// src/pages/Account.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Account.css';

const Account = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      axios.get(`http://localhost:5000/api/users/${parsed.email}`)
        .then((res) => {
          setName(res.data.name || '');
          setAddress(res.data.address || '');
          setPhone(res.data.phone || '');
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

  if (!user) return <p>Please login to view your account.</p>;

  return (
    <div className="account-container">
      <h2 className="account-title">Account Page</h2>
      <div className="account-info"><b>Email:</b> {user.email}</div>
      <div className="account-info"><b>Role:</b> {user.role}</div>
      <label className="account-label" htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        className="account-input"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label className="account-label" htmlFor="address">Address</label>
      <input
        id="address"
        type="text"
        className="account-input"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <label className="account-label" htmlFor="phone">Phone</label>
      <input
        id="phone"
        type="text"
        className="account-input"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button className="account-btn" onClick={handleUpdate}>Update Profile</button>
      <button className="account-btn account-btn-delete" onClick={handleDelete}>Delete Account</button>
    </div>
  );
};

export default Account;
