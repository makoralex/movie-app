import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppHeader from './components/AppHeader/AppHeader';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import MoviePage from './pages/MoviePage';

function App() {
  return (
    <BrowserRouter>
      <AppHeader />

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
