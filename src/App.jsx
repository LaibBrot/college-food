import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

import Home from './pages/Home';
import Menu from './pages/Menu';
import Explore from './pages/Explore';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

export default function App() {
  const { currentUser, logout } = useAuth();

  return (
    <div>
      <nav style={{ display: 'flex', gap: '15px', padding: '15px', background: '#9dfa9a' , color: '#000000', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#000000', textDecoration: 'none', fontWeight: 'bold' }}>Столовая Колледжа</Link>
        <Link to="/menu" style={{ color: '#000000', textDecoration: 'none' }}>Меню</Link>
        <Link to="/explore" style={{ color: '#070707', textDecoration: 'none' }}>Рецепты (API)</Link>
        {currentUser ? (
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '15px', alignItems: 'center' }}>
            <Link to="/dashboard" style={{ color: '#000000', textDecoration: 'none' }}>Кабинет</Link>
            <button onClick={logout} style={{ padding: '6px 12px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #a7a7a7', background: '#28a745', color: 'white'}}>Выйти</button>
          </div>
        ) : (
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
            <Link to="/login" style={{ color: '#000000', textDecoration: 'none' }}>Вход</Link>
            <Link to="/register" style={{ color: '#000000', textDecoration: 'none' }}>Регистрация</Link>
          </div>
        )}
      </nav>

      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}