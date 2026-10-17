import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ExternalLink, ShieldCheck, Terminal, GraduationCap } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Колонка 1: Інформація про коледж */}
          <div className="footer-col-main">
            <Link to="/" className="footer-brand">
              <img 
                src="/college-emblem.png" 
                alt="Офіційний герб БФКПЕП"
                className="footer-logo"
              />
              <div className="footer-brand-text">
                <span className="footer-title">БФКПЕП</span>
                <span className="footer-subtitle">Бердичівський фаховий коледж промисловості, економіки та права</span>
              </div>
            </Link>

            <p className="footer-text">
              Відокремлений структурний підрозділ «Бердичівський фаховий коледж промисловості, економіки та права». Акредитований державний заклад фахової передвищої освіти із понад 120-річною історією успішної підготовки фахівців.
            </p>

            <div className="footer-accreditation-badge">
              <GraduationCap size={15} />
              <span>Державна ліцензія та акредитація МОН України</span>
            </div>
          </div>

          {/* Колонка 2: Корисні державні портали */}
          <div className="footer-col">
            <h4 className="footer-heading">Корисні посилання</h4>
            <ul className="footer-list">
              <li>
                <a href="https://mon.gov.ua/ua" target="_blank" rel="noreferrer" className="ext-link">
                  <span>Міністерство освіти і науки України</span>
                  <ExternalLink size={12} className="link-icon" />
                </a>
              </li>
              <li>
                <a href="https://vstup.edbo.gov.ua/" target="_blank" rel="noreferrer" className="ext-link">
                  <span>ЄДЕБО (Вступна кампанія)</span>
                  <ExternalLink size={12} className="link-icon" />
                </a>
              </li>
              <li>
                <a href="https://testportal.gov.ua/" target="_blank" rel="noreferrer" className="ext-link">
                  <span>Український центр оцінювання якості освіти</span>
                  <ExternalLink size={12} className="link-icon" />
                </a>
              </li>
              <li>
                <a href="https://vintest.org.ua/" target="_blank" rel="noreferrer" className="ext-link">
                  <span>Вінницький регіональний центр (ВРЦОЯО)</span>
                  <ExternalLink size={12} className="link-icon" />
                </a>
              </li>
              <li>
                <a href="http://osvita.ua/" target="_blank" rel="noreferrer" className="ext-link">
                  <span>Освіта.ua</span>
                  <ExternalLink size={12} className="link-icon" />
                </a>
              </li>
            </ul>
          </div>

          {/* Колонка 3: Ключові розділи сайту */}
          <div className="footer-col">
            <h4 className="footer-heading">Швидка навігація</h4>
            <ul className="footer-list">
              <li><Link to="/rozklad-zanyat/rozklad-zanyat">Розклад занять та заміни</Link></li>
              <li><Link to="/abituriyentu/speczialnosti">Спеціальності (8 напрямів)</Link></li>
              <li><Link to="/abituriyentu/vstup">Вступна кампанія 2026</Link></li>
              <li><Link to="/studentu/rekvizyty-dlya-oplaty">Офіційні реквізити для оплати</Link></li>
              <li><Link to="/ustanovchi-dokumenty">Статут, ліцензії та звіти</Link></li>
              <li><Link to="/gurtozhytok">Студентський гуртожиток</Link></li>
              <li><Link to="/novyny">Всі новини та події</Link></li>
            </ul>
          </div>

          {/* Колонка 4: Контакти коледжу */}
          <div className="footer-col">
            <h4 className="footer-heading">Контакти</h4>
            <div className="footer-contacts">
              <div className="contact-line">
                <MapPin size={16} className="c-icon" />
                <span>Україна, 13300, Житомирська обл., м. Бердичів, вул. Замкова, 2а</span>
              </div>
              <div className="contact-line">
                <Phone size={16} className="c-icon" />
                <div>
                  <a href="tel:+380414340734">+380 (4143) 4-07-34</a>
                  <span className="contact-note"> (приймальня)</span>
                </div>
              </div>
              <div className="contact-line">
                <Phone size={16} className="c-icon" />
                <div>
                  <a href="tel:+380966668645">+380 (96) 666-86-45</a>
                  <span className="contact-note"> (приймальна комісія)</span>
                </div>
              </div>
              <div className="contact-line">
                <Phone size={16} className="c-icon" />
                <div>
                  <a href="tel:+380975545420">+380 (97) 554-54-20</a>
                  <span className="contact-note"> (підготовчі курси)</span>
                </div>
              </div>
              <div className="contact-line">
                <Mail size={16} className="c-icon" />
                <a href="mailto:bcpep@ukr.net">bcpep@ukr.net</a>
              </div>
              <div className="contact-line">
                <Mail size={16} className="c-icon" />
                <a href="mailto:vstup@bcpep.org.ua">vstup@bcpep.org.ua</a>
              </div>
            </div>
          </div>
        </div>

        {/* Нижній рядок */}
        <div className="footer-bottom">
          <div className="footer-copy">
            <span>© 2026 ВСП «Бердичівський фаховий коледж промисловості, економіки та права».</span>
          </div>

          <div className="footer-meta-links">
            <Link to="/api-docs" className="system-pill">
              <Terminal size={12} />
              <span>REST API</span>
            </Link>
            <Link to="/admin" className="system-pill">
              <ShieldCheck size={12} />
              <span>Панель адміністратора</span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .site-footer {
          background: #080d19;
          color: #94a3b8;
          border-top: 1px solid #162035;
          padding: 4rem 0 1.75rem;
          margin-top: 4rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1.2fr 1fr 1.3fr;
          gap: 2.75rem;
          margin-bottom: 3rem;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          text-decoration: none;
        }

        .footer-logo {
          height: 46px;
          width: auto;
          object-fit: contain;
        }

        .footer-brand-text {
          display: flex;
          flex-direction: column;
        }

        .footer-title {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.15rem;
          color: #ffffff;
          line-height: 1.15;
        }

        .footer-subtitle {
          font-size: 0.725rem;
          color: #64748b;
        }

        .footer-text {
          font-size: 0.85rem;
          line-height: 1.6;
          margin-bottom: 1.25rem;
          color: #8896ab;
        }

        .footer-accreditation-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(37, 99, 235, 0.12);
          color: #60a5fa;
          padding: 0.45rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.775rem;
          font-weight: 600;
          border: 1px solid rgba(37, 99, 235, 0.2);
        }

        .footer-heading {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1.25rem;
          letter-spacing: -0.01em;
        }

        .footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          font-size: 0.85rem;
        }

        .footer-list a {
          color: #94a3b8;
          text-decoration: none;
          transition: color var(--transition-fast), padding-left var(--transition-fast);
          display: inline-block;
        }

        .footer-list a:hover {
          color: #ffffff;
          padding-left: 0.25rem;
        }

        .ext-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .link-icon {
          color: #64748b;
          flex-shrink: 0;
        }

        .footer-contacts {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.85rem;
        }

        .contact-line {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          line-height: 1.45;
        }

        .c-icon {
          color: #3b82f6;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .contact-line a {
          color: #94a3b8;
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .contact-line a:hover {
          color: #ffffff;
        }

        .contact-note {
          font-size: 0.75rem;
          color: #64748b;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.75rem;
          border-top: 1px solid #162035;
          font-size: 0.775rem;
          color: #64748b;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-meta-links {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .system-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #64748b;
          font-size: 0.725rem;
          padding: 0.25rem 0.55rem;
          border-radius: var(--radius-xs);
          border: 1px solid #1e293b;
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .system-pill:hover {
          color: #94a3b8;
          border-color: #334155;
          background: rgba(255, 255, 255, 0.03);
        }

        /* Адаптивність футера */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 640px) {
          .site-footer {
            padding: 3rem 0 1.5rem;
            margin-top: 3rem;
          }
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
