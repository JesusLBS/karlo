import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthRoutes from './modules/auth/routes/AuthRoutes';
import PublicRoute from './shared/components/PublicRoute';
import { ToastContainer } from 'react-toastify';

interface AppProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

const App: React.FC<AppProps> = ({ toggleTheme, darkMode }) => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/auth/*" element={<AuthRoutes toggleTheme={toggleTheme} darkMode={darkMode} />} />
        </Route>
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
