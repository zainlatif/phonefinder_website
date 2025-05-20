import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ⬅️ use context

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
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
        {!user && <><Link to="/login">Login</Link>{" | "}<Link to="/signup">Signup</Link></>}
        {user && <Link to="/account">Account</Link>}
        {user?.role === 'admin' && <>{" | "}<Link to="/admin">Admin Panel</Link></>}
      </div>

      {user && (
        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
