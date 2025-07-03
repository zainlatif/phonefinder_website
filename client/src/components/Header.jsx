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
    <>
      {/* Header Container */}
      <header style={{
        background: 'linear-gradient(135deg, #e74c3c 0%, #f39c12 100%)',
        color: '#fff',
        padding: '0 20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileNavOpen(true)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '8px'
            }}
            className="mobile-menu-btn"
          >
            <FaBars />
          </button>

          {/* Logo/Brand */}
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
              MyStore
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav style={{
            display: 'flex',
            gap: '30px',
            alignItems: 'center'
          }} className="desktop-nav">
            <Link to="/" style={{ 
              color: '#fff', 
              textDecoration: 'none', 
              fontWeight: '500',
              transition: 'opacity 0.3s'
            }}>
              Home
            </Link>
            <Link to="/compare" style={{ 
              color: '#fff', 
              textDecoration: 'none', 
              fontWeight: '500',
              transition: 'opacity 0.3s'
            }}>
              Compare
            </Link>
            <Link to="/news" style={{ 
              color: '#fff', 
              textDecoration: 'none', 
              fontWeight: '500',
              transition: 'opacity 0.3s'
            }}>
              News
            </Link>
            <Link to="/reviews" style={{ 
              color: '#fff', 
              textDecoration: 'none', 
              fontWeight: '500',
              transition: 'opacity 0.3s'
            }}>
              Reviews
            </Link>
          </nav>

          {/* Search Bar */}
          <div style={{ 
            position: 'relative',
            width: '100%',
            maxWidth: '400px',
            margin: '0 20px'
          }} ref={searchRef}>
            <form onSubmit={handleSearch} style={{
              display: 'flex',
              alignItems: 'center',
              background: '#fff',
              borderRadius: '25px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setShowSuggestions(suggestions.length > 0)}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  color: '#333',
                  background: 'transparent'
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#e74c3c',
                  border: 'none',
                  color: '#fff',
                  padding: '12px 18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.3s'
                }}
                onMouseOver={e => e.target.style.background = '#c0392b'}
                onMouseOut={e => e.target.style.background = '#e74c3c'}
              >
                <FaSearch size={16} />
              </button>
            </form>

            {/* Search Suggestions */}
            {showSuggestions && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                marginTop: '4px',
                zIndex: 1000,
                overflow: 'hidden'
              }}>
                {suggestions.length === 0 ? (
                  <div style={{ 
                    padding: '12px 20px', 
                    color: '#888',
                    textAlign: 'center'
                  }}>
                    No results found
                  </div>
                ) : (
                  suggestions.map((title, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px 20px',
                        cursor: 'pointer',
                        color: '#333',
                        borderBottom: idx !== suggestions.length - 1 ? '1px solid #eee' : 'none',
                        transition: 'background 0.2s'
                      }}
                      onMouseOver={e => e.target.style.background = '#f8f9fa'}
                      onMouseOut={e => e.target.style.background = 'transparent'}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {!user ? (
              <>
                <Link to="/login" style={{ 
                  color: '#fff', 
                  textDecoration: 'none', 
                  fontWeight: '500',
                  transition: 'opacity 0.3s'
                }}>
                  Login
                </Link>
                <Link to="/signup" style={{ 
                  background: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'background 0.3s'
                }}>
                  Signup
                </Link>
              </>
            ) : (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    borderRadius: '20px',
                    transition: 'background 0.3s'
                  }}
                  onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseOut={e => e.target.style.background = 'none'}
                >
                  <FaUserCircle size={24} />
                  <span style={{ fontWeight: '500' }}>
                    {user.name || 'Account'}
                  </span>
                </button>

                {/* User Dropdown Menu */}
                {showMenu && (
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    minWidth: '200px',
                    marginTop: '8px',
                    overflow: 'hidden',
                    zIndex: 1000
                  }}>
                    <div style={{ 
                      padding: '12px 20px', 
                      borderBottom: '1px solid #eee',
                      fontWeight: '500',
                      color: '#333',
                      fontSize: '14px'
                    }}>
                      {user.email}
                    </div>
                    
                    <Link
                      to="/account"
                      style={{
                        display: 'block',
                        padding: '12px 20px',
                        color: '#333',
                        textDecoration: 'none',
                        transition: 'background 0.2s'
                      }}
                      onClick={() => setShowMenu(false)}
                      onMouseOver={e => e.target.style.background = '#f8f9fa'}
                      onMouseOut={e => e.target.style.background = 'transparent'}
                    >
                      User Info
                    </Link>
                    
                    <Link
                      to="/favourites"
                      style={{
                        display: 'block',
                        padding: '12px 20px',
                        color: '#333',
                        textDecoration: 'none',
                        transition: 'background 0.2s'
                      }}
                      onClick={() => setShowMenu(false)}
                      onMouseOver={e => e.target.style.background = '#f8f9fa'}
                      onMouseOut={e => e.target.style.background = 'transparent'}
                    >
                      Fav Products
                    </Link>
                    
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        style={{
                          display: 'block',
                          padding: '12px 20px',
                          color: '#333',
                          textDecoration: 'none',
                          transition: 'background 0.2s'
                        }}
                        onClick={() => setShowMenu(false)}
                        onMouseOver={e => e.target.style.background = '#f8f9fa'}
                        onMouseOut={e => e.target.style.background = 'transparent'}
                      >
                        Admin Panel
                      </Link>
                    )}
                    
                    <button
                      onClick={handleLogout}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '12px 20px',
                        background: 'none',
                        border: 'none',
                        color: '#e74c3c',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'background 0.2s'
                      }}
                      onMouseOver={e => e.target.style.background = '#f8f9fa'}
                      onMouseOut={e => e.target.style.background = 'transparent'}
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
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 2000
        }} onClick={() => setMobileNavOpen(false)}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '280px',
            height: '100vh',
            background: '#fff',
            padding: '20px',
            boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
          }} onClick={e => e.stopPropagation()}>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px'
            }}>
              <h3 style={{ margin: 0, color: '#333' }}>Menu</h3>
              <button
                onClick={() => setMobileNavOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#666',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <FaTimes />
              </button>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Link 
                to="/" 
                onClick={() => setMobileNavOpen(false)}
                style={{
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontWeight: '500',
                  padding: '10px 0',
                  borderBottom: '1px solid #eee'
                }}
              >
                Home
              </Link>
              <Link 
                to="/compare" 
                onClick={() => setMobileNavOpen(false)}
                style={{
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontWeight: '500',
                  padding: '10px 0',
                  borderBottom: '1px solid #eee'
                }}
              >
                Compare
              </Link>
              <Link 
                to="/news" 
                onClick={() => setMobileNavOpen(false)}
                style={{
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontWeight: '500',
                  padding: '10px 0',
                  borderBottom: '1px solid #eee'
                }}
              >
                News
              </Link>
              <Link 
                to="/reviews" 
                onClick={() => setMobileNavOpen(false)}
                style={{
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontWeight: '500',
                  padding: '10px 0',
                  borderBottom: '1px solid #eee'
                }}
              >
                Reviews
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* CSS for responsive design */}
      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }
          
          .desktop-nav {
            display: none !important;
          }
          
          header > div {
            justify-content: space-between !important;
          }
          
          header > div > div:nth-child(3) {
            max-width: 200px !important;
            margin: 0 10px !important;
          }
          
          header > div > div:nth-child(4) > div {
            gap: 10px !important;
          }
          
          header > div > div:nth-child(4) a:first-child {
            display: none !important;
          }
        }
        
        @media (max-width: 480px) {
          header {
            padding: 0 10px !important;
          }
          
          header > div {
            height: 60px !important;
          }
          
          header > div > div:first-child {
            font-size: 20px !important;
          }
          
          header > div > div:nth-child(3) {
            max-width: 150px !important;
            margin: 0 5px !important;
          }
        }
      `}</style>
    </>
  );
};

export default Header;