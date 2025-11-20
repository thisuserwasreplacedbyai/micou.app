import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">micou</Link>
      
      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/timer" className="nav-link">
              session
            </Link>
            <Link to="/profile" className="avatar-icon">👤</Link>
            <button onClick={handleLogout} className="btn-secondary nav-button">
              logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-secondary nav-button">
              log in
            </Link>
            <Link to="/signup" className="btn-primary nav-button">
              sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;