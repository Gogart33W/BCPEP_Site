import React from 'react';
import { COLLEGE_NEWS } from '../data/collegeData';
import { Newspaper, Calendar, ArrowRight } from 'lucide-react';

export default function NewsSection() {
  return (
    <section className="news-section">
      <div className="container">
        <div className="news-header">
          <div>
            <span className="section-badge">Події та оголошення</span>
            <h2 className="section-title">Новини коледжу</h2>
            <p className="section-subtitle">
              Актуальні події академічного життя, заходи, олімпіади та студентські досягнення.
            </p>
          </div>
        </div>

        <div className="news-grid">
          {COLLEGE_NEWS.map(news => (
            <div key={news.id} className="news-card">
              <div className="news-top">
                <span className="badge badge-blue">{news.tag}</span>
                <span className="news-date">
                  <Calendar size={13} />
                  {news.date}
                </span>
              </div>
              <h3 className="news-title">{news.title}</h3>
              <p className="news-summary">{news.summary}</p>
              <button 
                className="news-read-more"
                onClick={() => alert(`Детальна публікація: «${news.title}»\n\n${news.summary}`)}
              >
                Читати повністю <ArrowRight size={14} />
              </button>
            </div>
          ))}
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
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .news-card {
          background: var(--bg-muted);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          transition: all 0.2s ease;
        }

        .news-card:hover {
          transform: translateY(-2px);
          border-color: var(--primary);
          box-shadow: var(--shadow-md);
        }

        .news-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .news-date {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.775rem;
          color: var(--text-muted);
        }

        .news-title {
          font-size: 1.15rem;
          margin-bottom: 0.75rem;
          line-height: 1.35;
          color: var(--text-main);
        }

        .news-summary {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin-bottom: 1.25rem;
          flex-grow: 1;
        }

        .news-read-more {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--primary);
          align-self: flex-start;
          transition: gap 0.15s ease;
        }

        .news-read-more:hover {
          gap: 0.5rem;
        }
      `}</style>
    </section>
  );
}
