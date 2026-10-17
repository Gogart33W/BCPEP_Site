import React, { useState } from 'react';
import { SPECIALTIES } from '../data/collegeData';
import { Code, Cpu, Briefcase, Factory, Calculator, Landmark, Dumbbell, FolderKanban, ArrowRight, CheckCircle2, X } from 'lucide-react';

const specialtyIcons = {
  '121': Code,
  '133': Cpu,
  '073': Briefcase,
  '136': Factory,
  '071': Calculator,
  '072': Landmark,
  '017': Dumbbell,
  '029': FolderKanban
};

export default function SpecialtiesSection({ onNavigate }) {
  const [selectedSpec, setSelectedSpec] = useState(null);

  return (
    <section className="specialties-section" id="specialties-block">
      <div className="container">
        <div className="section-header-center">
          <span className="section-badge">Освітні програми</span>
          <h2 className="section-title">Спеціальності коледжу</h2>
          <p className="section-subtitle">
            Обирай фах, який відкриває перспективи кар'єрного зростання у провідних ІТ-компаніях, інженерних центрах та фінансових установах.
          </p>
        </div>

        <div className="specialties-grid">
          {SPECIALTIES.map(spec => {
            const Icon = specialtyIcons[spec.id] || Code;
            return (
              <div 
                key={spec.id} 
                className="specialty-card"
                onClick={() => setSelectedSpec(spec)}
              >
                <div className="specialty-top">
                  <div className="spec-code-badge">{spec.code}</div>
                  <div className="spec-icon-box">
                    <Icon size={24} />
                  </div>
                </div>

                <h3 className="specialty-name">{spec.name}</h3>
                <p className="specialty-desc">{spec.shortDesc}</p>

                <div className="specialty-footer">
                  <span className="spec-term">{spec.degree}</span>
                  <span className="more-link">
                    Детальніше <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Модалка з деталями спеціальності */}
      {selectedSpec && (
        <div className="modal-overlay" onClick={() => setSelectedSpec(null)}>
          <div className="modal-card spec-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="badge badge-blue">Спеціальність {selectedSpec.code}</span>
                <h3>{selectedSpec.name}</h3>
              </div>
              <button className="close-btn" onClick={() => setSelectedSpec(null)}><X size={20} /></button>
            </div>

            <div className="modal-body">
              <div className="spec-meta-bar">
                <div>
                  <span className="meta-label">Освітній ступінь:</span>
                  <strong>{selectedSpec.degree}</strong>
                </div>
                <div>
                  <span className="meta-label">Термін навчання:</span>
                  <strong>{selectedSpec.term}</strong>
                </div>
              </div>

              <div className="spec-detail-block">
                <h4>Чого ви навчитесь:</h4>
                <div className="skills-list">
                  {selectedSpec.skills.map((skill, i) => (
                    <div key={i} className="skill-item">
                      <CheckCircle2 size={16} className="skill-check" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="spec-detail-block">
                <h4>Ким можна працювати (кар'єра):</h4>
                <div className="career-tags">
                  {selectedSpec.career.map((c, i) => (
                    <span key={i} className="badge badge-amber">{c}</span>
                  ))}
                </div>
              </div>

              <div className="spec-modal-actions">
                <button 
                  className="btn btn-primary btn-block"
                  onClick={() => { setSelectedSpec(null); onNavigate('admissions'); }}
                >
                  Подати заявку на вступ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .specialties-section {
          padding: 5rem 0;
          background: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
        }

        .section-header-center {
          text-align: center;
          max-width: 650px;
          margin: 0 auto 3.5rem;
        }

        .specialties-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .specialty-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .specialty-card:hover {
          transform: translateY(-4px);
          border-color: var(--primary);
          box-shadow: var(--shadow-lg);
        }

        .specialty-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .spec-code-badge {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--primary);
        }

        .spec-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: var(--primary-subtle);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .specialty-name {
          font-size: 1.125rem;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .specialty-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .specialty-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
          font-size: 0.8rem;
        }

        .spec-term {
          color: var(--text-muted);
          font-weight: 500;
        }

        .more-link {
          color: var(--primary);
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .spec-modal {
          max-width: 620px;
        }

        .spec-meta-bar {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          background: var(--bg-muted);
          padding: 1rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.5rem;
        }

        .meta-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          display: block;
        }

        .spec-detail-block {
          margin-bottom: 1.5rem;
        }

        .spec-detail-block h4 {
          font-size: 0.95rem;
          margin-bottom: 0.75rem;
        }

        .skills-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .skill-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .skill-check {
          color: var(--accent-emerald);
          flex-shrink: 0;
        }

        .career-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .spec-modal-actions {
          margin-top: 1.5rem;
        }
      `}</style>
    </section>
  );
}
