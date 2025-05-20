// src/pages/Account.jsx
import { useState, useEffect } from 'react';

const Account = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleUpdate = () => {
    const updatedUser = { ...user, name, address, phone };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('Profile updated!');
  };

  if (!user) return <p>Login first to view your account.</p>;

  return (
    <div>
      <h2>Account Page</h2>
      <p>Role: {user.role}</p>
      <input type="text" placeholder="Name" value={name}
             onChange={(e) => setName(e.target.value)} /><br />
      <input type="text" placeholder="Address" value={address}
             onChange={(e) => setAddress(e.target.value)} /><br />
      <input type="text" placeholder="Phone" value={phone}
             onChange={(e) => setPhone(e.target.value)} /><br />
      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  );
};

export default Account;
