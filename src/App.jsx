import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import NewsArchivePage from './pages/NewsArchivePage';
import AdmissionsHubPage from './pages/AdmissionsHubPage';
import TuitionPage from './pages/TuitionPage';
import StructurePage from './pages/StructurePage';
import GenericPage from './pages/GenericPage';
import AdminPage from './pages/AdminPage';
import ApiDocsPage from './pages/ApiDocsPage';
import SearchModal from './components/SearchModal';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Помилка відображення сторінки:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="container" style={{ padding: '5rem 1rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Виникла технічна помилка при завантаженні матеріалу</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Спробуйте оновити сторінку або повернутися на головну.</p>
          <button 
            className="btn btn-primary" 
            onClick={() => { this.setState({ hasError: false }); window.location.href = '/'; }}
          >
            Повернутися на головну сторінку
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('bcpep_theme') || 'light';
  });

  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bcpep_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <BrowserRouter>
      <div className="site-wrapper">
        <SiteHeader 
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenSearch={() => setSearchOpen(true)}
        />

        <main className="site-main">
          <ErrorBoundary>
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rozklad-zanyat/rozklad-zanyat" element={<SchedulePage />} />
            <Route path="/novyny" element={<NewsArchivePage />} />
            <Route path="/abituriyentu/vstup" element={<AdmissionsHubPage />} />
            <Route path="/abituriyentu" element={<AdmissionsHubPage />} />
            <Route path="/abituriyentu/vartist-navchannya" element={<TuitionPage />} />
            <Route path="/struktura-ta-organy-upravlinnya" element={<StructurePage />} />
            <Route path="/pro-koledzh/struktura-upravlinnya" element={<StructurePage />} />
            <Route path="/pro-koledzh/struktura" element={<StructurePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/api-docs" element={<ApiDocsPage />} />
            <Route path="/*" element={<GenericPage />} />
          </Routes>
          </ErrorBoundary>
        </main>

        <SiteFooter />

        <SearchModal 
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />
      </div>

      <style>{`
        .site-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--bg-base);
          color: var(--text-main);
          transition: background-color var(--transition-base, 0.2s), color var(--transition-base, 0.2s);
        }

        .site-main {
          flex: 1;
        }
      `}</style>
    </BrowserRouter>
  );
}
