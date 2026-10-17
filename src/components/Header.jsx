import React, { useState } from 'react';
import { 
  Sun, Moon, Calendar, Search, User, Menu, X, 
  ChevronDown, MapPin, Phone, Mail
} from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData';

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

  const handleNavClick = (sectionId) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="site-header">
      {/* Верхня панель контактів як на bfcpep.org.ua */}
      <div className="top-contacts-bar">
        <div className="container top-contacts-container">
          <div className="top-contacts-left">
            <span className="contact-item">
              <MapPin size={13} />
              <span>{COLLEGE_INFO.address}</span>
            </span>
            <span className="contact-divider">•</span>
            <a href={`tel:${COLLEGE_INFO.phoneReception}`} className="contact-item">
              <Phone size={13} />
              <span>{COLLEGE_INFO.phoneReception}</span>
            </a>
            <span className="contact-divider">•</span>
            <a href={`mailto:${COLLEGE_INFO.email}`} className="contact-item">
              <Mail size={13} />
              <span>{COLLEGE_INFO.email}</span>
            </a>
          </div>

          <div className="top-contacts-right">
            <a href={COLLEGE_INFO.telegram} target="_blank" rel="noreferrer" className="social-top-link">Telegram</a>
            <a href={COLLEGE_INFO.social.facebook} target="_blank" rel="noreferrer" className="social-top-link">Facebook</a>
            <a href={COLLEGE_INFO.social.instagram} target="_blank" rel="noreferrer" className="social-top-link">Instagram</a>
          </div>
        </div>
      </div>

      {/* Основна шапка */}
      <div className="main-navbar">
        <div className="container nav-container">
          {/* Офіційний логотип коледжу */}
          <div className="nav-brand" onClick={() => handleNavClick('home')}>
            <img 
              src="https://www.bfcpep.org.ua/wp-content/uploads/2025/09/berdychivskyj-fahovyj-koledzh-promyslovosti-ekonomiky-ta-prava-2.png" 
              alt="Бердичівський фаховий коледж промисловості, економіки та права" 
              className="brand-logo-img" 
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="brand-text">
              <span className="brand-acronym">ВСП «БФКПЕП»</span>
              <span className="brand-subtitle">Бердичівський фаховий коледж промисловості, економіки та права</span>
            </div>
          </div>

          {/* Десктопне меню коледжу 1-в-1 */}
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
                Про коледж <ChevronDown size={14} />
              </button>
              {activeDropdown === 'about' && (
                <div className="dropdown-menu">
                  <div className="dropdown-item" onClick={() => handleNavClick('history')}>
                    <strong>Історія коледжу</strong>
                    <span>Заснування та традиції</span>
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavClick('administration')}>
                    <strong>Керівний склад</strong>
                    <span>Дирекція коледжу</span>
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavClick('administration')}>
                    <strong>Циклові комісії</strong>
                    <span>Викладацький склад</span>
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavClick('specialties')}>
                    <strong>Відділення та підрозділи</strong>
                    <span>Бібліотека, майстерні</span>
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavClick('contacts')}>
                    <strong>Контакти</strong>
                    <span>Адреса та реквізити</span>
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
                Освітня діяльність <ChevronDown size={14} />
              </button>
              {activeDropdown === 'education' && (
                <div className="dropdown-menu">
                  <div className="dropdown-item" onClick={() => handleNavClick('specialties')}>
                    <strong>Спеціальності (8 напрямів)</strong>
                    <span>ІПЗ, Машинобудування, Економіка тощо</span>
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavClick('specialties')}>
                    <strong>Освітньо-професійні програми (ОПП)</strong>
                    <span>Стандарти освіти</span>
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavClick('schedule')}>
                    <strong>Графік освітнього процесу</strong>
                    <span>Семестри та сесії</span>
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavClick('transparency')}>
                    <strong>Якість освіти та моніторинг</strong>
                    <span>Результати та звіти</span>
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

            {/* Студенту */}
            <button 
              className={`nav-link ${activeSection === 'student' ? 'active' : ''}`}
              onClick={() => handleNavClick('student')}
            >
              Студенту
            </button>

            {/* Розклад */}
            <button 
              className={`nav-link schedule-cta ${activeSection === 'schedule' ? 'active' : ''}`}
              onClick={() => handleNavClick('schedule')}
            >
              <Calendar size={15} />
              <span>Розклад</span>
            </button>
          </nav>

          {/* Панель дій */}
          <div className="nav-actions">
            <button 
              className="action-btn" 
              onClick={onOpenSearch}
              title="Пошук по сайту"
            >
              <Search size={18} />
            </button>

            <button 
              className="action-btn" 
              onClick={onToggleTheme}
              title="Змінити тему"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              className="btn btn-primary btn-sm student-btn"
              onClick={onOpenCabinet}
            >
              <User size={15} />
              <span>{currentUser ? currentUser.name : 'Кабінет'}</span>
            </button>

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
              📅 Розклад занять та заміни
            </button>
            <button className="mobile-link" onClick={() => handleNavClick('specialties')}>Спеціальності (8 напрямів)</button>
            <button className="mobile-link" onClick={() => handleNavClick('transparency')}>Прозорість та публічна інформація</button>
            <button className="mobile-link" onClick={() => handleNavClick('admissions')}>Вступнику</button>
            <button className="mobile-link" onClick={() => handleNavClick('student')}>Студенту (Рейтинги, Гуртожиток)</button>
            <button className="mobile-link" onClick={() => handleNavClick('administration')}>Керівний склад</button>
            <button className="mobile-link" onClick={() => handleNavClick('contacts')}>Контакти</button>
            <button className="btn btn-primary btn-block" onClick={() => { setMobileMenuOpen(false); onOpenCabinet(); }}>
              <User size={16} />
              Кабінет студента
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
        }

        .top-contacts-bar {
          background: var(--bg-muted);
          border-bottom: 1px solid var(--border-color);
          font-size: 0.775rem;
          color: var(--text-muted);
          padding: 0.4rem 0;
        }

        .top-contacts-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .top-contacts-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .contact-item {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--text-muted);
          text-decoration: none;
        }

        .contact-item:hover {
          color: var(--primary);
        }

        .contact-divider {
          color: var(--border-color);
        }

        .top-contacts-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .social-top-link {
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 600;
        }

        .social-top-link:hover {
          color: var(--primary);
        }

        .main-navbar {
          padding: 0.75rem 0;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          cursor: pointer;
          flex-shrink: 0;
        }

        .brand-logo-img {
          height: 48px;
          width: auto;
          object-fit: contain;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-acronym {
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: var(--text-main);
          line-height: 1.2;
        }

        .brand-subtitle {
          font-size: 0.75rem;
          color: var(--text-muted);
          max-width: 280px;
          line-height: 1.2;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .nav-link {
          padding: 0.45rem 0.75rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-muted);
          border-radius: var(--radius-sm);
          transition: all 0.15s ease;
          background: transparent;
        }

        .nav-link:hover {
          color: var(--text-main);
          background: var(--bg-hover);
        }

        .nav-link.active {
          color: var(--primary);
          background: var(--primary-subtle);
        }

        .schedule-cta {
          color: var(--primary);
          background: var(--primary-subtle);
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-weight: 700;
        }

        .dropdown-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .nav-dropdown {
          position: relative;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          width: 260px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          z-index: 100;
          animation: fadeIn 0.15s ease-out;
        }

        .dropdown-item {
          padding: 0.6rem 0.75rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .dropdown-item:hover {
          background: var(--bg-hover);
        }

        .dropdown-item strong {
          display: block;
          font-size: 0.85rem;
          color: var(--text-main);
        }

        .dropdown-item span {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .action-btn {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          background: var(--bg-muted);
          border: 1px solid var(--border-color);
          transition: all 0.15s ease;
        }

        .action-btn:hover {
          color: var(--text-main);
          border-color: var(--border-subtle);
        }

        .student-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-weight: 600;
          padding: 0.45rem 0.85rem;
          font-size: 0.825rem;
        }

        .mobile-burger {
          display: none;
          color: var(--text-main);
          padding: 0.25rem;
        }

        .mobile-drawer {
          position: fixed;
          top: 90px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 999;
          animation: fadeIn 0.15s ease-out;
        }

        .mobile-drawer-content {
          background: var(--bg-surface);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          border-bottom: 1px solid var(--border-color);
        }

        .mobile-link {
          text-align: left;
          padding: 0.75rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-main);
          border-radius: var(--radius-sm);
        }

        .mobile-link:hover {
          background: var(--bg-hover);
        }

        .schedule-highlight {
          color: var(--primary);
          background: var(--primary-subtle);
        }

        @media (max-width: 1024px) {
          .nav-links {
            display: none;
          }
          .mobile-burger {
            display: block;
          }
          .top-contacts-left span:nth-child(n+4) {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .top-contacts-bar {
            display: none;
          }
          .brand-subtitle {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
