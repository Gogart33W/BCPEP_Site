import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, GraduationCap, Laptop, Sparkles } from 'lucide-react';

export default function Hero({ onNavigate, onOpenCabinet }) {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} className="sparkle-icon" />
            <span>Офіційний веб-портал нового покоління</span>
          </div>

          <h1 className="hero-title">
            Бердичівський фаховий коледж <span className="highlight-text">промисловості, економіки та права</span>
          </h1>

          <p className="hero-description">
            Сучасна інженерна, ІТ та економічна освіта. Практичні лабораторії, 
            автоматизований розклад із миттєвими замінами та персональний кабінет студента.
          </p>

          <div className="hero-buttons">
            <button 
              className="btn btn-primary hero-btn-main"
              onClick={() => onNavigate('schedule')}
            >
              <Calendar size={18} />
              <span>Переглянути розклад і заміни</span>
              <ArrowRight size={16} />
            </button>

            <button 
              className="btn btn-secondary"
              onClick={() => onNavigate('admissions')}
            >
              <GraduationCap size={18} />
              <span>Вступнику 2026</span>
            </button>
          </div>

          {/* Швидкі показники коледжу */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">8</span>
              <span className="stat-label">Спеціальностей</span>
            </div>
            <div className="stat-separator"></div>
            <div className="stat-item">
              <span className="stat-number">121</span>
              <span className="stat-label">ІПЗ / IT-напрям</span>
            </div>
            <div className="stat-separator"></div>
            <div className="stat-item">
              <span className="stat-number">85+</span>
              <span className="stat-label">Років традицій</span>
            </div>
            <div className="stat-separator"></div>
            <div className="stat-item">
              <span className="stat-number">Live</span>
              <span className="stat-label">Автозаміни пар</span>
            </div>
          </div>
        </div>

        {/* Швидка картка кабінету або розкладу */}
        <div className="hero-card-wrapper">
          <div className="hero-preview-card">
            <div className="preview-header">
              <div className="preview-status">
                <span className="pulse-dot"></span>
                <span>Сьогодні • П’ятниця (Чисельник)</span>
              </div>
              <span className="badge badge-rose">⚡ 2 активні заміни</span>
            </div>

            <div className="preview-body">
              <div className="preview-group-badge">
                <Laptop size={15} />
                <span>Група ПЗ-41 (Інженерія ПЗ)</span>
              </div>

              <div className="preview-schedule-list">
                <div className="preview-item substituted">
                  <span className="preview-pair">1 пара • 08:30</span>
                  <div className="preview-sub-info">
                    <span className="old-line">Дипломне проектування (ауд. 34)</span>
                    <strong className="new-line">⚡ ЗАМІНА: Хмарні обчислення (Пелихівський Л.О.)</strong>
                  </div>
                </div>

                <div className="preview-item">
                  <span className="preview-pair">2 пара • 10:05</span>
                  <div className="preview-sub-info">
                    <strong>Розробка ПЗ: Тестування (Куроп С.І.)</strong>
                    <span className="room-text">ауд. 28 (комп. клас)</span>
                  </div>
                </div>

                <div className="preview-item">
                  <span className="preview-pair">3 пара • 11:50</span>
                  <div className="preview-sub-info">
                    <strong>Кураторська година (Гіневська І.В.)</strong>
                    <span className="room-text">ауд. 31</span>
                  </div>
                </div>
              </div>

              <button 
                className="btn btn-secondary btn-block preview-action-btn"
                onClick={() => onNavigate('schedule')}
              >
                <span>Відкрити повний розклад своєї групи</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding: 4.5rem 0 3.5rem;
          background: radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.08) 0%, transparent 40%),
                      radial-gradient(circle at 90% 80%, rgba(217, 119, 6, 0.05) 0%, transparent 40%);
          border-bottom: 1px solid var(--border-color);
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3.5rem;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--primary-subtle);
          color: var(--primary);
          font-size: 0.825rem;
          font-weight: 700;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          margin-bottom: 1.25rem;
        }

        .sparkle-icon {
          color: var(--accent-amber);
        }

        .hero-title {
          font-size: 2.85rem;
          letter-spacing: -0.03em;
          margin-bottom: 1.25rem;
          line-height: 1.15;
        }

        .highlight-text {
          background: linear-gradient(135deg, var(--primary) 0%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-description {
          font-size: 1.125rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
          line-height: 1.6;
          max-width: 600px;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }

        .hero-btn-main {
          padding: 0.85rem 1.75rem;
          font-size: 1rem;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-color);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-main);
          line-height: 1;
        }

        .stat-label {
          font-size: 0.775rem;
          color: var(--text-muted);
          font-weight: 500;
          margin-top: 0.25rem;
        }

        .stat-separator {
          width: 1px;
          height: 32px;
          background: var(--border-color);
        }

        /* Прев'ю-картка розкладу */
        .hero-preview-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-xl);
          transition: transform 0.2s ease;
          position: relative;
        }

        .hero-preview-card:hover {
          transform: translateY(-2px);
        }

        .preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-color);
        }

        .preview-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background: var(--accent-emerald);
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 8px var(--accent-emerald);
        }

        .preview-group-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--primary);
          background: var(--primary-subtle);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          margin-bottom: 1rem;
        }

        .preview-schedule-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .preview-item {
          padding: 0.75rem;
          background: var(--bg-muted);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          border-left: 3px solid var(--primary);
        }

        .preview-item.substituted {
          border-left-color: var(--accent-rose);
          background: var(--accent-rose-subtle);
        }

        .preview-pair {
          font-size: 0.725rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .preview-sub-info {
          display: flex;
          flex-direction: column;
        }

        .old-line {
          font-size: 0.775rem;
          text-decoration: line-through;
          color: var(--text-muted);
        }

        .new-line {
          font-size: 0.875rem;
          color: var(--accent-rose);
        }

        .room-text {
          font-size: 0.775rem;
          color: var(--text-muted);
        }

        .preview-action-btn {
          width: 100%;
          justify-content: space-between;
        }

        @media (max-width: 968px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .hero-title {
            font-size: 2.25rem;
          }
        }
      `}</style>
    </section>
  );
}
