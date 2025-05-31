import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import GeneratedPage from './pages/GeneratedPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute'; // NY

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/login"
        element={
          localStorage.getItem('loggedInUser')
            ? <Navigate to="/admin" />
            : <LoginPage />
        }
      />
      <Route path="/custom-page" element={<GeneratedPage />} />
      
      {/* Skyddad admin-sida */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminPage />
        </ProtectedRoute>
      } />

      <Route path="*" element={<p>404 – Sidan finns inte</p>} />
    </Routes>
  );
}

export default App;
