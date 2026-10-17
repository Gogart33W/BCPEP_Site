import React from 'react';
import { REAL_NEWS, PARTNERS } from '../data/collegeData';
import { Calendar, ArrowRight, ExternalLink } from 'lucide-react';

export default function NewsSection() {
  return (
    <section className="news-section" id="news-block">
      <div className="container">
        <div className="news-header">
          <div>
            <span className="section-badge">Стрічка подій</span>
            <h2 className="section-title">Останні новини коледжу</h2>
            <p className="section-subtitle">
              Актуальні події, офіційні вітання, заходи та студентське життя ВСП БФКПЕП.
            </p>
          </div>
        </div>

        <div className="news-grid">
          {REAL_NEWS.map(news => (
            <article key={news.id} className="news-card">
              {news.image && (
                <div className="news-image-wrap">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    loading="lazy" 
                    className="news-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <span className="news-cat-badge">{news.category}</span>
                </div>
              )}
              <div className="news-body">
                <div className="news-date">
                  <Calendar size={13} />
                  <span>{news.date}</span>
                </div>
                <h3 className="news-title">
                  <a href={news.link} target="_blank" rel="noreferrer">
                    {news.title}
                  </a>
                </h3>
                <a 
                  href={news.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="news-read-more"
                >
                  Читати на сайті <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Секція "Наші партнери" як на реальному сайті */}
        <div className="partners-block">
          <div className="partners-header">
            <h3 className="partners-title">Наші партнери</h3>
            <p>Провідні університети України, з якими співпрацює коледж</p>
          </div>
          <div className="partners-grid">
            {PARTNERS.map(partner => (
              <a 
                key={partner.name}
                href={partner.url} 
                target="_blank" 
                rel="noreferrer" 
                className="partner-card"
                title={partner.name}
              >
                <img src={partner.logo} alt={partner.name} className="partner-logo" />
                <span className="partner-name">{partner.name}</span>
                <ExternalLink size={12} className="partner-ext" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .news-section {
          padding: 4.5rem 0;
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-color);
        }

        .news-header {
          margin-bottom: 2.5rem;
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        .news-card {
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.2s ease;
        }

        .news-card:hover {
          transform: translateY(-3px);
          border-color: var(--primary);
          box-shadow: var(--shadow-md);
        }

        .news-image-wrap {
          position: relative;
          height: 180px;
          background: var(--bg-muted);
          overflow: hidden;
        }

        .news-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .news-card:hover .news-image {
          transform: scale(1.04);
        }

        .news-cat-badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(4px);
          color: #fff;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
        }

        .news-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .news-date {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }

        .news-title {
          font-size: 1rem;
          line-height: 1.4;
          margin-bottom: 1rem;
          flex: 1;
        }

        .news-title a {
          color: var(--text-main);
          text-decoration: none;
        }
        .news-title a:hover {
          color: var(--primary);
        }

        .news-read-more {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary);
          margin-top: auto;
        }

        /* Партнери */
        .partners-block {
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
        }

        .partners-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .partners-title {
          font-size: 1.6rem;
          margin-bottom: 0.35rem;
        }

        .partners-header p {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .partners-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 1.25rem;
        }

        .partner-card {
          background: var(--bg-muted);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.25rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.75rem;
          text-decoration: none;
          color: var(--text-main);
          transition: all 0.2s ease;
          position: relative;
        }

        .partner-card:hover {
          border-color: var(--primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }

        .partner-logo {
          width: 60px;
          height: 60px;
          object-fit: contain;
        }

        .partner-name {
          font-size: 0.85rem;
          font-weight: 600;
        }

        .partner-ext {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
