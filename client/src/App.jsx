import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import './styles/main.css';

// protected route wrapper
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <p>loading...</p>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
}

// app routes
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<div style={{ padding: '40px', textAlign: 'center' }}><h1>landing page</h1></div>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      
      <Route 
        path="/timer" 
        element={
          <ProtectedRoute>
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <h1>timer page</h1>
              <p>you're logged in!</p>
            </div>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <h1>profile page</h1>
            </div>
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;