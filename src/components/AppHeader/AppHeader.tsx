import useAuth from '../../hooks/useAuth';
import './AppHeader.css';
import { Link } from 'react-router-dom';

const AppHeader = () => {
  const { user } = useAuth();

  return (
    <header className="app__header">
      <h1 className="app__title">
        <Link to="/">
          <span>movies</span>info!
        </Link>
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            <Link to="/movies">movies</Link>
          </li>
          /
          <li>
            {user ? (
              <Link to="/profile">profile</Link>
            ) : (
              <Link to="/auth">login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
