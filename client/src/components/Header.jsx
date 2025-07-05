import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes, FaSearch, FaUserCircle } from "react-icons/fa";
import './Header.css';
import logoImg from '../assets/logo64.png';

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
    <>
      <header className="header-main">
        <div className="header-inner">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileNavOpen(true)}
            className="mobile-menu-btn"
          >
            <FaBars />
          </button>

          {/* Logo/Brand */}
          <div className="logo">
            <Link to="/" className="logo-link">
              <div className='logo-text'>
                <span>Phone</span>
              <span>Finder</span>
              </div>
              <img src={logoImg} alt="Logo" className="logo-img" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            
            <Link to="/compare" className="nav-link">Compare</Link>
            <Link to="/news" className="nav-link">News</Link>
            <Link to="/reviews" className="nav-link">Reviews</Link>
          </nav>

          {/* Search Bar */}
          <div className="search-bar" ref={searchRef}>
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setShowSuggestions(suggestions.length > 0)}
                className="search-input"
              />
              <button type="submit" className="search-btn">
                <FaSearch size={16} />
              </button>
            </form>
            {showSuggestions && (
              <div className="suggestions">
                {suggestions.length === 0 ? (
                  <div className="suggestion-item suggestion-empty">
                    No results found
                  </div>
                ) : (
                  suggestions.map((title, idx) => (
                    <div
                      key={idx}
                      className="suggestion-item"
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
          </div>

          {/* User Account Section */}
          <div className="user-section">
            {!user ? (
              <>
                <Link to="/login" className="login-link">
                  Login
                </Link>
                <Link to="/signup" className="signup-link">
                  Signup
                </Link>
              </>
            ) : (
              <div className="user-dropdown">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="user-btn"
                  onMouseOver={e => e.currentTarget.classList.add('user-btn-hover')}
                  onMouseOut={e => e.currentTarget.classList.remove('user-btn-hover')}
                >
                  <FaUserCircle size={24} />
                  <span className="user-name">
                    {user.name || 'Account'}
                  </span>
                </button>
                {/* User Dropdown Menu */}
                {showMenu && (
                  <div className="dropdown-menu">
                    <div className="dropdown-email">
                      {user.email}
                    </div>
                    <Link
                      to="/account"
                      className="dropdown-link"
                      onClick={() => setShowMenu(false)}
                    >
                      User Info
                    </Link>
                    <Link
                      to="/favourites"
                      className="dropdown-link"
                      onClick={() => setShowMenu(false)}
                    >
                      Fav Products
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="dropdown-link"
                        onClick={() => setShowMenu(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="dropdown-link logout-btn"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation Sidebar */}
      {mobileNavOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileNavOpen(false)}>
          <div className="mobile-nav" onClick={e => e.stopPropagation()}>
            <div className="mobile-nav-header">
              <h3 className="mobile-nav-title">Menu</h3>
              <button
                onClick={() => setMobileNavOpen(false)}
                className="mobile-nav-close"
              >
                <FaTimes />
              </button>
            </div>
            <nav className="mobile-nav-links">
              <Link to="/" onClick={() => setMobileNavOpen(false)} className="mobile-nav-link">Home</Link>
              <Link to="/compare" onClick={() => setMobileNavOpen(false)} className="mobile-nav-link">Compare</Link>
              <Link to="/news" onClick={() => setMobileNavOpen(false)} className="mobile-nav-link">News</Link>
              <Link to="/reviews" onClick={() => setMobileNavOpen(false)} className="mobile-nav-link">Reviews</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;