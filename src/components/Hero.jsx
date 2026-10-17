import React from 'react';
import { Calendar, ExternalLink, GraduationCap, FileText, ArrowRight, Building } from 'lucide-react';
import { COLLEGE_INFO, CURRENT_NOTICE } from '../data/collegeData';

export default function Hero({ onNavigate }) {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <Building size={14} />
            <span>Державний заклад фахової передвищої освіти • Засновано в 1903 році</span>
          </div>

          <h1 className="hero-title">
            Бердичівський фаховий коледж <span className="highlight-text">промисловості, економіки та права</span>
          </h1>

          <p className="hero-description">
            Провідний заклад фахової передвищої освіти Житомирщини. Підготовка фахівців за 8 ліцензованими спеціальностями: інженерія ПЗ, машинобудування, менеджмент, металургія, облік, фінанси, спорт та офісна справа.
          </p>

          <div className="hero-actions">
            <button 
              className="btn btn-primary hero-btn"
              onClick={() => onNavigate('schedule')}
            >
              <Calendar size={18} />
              <span>Розклад занять та заміни</span>
              <ArrowRight size={16} />
            </button>

            <a 
              href={COLLEGE_INFO.schedulePdfUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-secondary hero-btn"
            >
              <ExternalLink size={16} />
              <span>Офіційний розклад (PDF)</span>
            </a>

            <button 
              className="btn btn-secondary hero-btn"
              onClick={() => onNavigate('admissions')}
            >
              <GraduationCap size={18} />
              <span>Вступнику 2026</span>
            </button>

            <button 
              className="btn btn-ghost hero-btn"
              onClick={() => onNavigate('transparency')}
            >
              <FileText size={16} />
              <span>Прозорість (Статут)</span>
            </button>
          </div>

          {/* Показники коледжу */}
          <div className="hero-stats-grid">
            <div className="stat-card">
              <span className="stat-num">8</span>
              <span className="stat-desc">Спеціальностей</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">120+</span>
              <span className="stat-desc">Років історії</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">100%</span>
              <span className="stat-desc">Акредитовані ОПП</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">Live</span>
              <span className="stat-desc">Заміни занять</span>
            </div>
          </div>
        </div>

        {/* Швидка картка офіційного оголошення коледжу */}
        <div className="hero-announcement-card">
          <div className="announcement-header">
            <span className="pulse-dot"></span>
            <strong>{CURRENT_NOTICE.title}</strong>
          </div>
          <div className="announcement-date">
            <span>{CURRENT_NOTICE.dates}</span>
          </div>
          <div className="announcement-body">
            <div className="announcement-row">
              <span className="announcement-label">🏫 Очне навчання:</span>
              <p>{CURRENT_NOTICE.offlineText}</p>
            </div>
            <div className="announcement-row">
              <span className="announcement-label">💻 Дистанційно:</span>
              <p>{CURRENT_NOTICE.onlineText}</p>
            </div>
            <div className="announcement-row bell-row">
              <span className="announcement-label">🔔 Розклад дзвінків:</span>
              <p className="bell-summary-text">{CURRENT_NOTICE.bellSummary}</p>
            </div>
          </div>
          <button 
            className="btn btn-primary btn-block btn-sm"
            onClick={() => onNavigate('schedule')}
          >
            Відкрити розклад пар
          </button>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding: 3.5rem 0 3rem;
          background: linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-muted) 100%);
          border-bottom: 1px solid var(--border-color);
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 2.5rem;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--primary-subtle);
          color: var(--primary);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
        }

        .hero-title {
          font-size: 2.35rem;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }

        .highlight-text {
          color: var(--primary);
          display: block;
        }

        .hero-description {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.75rem;
          max-width: 620px;
        }

        .hero-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-color);
        }

        .stat-card {
          display: flex;
          flex-direction: column;
        }

        .stat-num {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary);
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .stat-desc {
          font-size: 0.775rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        /* Картка оголошення */
        .hero-announcement-card {
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-lg);
          border-top: 4px solid #ea580c;
        }

        .announcement-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.05rem;
          color: var(--text-main);
          margin-bottom: 0.25rem;
        }

        .announcement-date {
          font-size: 0.8rem;
          color: #ea580c;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .announcement-body {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .announcement-row {
          font-size: 0.85rem;
        }

        .announcement-label {
          font-weight: 700;
          display: block;
          margin-bottom: 0.15rem;
          color: var(--text-main);
        }

        .announcement-row p {
          color: var(--text-muted);
          line-height: 1.4;
        }

        .bell-row {
          background: var(--bg-muted);
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
        }

        .bell-summary-text {
          font-family: monospace;
          font-size: 0.775rem;
        }

        @media (max-width: 960px) {
          .hero-container {
            grid-template-columns: 1fr;
          }
          .hero-title {
            font-size: 1.85rem;
          }
        }
      `}</style>
    </section>
  );
}
