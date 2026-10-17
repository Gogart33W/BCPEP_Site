import React from 'react';
import { COLLEGE_INFO, USEFUL_LINKS } from '../data/collegeData';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="site-footer" id="contacts-block">
      <div className="container">
        <div className="footer-grid">
          {/* Інформація про заклад */}
          <div className="footer-col-main">
            <div className="footer-brand">
              <img 
                src="https://www.bfcpep.org.ua/wp-content/uploads/2025/09/berdychivskyj-fahovyj-koledzh-promyslovosti-ekonomiky-ta-prava-2.png" 
                alt="БФКПЕП Логотип" 
                className="footer-logo"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div>
                <span className="footer-acronym">ВСП «БФКПЕП»</span>
                <span className="footer-tagline">Бердичівський коледж промисловості, економіки та права</span>
              </div>
            </div>
            <p className="footer-desc">
              {COLLEGE_INFO.fullName}. Акредитований державний заклад фахової передвищої освіти.
            </p>
            <div className="footer-socials">
              <a href={COLLEGE_INFO.telegram} target="_blank" rel="noreferrer" className="social-btn" title="Telegram">
                TG
              </a>
              <a href={COLLEGE_INFO.social.facebook} target="_blank" rel="noreferrer" className="social-btn" title="Facebook">
                FB
              </a>
              <a href={COLLEGE_INFO.social.instagram} target="_blank" rel="noreferrer" className="social-btn" title="Instagram">
                IG
              </a>
              <a href={COLLEGE_INFO.social.youtube} target="_blank" rel="noreferrer" className="social-btn" title="YouTube">
                YT
              </a>
            </div>
          </div>

          {/* Корисні посилання (МОН, ЄДЕБО тощо) */}
          <div className="footer-col">
            <h4 className="footer-col-title">Корисні посилання</h4>
            <ul className="footer-links">
              {USEFUL_LINKS.map(link => (
                <li key={link.name}>
                  <a href={link.url} target="_blank" rel="noreferrer" className="external-footer-link">
                    <span>{link.name}</span>
                    <ExternalLink size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Навігація сайту */}
          <div className="footer-col">
            <h4 className="footer-col-title">Розділи порталу</h4>
            <ul className="footer-links">
              <li><button onClick={() => onNavigate('home')}>Головна</button></li>
              <li><button onClick={() => onNavigate('schedule')}>Розклад занять</button></li>
              <li><button onClick={() => onNavigate('specialties')}>Спеціальності</button></li>
              <li><button onClick={() => onNavigate('admissions')}>Вступнику 2026</button></li>
              <li><button onClick={() => onNavigate('transparency')}>Прозорість (документи)</button></li>
              <li><button onClick={() => onNavigate('administration')}>Керівний склад</button></li>
            </ul>
          </div>

          {/* Контакти та реквізити */}
          <div className="footer-col">
            <h4 className="footer-col-title">Контактна інформація</h4>
            <div className="footer-contact-items">
              <div className="contact-row">
                <MapPin size={16} className="c-icon" />
                <span>{COLLEGE_INFO.address}</span>
              </div>
              <div className="contact-row">
                <Phone size={16} className="c-icon" />
                <div>
                  <a href={`tel:${COLLEGE_INFO.phoneReception}`}>{COLLEGE_INFO.phoneReception}</a>
                  <span className="c-sub"> (приймальня)</span>
                </div>
              </div>
              <div className="contact-row">
                <Phone size={16} className="c-icon" />
                <div>
                  <a href={`tel:${COLLEGE_INFO.phoneAdmissions}`}>{COLLEGE_INFO.phoneAdmissions}</a>
                  <span className="c-sub"> (приймальна комісія)</span>
                </div>
              </div>
              <div className="contact-row">
                <Mail size={16} className="c-icon" />
                <a href={`mailto:${COLLEGE_INFO.email}`}>{COLLEGE_INFO.email}</a>
              </div>
              <div className="contact-row">
                <Mail size={16} className="c-icon" />
                <a href={`mailto:${COLLEGE_INFO.emailAdmissions}`}>{COLLEGE_INFO.emailAdmissions}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Нижній копірайт */}
        <div className="footer-bottom">
          <div className="footer-bottom-text">
            <span>© 2026 ВСП «БФКПЕП». Офіційний сайт коледжу.</span>
          </div>
          <div className="developer-tag">
            <span>Студентський проєкт: Микола (П-422) • Керівник: Пелихівський Л.О.</span>
          </div>
        </div>
      </div>

      <style>{`
        .site-footer {
          background: #090d16;
          color: #94a3b8;
          border-top: 1px solid #1e293b;
          padding: 4rem 0 2rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1.3fr 1fr 1.3fr;
          gap: 2.5rem;
          margin-bottom: 3rem;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .footer-logo {
          height: 44px;
          width: auto;
          object-fit: contain;
        }

        .footer-acronym {
          font-weight: 800;
          font-size: 1.15rem;
          color: #f8fafc;
          display: block;
        }

        .footer-tagline {
          font-size: 0.75rem;
          color: #64748b;
        }

        .footer-desc {
          font-size: 0.85rem;
          line-height: 1.55;
          margin-bottom: 1.5rem;
        }

        .footer-socials {
          display: flex;
          gap: 0.6rem;
        }

        .social-btn {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          background: #1e293b;
          color: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.15s ease;
        }
        .social-btn:hover {
          background: var(--primary);
        }

        .footer-col-title {
          font-size: 0.95rem;
          color: #f8fafc;
          font-weight: 700;
          margin-bottom: 1.25rem;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .footer-links button, .external-footer-link {
          color: #94a3b8;
          font-size: 0.825rem;
          text-align: left;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          transition: color 0.15s ease;
        }

        .footer-links button:hover, .external-footer-link:hover {
          color: #fff;
        }

        .footer-contact-items {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.825rem;
        }

        .contact-row {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
        }

        .c-icon {
          color: var(--primary);
          margin-top: 0.15rem;
          flex-shrink: 0;
        }

        .contact-row a {
          color: #94a3b8;
          text-decoration: none;
        }
        .contact-row a:hover {
          color: #fff;
        }

        .c-sub {
          color: #64748b;
          font-size: 0.75rem;
        }

        .footer-bottom {
          padding-top: 1.5rem;
          border-top: 1px solid #1e293b;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.775rem;
          color: #64748b;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .developer-tag {
          color: #94a3b8;
        }

        @media (max-width: 960px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
