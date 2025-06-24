import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes, FaSearch, FaUserCircle } from "react-icons/fa";
import '../app.css';

const Header = ({ products = [] }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search)}`);
      setSearch('');
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    if (search.trim() && products.length > 0) {
      const filtered = products
        .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 6)
        .map(p => p.title);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [search, products]);

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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
      {/* Hamburger for mobile */}
      <button
        className="hamburger"
        onClick={() => setMobileNavOpen(true)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: 28,
          marginLeft: 10,
          cursor: 'pointer'
        }}
      >
        <FaBars />
      </button>

      {/* Left: Home & Compare (desktop) */}
      <div className="desktop-nav" style={{ flex: 1, display: 'flex', alignItems: 'center', minWidth: 0, paddingLeft: 5 }}>
        <Link to="/" style={{ color: '#fff', fontWeight: 500, marginRight: 16, textDecoration: 'none' }}>Home</Link>
        <Link to="/compare" style={{ color: '#fff', fontWeight: 500, marginRight: 16, textDecoration: 'none' }}>Compare</Link>
        <Link to="/news" style={{ color: '#fff', fontWeight: 500, marginRight: 16, textDecoration: 'none' }}>News</Link>
        <Link to="/reviews" style={{ color: '#fff', fontWeight: 500, marginRight: 16, textDecoration: 'none' }}>Reviews</Link>
      </div>

      {/* Mobile Sidebar Nav */}
      {mobileNavOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileNavOpen(false)}>
          <div className="mobile-nav" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setMobileNavOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#e74c3c',
                fontSize: 28,
                position: 'absolute',
                top: 12,
                right: 16,
                cursor: 'pointer'
              }}
            >
              <FaTimes />
            </button>
            <Link to="/" onClick={() => setMobileNavOpen(false)}>Home</Link>
            <Link to="/compare" onClick={() => setMobileNavOpen(false)}>Compare</Link>
            <Link to="/news" onClick={() => setMobileNavOpen(false)}>News</Link>
            <Link to="/reviews" onClick={() => setMobileNavOpen(false)}>Reviews</Link>
          </div>
        </div>
      )}

      {/* Center: Search */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          minWidth: 0,
          zIndex: 2,
          position: 'relative'
        }}
        ref={searchRef}
      >
        <form
          onSubmit={handleSearch}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            maxWidth: 350,
            margin: '0 auto',
            position: 'relative'
          }}
          autoComplete="off"
        >
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
              width: '100%'
            }}
            onFocus={() => setShowSuggestions(suggestions.length > 0)}
            ref={searchRef}
          />
          <button
            type="submit"
            style={{
              border: 'none',
              background: '#fff',
              color: '#e74c3c',
              borderRadius: '0 4px 4px 0',
              padding: '4px 12px',
              fontSize: 18,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Search"
          >
            <FaSearch />
          </button>
          {showSuggestions && (
            <div
              style={{
                position: 'absolute',
                top: '110%',
                left: 0,
                right: 0,
                background: '#fff',
                color: '#222',
                borderRadius: 4,
                boxShadow: '0 2px 8px rgba(0,0,0,0.13)',
                zIndex: 100,
                maxHeight: 180,
                overflowY: 'auto'
              }}
            >
              {suggestions.length === 0 ? (
                <div style={{ padding: 8, color: "#888" }}>No results</div>
              ) : (
                suggestions.map((title, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '8px 12px',
                      cursor: 'pointer',
                      borderBottom: idx !== suggestions.length - 1 ? '1px solid #eee' : 'none'
                    }}
                    onMouseDown={() => {
                      setSearch(title);
                      setShowSuggestions(false);
                      navigate(`/?search=${encodeURIComponent(title)}`);
                    }}
                  >
                    {title}
                  </div>
                ))
              )}
            </div>
          )}
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
              <FaUserCircle style={{ fontSize: 28, color: '#fff', marginRight: 6 }} />
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
