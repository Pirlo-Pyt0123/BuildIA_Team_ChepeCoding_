import { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { User } from './data/database';
import LoginPage from './pages/LoginPage.tsx';
import StudentDashboard from './pages/StudentDashboard_Refactored.tsx';
import TeacherDashboard from './pages/TeacherDashboard_Refactored.tsx';

export type UserRole = 'student' | 'teacher' | null;

function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (role: 'student' | 'teacher', user: User) => {
    setUserRole(role);
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route 
            path="/login" 
            element={
              !isLoggedIn ? (
                <LoginPage onLogin={handleLogin} />
              ) : (
                <Navigate to={`/${userRole}`} replace />
              )
            } 
          />
          <Route 
            path="/student" 
            element={
              isLoggedIn && userRole === 'student' && currentUser ? (
                <StudentDashboard onLogout={handleLogout} user={currentUser} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/teacher" 
            element={
              isLoggedIn && userRole === 'teacher' && currentUser ? (
                <TeacherDashboard onLogout={handleLogout} user={currentUser} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
