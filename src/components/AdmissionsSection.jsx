import React from 'react';
import { GraduationCap, Phone, Mail, CheckCircle, Clock, Award } from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData';

export default function AdmissionsSection() {
  return (
    <section className="admissions-section" id="admissions-block">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="section-badge">Приймальна комісія</span>
            <h2 className="section-title">Вступнику 2026</h2>
            <p className="section-subtitle">
              Вся офіційна інформація щодо вступу до коледжу на базі 9 та 11 класів, підготовчих курсів та пільгових умов.
            </p>
          </div>
        </div>

        <div className="admissions-cards-grid">
          {/* Картка 1: Підготовчі курси */}
          <div className="admissions-card">
            <div className="card-top-icon">
              <Clock size={24} />
            </div>
            <h3>Підготовчі курси до вступу</h3>
            <p>
              Якісна підготовка абітурієнтів до вступних випробувань та національного мультипредметного тесту (НМТ) з української мови, математики та історії України.
            </p>
            <ul className="admissions-list">
              <li><CheckCircle size={15} /> Заняття у зручний час по суботах або онлайн</li>
              <li><CheckCircle size={15} /> Додаткові бали при вступі на інженерні спеціальності</li>
              <li><CheckCircle size={15} /> Адаптація до навчання в коледжі</li>
            </ul>
            <div className="card-contact-row">
              <Phone size={14} />
              <span>Тел: {COLLEGE_INFO.phoneCourses}</span>
            </div>
          </div>

          {/* Картка 2: База 9 класів */}
          <div className="admissions-card highlighted-card">
            <div className="card-top-icon">
              <GraduationCap size={24} />
            </div>
            <h3>Вступ на базі 9 класів</h3>
            <p>
              Отримання повної загальної середньої освіти та диплома фахового молодшого бакалавра за 3 роки 10 місяців.
            </p>
            <ul className="admissions-list">
              <li><CheckCircle size={15} /> Вступ за результатами співбесіди та мотиваційного листа</li>
              <li><CheckCircle size={15} /> Бюджетні місця та регіональне замовлення</li>
              <li><CheckCircle size={15} /> Стипендіальне забезпечення відмінників</li>
            </ul>
            <div className="card-contact-row">
              <Mail size={14} />
              <span>{COLLEGE_INFO.emailAdmissions}</span>
            </div>
          </div>

          {/* Картка 3: База 11 класів та пільги */}
          <div className="admissions-card">
            <div className="card-top-icon">
              <Award size={24} />
            </div>
            <h3>Вступ на базі 11 класів / ПТУ</h3>
            <p>
              Скорочений термін навчання (2 роки 10 місяців). Вступ за сертифікатами НМТ або індивідуальною співбесідою.
            </p>
            <ul className="admissions-list">
              <li><CheckCircle size={15} /> Пільги для учасників бойових дій (УБД) та їх дітей</li>
              <li><CheckCircle size={15} /> Спеціальні умови для вступників з ТОТ</li>
              <li><CheckCircle size={15} /> Можливість продовження навчання в університетах з 2-3 курсу</li>
            </ul>
            <div className="card-contact-row">
              <Phone size={14} />
              <span>Приймальна: {COLLEGE_INFO.phoneAdmissions}</span>
            </div>
          </div>
        </div>

        {/* Контакти приймальної комісії */}
        <div className="admissions-footer-bar">
          <div className="admissions-footer-info">
            <strong>Приймальна комісія ВСП БФКПЕП працює щоденно:</strong>
            <p>м. Бердичів, вул. Замкова, 2а (головний корпус, 1 поверх) • Понеділок–П’ятниця: 08:30–17:00</p>
          </div>
          <a href={`tel:${COLLEGE_INFO.phoneAdmissions}`} className="btn btn-primary btn-sm">
            <Phone size={15} />
            <span>Зателефонувати до приймальної</span>
          </a>
        </div>
      </div>

      <style>{`
        .admissions-section {
          padding: 4.5rem 0;
          background: var(--bg-muted);
          border-bottom: 1px solid var(--border-color);
        }

        .admissions-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .admissions-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          transition: all 0.2s ease;
        }

        .admissions-card:hover {
          border-color: var(--primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .highlighted-card {
          border-color: var(--primary);
          background: linear-gradient(180deg, var(--bg-surface) 0%, rgba(37, 99, 235, 0.03) 100%);
        }

        .card-top-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          background: var(--primary-subtle);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .admissions-card h3 {
          font-size: 1.25rem;
          margin-bottom: 0.6rem;
        }

        .admissions-card p {
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 1.25rem;
        }

        .admissions-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          flex-grow: 1;
        }

        .admissions-list li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-main);
        }

        .admissions-list svg {
          color: var(--accent-emerald);
          flex-shrink: 0;
        }

        .card-contact-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .admissions-footer-bar {
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.25rem 1.75rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.25rem;
        }

        .admissions-footer-info strong {
          display: block;
          font-size: 0.95rem;
          margin-bottom: 0.2rem;
        }

        .admissions-footer-info p {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
