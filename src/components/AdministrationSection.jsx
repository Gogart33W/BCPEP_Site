import React from 'react';
import { ADMINISTRATION } from '../data/collegeData';
import { Award, BookOpen, Users, Compass } from 'lucide-react';

export default function AdministrationSection() {
  return (
    <section className="admin-section" id="admin-block">
      <div className="container">
        <div className="section-header-center">
          <span className="section-badge">Про коледж</span>
          <h2 className="section-title">Керівництво та циклові комісії</h2>
          <p className="section-subtitle">
            Досвідчений викладацький склад, кандидати наук, методисти вищої категорії та практики інженерної галузі.
          </p>
        </div>

        {/* Картки адміністрації */}
        <div className="admin-grid">
          {ADMINISTRATION.map((person, idx) => (
            <div key={idx} className="admin-card">
              <div className="admin-img-wrap">
                <img 
                  src={person.image} 
                  alt={person.name}
                  className="admin-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="admin-img-fallback">
                  {person.name.charAt(0)}
                </div>
              </div>

              <div className="admin-info">
                <span className="admin-role">{person.role}</span>
                <h3 className="admin-name">{person.name}</h3>
                <p className="admin-qual">{person.qualification}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Циклові комісії коледжу */}
        <div className="commissions-box">
          <h3 className="commissions-title">Циклові комісії коледжу</h3>
          <div className="commissions-grid">
            <div className="commission-card">
              <div className="comm-icon-box"><BookOpen size={20} /></div>
              <h4>Комісія інженерії ПЗ та комп’ютерних дисциплін</h4>
              <p>Підготовка фахівців 121 спеціальності, програмування, веб-розробка, бази даних та кібербезпека.</p>
            </div>
            <div className="commission-card">
              <div className="comm-icon-box"><Compass size={20} /></div>
              <h4>Комісія загальнотехнічних та механічних дисциплін</h4>
              <p>Машинобудування, матеріалознавство, проектування в САПР та автоматизовані верстати.</p>
            </div>
            <div className="commission-card">
              <div className="comm-icon-box"><Award size={20} /></div>
              <h4>Комісія економічних та облікових дисциплін</h4>
              <p>Менеджмент організацій, податкове планування, банківська діяльність та фінансовий аудит.</p>
            </div>
            <div className="commission-card">
              <div className="comm-icon-box"><Users size={20} /></div>
              <h4>Комісія гуманітарних та природничих дисциплін</h4>
              <p>Мовна підготовка, фізичне виховання, історія та фундаментальні природничі науки.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .admin-section {
          padding: 5rem 0;
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-color);
        }

        .admin-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        .admin-card {
          background: var(--bg-muted);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.2s ease;
        }

        .admin-card:hover {
          transform: translateY(-3px);
          border-color: var(--primary);
          box-shadow: var(--shadow-md);
        }

        .admin-img-wrap {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 1.25rem;
          border: 3px solid var(--primary);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .admin-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .admin-img-fallback {
          display: none;
          width: 100%;
          height: 100%;
          background: var(--primary);
          color: #fff;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 2.5rem;
          align-items: center;
          justify-content: center;
        }

        .admin-role {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.35rem;
          display: block;
        }

        .admin-name {
          font-size: 1.15rem;
          margin-bottom: 0.35rem;
        }

        .admin-qual {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        /* Циклові комісії */
        .commissions-box {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 2.5rem;
        }

        .commissions-title {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .commissions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        .commission-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          transition: border-color 0.15s ease;
        }

        .commission-card:hover {
          border-color: var(--primary);
        }

        .comm-icon-box {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          background: var(--primary-subtle);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
        }

        .commission-card h4 {
          font-size: 0.95rem;
          margin-bottom: 0.4rem;
          line-height: 1.3;
        }

        .commission-card p {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.45;
        }
      `}</style>
    </section>
  );
}
