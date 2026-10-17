import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Calendar, Search, User, Menu, X, 
  ChevronDown, Bell, Shield, GraduationCap, Building2, PhoneCall 
} from 'lucide-react';
import { getCurrentPairInfo } from '../utils/scheduleParser';

export default function Header({ 
  theme, 
  onToggleTheme, 
  onOpenCabinet, 
  onOpenSearch, 
  activeSection, 
  onNavigate,
  currentUser 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [pairInfo, setPairInfo] = useState(getCurrentPairInfo());

  // Оновлення поточної пари щохвилини
  useEffect(() => {
    const timer = setInterval(() => {
      setPairInfo(getCurrentPairInfo());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleNavClick = (sectionId) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="site-header">
      {/* Верхній статус-бар: актуальний статус та поточна пара */}
      <div className="ticker-bar">
        <div className="container ticker-container">
          <div className="ticker-left">
            <span className="ticker-badge">НАЖИВО</span>
            <span className="ticker-text">
              Формат навчання: <strong>1–2 курс — очно</strong> | <strong>3–4 курс — змішано</strong>
            </span>
          </div>
          <div className="ticker-right">
            <span className="pair-indicator">
              <span className="pair-dot"></span>
              {pairInfo.text}
            </span>
          </div>
        </div>
      </div>

      {/* Основна шапка */}
      <div className="main-navbar">
        <div className="container nav-container">
          {/* Логотип */}
          <div className="nav-brand" onClick={() => handleNavClick('home')}>
            <img src="/logo.svg" alt="БФКПЕП Логотип" className="brand-logo" />
            <div className="brand-text">
              <span className="brand-acronym">ВСП «БФКПЕП»</span>
              <span className="brand-subtitle">Бердичівський коледж промисловості, економіки та права</span>
            </div>
          </div>

          {/* Десктопне навігаційне меню */}
          <nav className="nav-links">
            <button 
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              Головна
            </button>

            {/* Про коледж */}
            <div 
              className="nav-dropdown"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="nav-link dropdown-toggle">
                Про коледж <ChevronDown size={15} />
              </button>
              {activeDropdown === 'about' && (
                <div className="dropdown-menu">
                  <div className="dropdown-item" onClick={() => handleNavClick('administration')}>
                    <strong>Керівний склад</strong>
                    <span>Дирекція коледжу</span>
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavClick('history')}>
                    <strong>Історія та традиції</strong>
                    <span>85+ років інженерної школи</span>
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavClick('contacts')}>
                    <strong>Контакти та локація</strong>
                    <span>м. Бердичів, вул. Замкова, 2а</span>
                  </div>
                </div>
              )}
            </div>

            {/* Освітня діяльність */}
            <div 
              className="nav-dropdown"
              onMouseEnter={() => setActiveDropdown('education')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="nav-link dropdown-toggle">
                Спеціальності <ChevronDown size={15} />
              </button>
              {activeDropdown === 'education' && (
                <div className="dropdown-menu">
                  <div className="dropdown-item" onClick={() => handleNavClick('specialties')}>
                    <strong>Всі 8 спеціальностей</strong>
                    <span>ІПЗ, Машинобудування, Менеджмент тощо</span>
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavClick('specialties')}>
                    <strong>121 Інженерія програмного забезпечення</strong>
                    <span>ІТ-відділення та розробка</span>
                  </div>
                </div>
              )}
            </div>

            {/* Прозорість */}
            <button 
              className={`nav-link ${activeSection === 'transparency' ? 'active' : ''}`}
              onClick={() => handleNavClick('transparency')}
            >
              Прозорість
            </button>

            {/* Вступнику */}
            <button 
              className={`nav-link ${activeSection === 'admissions' ? 'active' : ''}`}
              onClick={() => handleNavClick('admissions')}
            >
              Вступнику
            </button>

            {/* Кілер-фіча: Розклад і заміни */}
            <button 
              className={`nav-link schedule-cta ${activeSection === 'schedule' ? 'active' : ''}`}
              onClick={() => handleNavClick('schedule')}
            >
              <Calendar size={16} />
              <span>Розклад та Заміни</span>
              <span className="pulse-indicator"></span>
            </button>
          </nav>

          {/* Панель дій праворуч */}
          <div className="nav-actions">
            {/* Пошук */}
            <button 
              className="action-btn" 
              onClick={onOpenSearch}
              title="Швидкий пошук по сайту"
            >
              <Search size={18} />
            </button>

            {/* Перемикач теми */}
            <button 
              className="action-btn" 
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Кабінет студента */}
            <button 
              className="btn btn-primary btn-sm student-btn"
              onClick={onOpenCabinet}
            >
              <User size={16} />
              <span>{currentUser ? currentUser.name : 'Кабінет студента'}</span>
            </button>

            {/* Бургер для мобільних */}
            <button 
              className="mobile-burger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Мобільне меню */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-content">
            <button className="mobile-link" onClick={() => handleNavClick('home')}>Головна</button>
            <button className="mobile-link schedule-highlight" onClick={() => handleNavClick('schedule')}>
              ⚡ Розклад занять та Заміни
            </button>
            <button className="mobile-link" onClick={() => handleNavClick('specialties')}>Спеціальності коледжу</button>
            <button className="mobile-link" onClick={() => handleNavClick('transparency')}>Прозорість (Статут, Ліцензії)</button>
            <button className="mobile-link" onClick={() => handleNavClick('admissions')}>Вступнику 2026</button>
            <button className="mobile-link" onClick={() => handleNavClick('administration')}>Керівництво коледжу</button>
            <button className="mobile-link" onClick={() => handleNavClick('contacts')}>Контакти</button>
            <button className="btn btn-primary btn-block" onClick={() => { setMobileMenuOpen(false); onOpenCabinet(); }}>
              <User size={16} />
              Вхід у корпоративний кабінет
            </button>
          </div>
        </div>
      )}

      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-color);
          backdrop-filter: blur(12px);
        }

        .ticker-bar {
          background: var(--bg-muted);
          border-bottom: 1px solid var(--border-color);
          font-size: 0.775rem;
          padding: 0.35rem 0;
          color: var(--text-muted);
        }

        .ticker-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .ticker-left {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .ticker-badge {
          background: var(--accent-emerald);
          color: #fff;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.1rem 0.45rem;
          border-radius: var(--radius-full);
          letter-spacing: 0.05em;
        }

        .pair-indicator {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-weight: 600;
          color: var(--primary);
        }

        .pair-dot {
          width: 8px;
          height: 8px;
          background: var(--primary);
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 6px var(--primary);
        }

        .main-navbar {
          height: var(--header-height);
          display: flex;
          align-items: center;
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          user-select: none;
        }

        .brand-logo {
          width: 44px;
          height: 44px;
          border-radius: 10px;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-acronym {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: -0.02em;
          color: var(--text-main);
          line-height: 1.1;
        }

        .brand-subtitle {
          font-size: 0.725rem;
          color: var(--text-muted);
          max-width: 250px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .nav-link {
          font-size: 0.925rem;
          font-weight: 500;
          color: var(--text-muted);
          transition: color 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--primary);
        }

        .schedule-cta {
          color: var(--primary);
          font-weight: 700;
          background: var(--primary-subtle);
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-md);
          position: relative;
        }

        .pulse-indicator {
          width: 6px;
          height: 6px;
          background: var(--accent-rose);
          border-radius: 50%;
          position: absolute;
          top: 6px;
          right: 6px;
          animation: pulseGlow 1.5s infinite ease-in-out;
        }

        .nav-dropdown {
          position: relative;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 0.5rem;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          padding: 0.5rem;
          min-width: 260px;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          animation: fadeIn 0.15s ease-out;
        }

        .dropdown-item {
          padding: 0.6rem 0.8rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }
        .dropdown-item:hover {
          background: var(--bg-hover);
        }
        .dropdown-item strong {
          font-size: 0.875rem;
          color: var(--text-main);
        }
        .dropdown-item span {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .action-btn {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          color: var(--text-muted);
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          transition: all 0.15s ease;
        }
        .action-btn:hover {
          color: var(--text-main);
          border-color: var(--border-subtle);
          background: var(--bg-muted);
        }

        .mobile-burger {
          display: none;
          color: var(--text-main);
        }

        .mobile-drawer {
          display: none;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          .nav-links {
            display: none;
          }
          .mobile-burger {
            display: flex;
          }
          .mobile-drawer {
            display: block;
            border-top: 1px solid var(--border-color);
            background: var(--bg-surface);
            padding: 1.25rem;
          }
          .mobile-drawer-content {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .mobile-link {
            text-align: left;
            font-size: 1rem;
            font-weight: 500;
            color: var(--text-main);
            padding: 0.5rem 0;
            border-bottom: 1px solid var(--border-color);
          }
          .mobile-link.schedule-highlight {
            color: var(--primary);
            font-weight: 700;
          }
          .btn-block {
            width: 100%;
          }
        }
      `}</style>
    </header>
  );
}
