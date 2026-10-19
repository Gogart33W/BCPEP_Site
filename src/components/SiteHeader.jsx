import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, ChevronDown, ChevronRight, 
  Menu, X, Search, Moon, Sun, Calendar, Clock, Award, GraduationCap
} from 'lucide-react';
import menuData from '../../content/menu.json';

export default function SiteHeader({ theme, onToggleTheme, onOpenSearch }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const timerRef = React.useRef(null);
  const headerRef = React.useRef(null);
  const drawerRef = React.useRef(null);
  const [headerHeight, setHeaderHeight] = useState(54);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Відстеження висоти шапки
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight || 54);
    }
  }, [scrolled, mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Закриття меню при зміні маршруту + повернення на початок нової сторінки
  useEffect(() => {
    clearTimer();
    setMobileOpen(false);
    setOpenIdx(null);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Плавне повернення на початок сторінки при відкритті мобільного меню
  useEffect(() => {
    if (mobileOpen) {
      // Плавно скролимо вікно на початок незалежно від глибини скролу
      try {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      } catch (e) {
        window.scrollTo(0, 0);
      }

      // Скидаємо скрол самого контейнера висувки на початок
      if (drawerRef.current) {
        drawerRef.current.scrollTop = 0;
      }

      // Затримка блокування скролу, щоб плавна анімація прокрутки сторінки встигла виконатися
      const lockTimer = setTimeout(() => {
        document.body.style.overflow = 'hidden';
      }, 450);

      return () => {
        clearTimeout(lockTimer);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  const handleToggleMobile = () => {
    const next = !mobileOpen;
    if (next) {
      // Плавний скрол безпосередньо за подією кліку для максимальної чутливості
      try {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      } catch (e) {
        window.scrollTo(0, 0);
      }
    }
    setMobileOpen(next);
  };

  const handleMouseEnter = (idx) => {
    clearTimer();
    // Якщо інше меню вже відкрите — перемикаємося негайно, без затримки
    if (openIdx !== null) {
      setOpenIdx(idx);
    } else {
      timerRef.current = setTimeout(() => {
        setOpenIdx(idx);
      }, 70);
    }
  };

  const handleMouseLeave = (idx) => {
    clearTimer();
    // Таймер перевіряє що закривається САМЕ ЦЕ меню і не закриває нововідкрите сусіднє
    timerRef.current = setTimeout(() => {
      setOpenIdx((current) => (current === idx ? null : current));
    }, 220);
  };

  const handleButtonClick = (idx, e) => {
    e.preventDefault();
    e.stopPropagation();
    clearTimer();
    setOpenIdx((current) => (current === idx ? null : idx));
  };

  const toggleMobileGroup = (idx) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (!e.target.closest('.desktop-nav')) {
        clearTimer();
        setOpenIdx(null);
      }
    };
    const handleGlobalKey = (e) => {
      if (e.key === 'Escape') {
        clearTimer();
        setOpenIdx(null);
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
    <header ref={headerRef} className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
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
            <Link to="/abituriyentu/vstup" className="top-quick-schedule">
              <GraduationCap size={13} />
              <span>Приймальна комісія</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Основна навігаційна панель */}
      <div className="main-nav-bar">
        <div className="container nav-container">
          {/* Бренд коледжу з офіційним гербом */}
          <Link to="/" className="nav-brand">
            <img 
              src="/college-emblem.png" 
              alt="Офіційний герб БФКПЕП"
              className="brand-logo"
            />
            <div className="brand-text">
              <span className="brand-acronym">БФКПЕП</span>
              <span className="brand-title">Бердичівський фаховий коледж промисловості, економіки та права</span>
            </div>
          </Link>

          {/* Десктопне меню з плавною анімацією відкриття ТА закриття */}
          <nav className="desktop-nav" aria-label="Головне меню">
            {menuData.map((item, idx) => {
              const hasKids = item.children && item.children.length > 0;
              const isOpen = openIdx === idx;
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
              const alignRight = idx >= 3;

              return (
                <div 
                  key={idx}
                  className={`nav-dropdown-wrapper ${isMega ? 'has-mega' : ''} ${isOpen ? 'is-open' : ''}`}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                >
                  <button 
                    type="button"
                    onClick={(e) => handleButtonClick(idx, e)}
                    className={`nav-item-link has-dropdown ${isActive ? 'active' : ''} ${isOpen ? 'menu-open' : ''}`}
                    aria-expanded={isOpen}
                  >
                    <span>{item.title}</span>
                    <ChevronDown size={14} className={`dropdown-caret ${isOpen ? 'rotated' : ''}`} />
                  </button>

                  {/* Завжди змонтовано в DOM — плавний вхід та вихід */}
                  <div 
                    className={`dropdown-menu-box ${isMega ? 'dropdown-mega-box' : ''} ${alignRight ? 'align-right' : ''} ${isOpen ? 'menu-visible' : ''}`}
                    role="menu"
                    aria-hidden={!isOpen}
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
                                style={{ transitionDelay: isOpen ? `${sIdx * 15}ms` : '0ms' }}
                                onClick={() => { clearTimer(); setOpenIdx(null); }}
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
                                onClick={() => { clearTimer(); setOpenIdx(null); }}
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
                                    style={{ transitionDelay: isOpen ? `${(cIdx + 3) * 15}ms` : '0ms' }}
                                    onClick={() => { clearTimer(); setOpenIdx(null); }}
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
                            style={{ transitionDelay: isOpen ? `${sIdx * 18}ms` : '0ms' }}
                            onClick={() => { clearTimer(); setOpenIdx(null); }}
                          >
                            <span>{sub.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
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
              onClick={handleToggleMobile}
              aria-label={mobileOpen ? 'Закрити меню' : 'Відкрити меню'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Мобільне меню-висувка з акордеонами та гарантованим кліком */}
      {mobileOpen && (
        <div 
          className="mobile-drawer"
          ref={drawerRef}
          style={{
            top: `${headerHeight}px`,
            height: `calc(100dvh - ${headerHeight}px)`
          }}
        >
          <div className="container mobile-drawer-inner">
            <div className="mobile-quick-actions">
              <Link 
                to="/rozklad-zanyat/rozklad-zanyat" 
                className="mobile-cta-btn"
                onClick={() => setMobileOpen(false)}
              >
                <Calendar size={16} />
                <span>Розклад та дзвінки</span>
              </Link>
              <button 
                type="button"
                className="mobile-search-btn" 
                onClick={() => { setMobileOpen(false); onOpenSearch(); }}
              >
                <Search size={16} />
                <span>Пошук</span>
              </button>
            </div>

            <nav className="mobile-nav-tree">
              {menuData.map((item, idx) => {
                const hasKids = item.children && item.children.length > 0;
                const isExpanded = !!mobileExpanded[idx];

                return (
                  <div key={idx} className="mobile-nav-block">
                    {hasKids ? (
                      <button 
                        type="button"
                        className="mobile-nav-row-btn"
                        onClick={() => toggleMobileGroup(idx)}
                        aria-expanded={isExpanded}
                      >
                        <span className="mobile-root-title">{item.title}</span>
                        <ChevronDown size={18} className={`mobile-caret ${isExpanded ? 'rotated' : ''}`} />
                      </button>
                    ) : (
                      <Link 
                        to={item.path} 
                        className="mobile-nav-row-link"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="mobile-root-title">{item.title}</span>
                        <ChevronRight size={16} className="mobile-caret" />
                      </Link>
                    )}

                    {hasKids && isExpanded && (
                      <div className="mobile-sub-list">
                        {item.path && item.path !== '#' && (
                          <Link 
                            to={item.path} 
                            className="mobile-sub-link mobile-overview-link"
                            onClick={() => setMobileOpen(false)}
                          >
                            <span>📌 Огляд розділу «{item.title}»</span>
                            <ChevronRight size={14} />
                          </Link>
                        )}
                        {item.children.map((sub, sIdx) => {
                          const hasThird = sub.children && sub.children.length > 0;
                          return (
                            <div key={sIdx} className="mobile-sub-group">
                              <Link 
                                to={sub.path} 
                                className="mobile-sub-link"
                                onClick={() => setMobileOpen(false)}
                              >
                                <span>{sub.title}</span>
                                {hasThird ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                              </Link>
                              {hasThird && (
                                <div className="mobile-third-list">
                                  {sub.children.map((third, tIdx) => (
                                    <Link 
                                      key={tIdx}
                                      to={third.path} 
                                      className="mobile-third-link"
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      <span>— {third.title}</span>
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
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
          max-width: 1680px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
        }

        @media (max-width: 1760px) {
          .brand-title {
            display: none;
          }
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
          gap: 0.35rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-main);
          border-radius: var(--radius-sm);
          transition: background-color var(--transition-fast), color var(--transition-fast);
          cursor: pointer;
          user-select: none;
          white-space: nowrap;
          height: 38px;
          box-sizing: border-box;
        }

        .nav-item-link:hover, 
        .nav-item-link.menu-open,
        .nav-item-link.active {
          color: var(--primary);
          background: var(--primary-subtle);
        }

        .dropdown-caret {
          color: var(--text-muted);
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), color 0.22s;
        }

        .dropdown-caret.rotated {
          transform: rotate(180deg);
          color: var(--primary);
        }

        /* Випадаюче меню: плавне відкриття ТА закриття без видалення з DOM */
        .dropdown-menu-box {
          position: absolute;
          top: calc(100% + 2px);
          left: 0;
          min-width: 280px;
          max-width: min(640px, calc(100vw - 32px));
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: 0 20px 45px -8px rgba(0, 0, 0, 0.22), 0 0 0 1px var(--border-color);
          padding: 0.65rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          z-index: 1200;

          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transform: translateY(-6px) scale(0.985);
          transform-origin: top left;
          transition: opacity 0.2s cubic-bezier(0.2, 0.8, 0.2, 1),
                      transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1),
                      visibility 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .dropdown-menu-box.align-right {
          left: auto;
          right: 0;
          transform-origin: top right;
        }

        .dropdown-menu-box.menu-visible {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translateY(0) scale(1);
        }

        /* Невидимий міст, що на 100% запобігає закриттю меню при русі мишки */
        .dropdown-menu-box::before {
          content: '';
          position: absolute;
          top: -16px;
          left: 0;
          right: 0;
          height: 18px;
          background: transparent;
        }

        .dropdown-single-list {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .dropdown-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.6rem 0.9rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-main);
          border-radius: var(--radius-sm);
          transition: background-color var(--transition-fast), color var(--transition-fast), transform var(--transition-fast);
          text-decoration: none;
        }

        .dropdown-link:hover {
          background: var(--primary-subtle);
          color: var(--primary);
          transform: translateX(3px);
        }

        /* Мега-меню для розгалужених списків з обмеженням висоти */
        .dropdown-mega-box {
          min-width: 620px;
          max-height: 480px;
          overflow-y: auto;
          padding: 1rem;
        }

        .mega-menu-grid {
          display: grid;
          grid-template-columns: 210px 1fr;
          gap: 1.25rem;
        }

        .mega-col-main {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          border-right: 1px solid var(--border-color);
          padding-right: 1rem;
        }

        .mega-section-label {
          font-size: 0.725rem;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          padding: 0.25rem 0.6rem;
        }

        .mega-links-list {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
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
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--primary);
          padding: 0.3rem 0.6rem;
          border-radius: var(--radius-xs);
          text-decoration: none;
          background: var(--primary-subtle);
          width: fit-content;
        }

        .mega-group-header:hover {
          background: var(--primary);
          color: #ffffff;
        }

        .mega-sub-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.4rem;
        }

        .sub-child-link {
          padding: 0.5rem 0.75rem;
          font-size: 0.825rem;
          background: var(--bg-muted);
          border-radius: var(--radius-xs);
          line-height: 1.35;
        }

        .sub-child-link:hover {
          background: var(--primary-subtle);
          color: var(--primary);
          transform: translateX(2px);
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
          font-weight: 600;
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

        @keyframes mobileDrawerEnter {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Мобільне меню-висувка */
        .mobile-drawer {
          background: var(--bg-surface);
          border-top: 1px solid var(--border-color);
          padding: 1.25rem 0 3rem;
          box-shadow: var(--shadow-xl);
          animation: mobileDrawerEnter 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          overscroll-behavior: contain;
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
          color: #ffffff !important;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(29, 78, 216, 0.25);
        }

        .mobile-search-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: var(--bg-muted);
          color: var(--text-main);
          border: 1px solid var(--border-color);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          font-weight: 700;
          cursor: pointer;
        }

        .mobile-nav-tree {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .mobile-nav-block {
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.35rem;
        }

        .mobile-nav-row-btn,
        .mobile-nav-row-link {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.85rem 0.5rem;
          border-radius: var(--radius-sm);
          color: var(--text-main);
          font-size: 1.05rem;
          font-weight: 700;
          font-family: var(--font-heading);
          cursor: pointer;
          text-decoration: none;
          background: transparent;
          border: none;
          text-align: left;
          touch-action: manipulation;
        }

        .mobile-nav-row-btn:active,
        .mobile-nav-row-link:active {
          background: var(--bg-muted);
        }

        .mobile-caret {
          color: var(--text-muted);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          flex-shrink: 0;
        }

        .mobile-caret.rotated {
          transform: rotate(180deg);
          color: var(--primary);
        }

        .mobile-sub-list {
          padding-left: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin: 0.35rem 0 0.85rem;
          border-left: 2px solid var(--primary-subtle);
        }

        .mobile-overview-link {
          font-weight: 700 !important;
          color: var(--primary) !important;
          background: var(--primary-subtle);
        }

        .mobile-sub-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.925rem;
          font-weight: 600;
          color: var(--text-main);
          padding: 0.65rem 0.75rem;
          border-radius: var(--radius-xs);
          text-decoration: none;
          touch-action: manipulation;
        }

        .mobile-sub-link:active {
          background: var(--bg-muted);
          color: var(--primary);
        }

        .mobile-third-list {
          padding-left: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin: 0.25rem 0;
        }

        .mobile-third-link {
          font-size: 0.85rem;
          color: var(--text-muted);
          padding: 0.45rem 0.65rem;
          border-radius: var(--radius-xs);
          text-decoration: none;
          line-height: 1.35;
          touch-action: manipulation;
        }

        .mobile-third-link:active {
          color: var(--primary);
          background: var(--bg-muted);
        }

        /* Адаптивність під ноутбуки, планшети та смартфони */
        @media (max-width: 1480px) {
          .header-search-pill .search-text {
            display: none;
          }
          .header-search-pill {
            width: 38px;
            height: 38px;
            padding: 0;
            justify-content: center;
          }
          .nav-item-link {
            padding: 0.45rem 0.6rem;
            font-size: 0.84rem;
          }
        }

        @media (max-width: 1280px) {
          .desktop-nav {
            display: none;
          }
          .burger-toggle {
            display: inline-flex;
          }
        }

        @media (max-width: 768px) {
          .top-bar {
            display: none; /* Приховуємо важку верхню планку на смартфонах */
          }

          .main-nav-bar {
            padding: 0.5rem 0;
          }

          .nav-container {
            gap: 0.75rem;
          }

          .brand-logo {
            width: 38px;
            height: 38px;
          }

          .brand-acronym {
            font-size: 1.1rem;
          }

          .header-search-pill {
            width: 38px;
            height: 38px;
            padding: 0;
            justify-content: center;
            border-radius: var(--radius-full);
          }

          .header-search-pill .search-text {
            display: none;
          }

          .nav-tools {
            gap: 0.4rem;
          }

          .mobile-drawer {
            position: fixed;
            top: 54px;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: calc(100dvh - 54px);
            max-height: none;
            z-index: 9999;
            padding: 1rem 1rem 4rem;
            background: var(--bg-surface);
            overflow-y: auto;
            overscroll-behavior: contain;
            -webkit-overflow-scrolling: touch;
          }
        }

        @media (max-width: 420px) {
          .brand-acronym {
            font-size: 1.15rem;
            letter-spacing: -0.02em;
          }
        }
      `}</style>
    </header>
  );
}
