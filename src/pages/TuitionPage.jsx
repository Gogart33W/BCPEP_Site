import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CreditCard, Calendar, GraduationCap, BookOpen, 
  ChevronRight, ArrowRight, ShieldCheck, Download, AlertCircle
} from 'lucide-react';

export default function TuitionPage() {
  const [activeForm, setActiveForm] = useState('fulltime'); // 'fulltime' | 'parttime'

  const fulltimeData = [
    {
      specialties: [
        { code: 'D1', name: 'Облік та оподаткування' },
        { code: 'D2', name: 'Фінанси, банківська справа, страхування та фондовий ринок' },
        { code: 'K9', name: 'Правоохоронна діяльність' }
      ],
      duration: '2 роки 10 місяців',
      totalCost: '90 220,00 грн',
      years: [
        { year: '1-й рік', cost: '26 100,00 грн' },
        { year: '2-й рік', cost: '29 120,00 грн' },
        { year: '3-й рік', cost: '35 000,00 грн' }
      ]
    },
    {
      specialties: [
        { code: 'D6', name: 'Секретарська та офісна справа' },
        { code: 'F2', name: 'Інженерія програмного забезпечення' }
      ],
      duration: '3 роки 10 місяців',
      totalCost: '120 290,00 грн',
      years: [
        { year: '1-й рік', cost: '25 100,00 грн' },
        { year: '2-й рік', cost: '28 100,00 грн' },
        { year: '3-й рік', cost: '32 000,00 грн' },
        { year: '4-й рік', cost: '35 090,00 грн' }
      ]
    },
    {
      specialties: [
        { code: 'D3', name: 'Менеджмент' }
      ],
      duration: '3 роки 5 місяців',
      totalCost: '105 250,00 грн',
      years: [
        { year: '1-й рік', cost: '26 100,00 грн' },
        { year: '2-й рік', cost: '29 100,00 грн' },
        { year: '3-й рік', cost: '33 000,00 грн' },
        { year: '4-й рік', cost: '17 050,00 грн' }
      ]
    },
    {
      specialties: [
        { code: 'G11', name: 'Машинобудування' }
      ],
      duration: '3 роки 10 місяців',
      totalCost: '63 200,00 грн',
      years: [
        { year: '1-й рік', cost: '15 800,00 грн' },
        { year: '2-й рік', cost: '15 800,00 грн' },
        { year: '3-й рік', cost: '15 800,00 грн' },
        { year: '4-й рік', cost: '15 800,00 грн' }
      ]
    }
  ];

  const parttimeData = [
    {
      specialties: [
        { code: 'D1', name: 'Облік та оподаткування' },
        { code: 'D2', name: 'Фінанси, банківська справа, страхування' },
        { code: 'K9', name: 'Правоохоронна діяльність' }
      ],
      duration: '1 рік 10 місяців',
      totalCost: '32 740,00 грн',
      years: [
        { year: '1-й рік', cost: '16 370,00 грн' },
        { year: '2-й рік', cost: '16 370,00 грн' }
      ]
    },
    {
      specialties: [
        { code: 'G11', name: 'Машинобудування' }
      ],
      duration: '2 роки 10 місяців',
      totalCost: '49 110,00 грн',
      years: [
        { year: '1-й рік', cost: '16 370,00 грн' },
        { year: '2-й рік', cost: '16 370,00 грн' },
        { year: '3-й рік', cost: '16 370,00 грн' }
      ]
    },
    {
      specialties: [
        { code: 'D6', name: 'Секретарська та офісна справа' }
      ],
      duration: '2 роки 10 місяців',
      totalCost: '49 110,00 грн',
      years: [
        { year: '1-й рік', cost: '16 370,00 грн' },
        { year: '2-й рік', cost: '16 370,00 грн' },
        { year: '3-й рік', cost: '16 370,00 грн' }
      ]
    },
    {
      specialties: [
        { code: 'D3', name: 'Менеджмент' }
      ],
      duration: '2 роки 5 місяців',
      totalCost: '40 920,00 грн',
      years: [
        { year: '1-й рік', cost: '16 370,00 грн' },
        { year: '2-й рік', cost: '16 370,00 грн' },
        { year: '3-й рік', cost: '8 180,00 грн' }
      ]
    }
  ];

  const currentCards = activeForm === 'fulltime' ? fulltimeData : parttimeData;

  return (
    <div className="tuition-page container">
      <nav className="breadcrumbs-nav">
        <Link to="/">Головна</Link>
        <ChevronRight size={13} className="bc-sep" />
        <Link to="/abituriyentu/vstup">Вступнику</Link>
        <ChevronRight size={13} className="bc-sep" />
        <span className="bc-current">Вартість навчання</span>
      </nav>

      <header className="page-header">
        <h1 className="page-title">Вартість навчання на 2026 – 2027 н.р.</h1>
        <p className="page-desc">
          Відповідно до кошторису витрат на навчання одного студента денного та заочного відділень на 2026–2027 навчальний рік та з урахуванням фінансового стану населення встановлено такі розміри плати за навчання за контрактом.
        </p>

        {/* Перемикач форми навчання */}
        <div className="form-toggle-bar">
          <button 
            className={`form-btn ${activeForm === 'fulltime' ? 'active' : ''}`}
            onClick={() => setActiveForm('fulltime')}
          >
            <GraduationCap size={18} />
            <span>Денна форма навчання</span>
          </button>
          <button 
            className={`form-btn ${activeForm === 'parttime' ? 'active' : ''}`}
            onClick={() => setActiveForm('parttime')}
          >
            <BookOpen size={18} />
            <span>Заочна форма навчання</span>
          </button>
        </div>
      </header>

      {/* Сітка спеціальностей та вартості */}
      <div className="tuition-cards-grid">
        {currentCards.map((group, idx) => (
          <div key={idx} className="tuition-card">
            <div className="tuition-card-header">
              <div className="specs-list">
                {group.specialties.map(s => (
                  <div key={s.code} className="spec-badge-item">
                    <span className="spec-code">{s.code}</span>
                    <span className="spec-name">{s.name}</span>
                  </div>
                ))}
              </div>
              <span className="duration-pill">Термін: {group.duration}</span>
            </div>

            <div className="total-cost-box">
              <span className="total-lbl">Загальна вартість навчання</span>
              <strong className="total-amount">{group.totalCost}</strong>
            </div>

            <div className="years-breakdown-box">
              <span className="breakdown-lbl">Графік оплати за роками:</span>
              <div className="years-row">
                {group.years.map((y, yIdx) => (
                  <div key={yIdx} className="year-fee-chip">
                    <span className="yf-title">{y.year}</span>
                    <span className="yf-price">{y.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Інформаційний банер про оплату та IBAN */}
      <section className="payment-help-banner">
        <div className="payment-card">
          <div className="payment-card-icon">
            <CreditCard size={28} />
          </div>
          <div className="payment-card-body">
            <h3>Порядок та реквізити здійснення оплати</h3>
            <p>
              Оплата здійснюється безготівково на офіційний реєстраційний рахунок коледжу в Державній казначейській службі України відповідно до умов укладеного договору. Можлива помісячна або посеместрова сплата.
            </p>
          </div>
          <Link to="/studentu/rekvizyty-dlya-oplaty" className="btn btn-primary">
            <span>Офіційні реквізити (IBAN)</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <style>{`
        .tuition-page {
          padding-top: 2rem;
          padding-bottom: 5rem;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          width: 100%;
        }

        .breadcrumbs-nav {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.825rem;
          color: var(--text-muted);
        }

        .breadcrumbs-nav a {
          color: var(--text-muted);
          text-decoration: none;
        }

        .breadcrumbs-nav a:hover {
          color: var(--primary);
        }

        .bc-sep {
          color: var(--border-subtle);
        }

        .bc-current {
          color: var(--text-main);
          font-weight: 600;
        }

        .page-header {
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 2rem;
        }

        .page-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.75rem;
        }

        .page-desc {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 820px;
          margin-bottom: 2rem;
        }

        .form-toggle-bar {
          display: inline-flex;
          background: var(--bg-muted);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 0.35rem;
          gap: 0.35rem;
        }

        .form-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: none;
          background: transparent;
          color: var(--text-muted);
          padding: 0.65rem 1.35rem;
          border-radius: var(--radius-sm);
          font-size: 0.925rem;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .form-btn:hover {
          color: var(--text-main);
        }

        .form-btn.active {
          background: var(--bg-surface);
          color: var(--primary);
          box-shadow: var(--shadow-sm);
        }

        /* Tuition cards */
        .tuition-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 1.5rem;
        }

        .tuition-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          box-shadow: var(--shadow-xs);
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }

        .tuition-card:hover {
          transform: translateY(-3px);
          border-color: var(--primary);
          box-shadow: var(--shadow-lg);
        }

        .tuition-card-header {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .specs-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .spec-badge-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .spec-code {
          background: var(--primary-subtle);
          color: var(--primary);
          font-weight: 800;
          font-size: 0.75rem;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-xs);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .spec-name {
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--text-main);
          line-height: 1.35;
        }

        .duration-pill {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          background: var(--bg-muted);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-xs);
          width: fit-content;
        }

        .total-cost-box {
          background: var(--bg-muted);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .total-lbl {
          font-size: 0.775rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .total-amount {
          font-size: 1.75rem;
          font-weight: 900;
          color: var(--primary);
          line-height: 1.1;
        }

        .years-breakdown-box {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .breakdown-lbl {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .years-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 0.65rem;
        }

        .year-fee-chip {
          background: var(--bg-base);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 0.65rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .yf-title {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .yf-price {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--text-main);
        }

        /* Payment help banner */
        .payment-help-banner {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 2rem;
          box-shadow: var(--shadow-sm);
        }

        .payment-card {
          display: flex;
          align-items: center;
          gap: 1.75rem;
          flex-wrap: wrap;
        }

        .payment-card-icon {
          width: 58px;
          height: 58px;
          border-radius: var(--radius-full);
          background: var(--primary-subtle);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .payment-card-body {
          flex: 1;
          min-width: 260px;
        }

        .payment-card-body h3 {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.35rem;
        }

        .payment-card-body p {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin: 0;
          line-height: 1.5;
        }

        @media (max-width: 640px) {
          .tuition-cards-grid {
            grid-template-columns: 1fr;
          }
          .payment-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .form-toggle-bar {
            flex-direction: column;
            width: 100%;
          }
          .form-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
