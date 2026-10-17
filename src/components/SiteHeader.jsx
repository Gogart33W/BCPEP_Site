import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, ChevronDown, ChevronRight, 
  Menu, X, Search, Moon, Sun, Calendar, Clock, Award
} from 'lucide-react';
import menuData from '../../content/menu.json';

export default function SiteHeader({ theme, onToggleTheme, onOpenSearch }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Закриття меню при зміні маршруту
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const openTimerRef = React.useRef(null);
  const closeTimerRef = React.useRef(null);

  const handleMouseEnter = (idx) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    if (activeDropdown !== null) {
      setActiveDropdown(idx);
    } else {
      openTimerRef.current = setTimeout(() => {
        setActiveDropdown(idx);
      }, 100);
    }
  };

  const handleMouseLeave = () => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 320);
  };

  const handleToggleDropdown = (idx, e) => {
    e.preventDefault();
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveDropdown(prev => (prev === idx ? null : idx));
  };

  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (!e.target.closest('.desktop-nav')) {
        setActiveDropdown(null);
      }
    };
    const handleGlobalKey = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('click', handleGlobalClick);
    document.addEventListener('keydown', handleGlobalKey);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
      document.removeEventListener('keydown', handleGlobalKey);
    };
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      {/* Верхня інформаційна панель контактів (без соцмереж) */}
      <div className="top-bar">
        <div className="container top-bar-container">
          <div className="top-bar-left">
            <span className="top-item address-item">
              <MapPin size={13} className="top-icon" />
              <span>м. Бердичів, вул. Замкова, 2а</span>
            </span>
            <span className="top-divider">•</span>
            <a href="tel:+380414340734" className="top-item">
              <Phone size={13} className="top-icon" />
              <span>+380 (4143) 4-07-34</span>
            </a>
            <span className="top-divider">•</span>
            <a href="mailto:bcpep@ukr.net" className="top-item">
              <Mail size={13} className="top-icon" />
              <span>bcpep@ukr.net</span>
            </a>
          </div>

          <div className="top-bar-right">
            <span className="top-badge">
              <Award size={12} />
              <span>Акредитований заклад фахової передвищої освіти</span>
            </span>
            <span className="top-divider">•</span>
            <Link to="/rozklad-zanyat/rozklad-zanyat" className="top-quick-schedule">
              <Calendar size={13} />
              <span>Розклад занять та дзвінки</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Основна навігаційна панель */}
      <div className="main-nav-bar">
        <div className="container nav-container">
          {/* Бренд коледжу */}
          <Link to="/" className="nav-brand">
            <img 
              src="/uploads/2025/09/berdychivskyj-fahovyj-koledzh-promyslovosti-ekonomiky-ta-prava-2.png" 
              alt="БФКПЕП Логотип"
              className="brand-logo"
              onError={(e) => { e.target.src = '/logo.svg'; }}
            />
            <div className="brand-text">
              <span className="brand-acronym">ВСП «БФКПЕП»</span>
              <span className="brand-title">Бердичівський коледж промисловості, економіки та права</span>
            </div>
          </Link>

          {/* Десктопне меню з багаторівневою випадаючою структурою */}
          <nav className="desktop-nav" aria-label="Головне меню">
            {menuData.map((item, idx) => {
              const hasKids = item.children && item.children.length > 0;
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));

              if (!hasKids) {
                return (
                  <Link 
                    key={idx}
                    to={item.path} 
                    className={`nav-item-link ${isActive ? 'active' : ''}`}
                  >
                    {item.title}
                  </Link>
                );
              }

              const subGroups = item.children.filter(c => c.children && c.children.length > 0);
              const singleItems = item.children.filter(c => !c.children || c.children.length === 0);
              const isMega = subGroups.length > 0;

              return (
                <div 
                  key={idx}
                  className={`nav-dropdown-wrapper ${isMega ? 'has-mega' : ''}`}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button 
                    type="button"
                    onClick={(e) => handleToggleDropdown(idx, e)}
                    className={`nav-item-link has-dropdown ${isActive ? 'active' : ''}`}
                    aria-expanded={activeDropdown === idx}
                  >
                    <span>{item.title}</span>
                    <ChevronDown size={14} className={`dropdown-caret ${activeDropdown === idx ? 'rotated' : ''}`} />
                  </button>

                  {activeDropdown === idx && (
                    <div 
                      className={`dropdown-menu-box ${isMega ? 'dropdown-mega-box' : ''}`}
                      role="menu"
                      onMouseEnter={() => handleMouseEnter(idx)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {isMega ? (
                        <div className="mega-menu-grid">
                          {/* Ліва колонка: Основні розділи */}
                          <div className="mega-col mega-col-main">
                            <span className="mega-section-label">Розділи</span>
                            <div className="mega-links-list">
                              {singleItems.map((sub, sIdx) => (
                                <Link 
                                  key={sIdx}
                                  to={sub.path} 
                                  className="dropdown-link"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  <span>{sub.title}</span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Права колонка: Підрозділи або спеціальності */}
                          <div className="mega-col mega-col-sub">
                            {subGroups.map((group, gIdx) => (
                              <div key={gIdx} className="mega-subgroup">
                                <Link 
                                  to={group.path} 
                                  className="mega-group-header"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  <span>{group.title}</span>
                                  <ChevronRight size={13} />
                                </Link>

                                <div className="mega-sub-grid">
                                  {group.children.map((child, cIdx) => (
                                    <Link 
                                      key={cIdx}
                                      to={child.path} 
                                      className="dropdown-link sub-child-link"
                                      onClick={() => setActiveDropdown(null)}
                                    >
                                      <span>{child.title}</span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="dropdown-single-list">
                          {item.children.map((sub, sIdx) => (
                            <Link 
                              key={sIdx}
                              to={sub.path} 
                              className="dropdown-link"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span>{sub.title}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Панель швидких інструментів */}
          <div className="nav-tools">
            <button 
              className="header-search-pill" 
              onClick={onOpenSearch} 
              title="Швидкий пошук по коледжу"
              aria-label="Пошук"
            >
              <Search size={15} className="search-icon" />
              <span className="search-text">Пошук...</span>
            </button>

            <button 
              className="theme-toggle-btn" 
              onClick={onToggleTheme} 
              title={theme === 'dark' ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'}
              aria-label="Зміна теми"
            >
              {theme === 'dark' ? <Sun size={17} className="theme-icon sun" /> : <Moon size={17} className="theme-icon moon" />}
            </button>

            <button 
              className="burger-toggle" 
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Закрити меню' : 'Відкрити меню'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Мобільне меню-висувка з акордеонами */}
      {mobileOpen && (
        <div className="mobile-drawer">
          <div className="container mobile-drawer-inner">
            <div className="mobile-quick-actions">
              <Link to="/rozklad-zanyat/rozklad-zanyat" className="mobile-cta-btn">
                <Calendar size={16} />
                <span>Розклад та дзвінки</span>
              </Link>
              <button className="mobile-search-btn" onClick={() => { setMobileOpen(false); onOpenSearch(); }}>
                <Search size={16} />
                <span>Пошук</span>
              </button>
            </div>

            <nav className="mobile-nav-tree">
              {menuData.map((item, idx) => {
                const hasKids = item.children && item.children.length > 0;
                const isExpanded = mobileExpanded[idx];

                return (
                  <div key={idx} className="mobile-nav-block">
                    <div className="mobile-nav-row">
                      <Link 
                        to={item.path} 
                        className="mobile-root-link"
                      >
                        {item.title}
                      </Link>
                      {hasKids && (
                        <button 
                          className="mobile-accordion-btn"
                          onClick={() => toggleMobileGroup(idx)}
                          aria-label="Розгорнути підпункти"
                        >
                          <ChevronDown size={18} className={isExpanded ? 'rotated' : ''} />
                        </button>
                      )}
                    </div>

                    {hasKids && isExpanded && (
                      <div className="mobile-sub-list">
                        {item.children.map((sub, sIdx) => (
                          <div key={sIdx} className="mobile-sub-group">
                            <Link 
                              to={sub.path} 
                              className="mobile-sub-link"
                            >
                              {sub.title}
                            </Link>
                            {sub.children && (
                              <div className="mobile-third-list">
                                {sub.children.map((third, tIdx) => (
                                  <Link 
                                    key={tIdx}
                                    to={third.path} 
                                    className="mobile-third-link"
                                  >
                                    — {third.title}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
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
          transition: box-shadow var(--transition-base), background-color var(--transition-base);
        }

        .site-header.is-scrolled {
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.08);
          background: rgba(var(--bg-surface), 0.95);
          backdrop-filter: blur(12px);
        }

        /* Верхній контактний рядок */
        .top-bar {
          background: var(--bg-muted);
          border-bottom: 1px solid var(--border-color);
          font-size: 0.775rem;
          color: var(--text-muted);
          padding: 0.35rem 0;
        }

        .top-bar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .top-bar-left, .top-bar-right {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
        }

        .top-item {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--text-muted);
          text-decoration: none;
        }

        .top-item:hover {
          color: var(--primary);
        }

        .top-icon {
          color: var(--primary);
        }

        .top-divider {
          color: var(--border-subtle);
          font-size: 0.65rem;
        }

        .top-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--text-muted);
        }

        .top-quick-schedule {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
          padding: 0.15rem 0.5rem;
          background: var(--primary-subtle);
          border-radius: var(--radius-xs);
        }

        .top-quick-schedule:hover {
          background: var(--primary);
          color: #ffffff;
        }

        /* Головна шапка */
        .main-nav-bar {
          padding: 0.65rem 0;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
        }

        /* Бренд */
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          text-decoration: none;
          color: inherit;
          flex-shrink: 0;
        }

        .brand-logo {
          height: 48px;
          width: auto;
          object-fit: contain;
          transition: transform var(--transition-fast);
        }

        .nav-brand:hover .brand-logo {
          transform: scale(1.03);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-acronym {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.15rem;
          color: var(--primary);
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .brand-title {
          font-size: 0.725rem;
          color: var(--text-muted);
          max-width: 310px;
          line-height: 1.25;
        }

        /* Десктопна навігація */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .nav-dropdown-wrapper {
          position: relative;
        }

        .nav-item-link {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-main);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .nav-item-link:hover, .nav-item-link.active {
          color: var(--primary);
          background: var(--primary-subtle);
        }

        .dropdown-caret {
          color: var(--text-muted);
          transition: transform var(--transition-fast);
        }

        .dropdown-caret.rotated,
        .nav-dropdown-wrapper:hover .dropdown-caret {
          transform: rotate(180deg);
          color: var(--primary);
        }

        /* Випадаюче меню без розривів */
        .dropdown-menu-box {
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 280px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-xl);
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          z-index: 1100;
          animation: dropIn 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Невидимий міст, що не дає курсору втратити фокус при русі вниз */
        .dropdown-menu-box::before {
          content: '';
          position: absolute;
          top: -14px;
          left: 0;
          right: 0;
          height: 14px;
        }

        @keyframes dropIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-single-list {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .dropdown-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.6rem 0.9rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-main);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          text-decoration: none;
        }

        .dropdown-link:hover {
          background: var(--primary-subtle);
          color: var(--primary);
          padding-left: 1.05rem;
        }

        /* Мега-меню для багаторівневих списків (без розривів та вильотів) */
        .dropdown-mega-box {
          min-width: 620px;
          padding: 0.85rem;
        }

        .mega-menu-grid {
          display: grid;
          grid-template-columns: 210px 1fr;
          gap: 1rem;
        }

        .mega-col-main {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          border-right: 1px solid var(--border-color);
          padding-right: 0.85rem;
        }

        .mega-section-label {
          font-size: 0.725rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.04em;
          padding: 0.25rem 0.5rem;
        }

        .mega-links-list {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .mega-col-sub {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mega-subgroup {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mega-group-header {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.825rem;
          font-weight: 700;
          color: var(--primary);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-xs);
          text-decoration: none;
        }

        .mega-group-header:hover {
          background: var(--primary-subtle);
        }

        .mega-sub-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.35rem;
        }

        .sub-child-link {
          padding: 0.45rem 0.65rem;
          font-size: 0.8rem;
          background: var(--bg-muted);
          border-radius: var(--radius-xs);
          line-height: 1.35;
        }

        .sub-child-link:hover {
          background: var(--primary-subtle);
          padding-left: 0.85rem;
        }

        /* Кнопки дій: пошук та перемикач теми */
        .nav-tools {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .header-search-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.45rem 1rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          color: var(--text-muted);
          font-size: 0.825rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-xs);
        }

        .header-search-pill:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: var(--primary-subtle);
          box-shadow: var(--shadow-sm);
          transform: translateY(-1px);
        }

        .search-icon {
          color: var(--primary);
        }

        .theme-toggle-btn {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          color: var(--text-main);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-xs);
        }

        .theme-toggle-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: var(--primary-subtle);
          transform: scale(1.05);
        }

        .theme-icon.sun {
          color: #f59e0b;
        }

        .theme-icon.moon {
          color: var(--primary);
        }

        .burger-toggle {
          display: none;
          width: 40px;
          height: 40px;
          align-items: center;
          justify-content: center;
          color: var(--text-main);
          border-radius: var(--radius-sm);
        }

        /* Мобільне меню */
        .mobile-drawer {
          background: var(--bg-surface);
          border-top: 1px solid var(--border-color);
          max-height: calc(100vh - 120px);
          overflow-y: auto;
          padding: 1.25rem 0 2rem;
          box-shadow: var(--shadow-xl);
        }

        .mobile-quick-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-color);
        }

        .mobile-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: var(--primary);
          color: #ffffff;
          padding: 0.65rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 600;
        }

        .mobile-search-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: var(--bg-muted);
          color: var(--text-main);
          border: 1px solid var(--border-color);
          padding: 0.65rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 600;
        }

        .mobile-nav-tree {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mobile-nav-block {
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.5rem;
        }

        .mobile-nav-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .mobile-root-link {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-main);
          padding: 0.5rem 0;
          flex: 1;
        }

        .mobile-accordion-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
        }

        .mobile-accordion-btn .rotated {
          transform: rotate(180deg);
        }

        .mobile-sub-list {
          padding-left: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin-top: 0.25rem;
          border-left: 2px solid var(--primary-subtle);
        }

        .mobile-sub-link {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-main);
          padding: 0.4rem 0.5rem;
          border-radius: var(--radius-xs);
        }

        .mobile-sub-link:hover {
          color: var(--primary);
        }

        .mobile-third-list {
          padding-left: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-top: 0.2rem;
        }

        .mobile-third-link {
          font-size: 0.825rem;
          color: var(--text-muted);
          padding: 0.25rem 0.5rem;
        }

        /* Адаптивність під мобільні/планшети */
        @media (max-width: 1160px) {
          .desktop-nav {
            display: none;
          }
          .burger-toggle {
            display: inline-flex;
          }
          .search-hotkey {
            display: none;
          }
          .search-trigger {
            width: 38px;
            padding: 0;
          }
        }

        @media (max-width: 768px) {
          .top-bar-right {
            display: none;
          }
          .brand-title {
            display: none;
          }
          .address-item {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
