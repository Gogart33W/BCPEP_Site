import React, { useState } from 'react';
import { GraduationCap, Calculator, CheckCircle, HelpCircle, Phone, ArrowRight } from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData';

export default function AdmissionsCalculator() {
  const [baseEdu, setBaseEdu] = useState('9'); // 9 або 11 клас
  const [certGrade, setCertGrade] = useState(9.5); // Середній бал свідоцтва (1-12)
  const [testGrade, setTestGrade] = useState(160); // Бал співбесіди або НМТ (100-200)

  // Розрахунок конкурсного балу
  // Для 9 кл: бал = (бал свідоцтва * 10) * 0.4 + співбесіда * 0.6
  // Для 11 кл: НМТ або співбесіда
  const competitiveScore = baseEdu === '9'
    ? Math.min(200, Math.round(((certGrade / 12) * 200 * 0.4 + testGrade * 0.6) * 10) / 10)
    : Math.min(200, Math.round((testGrade * 0.8 + (certGrade / 12) * 200 * 0.2) * 10) / 10);

  return (
    <section className="admissions-section" id="admissions-block">
      <div className="container">
        <div className="section-header-center">
          <span className="section-badge">Вступна кампанія 2026</span>
          <h2 className="section-title">Вступнику до БФКПЕП</h2>
          <p className="section-subtitle">
            Все про умови вступу на базі 9 та 11 класів, терміни подання електронних заяв та онлайн-калькулятор конкурсного балу.
          </p>
        </div>

        <div className="admissions-grid">
          {/* Інтерактивний калькулятор балів */}
          <div className="calc-card">
            <div className="calc-header">
              <Calculator size={22} className="calc-icon" />
              <div>
                <h3>Калькулятор конкурсного балу</h3>
                <p>Розрахуй орієнтовний рейтинг для вступу на бюджет</p>
              </div>
            </div>

            <div className="calc-controls">
              <div className="calc-group">
                <label>Базова освіта:</label>
                <div className="segmented-control w-100">
                  <button 
                    className={`segment-btn ${baseEdu === '9' ? 'active' : ''}`}
                    onClick={() => setBaseEdu('9')}
                  >
                    На базі 9 класів
                  </button>
                  <button 
                    className={`segment-btn ${baseEdu === '11' ? 'active' : ''}`}
                    onClick={() => setBaseEdu('11')}
                  >
                    На базі 11 класів
                  </button>
                </div>
              </div>

              <div className="calc-group">
                <div className="label-with-val">
                  <label>Середній бал документа про освіту (1–12):</label>
                  <span className="val-badge">{certGrade}</span>
                </div>
                <input 
                  type="range" 
                  min="4" 
                  max="12" 
                  step="0.1" 
                  value={certGrade}
                  onChange={(e) => setCertGrade(parseFloat(e.target.value))}
                  className="range-slider"
                />
              </div>

              <div className="calc-group">
                <div className="label-with-val">
                  <label>{baseEdu === '9' ? 'Очікуваний бал співбесіди / мотиваційного листа:' : 'Бал НМТ / співбесіди (100–200):'}</label>
                  <span className="val-badge">{testGrade}</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="200" 
                  step="1" 
                  value={testGrade}
                  onChange={(e) => setTestGrade(parseInt(e.target.value, 10))}
                  className="range-slider"
                />
              </div>
            </div>

            {/* Результат */}
            <div className="calc-result-box">
              <span className="res-label">Твій розрахунковий конкурсний бал:</span>
              <div className="res-number">{competitiveScore}</div>
              <p className="res-note">
                {competitiveScore >= 165 ? (
                  <span className="text-emerald">✨ Високі шанси на зарахування на регіональне замовлення (бюджет) на спеціальність «121 Інженерія ПЗ»!</span>
                ) : (
                  <span className="text-amber">👍 Достатній бал для участі в конкурсі та гарантованого вступу на контракт.</span>
                )}
              </p>
            </div>
          </div>

          {/* Етапи вступної кампанії */}
          <div className="timeline-card">
            <h3>Графік прийому документів 2026</h3>
            <div className="timeline-items">
              <div className="timeline-step">
                <div className="step-circle">1</div>
                <div>
                  <strong>Створення електронних кабінетів</strong>
                  <span>З 25 червня 2026 на порталі vstup.edbo.gov.ua</span>
                </div>
              </div>

              <div className="timeline-step">
                <div className="step-circle">2</div>
                <div>
                  <strong>Подання електронних заяв</strong>
                  <span>З 01 по 13 липня 2026 року</span>
                </div>
              </div>

              <div className="timeline-step">
                <div className="step-circle">3</div>
                <div>
                  <strong>Співбесіди та мотиваційні листи</strong>
                  <span>З 14 по 22 липня 2026 року в коледжі або дистанційно</span>
                </div>
              </div>

              <div className="timeline-step">
                <div className="step-circle">4</div>
                <div>
                  <strong>Оприлюднення рейтингових списків</strong>
                  <span>Не пізніше 24 липня 2026 року</span>
                </div>
              </div>
            </div>

            <div className="contact-admissions-box">
              <Phone size={18} className="phone-icon" />
              <div>
                <strong>Приймальна комісія БФКПЕП:</strong>
                <a href={`tel:${COLLEGE_INFO.phoneAdmissions}`} className="phone-link">
                  {COLLEGE_INFO.phoneAdmissions}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .admissions-section {
          padding: 5rem 0;
          background: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
        }

        .admissions-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 2rem;
          align-items: flex-start;
        }

        .calc-card, .timeline-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 2rem;
          box-shadow: var(--shadow-md);
        }

        .calc-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .calc-icon {
          color: var(--primary);
        }

        .calc-header h3 {
          font-size: 1.25rem;
        }

        .calc-header p {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .calc-controls {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .calc-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-main);
          display: block;
          margin-bottom: 0.5rem;
        }

        .label-with-val {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .val-badge {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--primary);
        }

        .range-slider {
          width: 100%;
          accent-color: var(--primary);
          height: 6px;
          cursor: pointer;
        }

        .w-100 {
          width: 100%;
          display: flex;
        }
        .w-100 .segment-btn {
          flex: 1;
          text-align: center;
        }

        .calc-result-box {
          background: var(--primary-subtle);
          border: 1px solid rgba(37, 99, 235, 0.2);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          text-align: center;
        }

        .res-label {
          font-size: 0.85rem;
          color: var(--text-muted);
          display: block;
        }

        .res-number {
          font-family: var(--font-heading);
          font-size: 2.75rem;
          font-weight: 800;
          color: var(--primary);
          line-height: 1.1;
          margin: 0.25rem 0;
        }

        .res-note {
          font-size: 0.85rem;
          margin-top: 0.5rem;
        }

        .text-emerald {
          color: var(--accent-emerald);
          font-weight: 600;
        }

        .text-amber {
          color: var(--accent-amber);
          font-weight: 600;
        }

        /* Таймлайн */
        .timeline-card h3 {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-color);
        }

        .timeline-items {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 1.75rem;
        }

        .timeline-step {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .step-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--primary-subtle);
          color: var(--primary);
          font-family: var(--font-heading);
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .timeline-step strong {
          font-size: 0.95rem;
          display: block;
          margin-bottom: 0.2rem;
        }

        .timeline-step span {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .contact-admissions-box {
          background: var(--bg-muted);
          border-radius: var(--radius-md);
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .phone-icon {
          color: var(--primary);
        }

        .phone-link {
          display: block;
          color: var(--primary);
          font-weight: 700;
          font-size: 1.05rem;
        }

        @media (max-width: 968px) {
          .admissions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
