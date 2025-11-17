import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
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
      <Route path="/signup" element={<div style={{ padding: '40px', textAlign: 'center' }}><h1>signup page</h1></div>} />
      <Route path="/login" element={<div style={{ padding: '40px', textAlign: 'center' }}><h1>login page</h1></div>} />
      
      <Route 
        path="/timer" 
        element={
          <ProtectedRoute>
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <h1>timer page</h1>
              <p>protected route - only logged in users see this</p>
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