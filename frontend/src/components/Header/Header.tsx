import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

interface MyComponentProps {}

const Header: React.FC<MyComponentProps> = () => {
  const navigate = useNavigate();

  const isLoggedIn = () => {
    const userData = localStorage.getItem('user');
    return !!userData;
  };

  const onLogout = () => {
    // Add the logic to remove the user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('public_token')
    localStorage.removeItem('link_token')
    localStorage.removeItem('transactions')
    // Redirect to the homepage after logout
    window.location.reload()
  };

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>FinLife</Link>
      </div>
      <ul>
        {isLoggedIn() ? (
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
