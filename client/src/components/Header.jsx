import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const accountIcon = (
  <span
    style={{
      display: 'inline-block',
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: '#e74c3c',
      color: '#fff',
      textAlign: 'center',
      lineHeight: '28px',
      fontWeight: 'bold',
      fontSize: 18,
      marginRight: 6,
      verticalAlign: 'middle',
      cursor: 'pointer',
      userSelect: 'none'
    }}
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2"/>
      <path d="M4 20c0-2.2 3.6-4 8-4s8 1.8 8 4" stroke="white" strokeWidth="2"/>
    </svg>
  </span>
);

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(search)}`);
    setSearch('');
  };

  return (
    <div
      style={{
        padding: '10px 0',
        background: 'linear-gradient(90deg, #e74c3c 0%, #f39c12 100%)',
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
        position: 'relative',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}
    >
      {/* Left: Home & Compare */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', minWidth: 0, paddingLeft: 5 }}>
        <Link to="/" style={{ color: '#fff', fontWeight: 500, marginRight: 16, textDecoration: 'none' }}>Home</Link>
        <Link to="/compare" style={{ color: '#fff', fontWeight: 500, marginRight: 16, textDecoration: 'none' }}>Compare</Link>
        <Link to="/news" style={{ color: '#fff', fontWeight: 500, marginRight: 16, textDecoration: 'none' }}>News</Link>
      </div>

      {/* Center: Search */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', minWidth: 0 }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 350 }}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: '4px 8px',
              borderRadius: '4px 0 0 4px',
              border: 'none',
              outline: 'none',
              fontSize: 15,
              minWidth: 0,
              flex: 1
            }}
          />
          <button
            type="submit"
            style={{
              marginLeft: 0,
              padding: '4px 12px',
              borderRadius: '0 4px 4px 0',
              border: 'none',
              background: '#fff',
              color: '#e74c3c',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Search
          </button>
        </form>
      </div>

      {/* Right: Auth */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', minWidth: 0, paddingRight: 5 }}>
        {!user && (
          <>
            <Link to="/login" style={{ color: '#fff', fontWeight: 500, marginRight: 16, textDecoration: 'none' }}>Login</Link>
            <Link to="/signup" style={{ color: '#fff', fontWeight: 500, marginRight: 16, textDecoration: 'none' }}>Signup</Link>
          </>
        )}
        {user && (
          <div style={{ position: 'relative', marginRight: 8, display: 'inline-block' }}>
            <span
              onClick={() => setShowMenu(v => !v)}
              style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
            >
              {accountIcon}
              <span style={{ fontWeight: 500 }}>{user.name || 'Account'}</span>
            </span>
            {showMenu && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 38,
                  background: '#fff',
                  color: '#222',
                  borderRadius: 8,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.13)',
                  minWidth: 170,
                  zIndex: 10,
                  padding: '8px 0'
                }}
                onMouseLeave={() => setShowMenu(false)}
              >
                <div style={{ padding: '10px 18px', borderBottom: '1px solid #eee', fontWeight: 500 }}>
                  {user.email}
                </div>
                <Link
                  to="/account"
                  style={{
                    display: 'block',
                    padding: '10px 18px',
                    color: '#e74c3c',
                    textDecoration: 'none',
                    fontWeight: 500
                  }}
                  onClick={() => setShowMenu(false)}
                >
                  User Info
                </Link>
                <Link
                  to="/favourites"
                  style={{
                    display: 'block',
                    padding: '10px 18px',
                    color: '#e74c3c',
                    textDecoration: 'none',
                    fontWeight: 500
                  }}
                  onClick={() => setShowMenu(false)}
                >
                  Fav Products
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    style={{
                      display: 'block',
                      padding: '10px 18px',
                      color: '#e74c3c',
                      textDecoration: 'none',
                      fontWeight: 500
                    }}
                    onClick={() => setShowMenu(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px 18px',
                    background: 'none',
                    border: 'none',
                    color: '#e74c3c',
                    textAlign: 'left',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
