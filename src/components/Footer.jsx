import React from 'react';
import { COLLEGE_INFO } from '../data/collegeData';
import { MapPin, Phone, Mail, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="site-footer" id="contacts-block">
      <div className="container">
        <div className="footer-grid">
          {/* Інформація про заклад */}
          <div className="footer-col-main">
            <div className="footer-brand">
              <img src="/logo.svg" alt="БФКПЕП Логотип" className="footer-logo" />
              <div>
                <span className="footer-acronym">ВСП «БФКПЕП»</span>
                <span className="footer-tagline">Якісна фахова передвища освіта</span>
              </div>
            </div>
            <p className="footer-desc">
              {COLLEGE_INFO.fullName}. Акредитований державний заклад освіти, що готує сучасних фахівців інженерних, цифрових та управлінських галузей.
            </p>
            <div className="footer-socials">
              <a href={COLLEGE_INFO.social.facebook} target="_blank" rel="noreferrer" className="social-btn" title="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href={COLLEGE_INFO.social.instagram} target="_blank" rel="noreferrer" className="social-btn" title="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href={COLLEGE_INFO.social.youtube} target="_blank" rel="noreferrer" className="social-btn" title="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

          {/* Розділи сайту */}
          <div className="footer-col">
            <h4 className="footer-col-title">Навігація</h4>
            <ul className="footer-links">
              <li><button onClick={() => onNavigate('home')}>Головна сторінка</button></li>
              <li><button onClick={() => onNavigate('schedule')}>⚡ Розклад і заміни</button></li>
              <li><button onClick={() => onNavigate('specialties')}>Спеціальності</button></li>
              <li><button onClick={() => onNavigate('transparency')}>Прозорість (документи)</button></li>
              <li><button onClick={() => onNavigate('admissions')}>Вступнику 2026</button></li>
              <li><button onClick={() => onNavigate('administration')}>Керівний склад</button></li>
            </ul>
          </div>

          {/* Спеціальності */}
          <div className="footer-col">
            <h4 className="footer-col-title">Провідні програми</h4>
            <ul className="footer-links">
              <li><button onClick={() => onNavigate('specialties')}>121 Інженерія ПЗ</button></li>
              <li><button onClick={() => onNavigate('specialties')}>133 Галузеве машинобудування</button></li>
              <li><button onClick={() => onNavigate('specialties')}>073 Менеджмент</button></li>
              <li><button onClick={() => onNavigate('specialties')}>071 Облік і оподаткування</button></li>
              <li><button onClick={() => onNavigate('specialties')}>072 Фінанси та банківська справа</button></li>
              <li><button onClick={() => onNavigate('specialties')}>017 Фізична культура і спорт</button></li>
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
            </div>
          </div>
        </div>

        {/* Нижній підвал */}
        <div className="footer-bottom">
          <div className="footer-bottom-text">
            <span>© 2026 ВСП «БФКПЕП». Всі права захищено.</span>
            <span className="divider">•</span>
            <span>Дипломний проєкт: Інформаційно-комунікаційна веб-платформа коледжу з інтегрованою системою динамічного розкладу</span>
          </div>
          <div className="developer-tag">
            <span>Розробник: Gogart (ПЗ-41) • Керівник: Пелихівський Л.О.</span>
          </div>
        </div>
      </div>

      <style>{`
        .site-footer {
          background: #090d16;
          color: #94a3b8;
          border-top: 1px solid #1e293b;
          padding: 4.5rem 0 2rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.3fr;
          gap: 2.5rem;
          margin-bottom: 3.5rem;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .footer-logo {
          width: 40px;
          height: 40px;
        }

        .footer-acronym {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.2rem;
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
          transition: all 0.15s ease;
        }
        .social-btn:hover {
          background: #3b82f6;
          transform: translateY(-2px);
        }

        .footer-col-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #f8fafc;
          margin-bottom: 1.25rem;
          letter-spacing: -0.01em;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .footer-links button {
          font-size: 0.85rem;
          color: #94a3b8;
          text-align: left;
          padding: 0;
          transition: color 0.15s ease;
        }
        .footer-links button:hover {
          color: #3b82f6;
        }

        .footer-contact-items {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          font-size: 0.85rem;
        }

        .contact-row {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
        }

        .c-icon {
          color: #3b82f6;
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .contact-row a {
          color: #f8fafc;
        }
        .contact-row a:hover {
          color: #3b82f6;
        }

        .c-sub {
          font-size: 0.75rem;
          color: #64748b;
        }

        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid #1e293b;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.775rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-bottom-text {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }

        .divider {
          color: #475569;
        }

        .developer-tag {
          color: #cbd5e1;
          font-weight: 600;
        }

        @media (max-width: 968px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
          .footer-col-main {
            grid-column: span 2;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-col-main {
            grid-column: span 1;
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
