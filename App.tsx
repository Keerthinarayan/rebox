import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AgentDemoPage } from './pages/AgentDemoPage';
import { AgentDashboardPage } from './pages/AgentDashboardPage';
import { LoginPage } from './pages/LoginPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          {/* Standalone Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/agent-demo" element={<AgentDemoPage />} />
          <Route path="/agent-dashboard" element={<AgentDashboardPage />} />
          
          {/* Main Site Routes wrapped in Layout */}
          <Route path="*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/user-dashboard" element={<UserDashboardPage />} />
                {/* Fallback to Home */}
                <Route path="*" element={<LandingPage />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}

export default App;