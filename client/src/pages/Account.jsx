// src/pages/Account.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config/api';

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
      axios.get(getApiUrl(`/api/users/${parsed.email}`))
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
      await axios.put(getApiUrl(`/api/users/update/${user.email}`), {
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
      await axios.delete(getApiUrl(`/api/users/delete/${user.email}`));
      localStorage.removeItem("user");
      alert("Account deleted.");
      window.location.href = "/signup";
    } catch (err) {
      console.error('Error deleting account:', err);
      alert("Error deleting account.");
    }
  };

  if (!user) return <p className="px-4 py-16 text-center text-sm font-medium text-slate-600">Please login to view your account.</p>;

  return (
    <main className="min-h-[70vh] bg-slate-50 px-4 py-10 sm:py-14">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(44,62,80,0.1)] sm:p-8">
        <div className="mb-2 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">PhoneFinder account</p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Account Page</h2>
          <p className="mt-2 text-sm text-slate-500">Manage your profile information.</p>
        </div>
        <div className="grid gap-2 rounded-lg border border-orange-100 bg-orange-50 px-4 py-3 text-sm text-slate-700 sm:grid-cols-2 sm:gap-4">
          <div><b className="font-semibold text-slate-900">Email:</b> <span className="break-all">{user.email}</span></div>
          <div><b className="font-semibold text-slate-900">Role:</b> {user.role}</div>
        </div>
        <label className="text-sm font-semibold text-slate-700" htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
        <label className="text-sm font-semibold text-slate-700" htmlFor="address">Address</label>
      <input
        id="address"
        type="text"
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
        <label className="text-sm font-semibold text-slate-700" htmlFor="phone">Phone</label>
      <input
        id="phone"
        type="text"
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
        <button type="button" className="mt-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-100" onClick={handleUpdate}>Update Profile</button>
        <button type="button" className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-700 transition hover:border-red-300 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100" onClick={handleDelete}>Delete Account</button>
      </div>
    </main>
  );
};

export default Account;
