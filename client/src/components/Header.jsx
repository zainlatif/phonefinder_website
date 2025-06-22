import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to home with search query as URL param
    navigate(`/?search=${encodeURIComponent(search)}`);
    setSearch('');
  };

  return (
    <div style={{
      padding: '10px',
      backgroundColor: '#eee',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <Link to="/">Home</Link>{" | "}
        <Link to="/compare">Compare</Link>{" | "}
        {!user && <><Link to="/login">Login</Link>{" | "}<Link to="/signup">Signup</Link></>}
        {user && <Link to="/account">Account</Link>}
        {user?.role === 'admin' && <>{" | "}<Link to="/admin">Admin Panel</Link></>}
      </div>

      {/* Search Section */}
      <form onSubmit={handleSearch} style={{ display: 'inline-flex', alignItems: 'center', marginRight: '10px' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ marginLeft: '6px', padding: '4px 10px', borderRadius: '4px' }}>
          Search
        </button>
      </form>

      {user && (
        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
